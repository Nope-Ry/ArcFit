import React, { useState } from "react";
import { View, Modal, Button, Dimensions, StyleSheet, FlatList } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import * as shape from "d3-shape";

import { SafeAreaView } from "react-native-safe-area-context";
import { Text as SvgText } from 'react-native-svg';
import { MaxEquation } from "three";
import { SelectList } from 'react-native-dropdown-select-list';
import { data }from "../../app/(tabs)/index";

import motionData from "@/res/motion/json/comb.json";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
const { width, height } = Dimensions.get("window");

const getWeeklyDay = () => {
    const today = new Date();
    const week = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        week.push(date.toISOString().split('T')[0]);
    }
    return week;
}
const week = getWeeklyDay();
const days = week.map(date => date.split('-')[2]);

const getWeeklyTrainingRecords = () => {
    const Time = new Array(7).fill(0);
    for (let i = 0; i < data.length; i++) {
        const date = data[i].date;
        const duration = data[i].duration;
        const index = week.indexOf(date);
        if (index !== -1) {
            Time[index] = duration;
        }
    }
    return Time;
};

const getWeeklyBodyRecords = () => {
    const bodyParts = [
        'NULL', '胸部', '前肩', '斜方肌', '肱二头肌', '前臂', '手', '腹外斜肌', 
        '腹肌', '股四头肌', '小腿', '后肩', '肱三头肌', '背阔肌', '臀部', 
        '斜方肌中部', '下背', '腿后肌'
    ];

    const weights = bodyParts.map((part, index) => ({
        key: index,
        value: part,
        weight: new Array(7).fill(0),
        motions: []
    }));

    for (let i = 0; i < data.length; i++) {
        const date = data[i].date;
        const index = week.indexOf(date);
        if (index !== -1) {
            const records = data[i].records;
            for (let j = 0; j < records.length; j++) {
                const m_id = records[j].m_id;
                const b_id = records[j].b_id;
                const group = records[j].group;
                for (let k = 0; k < group.length; k++) {
                    const reps = group[k].reps;
                    const weightValue = group[k].weight;
                    for( let l = 0; l < b_id.length; l++) {
                        weights[b_id[l]].weight[index] += reps * weightValue;
                        const motions = weights[b_id[l]].motions;
                        let flag = false;
                        for (let m = 0; m < motions.length; m++) {
                            if (motions[m].m_id === m_id) { 
                                motions[m].value += reps * weightValue;
                                flag = true;
                                break;
                            }
                        }
                        if (!flag) 
                            motions.push({ m_id: m_id, value: reps * weightValue });
                    }
                }
            }
        }
    }
    return weights;
}

const getWeeklyBodyMotion = (weeklyBodyRecords) => {
    const motionsratio = Array.from({ length: 18 }, (_, b_id) => ({ b_id, motions: [] }));
    for (let i = 1; i < weeklyBodyRecords.length; i++) {
        const motionsList = weeklyBodyRecords[i].motions;
        let sum = 0;
        for (let j = 0; j < motionsList.length; j++) 
            sum += motionsList[j].value;
        for (let j = 0; j < motionsList.length; j++) 
            motionsratio[i].motions.push({ m_id: motionsList[j].m_id , value: (motionsList[j].value / sum).toFixed(2) });
    }
    return motionsratio;
}

interface WeeklyTrainingRecordsProps {

}

