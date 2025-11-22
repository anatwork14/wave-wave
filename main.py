import json
import os

# 1. CẤU HÌNH DANH SÁCH TỪ KHÓA ĐỂ PHÂN LOẠI TỰ ĐỘNG
# Mỗi topic có một danh sách từ khóa đặc trưng
TOPIC_KEYWORDS = {
    1: ['gia đình', 'cha', 'mẹ', 'bố', 'ba', 'má', 'ông', 'bà', 'chú', 'bác', 'cô', 'dì', 'cậu', 'mợ', 'anh', 'chị', 'em', 'con', 'cháu', 'vợ', 'chồng', 'dâu', 'rể', 'người', 'bé', 'trai', 'gái', 'bạn', 'thân'],
    2: ['động vật', 'con', 'gà', 'vịt', 'chó', 'mèo', 'lợn', 'heo', 'bò', 'trâu', 'ngựa', 'voi', 'hổ', 'báo', 'khỉ', 'chim', 'cá', 'tôm', 'cua', 'ốc', 'ếch', 'rắn', 'côn trùng', 'ong', 'bướm', 'kiến', 'muỗi'],
    3: ['địa điểm', 'hà', 'hồ', 'sông', 'biển', 'núi', 'rừng', 'đảo', 'nước', 'thành phố', 'thị', 'xã', 'huyện', 'làng', 'phố', 'đường', 'chợ', 'công viên', 'nhà', 'bưu điện', 'viện', 'quốc gia', 'tỉnh'],
    4: ['thức ăn', 'đồ uống', 'ăn', 'uống', 'cơm', 'cháo', 'bún', 'phở', 'mì', 'bánh', 'kẹo', 'sữa', 'nước', 'rượu', 'bia', 'trà', 'cà phê', 'trái cây', 'quả', 'thịt', 'trứng', 'rau', 'củ', 'ngọt', 'mặn', 'bếp'],
    5: ['trường', 'lớp', 'học', 'giáo', 'thầy', 'cô giáo', 'sách', 'vở', 'bút', 'bảng', 'cặp', 'bài', 'thi', 'kiểm tra', 'điểm', 'môn', 'đại học', 'sinh viên', 'nghiên cứu'],
    6: ['cảm xúc', 'tính cách', 'yêu', 'ghét', 'vui', 'buồn', 'giận', 'hờn', 'lo', 'sợ', 'ngại', 'xấu hổ', 'tự tin', 'hiền', 'dữ', 'tốt', 'xấu', 'ngoan', 'hư', 'thông minh', 'lười', 'chăm'],
    7: ['toán', 'hình', 'số', 'lượng', 'cộng', 'trừ', 'nhân', 'chia', 'bằng', 'tròn', 'vuông', 'tam giác', 'chữ nhật', 'đo', 'mét', 'lít', 'cao', 'thấp', 'dài', 'ngắn', 'rộng', 'hẹp'],
}

DEFAULT_TOPIC_ID = 8  # Mặc định nếu không tìm thấy từ khóa nào

def find_topic_id(word):
    """Tìm topic ID dựa trên từ vựng."""
    word_lower = word.lower()
    for topic_id, keywords in TOPIC_KEYWORDS.items():
        for k in keywords:
            if k in word_lower:
                return topic_id
    return DEFAULT_TOPIC_ID

def clean_str(s):
    """Làm sạch chuỗi để đưa vào SQL."""
    if not s: return ''
    # Thay thế ' bằng '' (chuẩn SQL), xóa xuống dòng
    return s.replace("'", "''").replace("\n", " ").strip()

def generate_sql_file(input_file, output_file):
    print(f"Đang đọc file {input_file}...")
    
    sql_statements = []
    count = 0
    batch_size = 500  # Số dòng mỗi lệnh INSERT
    current_batch = []

    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            for line in f:
                if not line.strip(): continue
                
                try:
                    data = json.loads(line)
                    word = data.get('word', '')
                    video = data.get('video_url', '')
                    desc = data.get('description', '')
                    
                    if not word: continue

                    topic_id = find_topic_id(word)
                    
                    # Tạo chuỗi values: ('word', 'url', 'desc', id)
                    val = f"('{clean_str(word)}', '{clean_str(video)}', '{clean_str(desc)}', {topic_id})"
                    current_batch.append(val)
                    count += 1
                    
                    # Nếu đủ batch size thì gom lại
                    if len(current_batch) >= batch_size:
                        batch_sql = "INSERT INTO public.vocabulary (word, video_url, description, vocabulary_topic_id) VALUES\n"
                        batch_sql += ",\n".join(current_batch) + ";"
                        sql_statements.append(batch_sql)
                        current_batch = [] # Reset batch

                except json.JSONDecodeError:
                    continue

        # Xử lý batch cuối cùng (nếu còn dư)
        if current_batch:
            batch_sql = "INSERT INTO public.vocabulary (word, video_url, description, vocabulary_topic_id) VALUES\n"
            batch_sql += ",\n".join(current_batch) + ";"
            sql_statements.append(batch_sql)

        # Ghi ra file
        with open(output_file, 'w', encoding='utf-8') as out:
            # Thêm header
            out.write("-- Auto-generated SQL for Vocabulary\n")
            out.write(f"-- Total records: {count}\n\n")
            
            for stmt in sql_statements:
                out.write(stmt + "\n\n")
                
        print(f"Hoàn tất! Đã tạo lệnh SQL cho {count} từ vựng.")
        print(f"File kết quả: {output_file}")

    except FileNotFoundError:
        print("Lỗi: Không tìm thấy file đầu vào!")

# --- CHẠY CHƯƠNG TRÌNH ---
input_jsonl = "merged_updated.jsonl"
output_sql = "insert_full_4000_vocab.sql"

generate_sql_file(input_jsonl, output_sql)