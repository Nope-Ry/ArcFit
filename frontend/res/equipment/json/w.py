
import json


name_list = []

for i in range(1, 32):
    with open(f'equipment/json/{i}.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
        # data["description"] = des_list[i-1]
    with open(f'equipment/json/{i}.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
        # name_list.append(data['name'])
    #     data['img_path'] = f'res/equipment/img/{i}.jpg'
    # with open(f'equipment/json/{i}.json', 'w', encoding='utf-8') as f:
    #     json.dump(data, f, ensure_ascii=False, indent=4)

    
# print(name_list)