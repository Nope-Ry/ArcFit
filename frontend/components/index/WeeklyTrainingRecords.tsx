import React, { useState } from "react";
import { View, Text, Button, Dimensions, StyleSheet, FlatList } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";

import { SafeAreaView } from "react-native-safe-area-context";
import { Text as SvgText } from 'react-native-svg';
import { LineChart, Grid } from 'react-native-svg-charts';
import { MaxEquation } from "three";

const { width, height } = Dimensions.get("window");

interface WeeklyTrainingRecordsProps {
    weeklyDuration: number[];
}
const WeeklyTrainingRecords: React.FC<WeeklyTrainingRecordsProps> = ({weeklyDuration}) => {
    weeklyDuration = [20, 40, 50, 30, 60, 70, 80];

    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState("胸部");
    const body = [
        "胸部","背部","腿部","肩部","手臂","核心"
    ];
  
    const toggleDropdown = () => {
      setDropdownVisible(!isDropdownVisible);
    };
  
    const selectMonth = (month) => {
      setSelectedMonth(month);
      setDropdownVisible(false);
    };

    return (
        <View>
            {/* 训练时长柱状图 */}
            <View style={styles.traintimeContainer}>
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
            <View style={styles.actionStatsContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <ThemedText type="defaultBold" style={{ textAlign: 'center' }}>
                        动作统计
                    </ThemedText>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={toggleDropdown}
                    >
                        <ThemedText type="default">
                        {selectedMonth} {isDropdownVisible ? "▲" : "▼"}
                        </ThemedText>
                        {isDropdownVisible && (
                            <View style={[styles.dropdown]}>
                                <FlatList
                                    data={body}
                                    keyExtractor={(item) => item}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={styles.dropdownItem}
                                            onPress={() => selectMonth(item)}
                                        >
                                            <ThemedText type="default">
                                                {item}
                                            </ThemedText>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        )}
                    </TouchableOpacity>
                 </View>
            </View>

            {/* 放一个白块*/}

        </View>
    );

};

const styles = StyleSheet.create({
    traintimeContainer: { 
        height: height * 0.35, 
        padding: 20, 
        backgroundColor: '#f5f5f5', 
        borderRadius: 10, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.2, 
        shadowRadius: 2 
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
        backgroundColor: 'white', 
        borderRadius: 10, 
        marginHorizontal: 5, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.2, 
        shadowRadius: 2 
    },
    button: { 
        position: 'absolute',
        right: 0,
        width: width * 0.25,
        backgroundColor: 'white', 
        borderRadius: 10, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    dropdown: { 
        backgroundColor: 'white',  
        borderRadius: 10, 
        marginTop: 10 
    },
    dropdownItem: { 
        padding: 10, 
        borderBottomWidth: 1, 
        borderBottomColor: '#ddd' 
    }
});

export default WeeklyTrainingRecords;