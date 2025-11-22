import traceback
from fastapi import FastAPI, UploadFile, File, HTTPException, WebSocket, WebSocketDisconnect
from pydantic import BaseModel
from utils.preprocess import process_video_to_sequence, interpolate_keypoints_sequence, mediapipe_detection, extract_keypoints
import tensorflow as tf
import os, tempfile, json, uvicorn
import base64, cv2
import time
import asyncio
import numpy as np
import mediapipe as mp
from collections import deque
from fastapi.responses import HTMLResponse

N_HAND_LANDMARKS=21
N_UPPER_POSE_LANDMARKS=25
N_LANDMARKS=N_HAND_LANDMARKS*2 + N_UPPER_POSE_LANDMARKS

MODEL_PATH = "model/best_model_2011.keras"
LABEL_MAP = "model/label_map.json"

model = tf.keras.models.load_model(MODEL_PATH)
with open(LABEL_MAP, "r") as f:
    label_map = json.load(f)
label2text = {v: k for k, v in label_map.items()}

mp_holistic = mp.solutions.holistic
holistic = mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5)

app = FastAPI(title="Sign Language Model API")

class SignResponse(BaseModel):
    label_int: int
    label_text: str
    confidence: float

# ---------------------------
# Root endpoint + HTML
# ---------------------------
# @app.get("/")
# def root():
#     return {"message": "Sign Language API is running"}
@app.get("/")
async def get():
    with open("static/index.html", "r") as f:
        return HTMLResponse(f.read())

# ---------------------------
# Offline video prediction
# ---------------------------
@app.post("/video-predict/", response_model=SignResponse)
async def predict_sign_from_video(video: UploadFile = File(...)):
    if not video.filename.endswith((".mp4", ".mov", ".avi")):
        raise HTTPException(status_code=400, detail="File must be a video format")

    with tempfile.NamedTemporaryFile(delete=False, suffix=".mp4") as tmp:
        tmp.write(await video.read())
        tmp_path = tmp.name
        
    keypoints_sequence = process_video_to_sequence(tmp_path, holistic)
    processed_frames = interpolate_keypoints_sequence(keypoints_sequence)
    
    X_input = np.array(processed_frames, dtype=np.float32)
    input_tensor = np.expand_dims(X_input, axis=0)
    
    preds = model.predict(input_tensor)
    label_int = int(np.argmax(preds))
    confidence = float(np.max(preds))
    label_text = label2text.get(label_int, "Unknown")
    
    os.remove(tmp_path)
    
    return SignResponse(label_int=label_int, label_text=label_text, confidence=confidence)

# --------------------------------
# WebSocket realtime prediction
# --------------------------------
@app.websocket("/ws/stream-predict/")
async def stream_predict(websocket: WebSocket):
    await websocket.accept()
    
    keypoints_buffer = deque(maxlen=200)
    MAX_DURATION = 4.0
    start_time = None
    position = False
    hand_dection = False
    
    try:
        while True:
            # 1. Receive frame
            try:
                base64_frame = await websocket.receive_text()
            except Exception as e:
                print(f"ERROR: Fail to receive frame: {e}")
                break
            
            # 2. Decode frame
            nparr = np.frombuffer(base64.b64decode(base64_frame), np.uint8)
            frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

            if frame is None:
                await websocket.send_json({
                    "status": "waiting",
                    "message": "Invalid frame received"
                })
                continue
            
            image, results = mediapipe_detection(frame, holistic)
            keypoints = extract_keypoints(results)
            if keypoints is None or len(keypoints) == 0:
                await websocket.send_json({
                    "status": "waiting",
                    "message": "No keypoints detected."
                })
                continue
            if not hand_dection:
                if np.all(keypoints[:N_HAND_LANDMARKS*2] == 0.0):
                    await websocket.send_json({
                        "status": "waiting",
                        "message": "No hand detected."
                    })
                    continue
                hand_dection = True
            
            if not position:
                await websocket.send_json({
                    "status": "position_ok",
                    "message": "OK! Hãy giữ nguyên tư thế. Bắt đầu ghi động tác..."
                })
                position = True
            
            if start_time is None:
                start_time = time.time()
                
            keypoints_buffer.append(keypoints)
            
            if len(keypoints_buffer) >= 30 and len(keypoints_buffer) % 30 == 0:
                if len(keypoints_buffer) > 30:
                    seq_array = np.array(keypoints_buffer[:60])  # shape: (len(keypoints_buffer), N_LANDMARKS, 3)
                seq_array = np.array(keypoints_buffer)
                # Interpolate
                processed_seq = interpolate_keypoints_sequence(seq_array) # shape: (30, N_LANDMARKS, 3)
                
                X_input = np.expand_dims(processed_seq, axis=0).astype(np.float32)
                preds = model.predict(X_input)
                
                label_int = int(np.argmax(preds))
                confidence = float(np.max(preds))
                label_text = label2text.get(label_int, "Unknown")
                
                # Gửi kết quả về client
                await websocket.send_json({
                    "label_int": label_int,
                    "label_text": label_text,
                    "confidence": confidence
                })
            
            # elapsed = time.time() - start_time
            # if elapsed > MAX_DURATION:
            #     await websocket.send_json({
            #         "status": "done",
            #         "message": "Max duration reached. Stop prediction."
            #     })
            #     keypoints_buffer.clear()
            #     start_time = None

    except WebSocketDisconnect:
        print("INFO: Client disconnected WebSocket.")
    except Exception as e:
        print(f"CRITICAL ERROR in WebSocket: {e}")
        traceback.print_exc()
        try:
            await websocket.close(code=1011, reason="Server error")
        except:
            pass
    finally:
        try: 
            await websocket.close()
        except:
            pass

