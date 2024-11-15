
import json


name_list = []

for i in range(1, 16):
    with open(f'motion/json/{i}.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
        data['img_path'] = f'res/motion/img/{i}.gif'
        data["m_id"] = i
        name_list.append(data['name'])
    with open(f'motion/json/{i}.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
        # name_list.append(data['name'])
    #     data['img_path'] = f'res/equipment/img/{i}.jpg'

    
print(name_list)