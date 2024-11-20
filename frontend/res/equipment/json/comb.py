import json
from pathlib import Path


lst = []
for i in range(1, 36):
    path = Path(f"equipment/json/{i}.json")
    with path.open() as f:
        data = json.load(f)
        lst.append(data)

with open("equipment/json/comb.json", "w") as f:
    json.dump(lst, f, indent=4, ensure_ascii=False)