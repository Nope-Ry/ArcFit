
import json


name_list = []
des_list = [
    "卧推架用于卧推训练，配合杠铃使用。调整好卧推架的高度后，卧姿握住杠铃推起，再缓慢下降，主要锻炼胸大肌、三角肌前束和肱三头肌。",
    "史密斯架是一种固定轨道的杠铃架，适合初学者和高效力量训练。可用于深蹲、卧推、肩推等，主要强化胸肌、腿部肌肉和肩部肌肉。",
    "上斜卧推架用于上斜角度的卧推训练，需调整靠背至30°-45°角，握杠铃推起再缓慢下降，主要锻炼胸大肌上部、三角肌和肱三头肌。",
    "哑铃是基础器材，可用于各种自由重量训练，如弯举、飞鸟和肩推，能够有效锻炼手臂、胸部、肩部和背部肌肉。",
    "杠铃片是杠铃的负重部分，也可单独用作负重器材，通过核心训练锻炼核心肌群的力量和稳定性。",
    "多功能蝴蝶机支持夹胸、扩胸等动作，通过调整角度可实现多部位训练，尤其有助于增强胸肌和肩部肌肉的力量。",
    "蝴蝶机用于夹胸训练，坐姿握住把手向内合拢，缓慢还原，主要锻炼胸肌内侧，提高肌肉线条感。",
    "上斜推胸器模拟上斜卧推动作，采用固定轨迹更安全，专注锻炼胸大肌上部和肱三头肌。",
    "坐式拉背器用于划船动作，坐姿握把后拉至背部，再慢慢还原，主要锻炼背阔肌、菱形肌和斜方肌，增强背部力量。",
    "背阔下拉机用于下拉手柄至锁骨下方的动作，主要强化背阔肌和上肢肌肉群，模拟引体向上效果。",
    "单双杠复合架适合做引体向上、双杠臂屈伸等训练，能够有效增强背部、胸部和上肢肌肉力量。",
    "划船拉背器模拟划船动作，坐姿握把后拉至胸部再慢慢还原，主要锻炼背阔肌、菱形肌和斜方肌。",
    "分动式下斜推胸训练器用于下斜角度的推胸动作，双臂独立运动，主要刺激胸大肌下部肌群。",
    "哈克深蹲架固定下肢动作，站姿深蹲至大腿平行地面，主要锻炼股四头肌、臀大肌和腿后侧肌群。",
    "分动直立大腿肌训练器用于单侧大腿肌肉训练，通过调整负重和腿部位置进行单侧腿部训练，强化股四头肌和腿后侧肌肉。",
    "分动式前高拉背训练器模拟高拉训练动作，双手独立拉动把手，增强背部力量，集中锻炼背阔肌、菱形肌和肩部肌肉。",
    "分动式腿部伸展训练器用于腿部前侧伸展训练，通过调整负重坐姿抬起小腿，主要锻炼股四头肌。",
    "坐式提小腿训练器用于小腿提踵训练，坐姿将负重向上顶起再缓慢还原，强化腓肠肌和比目鱼肌。",
    "分动式腿部伸展训练器重复的练习器，适用于腿部前侧肌群的伸展训练，专注股四头肌。",
    "腹背臀腿伸展训练器通过多角度调整，可完成腹部、背部、臀部及腿部综合性训练，特别适合锻炼核心和下背部。",
    "臀桥训练器用于臀桥动作的专用器材，能够有效增强臀大肌、核心肌群和腿后肌群。",
    "背肌伸展练习椅用于腰背部伸展训练，调整角度完成背部弯曲和还原，主要增强竖脊肌和腰背部核心肌群。",
    "腹背臀腿伸展训练器重复的练习器，主要用于腹部、背部、臀部和腿部的综合训练，集中锻炼核心区域。",
    "阔背肌下拉器下拉手柄至胸前，缓慢还原，模仿引体向上动作，锻炼背阔肌、菱形肌和肱二头肌。",
    "龙门架是一种多功能训练器材，支持拉力、推力等综合训练，适合胸部、背部和手臂肌肉的全面发展。",
    "水平蹬腿器模拟蹬腿动作，通过调节座椅和负重完成训练，主要锻炼股四头肌、臀部和小腿肌群。",
    "小龙门架类似龙门架，适用于小型空间，可完成基础拉力和推力训练，适合胸部、背部和手臂肌肉的强化。",
    "助力式单双杠带助力功能的单双杠，适合初学者完成引体向上或双杠动作，主要锻炼背部、胸部和上肢肌肉。",
    "伸腿训练器用于腿部前侧伸展训练，调节负重后抬起小腿，主要锻炼股四头肌。",
    "屈腿训练器专注腿后侧肌群，通过屈膝动作完成训练，主要锻炼腘绳肌和小腿肌肉。",
    "大腿内外侧训练器通过夹腿和外展动作，强化大腿内收肌和外展肌群，增强腿部整体力量。"
  ]
for i in range(1, 32):
    with open(f'equipment/json/{i}.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
        data["description"] = des_list[i-1]
    with open(f'equipment/json/{i}.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
        # name_list.append(data['name'])
    #     data['img_path'] = f'res/equipment/img/{i}.jpg'
    # with open(f'equipment/json/{i}.json', 'w', encoding='utf-8') as f:
    #     json.dump(data, f, ensure_ascii=False, indent=4)

    
# print(name_list)