
import json


name_list = ["胸部", "前肩", "斜方肌", "肱二头肌", "前臂", "手", "腹外斜肌","腹肌","股四头肌","小腿","后肩","肱三头肌","背阔肌","臀部","斜方肌中部","下背","腿后肌"]
info_list = ["胸大肌是覆盖胸部的一块主要肌肉，负责推动和夹胸动作，包括肩关节的内收、水平内收和内旋。为了有效锻炼胸部肌肉，可以每周进行2-3次训练，重点选择卧推、上斜推举和夹胸机等动作，多角度刺激肌纤维以获得全面发展。训练时应控制动作节奏，避免肩膀过度内旋，以保护关节并增强肌肉参与感。",  
"前束三角肌位于肩关节前方，是负责肩关节屈曲和内旋的核心肌肉之一。作为肩部训练的重要组成部分，建议每周锻炼2次，避免过度使用以免导致肩关节疲劳。推荐动作包括哑铃前平举和推肩动作，注意动作控制和肩部稳定性，阿诺德推举也是一个很好的选择，有助于全面激活肩部肌肉。",  
"斜方肌覆盖颈部至背上部，是一个大而分为上、中、下三个部分的肌肉群，负责肩胛骨的上提、下压和后缩动作。针对斜方肌上部的训练建议每周进行1-2次，如耸肩和杠铃高拉，中部可以通过划船类动作刺激，下部则需结合下拉类训练。保持肩胛骨稳定是避免颈部过度紧张的关键。",  
"肱二头肌位于上臂前方，是负责肘关节屈曲和前臂旋后的主要肌肉。为了发展饱满的肱二头肌形态，可以每周训练2次，选择弯举类动作，如哑铃弯举、杠铃弯举以及锤式弯举，注意动作全程控制，避免身体晃动，确保肌肉的最大收缩和拉伸。",  
"前臂肌群包括屈肌和伸肌，是维持腕关节稳定和力量的重要部分。建议每周进行2次针对性训练，如腕屈伸、反手腕屈伸以及农夫行走。训练时，轻重量高次数更有助于提升肌肉耐力，同时注意手腕的灵活性训练以避免过度紧张或劳损。",  
"手部由小肌肉群组成，主要用于精细抓握和手腕动作的辅助。通过攀爬、悬挂和捏握等功能性训练，每周进行1-2次的加强练习有助于改善握力和稳定性。简化动作如握力器训练和静态抓握保持也十分有效。",  
"腹外斜肌位于腰部两侧，是支持身体旋转和侧屈的关键肌肉。可以通过每周2-3次针对性训练，如俄罗斯转体、侧平板支撑和单边负重行走，来有效增强其功能。动作时保持核心紧张，避免借力完成动作，以更好地激活目标肌肉。",  
"腹肌由腹直肌、腹横肌和腹斜肌构成，是核心稳定和脊柱保护的重要部分。通过每周2-3次的锻炼，选择仰卧卷腹、平板支撑以及腿举等动作，可以全面发展腹肌群。训练时注意动作控制和呼吸配合，避免使用过大惯性以保护腰椎。",  
"股四头肌位于大腿前方，是负责膝关节伸展的主要肌肉群。为了增强力量和肌肉围度，每周进行2次训练尤为重要，推荐动作包括深蹲、腿举和箭步蹲。注意动作范围尽量全程，以确保肌肉充分拉伸与收缩，提升训练效果。",  
"小腿肌群由腓肠肌和比目鱼肌组成，负责脚踝的跖屈动作。每周训练2-3次，通过站姿和坐姿提踵交替进行全面刺激。注意缓慢完成动作的顶峰收缩并控制下放过程，以增强肌肉耐力和爆发力。",  
"后束三角肌位于肩部后方，是负责肩关节外展和后伸的关键肌肉。为了均衡肩部发展，每周可进行1-2次锻炼，选择反向飞鸟、俯身哑铃侧平举和面拉动作。训练时避免借力，专注于目标肌肉的激活和收缩。",  
"肱三头肌位于上臂后方，是肘关节伸展的主要肌肉。通过每周2次的训练，如窄距卧推、绳索下压和仰卧臂屈伸，可以有效提升肌肉力量和围度。注意肘关节的稳定性，动作全程保持控制以防受伤。",  
"背阔肌是覆盖背部大部分区域的扁平肌肉，负责肩关节的伸展、内收和内旋动作。每周可训练2次，选择引体向上、坐姿划船和杠铃划船等复合动作，同时专注于背部肌肉的收缩感，避免使用过多手臂力量。",  
"臀大肌是人体最大的肌肉，主要负责髋关节的伸展和外旋动作，对提升整体力量和稳定性至关重要。每周锻炼2-3次，选择硬拉、臀桥和深蹲等动作进行针对性强化，注意动作顶峰收缩，确保臀部肌肉的充分激活。",  
"斜方肌中部负责肩胛骨的后缩和稳定，是保持上背部姿势的重要肌肉。建议每周训练1-2次，选择面拉、反向划船和哑铃耸肩等动作，注意肩胛骨的控制，避免使用过多手臂力量。",  
"下背部肌肉包括竖脊肌和多裂肌，是维持脊柱稳定和后伸动作的关键部分。每周训练2次，选择罗马椅挺身、杠铃硬拉和俯身挺背等动作。注意核心收紧，保持脊柱中立位以避免受伤。",  
"腿后肌群由腘绳肌和半腱肌组成，是负责膝关节屈曲和髋关节伸展的重要肌肉群。通过每周2次锻炼，如罗马尼亚硬拉、俯卧腿弯举和箭步蹲，可以有效增强力量和柔韧性。动作时注意腿部控制和下放的缓慢拉伸，以更好地刺激目标肌肉。"]
for i in range(1, 18):
    with open(f'bodypart/json_/{i}.json', 'w', encoding='utf-8') as f:
        data = {}
        data["b_id"] = i
        data['name'] = name_list[i-1]
        data["description"] = info_list[i-1]
        data["img_path"] = f'res/bodypart/img/{i}.jpg'
        data["m_id"] = [1, 2]
        data["e_id"] = [1, 2]
        json.dump(data, f, ensure_ascii=False, indent=4)
    
print(name_list)