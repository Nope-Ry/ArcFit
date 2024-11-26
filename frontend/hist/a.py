# {
#     "duration": 1,
#     "date": "2022-03-01",
#     "time": "00:00:00.000Z",
#     "cnt": 1,
#     "records": [
#         {
#             "name": "高位下拉",
#             "m_id": 1,
#             "group":[
#                 {
#                     "reps": 10,
#                     "weight": 20
#                 },
#                 {
#                     "reps": 10,
#                     "weight": 20
#                 },
#                 {
#                     "reps": 10,
#                     "weight": 20
#                 }
#             ],
#             "rating": 5
#         }
#     ]
# }
# 写一个代码，随机生成这样的数据，其中：
# duration = 1-100的随机数
# date = 2024-11-16 - 2024-11-26的随机日期
# time = 00:00:00.000Z - 23:59:59.999Z的随机时间
# cnt = 从1-15，要生成15个records
# records中的name是从下面的列表中随机选择
# group中的reps是从1-20的随机数，weight是从1-50的随机数
# m_id是从1-15的随机数
# b_id是从1-17的随机数
# rating是1-5的随机数
import json
import random
import datetime

names = ["高位下","高位1", "高位2", "三五六"]

strings = []
for i in range(15):
    duration = random.randint(1, 100)
    date = str(datetime.date(2024, 11, random.randint(16, 26)))
    time = str(datetime.time(random.randint(0, 23), random.randint(0, 59), random.randint(0, 59)))
    cnt = i + 1
    records = []
    for j in range(random.randint(1, 3)):
        name = random.choice(names)
        m_id = random.randint(1, 15)
        b_id = random.sample(range(1, 18), random.randint(1, 4))
        group = []
        for k in range(random.randint(1, 5)):
            reps = random.randint(1, 20)
            weight = random.randint(1, 50)
            group.append({"reps": reps, "weight": weight})
        rating = random.randint(1, 5)
        records.append({"name": name, "m_id": m_id, "b_id": b_id, "group": group, "rating": rating})
    data = {"duration": duration, "date": date, "time": time, "cnt": cnt, "records": records}
    # 写入文件名是年_月_日_序号.json
    title = date.replace("-", "_") + "_" + str(cnt) + ".json"
    with open(title, "w") as f:
        json.dump(data, f, indent=4)
    string = "import " + "data" + str(i + 1) + " from " + "\"../../hist/" + title + "\""
    strings.append(string)
print("\n".join(strings))
    
    



