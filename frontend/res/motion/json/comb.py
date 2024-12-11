import json
from pathlib import Path


lst = []
for i in range(1, 91):
    path = Path(f"motion/json/{i}.json")
    with path.open() as f:
        data = json.load(f)
        lst.append(data)

with open("motion/json/comb.json", "w") as f:
    json.dump(lst, f, indent=4, ensure_ascii=False)