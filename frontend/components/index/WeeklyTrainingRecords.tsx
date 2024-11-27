import React, { useState } from "react";
import { View, Text, Button, Dimensions, StyleSheet, FlatList } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import * as shape from "d3-shape";

import { SafeAreaView } from "react-native-safe-area-context";
import { Text as SvgText } from 'react-native-svg';
import { LineChart, Grid, PieChart } from 'react-native-svg-charts';
import { MaxEquation } from "three";
import { SelectList } from 'react-native-dropdown-select-list';
import { data }from "../../app/(tabs)/index";


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

    const [selected, setSelected] = useState('1');

    const getRandomColor = () => {
        return `#${Math.floor(Math.random()*16777215).toString(16)}`;
    };

    const weeklyRecord = getWeeklyTrainingRecords();
    const weeklyBodyRecords = getWeeklyBodyRecords();
    const weeklyBodyMotion = getWeeklyBodyMotion(weeklyBodyRecords);

    return (
        <ScrollView style={{padding: 10}}>
            {/* 训练时长柱状图 */}
            <View style={styles.container}>
                <ThemedText type="defaultBold" style={{ textAlign: 'center' }}>训练时长（分钟）</ThemedText>
                <LineChart
                    style={{ height: 200 }}
                    data={weeklyRecord}
                    svg={{ stroke: 'rgba(134, 65, 244, 0.8)', strokeWidth: 2 }}
                    contentInset={{ top: 10, bottom: 10 }}
                    gridMin={0}
                    gridMax={Math.max(...weeklyRecord) + 20}
                />
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    {days.map((day, index) => (
                    <ThemedText type="default" key={index} style={{ textAlign: 'center', width: `${100 / 7}%`}}>{day}</ThemedText>
                    ))}
                </View>
            </View>

            {/* 动作统计 */}
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <ThemedText type="defaultBold" style={{ textAlign: 'center', width: width * 0.63, alignSelf: 'center' }}>
                        动作统计
                    </ThemedText>
                    {/* 下拉框 */}
                    <View>
                        <SelectList
                            setSelected={(value) => setSelected(value)}
                            data={weeklyBodyRecords.slice(1).map(item => ({ key: item.key, value: item.value }))}
                            placeholder="选择一个部位"
                            boxStyles={styles.motionBox}
                            dropdownStyles={styles.dropdown} 
                            search={false}
                            defaultOption={{ key: '1', value: '胸部' }}
                        />
                    </View>
                 </View>
                <ThemedText type="defaultBold" style={{ textAlign: 'center'}}>
                        负重(kg)
                </ThemedText>
                 <LineChart
                    style={{ height: 200 }}
                    data={weeklyBodyRecords[selected].weight} 
                    svg={{ stroke: 'rgba(134, 65, 244, 0.8)', strokeWidth: 2 }}
                    contentInset={{ top: 10, bottom: 10 }}
                    gridMin={0}
                    gridMax={Math.max(...weeklyBodyRecords[selected].weight) + 20}
                />
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    {days.map((day, index) => (
                    <ThemedText type="default" key={index} style={{ textAlign: 'center', width: `${100 / 7}%`}}>{day}</ThemedText>
                    ))}
                </View>
                <ThemedText type="defaultBold" style={{ textAlign: 'center' }}>动作分布</ThemedText>
                <PieChart
                    style={{ height: 200 }}
                    data={weeklyBodyMotion[selected].motions.map(motion => ({
                        key: motion.m_id,
                        value: parseFloat(motion.value),
                        svg: { fill: getRandomColor() },
                    }))} 
                    outerRadius={ width * 0.25 }
                >
                </PieChart>
            </View>

            {/* 容量统计 */}
            <View style={styles.container}>
                <ThemedText type="defaultBold" style={{ textAlign: 'center' }}>容量统计</ThemedText>
            </View>
        </ScrollView>
    );

};

const styles = StyleSheet.create({
    container: { 
        width: width * 0.9,
        padding: 20, 
        backgroundColor: '#f5f5f5', 
        borderRadius: 10, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.2, 
        shadowRadius: 2,
        marginTop: 10,
    },
    actionStatsContainer: { 
        padding: 20, 
        backgroundColor: '#f5f5f5', 
        borderRadius: 10, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.2, 
        shadowRadius: 2, 
        marginTop: 20,
    },
    actionCard: { 
        width: width * 0.3, 
        padding: 10, 
        borderRadius: 10, 
        marginHorizontal: 5, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.2, 
        shadowRadius: 2 
    },
    motionBox: {
        borderColor: '#007bff',
        borderRadius: 8,
        padding: 10,
        width: width * 0.3,
    },
    dropdown: {
        borderColor: '#007bff',
        borderRadius: 8,
    },
    pieChartContainer: { 
        height: height * 0.35, 
        padding: 10, 
        backgroundColor: '#f5f5f5', 
        borderRadius: 10, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.2, 
        shadowRadius: 2, 
        marginTop: 20 
    },
});

export default WeeklyTrainingRecords;