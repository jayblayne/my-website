import csv
import json

input_file = "lexicon.csv"
output_file = "lexicon.js"

entries = []

with open(input_file, newline="", encoding="utf-8-sig") as f:
    reader = csv.DictReader(f)
    for row in reader:
        entries.append(row)

with open(output_file, "w", encoding="utf-8") as f:
    f.write("const lexicon = ")
    json.dump(entries, f, ensure_ascii=False, indent=2)
    f.write(";")

print("lexicon.js created!")

