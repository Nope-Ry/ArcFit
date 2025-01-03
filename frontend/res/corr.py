# this script is used to correct the json files' relationship
# based on motion json files
# write to equipment & bodypart json files

# run this script in the res directory

import json
import numpy as np

equipment_cnt = 35
motion_cnt = 90
bodypart_cnt = 17

e_id_list_all = np.empty((equipment_cnt, 0)).tolist()

for j in range(1, motion_cnt+1):
    with open(f'motion/json/{j}.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
        for e_id in data['e_id']:
            e_id_list_all[e_id-1].append(j)
                   
# print(e_id_list_all)
                
for i in range(1, equipment_cnt+1):
    with open(f'equipment/json/{i}.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
        data['m_id'] = e_id_list_all[i-1]
        with open(f'equipment/json/{i}.json', 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=4)
            

b_id_list_all = np.empty((bodypart_cnt, 0)).tolist()
    
for j in range(1, motion_cnt+1):
    with open(f'motion/json/{j}.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
        for b_id in data['b_id']:
            b_id_list_all[b_id-1].append(j)
                   
# print(b_id_list_all)
                
for i in range(1, bodypart_cnt+1):
    with open(f'bodypart/json/{i}.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
        data['m_id'] = b_id_list_all[i-1]
        with open(f'bodypart/json/{i}.json', 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=4)
            
m_id_list_all = np.empty((motion_cnt, 0)).tolist()
for j in range(1, motion_cnt+1):
    with open(f'motion/json/{j}.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
        for e_id in data['e_id']:
            m_id_list_all[j-1].append(e_id)
        
        
print(m_id_list_all.__len__())
for i in range(1, bodypart_cnt+1):
    with open(f'bodypart/json/{i}.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
        e_id = []
        for k in data['m_id']:
            e_id.append(m_id_list_all[k-1])
        e_id = list(set(sum(e_id, [])))
        e_id.sort()
        data['e_id'] = e_id
        print(e_id)
        
        with open(f'bodypart/json/{i}.json', 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=4)
