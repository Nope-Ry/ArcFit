import json
import random
import datetime

names = ["Name1","Name2", "Name3", "Name4", "Name5", "Name6", "Name7", "Name8", "Name9", "Name10", "Name11", "Name12", "Name13", "Name14", "Name15"]

strings = []
for i in range(50):
    duration = random.randint(40, 100)
    date = str(datetime.date(2024, 11, random.randint(1, 27)))
    time = str(datetime.time(random.randint(0, 23), random.randint(0, 59), random.randint(0, 59)))
    cnt = i + 1
    records = []
    for j in range(random.randint(1, 10)):
        name = random.choice(names)
        m_id = random.randint(1, 15)
        b_id = random.sample(range(1, 18), random.randint(1, 4))
        group = []
        for k in range(random.randint(1, 5)):
            reps = random.randint(1, 5)
            weight = random.randint(1, 50)
            group.append({"reps": reps, "weight": weight})
        rating = random.randint(1, 5)
        records.append({"name": name, "m_id": m_id, "b_id": b_id, "group": group, "rating": rating})
    data = {"duration": duration, "date": date, "time": time, "cnt": cnt, "records": records}
    # 写入文件名是年_月_日_序号.json
    titie = "/Users/yaoruchang/Library/Developer/CoreSimulator/Devices/CDA4584A-4D6B-4AD9-ADD6-971480602D37/data/Containers/Data/Application/FD0AED7D-C211-4B32-93EB-A0230FBB0D66/Documents/" + date.replace("-", "_") + "_" + str(cnt) + ".json"
    # /Users/yaoruchang/Library/Developer/CoreSimulator/Devices/CDA4584A-4D6B-4AD9-ADD6-971480602D37/data/Containers/Data/Application/FD0AED7D-C211-4B32-93EB-A0230FBB0D66/Documents
    with open(titie, "w") as f:
        json.dump(data, f, indent=4)
    
    



