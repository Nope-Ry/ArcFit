
import json

for i in range(1, 32):
    with open(f'equipment/json/{i}.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
        data['img_path'] = f'res/equipment/img/{i}.jpg'
    with open(f'equipment/json/{i}.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

    