
import json


name_list = []
info_list = [
    "平板杠铃卧推是一个经典的胸部训练动作，关键要点包括确保肩胛骨回收和稳定，双脚踩实地面，采用全程动作进行发力，主要训练胸大肌，同时辅助训练三角肌前束和肱三头肌。",
    "史密斯上斜卧推主要刺激上胸部肌群，动作中需要调整适当的上斜角度，控制下放速度，推动时保持肘部稳定，训练核心部位为胸大肌上束和肩部前束。",
    "史密斯平板卧推通过固定轨迹减少动作控制难度，关键是避免锁死关节，保持胸肌持续张力，目标部位为胸大肌中部，同时激活肱三头肌。",
    "上斜杠铃卧推强调胸大肌上束的激活，需注意动作控制，避免过度借力，保持下放和推起过程的稳定与连续性，训练核心部位为胸大肌上部和三角肌前束。",
    "仰卧哑铃飞鸟是一个胸部孤立动作，需保持肘关节微屈，双手向两侧打开至胸肌拉伸后再合拢，训练重点是胸大肌中部并辅助拉伸胸部肌肉。",
    "哑铃平板卧推灵活性较高，能均衡左右肌肉力量，需注意动作的轨迹稳定和哑铃的握持角度，训练目标是胸大肌中部以及肩部和肱三头肌。",
    "上斜哑铃飞鸟针对胸肌上部孤立训练，关键在于控制哑铃下放幅度，避免借力，动作连贯且肌肉发力集中，目标是激活胸大肌上部。",
    "上斜哑铃卧推通过哑铃的自由轨迹增加肌肉参与度，注意保持手腕稳定，推动时肘关节保持自然弯曲，主要训练胸大肌上部和肩部肌群。",
    "斯万推胸是一个模拟杠铃卧推的器械动作，轨迹固定且稳定，需调整座椅高度确保推胸角度合适，目标训练胸大肌和三角肌前束。",
    "蝴蝶机夹胸能够有效孤立胸大肌，双臂夹合时注意保持胸肌收缩感并缓慢还原，训练核心为胸大肌中部并增强胸肌轮廓感。",
    "器械推胸通过稳定的轨迹减少动作难度，需保持背部贴实座椅，推动时不完全锁死肘部，主要训练胸大肌，同时激活肩部和肱三头肌。",
    "绳索夹胸提供了更灵活的轨迹选择，动作需确保手臂呈弧形夹合并感受胸肌挤压，目标训练胸大肌中部和内侧。",
    "上胸绳索夹胸强调胸大肌上部的收缩，双手需沿斜向上轨迹夹合，注意保持动作的流畅性，训练核心为胸大肌上部。",
    "下斜绳索飞鸟通过独特的角度刺激胸大肌下部，需稳定站姿控制动作轨迹，目标训练胸大肌下部并辅助提升胸肌轮廓。",
    "双杠臂屈伸主要以体重为阻力训练胸肌和肱三头肌，需保持躯干前倾角度以更多激活胸大肌，适当控制下降深度。",
    "引体向上是一个经典的背部训练动作，需保持肩胛骨回收，避免借力摇晃，动作目标为背阔肌、菱形肌以及二头肌。",
    "坐姿划船强调背部肌群的厚度，需保持背部挺直，肩胛骨夹紧，训练核心为背阔肌、菱形肌和斜方肌。",
    "俯身杠铃划船增强背部厚度，动作中需确保腰背挺直，双肩下放拉伸背部后再夹紧肩胛骨，训练核心为背阔肌和斜方肌。",
    "V把高位下拉适合背阔肌中部训练，需保持躯干稳定，双手夹紧拉杆并感受背部发力，目标部位为背阔肌、斜方肌和肱二头肌。",
    "T杠划船强调背部厚度和核心力量，需保持躯干前倾稳定发力，训练目标为背阔肌和斜方肌，同时辅助增强握力。",
    "史密斯俯身划船通过固定轨迹稳定背部训练，需注意腰背挺直，肩胛骨收缩，训练核心为背阔肌和菱形肌。",
    "反握高位下拉更多激活背部中下部位，动作中需避免肘部内收过度，保持背阔肌拉伸和收缩，目标是背阔肌中部和肱二头肌。",
    "直臂绳索下拉强调背部肌群孤立发力，需保持手臂微弯，双手向下拉至髋部位置，训练目标为背阔肌下部。",
    "坐姿器械划船通过稳定的轨迹集中背部训练，需保持坐姿挺直，肩胛骨回收，目标部位为背阔肌和菱形肌。",
    "上斜俯身哑铃划船通过独特的角度训练背部和核心，需稳定俯身姿势，控制哑铃轨迹，训练核心为背阔肌和下背部。",
    "高位下拉是背部训练的基础动作，需保持肩胛骨回收和躯干稳定，目标为背阔肌上部和中部。",
    "单臂哑铃划船强调背部肌群的单侧训练，需保持躯干稳定，避免借力扭转，目标是背阔肌和斜方肌。",
    "绳索俯身划船通过独特的角度强化背部肌群，需稳定俯身姿势，控制绳索轨迹，目标是背阔肌和下背部。",
    "背屈伸强调下背部力量，需保持躯干稳定并避免过度反弓，训练目标为竖脊肌、臀大肌和腿后肌群。",
    "直腿硬拉是腿后部和臀部的复合训练动作，需保持脊柱中立，髋关节主导动作，目标训练腿后肌群和臀大肌。",
    "坐姿卷腹是腹部核心训练的经典动作，需保持髋关节稳定并专注腹肌收缩，目标是腹直肌。",
    "杠铃深蹲是全身力量训练的基础动作，需保持核心收紧、背部挺直，主要训练股四头肌、臀大肌和竖脊肌。",
    "保加利亚分腿蹲是一种单侧腿部力量训练，需保持上身稳定，后脚轻轻搭在凳子上，主要训练股四头肌、臀大肌和腿后肌群。",
    "泽奇深蹲通过前置杠铃刺激腿部和核心，需保持胸部抬高和背部挺直，主要训练股四头肌、臀大肌和竖脊肌。",
    "直腿硬拉是针对腿后肌群和臀部的孤立训练，需保持脊柱中立和髋关节主导动作，目标是腿后肌群和臀大肌。",
    "坐姿腿弯举是一种针对腿后肌群的孤立训练，需控制动作节奏，保持膝盖稳定，目标是腘绳肌。",
    "坐姿腿屈伸主要针对股四头肌，需调整座椅角度确保膝盖轴线对齐，动作过程中保持匀速发力，目标是股四头肌。",
    "倒蹬是一种腿部力量训练，需调整座椅位置确保动作角度适当，推动时注意脚尖和膝盖方向一致，目标是股四头肌、臀大肌和腿后肌群。",
    "悬垂卷腹是一种针对下腹部的核心训练，需控制腿部摆动并专注腹肌发力，目标是腹直肌和髂腰肌。",
    "绳索卷腹通过阻力增强腹部训练，需保持膝盖稳定，专注腹肌卷缩动作，目标是腹直肌和腹内外斜肌。",
    "俄罗斯转体主要训练腹部旋转力量，需保持核心收紧和动作幅度适当，目标是腹内外斜肌和腹直肌。",
    "平板支撑是一种全身核心训练，需保持脊柱中立和肩部稳定，主要训练腹横肌、竖脊肌和肩胛稳定肌。",
    "下斜反向卷腹强调下腹部肌群，需保持动作控制避免借力摆动，主要训练腹直肌下部和髂腰肌。",
    "下斜卷腹是腹部孤立训练，需保持下背部贴合凳面并专注腹肌收缩，目标是腹直肌。",
    "哈克深蹲通过机器固定轨迹增加腿部训练强度，需调整角度确保膝盖与脚尖方向一致，目标是股四头肌和臀大肌。",
    "腿外展是臀部侧向肌群的孤立训练，需保持上身稳定并控制动作节奏，目标是臀中肌和臀小肌。",
    "腿内收是一种内收肌孤立训练，需控制动作幅度和节奏，目标是内收大肌群。",
    "哑铃后弓步是一种灵活的单侧腿部训练，需保持膝盖与脚尖方向一致，主要训练股四头肌、臀大肌和腿后肌群。",
    "哑铃箭步蹲是一种复合腿部训练，需保持躯干稳定并控制动作幅度，目标是股四头肌、臀大肌和腿后肌群。",
    "相扑硬拉通过宽站姿强化腿部和臀部力量，需保持背部挺直，髋关节主导发力，目标是臀大肌、股内侧肌和腿后肌群。",
    "杠铃深蹲通过大范围动作增强下肢力量，需保持核心收紧和背部挺直，主要训练股四头肌、臀大肌和竖脊肌。",
    "罗马尼亚硬拉强调腿后肌群和臀部的孤立训练，需保持脊柱中立，动作过程中专注髋关节发力，目标是腿后肌群和臀大肌。",
    "硬拉是一种全身力量训练动作，需保持脊柱中立和动作稳定，目标是臀大肌、腿后肌群和竖脊肌。",
    "单腿弯举是一种腘绳肌的孤立训练，需专注单腿发力并保持控制，目标是腿后肌群。",
    "坐姿腿举是一种腿部训练器械动作，需确保动作轨迹正确，膝盖方向与脚尖一致，目标是股四头肌、臀大肌和腿后肌群。",
    "坐姿提踵针对小腿肌群的训练，需保持膝盖稳定并专注脚尖发力，目标是腓肠肌和比目鱼肌。",
    "提踵是一种小腿力量训练，需保持膝关节稳定并专注踝关节发力，目标是腓肠肌和比目鱼肌。",
    "臀推是一个针对臀部的孤立训练，需保持核心收紧，髋关节向上推至完全收缩，目标是臀大肌。",
    "臀桥通过自重或负重激活臀部肌群，需保持脊柱中立和臀部发力，目标是臀大肌和腿后肌群。",
    "相扑深蹲通过宽站姿强化臀部和腿部肌群，需保持动作稳定并专注髋关节发力，目标是臀大肌和腿后肌群。",
    "史密斯机推肩通过稳定轨迹训练肩部力量，需保持核心收紧和肩部发力，目标是三角肌和斜方肌。",
    "坐姿杠铃推肩是一种肩部力量训练，需保持脊柱挺直，推动时专注肩部发力，目标是三角肌和斜方肌。",
    "杠铃片前平举是一种前肩孤立训练，需保持动作控制，避免借力，目标是三角肌前束。",
    "绳索交叉侧平举是针对侧肩的孤立训练，需控制动作轨迹并保持稳定发力，目标是三角肌中束。",
    "推肩器推肩通过固定轨迹增强肩部训练稳定性，需调整座椅确保肩部位置正确，目标是三角肌和斜方肌。",
    "器械后飞鸟是针对后肩孤立的训练，需保持动作轨迹稳定并专注肩部发力，目标是三角肌后束。",
    "哑铃推举是一种肩部力量训练，需保持动作轨迹稳定和核心收紧，目标是三角肌和斜方肌。",
    "面拉是一种强化肩部和上背部的动作，需保持双手向脸部拉动并夹紧肩胛骨，目标是三角肌后束和斜方肌。",
    "哑铃侧平举通过外展手臂刺激肩部，需控制动作轨迹避免借力，目标是三角肌中束。",
    "哑铃前平举通过前向举起刺激肩部，需保持动作稳定避免摆动，目标是三角肌前束。",
    "上斜俯卧哑铃侧平举是后肩训练动作，需保持俯身姿势并控制哑铃轨迹，目标是三角肌后束。",
    "绳索侧平举通过外展手臂增强侧肩训练，需保持动作控制和肩部稳定，目标是三角肌中束。",
    "俯身交叉绳索飞鸟通过独特角度训练后肩，需保持动作轨迹稳定并专注发力，目标是三角肌后束。",
    "俯身哑铃侧平举是后肩孤立训练，需保持动作连贯并专注肩部发力，目标是三角肌后束。",
    "直立划船是一种肩部和斜方肌训练，需保持杠铃轨迹靠近身体并专注发力，目标是斜方肌和三角肌前束。",
    "杠铃牧师凳弯举是一种肱二头肌孤立训练，需保持手臂稳定并专注肱二头肌收缩，目标是肱二头肌。",
    "锤式弯举是一种前臂和肱二头肌训练，需保持动作稳定，避免肩部借力，目标是肱二头肌和肱桡肌。",
    "站姿曲杆弯举通过曲杆减少手腕压力，需保持核心稳定并专注二头肌发力，目标是肱二头肌。",
    "站姿绳索弯举通过绳索增加阻力角度灵活性，需保持动作轨迹稳定，目标是肱二头肌。",
    "哑铃弯举是一种自由度高的二头肌训练，需控制哑铃轨迹并保持手臂发力，目标是肱二头肌。",
    "双杠臂屈伸是一种针对肱三头肌的复合动作，需保持身体稳定，下放至肘关节90度再推起，目标是肱三头肌、胸大肌和前锯肌。",
    "器械臂屈伸通过固定轨迹强化肱三头肌，需专注手臂发力并避免肩膀参与，目标是肱三头肌。",
    "平凳臂屈伸是一种利用体重训练肱三头肌的动作，需保持背部接近凳面并控制动作幅度，目标是肱三头肌和胸大肌下部。",
    "坐姿肱三头肌推举是一种头顶过肩的孤立训练，需保持肘部固定并专注肱三头肌发力，目标是肱三头肌。",
    "站姿绳索下压通过增加阻力强化肱三头肌，需保持肘关节稳定，动作下压至完全伸展，目标是肱三头肌。",
    "肱三头肌下压是绳索训练的一种，需保持身体稳定和肘部贴近身体，目标是肱三头肌。",
    "哑铃俯身臂屈伸通过俯身姿势孤立肱三头肌，需保持上臂与躯干平行，动作控制在肘关节，目标是肱三头肌。",
    "绳索过顶臂屈伸是增强肱三头肌耐力的动作，需保持背部挺直和动作流畅，目标是肱三头肌。",
    "站姿绳索交叉臂屈伸利用对角绳索强化肱三头肌，需控制动作轨迹并避免身体摆动，目标是肱三头肌。",
    "哑铃手腕弯举通过手腕卷曲强化前臂，需保持动作稳定并控制节奏，目标是前臂屈肌群。",
    "反握杠铃手腕弯举是前臂孤立训练，需保持动作流畅避免借力，目标是前臂伸肌群。"
]
for i in range(1, 92):
    with open(f'motion/json/{i}.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
        data['img_path'] = f'res/motion/img/{i}.gif'
        data["m_id"] = i
        data["info"] = info_list[i-1]
        name_list.append(data['name'])
    with open(f'motion/json/{i}.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
        name_list.append(data['name'])
        data['img_path'] = f'res/equipment/img/{i}.jpg'

    
print(name_list)