const WeeklyTrainingRecords: React.FC<WeeklyTrainingRecordsProps> = () => {
    const [selected, setSelected] = useState(1);
    const [isModalVisible, setModalVisible] = useState(false);
    const nowday = new Date();

    const getRandomColor = () => {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    };
    const handlePress = ({ motion }) => {
        // 弹出消息框，显示动作的详细信息和统计数据
        alert(`${motionData[motion.m_id - 1].name}的统计数据，占比：${motion.value}`);
    }
    const rs = () => {
        alert('hello');
    }
    const weeklyRecord = getWeeklyTrainingRecords();
    const weeklyBodyRecords = getWeeklyBodyRecords();

    return (
        <ScrollView>
            {/* 训练时长柱状图 */}
            <View style={styles.container}>
                <ThemedText type="defaultBold" style={{ textAlign: 'center' }}>训练时长（分钟）</ThemedText>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <LineChart
                        data={{
                            labels: days,
                            datasets: [{ data: weeklyRecord }]
                        }}
                        width={width * 0.85}
                        height={220}
                        chartConfig={{
                            backgroundGradientFrom: "#fb8c00",
                            backgroundGradientTo: "#ffa726",
                            color: (opacity) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity) => `rgba(255, 255, 255, ${opacity})`,
                            style: { borderRadius: 16 },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#ffa726"
                            }
                        }}
                        bezier
                        style={{ marginVertical: 8, borderRadius: 16 }}
                        onDataPointClick={({ index }) => alert(`第${index + 1}天训练时长：${weeklyRecord[index]}分钟`)}
                    />
                </View>
            </View>

            {/* 动作统计 */}
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', zIndex: 2}}>
                    <ThemedText type="defaultBold" style={{ textAlign: 'center', width: width * 0.63, alignSelf: 'center' }}>
                        动作统计
                    </ThemedText>
                    <View>
                        <TouchableOpacity
                            style={styles.motionBox}
                            onPress={() => setModalVisible(true)}>
                            <ThemedText type="default">{weeklyBodyRecords[selected].value}</ThemedText> 
                        </TouchableOpacity>
                    </View>
                 </View>
                 <ThemedText type="defaultBold" style={{ textAlign: 'center'}}>容量统计(kg)</ThemedText>
                 <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <LineChart
                        data={{
                            labels: days,
                            datasets: [{ data: weeklyBodyRecords[selected].weight }]
                        }}
                        width={width * 0.85}
                        height={220}
                        chartConfig={{
                            backgroundGradientFrom: "#fb8c00",
                            backgroundGradientTo: "#ffa726",
                            color: (opacity) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity) => `rgba(255, 255, 255, ${opacity})`,
                            style: { borderRadius: 16 },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#ffa726"
                            }
                        }}
                        bezier
                        style={{ marginVertical: 8, borderRadius: 16 }}
                        onDataPointClick={({ index }) => alert(`${days[index]}号训练容量：${weeklyBodyRecords[selected].weight[index]}kg`)}
                    />
                 </View>
                 <ThemedText type="defaultBold" style={{ textAlign: 'center' }}>动作分布</ThemedText>
                 <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <PieChart
                        data={weeklyBodyRecords[selected].motions.map(motion => ({
                            name: motionData[motion.m_id - 1].name,
                            value: parseFloat(motion.value),
                            color: getRandomColor(),
                            legendFontColor: "#7F7F7F",
                            legendFontSize: 15
                        }))}
                        width={width * 0.85}
                        height={220}
                        chartConfig={{
                            backgroundGradientFrom: "#fb8c00",
                            backgroundGradientTo: "#ffa726",
                            color: (opacity) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity) => `rgba(255, 255, 255, ${opacity})`,
                            style: { borderRadius: 16 },
                        }}
                        accessor="value" 
                        backgroundColor="transparent"
                        paddingLeft="0"
                        absolute={false}
                    />
                </View>
            </View>
            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <ThemedText type="defaultBold">选择一个部位</ThemedText>
                        <ScrollView>
                            {weeklyBodyRecords.slice(1).map((part, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.modalItem}
                                    onPress={() => {
                                        setSelected(index + 1);
                                        setModalVisible(false);
                                    }}>
                                    <ThemedText type="default">{part.value}</ThemedText>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}>
                            <ThemedText type="defaultBold">关闭</ThemedText>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
        
        
    );

};

const styles = StyleSheet.create({
    container: { 
        width: width * 0.9,
        padding: 20, 
        backgroundColor: '555555', 
        borderRadius: 10, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.2, 
        shadowRadius: 2,
        marginTop: 10,
        zIndex: 2,
    },
    motionBox: {
        borderColor: '#007bff',
        borderRadius: 8,
        padding: 10,
        width: width * 0.3,
    },
    dropdown: {
        borderColor: "#007bff",
        borderRadius: 8,
        top: 40,
        zIndex: 2,
        position: "absolute",
        backgroundColor: '#f5f5f5',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContainer: {
        height: height * 0.6,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: 250,
        alignItems: 'center',
      },
      modalItem: {
        padding: 10,
        margin: 5,
        backgroundColor: '#ddd',
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
      },
      closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#ff5733',
        borderRadius: 5,
      },
});

export default WeeklyTrainingRecords;