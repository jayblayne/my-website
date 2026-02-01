import csv
import json

# File names
csv_file = 'lexicon.csv'
js_file = 'lexicon.js'

# Read CSV
with open(csv_file, newline='', encoding='utf-8-sig') as f:  # <-- change here
    reader = csv.DictReader(f)  # uses first row as headers
    entries = [row for row in reader]

# Write JS file
with open(js_file, 'w', encoding='utf-8') as f:
    f.write('const lexicon = ')
    json.dump(entries, f, indent=2, ensure_ascii=False)
    f.write(';')

print(f"✅ {js_file} created with {len(entries)} entries.")
