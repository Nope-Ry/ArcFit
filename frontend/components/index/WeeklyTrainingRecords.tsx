import React, { useState } from "react";
import { View, Text, Button, Dimensions, StyleSheet, FlatList } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";

import { SafeAreaView } from "react-native-safe-area-context";
import { Text as SvgText } from 'react-native-svg';
import { LineChart, Grid, PieChart } from 'react-native-svg-charts';
import { MaxEquation } from "three";
import { SelectList } from 'react-native-dropdown-select-list';

const { width, height } = Dimensions.get("window");

interface WeeklyTrainingRecordsProps {
    weeklyDuration: number[];
}
const WeeklyTrainingRecords: React.FC<WeeklyTrainingRecordsProps> = ({weeklyDuration}) => {
    weeklyDuration = [20, 40, 50, 30, 60, 70, 80];

    const [selected, setSelected] = useState('');

    const options = [
      { key: 'chest', value: '胸部' },
      { key: 'back', value: '背部' },
      { key: 'legs', value: '腿部' },
      { key: 'shoulders', value: '肩部' },
      { key: 'arms', value: '手臂' },
      { key: 'core', value: '核心' },
    ];

    const motions = [
        { key: '高位下拉', value: '30%'},
        { key: '硬拉', value: '40%'},
        { key: '深蹲', value: '30%'},
    ];

    const getRandomColor = () => {
        return `#${Math.floor(Math.random()*16777215).toString(16)}`;
    };

    return (
        <ScrollView style={{padding: 10}}>
            {/* 训练时长柱状图 */}
            <View style={styles.container}>
                <ThemedText type="defaultBold" style={{ textAlign: 'center' }}>训练时长（分钟）</ThemedText>
                <LineChart
                    style={{ height: 200 }}
                    data={weeklyDuration}
                    svg={{ stroke: 'rgba(134, 65, 244, 0.8)', strokeWidth: 2 }}
                    contentInset={{ top: 10, bottom: 10 }}
                    gridMin={0}
                    gridMax={Math.max(...weeklyDuration) + 20}
                />
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
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
                            setSelected={(val) => setSelected(val)}
                            data={options}
                            placeholder="选择一个部位"
                            boxStyles={styles.motionBox}
                            dropdownStyles={styles.dropdown} // 下拉框样式
                            search={false}
                            defaultOption={{ key: 'chest', value: '胸部' }}
                        />
                    </View>
                 </View>
                 <ThemedText type="defaultBold" style={{ textAlign: 'center'}}>
                        训练时长（分钟）
                </ThemedText>
                 <LineChart
                    style={{ height: 200 }}
                    data={weeklyDuration}
                    svg={{ stroke: 'rgba(134, 65, 244, 0.8)', strokeWidth: 2 }}
                    contentInset={{ top: 10, bottom: 10 }}
                    gridMin={0}
                    gridMax={Math.max(...weeklyDuration) + 20}
                />
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                    <ThemedText type="default" key={index} style={{ textAlign: 'center', width: `${100 / 7}%`}}>{day}</ThemedText>
                    ))}
                </View>
                <ThemedText type="defaultBold" style={{ textAlign: 'center'}}>
                        负重(kg)
                </ThemedText>
                 <LineChart
                    style={{ height: 200 }}
                    data={weeklyDuration}
                    svg={{ stroke: 'rgba(134, 65, 244, 0.8)', strokeWidth: 2 }}
                    contentInset={{ top: 10, bottom: 10 }}
                    gridMin={0}
                    gridMax={Math.max(...weeklyDuration) + 20}
                />
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                    <ThemedText type="default" key={index} style={{ textAlign: 'center', width: `${100 / 7}%`}}>{day}</ThemedText>
                    ))}
                </View>
                <ThemedText type="defaultBold" style={{ textAlign: 'center' }}>动作分布</ThemedText>
                <PieChart
                    style={{ height: 200 }}
                    valueAccessor={({ item }) => item.value}
                    data={motions.map(motion => ({
                        key: motion.key,
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
        width: width * 0.25,
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