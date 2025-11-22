import pandas as pd
import json

# Topic ID mapping from previous step (1: Đất nước, 2: Động vật, 3: Thực phẩm)
topic_mapping = {
    'W01534': 1, 'W00988B': 1, 'W01075B': 1, 'W03935B': 1, 'D0308': 1, 'D0309': 1, 'D0311': 1, 'D0310': 1, 
    'W02211': 1, 'W02212': 1, 'W00371': 1, 'W03123': 1, 'D0002': 1, 'W00181': 1, 'W00617B': 1, 
    'W00735B': 2, 'W00737B': 2, 'W00803B': 2, 'W00741': 2, 'W00748': 2, 'W00772B': 2, 'W00759': 2, 
    'W00797B': 2, 'W00753': 2, 'W00749': 2, 'W00776': 2, 'W00736': 2, 'W00751': 2, 'D0449': 2, 
    'D0392': 3, 'D0391': 3, 'W00134': 3, 'W00141': 3, 'D0405': 3, 'W00128': 3, 'W00131': 3, 
    'W02731B': 3, 'W02730': 3, 'W02724B': 3, 'W02732B': 3, 'W02725': 3, 'W02755': 3, 'W00486': 3, 
    'W02898B': 3, 'W03524': 3, 'W01743B': 3
}

data = []
try:
    with open('final.jsonl', 'r', encoding='utf-8') as f:
        for line in f:
            try:
                data.append(json.loads(line))
            except json.JSONDecodeError:
                # Clean malformed lines by removing source tags
                cleaned_line = line
                for i in range(1, 389): 
                    cleaned_line = cleaned_line.replace(f'', '')
                try:
                    data.append(json.loads(cleaned_line))
                except json.JSONDecodeError:
                    pass

except FileNotFoundError:
    print("Error: final.jsonl not found.")
    data = []

if not data:
    print("No data successfully loaded.")
else:
    df = pd.DataFrame(data)

    # Rename old string 'id' to 'original_id' to preserve the value
    df = df.rename(columns={'id': 'original_id', 'description': 'instruction', 'video_url': 'video'})
    
    # Assign topic_id using the map
    df['topic_id'] = df['original_id'].map(topic_mapping).fillna('NULL').astype(str)

    # Prepare other columns for SQL insertion
    df_sql = df[['original_id', 'topic_id', 'word', 'instruction', 'video']].copy()
    df_sql['type'] = 'NULL'
    df_sql['context'] = 'NULL'
    df_sql['image'] = 'NULL'
    df_sql['created_at'] = 'NULL'

    # Function to generate SQL INSERT statements
    def generate_insert_sql(row):
        # Escape single quotes and newlines in string values for SQL
        word_safe = row['word'].replace("'", "''")
        instruction_safe = row['instruction'].replace("'", "''").replace('\n', ' ')
        video_safe = row['video'].replace("'", "''")
        original_id_safe = row['original_id'].replace("'", "''")
        
        # Handle topic_id: convert to integer string if not 'NULL'
        topic_id_val = row['topic_id']
        topic_id_sql = str(int(float(topic_id_val))) if topic_id_val != 'NULL' else 'NULL'

        # Note: 'id' (SERIAL) is omitted from the column list, and the old 'id' value is inserted into 'original_id'
        return (
            f"INSERT INTO vocabulary (original_id, topic_id, word, instruction, type, context, video, image, created_at) "
            f"VALUES ('{original_id_safe}', {topic_id_sql}, '{word_safe}', '{instruction_safe}', {row['type']}, {row['context']}, '{video_safe}', {row['image']}, {row['created_at']});"
        )

    # Generate all INSERT statements
    insert_statements = df_sql.apply(generate_insert_sql, axis=1)

    # Save the SQL statements to a file
    output_filename = 'vocabulary_insert_statements_SERIAL_fix.sql'
    with open(output_filename, 'w', encoding='utf-8') as f:
        f.write('\n'.join(insert_statements))

    print(f"Generated {len(insert_statements)} rows of SQL INSERT statements with SERIAL fix.")
    print(f"Saved to {output_filename}")