# --------------------------------
# WebSocket Continuous Prediction
# --------------------------------
@app.websocket("/ws/stream-predict2/")
async def stream_predict(websocket: WebSocket, expected_word: str | None = None):
    # 1. Accept Connection
    await websocket.accept()
    
    print(f"INFO: Client connected. Target Word: {expected_word}")
    
    # Buffer to hold frames (Max 60 to give us some wiggle room, but we slice 30)
    keypoints_buffer = deque(maxlen=60)
    
    hand_detected = False
    
    # Config for Sliding Window
    PREDICTION_INTERVAL = 10  # Predict every 10 new frames (Continuous feel)
    FRAMES_REQUIRED = 30      # Model needs exactly 30 frames
    frames_since_last_pred = 0

    try:
        while True:
            # -----------------------------
            # 1. Receive & Decode Frame
            # -----------------------------
            try:
                data = await websocket.receive_text()
                
                # Clean header if present (Fixes "Invalid frame" error)
                if "," in data:
                    base64_frame = data.split(",", 1)[1]
                else:
                    base64_frame = data
                
                nparr = np.frombuffer(base64.b64decode(base64_frame), np.uint8)
                frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

                if frame is None:
                    continue

            except Exception as e:
                print(f"Stream closed or error: {e}")
                break
            
            # -----------------------------
            # 2. MediaPipe Processing
            # -----------------------------
            image, results = mediapipe_detection(frame, holistic)
            keypoints = extract_keypoints(results)
            
            # Filter: Require keypoints
            if keypoints is None or len(keypoints) == 0:
                await websocket.send_json({"status": "waiting", "message": "No body detected."})
                continue

            # Filter: Require Hands (Optional, keeps buffer clean)
            if not hand_detected:
                # Check if hand landmarks are not all zero
                if np.all(keypoints[:N_HAND_LANDMARKS*2] == 0.0):
                    await websocket.send_json({"status": "waiting", "message": "Please raise hands."})
                    continue
                hand_detected = True
                await websocket.send_json({"status": "position_ok", "message": "Hands detected!"})
            
            # -----------------------------
            # 3. Buffer Management
            # -----------------------------
            keypoints_buffer.append(keypoints)
            frames_since_last_pred += 1
            
            # -----------------------------
            # 4. Prediction Logic (Sliding Window)
            # -----------------------------
            # We predict if we have enough frames (30) AND we hit the interval (every 10 frames)
            if len(keypoints_buffer) >= FRAMES_REQUIRED and frames_since_last_pred >= PREDICTION_INTERVAL:
                
                # Reset counter
                frames_since_last_pred = 0
                
                # --- CRITICAL: Get exactly the LAST 30 frames ---
                temp_list = list(keypoints_buffer)
                recent_frames = temp_list[-FRAMES_REQUIRED:] # Take last 30
                
                # Preprocess
                seq_array = np.array(recent_frames)
                processed_seq = interpolate_keypoints_sequence(seq_array)
                X_input = np.expand_dims(processed_seq, axis=0).astype(np.float32)
                
                # AI Prediction
                preds = model.predict(X_input, verbose=0)
                label_int = int(np.argmax(preds))
                confidence = float(np.max(preds))
                label_text = label2text.get(label_int, "Unknown")
                
                # Validation Logic
                is_correct = False
                if expected_word:
                    # Normalize both to lowercase and stripped for comparison
                    # Handle potential differences like "Hello " vs "hello"
                    clean_pred = label_text.lower().strip()
                    clean_target = expected_word.lower().strip()
                    
                    # Exact match or substring match (optional)
                    is_correct = clean_pred == clean_target
                
                # Send Result
                await websocket.send_json({
                    "status": "predicted",
                    "label_text": label_text,
                    "confidence": confidence,
                    "expected_word": expected_word,
                    "is_correct": is_correct
                })
                
                # If correct, we might want to clear buffer to let user restart
                # Or keep it running. Clearing gives a better "Success" feeling.
                if is_correct:
                    keypoints_buffer.clear()
                    hand_detected = False # Require them to "re-enter" frame for next attempt
                    await websocket.send_json({"status": "success", "message": "Correct!"})

            # Send progress update only if NOT predicting this frame
            elif len(keypoints_buffer) < FRAMES_REQUIRED:
                 if len(keypoints_buffer) % 5 == 0:
                    await websocket.send_json({
                        "status": "collecting",
                        "frames_collected": len(keypoints_buffer),
                        "frames_needed": FRAMES_REQUIRED
                    })

    except WebSocketDisconnect:
        print("INFO: Client disconnected.")
    except Exception as e:
        print(f"CRITICAL ERROR: {e}")
        traceback.print_exc()
    finally:
        try: await websocket.close()
        except: pass


        
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8001)
    
