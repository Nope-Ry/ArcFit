import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Dimensions,
  StyleSheet,
  FlatList,
} from "react-native";
import { ScrollView, TouchableOpacity, Modal } from "react-native";
import { ThemedText } from "@/components/ThemedText";

import { SafeAreaView } from "react-native-safe-area-context";
import { Text as SvgText } from "react-native-svg";
import { LineChart, Grid, PieChart, YAxis } from "react-native-svg-charts";
import { MaxEquation } from "three";
import * as shape from "d3-shape";
import { SelectList } from "react-native-dropdown-select-list";
import * as FileSystem from "expo-file-system";
import { data }from "../../app/(tabs)/profile";

import CustomLineChart from "../statistic/CustomLineChart";

import motionData from "@/res/motion/json/comb.json";


const { width, height } = Dimensions.get("window");

let firstDay: Date;
let lastDay: Date;
let intervalDays: number;

interface IRecord {}


const getTotalTrainingRecords = () => {
  const totalDays = new Set(data.map((item) => item.date));
  const totalDuration = Math.floor(data.reduce((acc, item) => acc + item.duration, 0));
  const avgDuration = Math.floor(totalDuration / totalDays.size);
  if (isNaN(avgDuration)) {
    return {
      totalDays: 0,
      totalDuration: 0,
      avgDuration: 0,
    };
  }
  return {
    totalDays: totalDays.size,
    totalDuration,
    avgDuration,
  };
};
const getBodyWeightTrend = () => {
    const bodyParts = [
      'NULL', '胸部', '前肩', '斜方肌', '肱二头肌', '前臂', '手', '腹外斜肌', 
      '腹肌', '股四头肌', '小腿', '后肩', '肱三头肌', '背阔肌', '臀部', 
      '斜方肌中部', '下背', '腿后肌'
  ];

  const bodyWeight = bodyParts.map((part, index) => ({
      key: index,
      value: part,
      motions: []
  }));
  firstDay = new Date(
    Math.min(...data.map((item) => new Date(item.date).getTime()))
  );

  lastDay = new Date(
    Math.max(...data.map((item) => new Date(item.date).getTime()))
  );

  intervalDays =
    Math.floor((lastDay.getTime() - firstDay.getTime()) / (1000 * 60 * 60 * 24)) +
    1;

  data.forEach((item) => {
    item.records.forEach((record) => {
      const weight = Math.max(...record.group.map((set) => set.weight));
      const nowday =
        Math.floor(
          (new Date(item.date).getTime() - firstDay.getTime()) /
            (1000 * 60 * 60 * 24)
        ) + 1;
      record.b_id.forEach((b_id) => {
        const index = bodyWeight.findIndex((item) => item.key === b_id);
        const motionIndex = bodyWeight[index].motions.findIndex(
          (motion) => motion.m_id === record.m_id
        );
        if (motionIndex !== -1) {
          const dayIndex = bodyWeight[index].motions[motionIndex].days.indexOf(nowday);
          if (dayIndex !== -1) {
            bodyWeight[index].motions[motionIndex].weight[dayIndex] = Math.max(bodyWeight[index].motions[motionIndex].weight[dayIndex], weight);
          } else {
            bodyWeight[index].motions[motionIndex].days.push(nowday);
            bodyWeight[index].motions[motionIndex].weight.push(weight);
          }
        } else {
          bodyWeight[index].motions.push({
            m_id: record.m_id,
            days: [nowday],
            weight: [weight],
          });
        }
      });
    });
  });
  // 要对每个motions按照days进行排序
  bodyWeight.forEach((part) => {
    part.motions.forEach((motion) => {
      const sorted = motion.days.map((day, index) => ({ day, weight: motion.weight[index] })).sort((a, b) => a.day - b.day);
      motion.days = sorted.map((item) => item.day);
      motion.weight = sorted.map((item) => item.weight);
    });
  });
  return bodyWeight;
};

const TotalTrainingRecords = () => {
  const totalRecords = getTotalTrainingRecords();
  const bodyWeightTrend = getBodyWeightTrend();
  const [selected, setSelected] = useState(1);
  const [isModalVisible, setModalVisible] = useState(false);

  return( 
    <ScrollView>
      {/* 预卡片总览 */}
      <View style={styles.container}>
        <ThemedText type="defaultBold" style={{ textAlign: "center", marginBottom: 10 }}>
          总统计
        </ThemedText>
        <View style={styles.totalcontainer}>
          <View style={styles.card}>
            <ThemedText type="default">总训练次数</ThemedText>
            <ThemedText type="default">{totalRecords.totalDays}</ThemedText>
          </View>
          <View style={styles.card}>
            <ThemedText type="default">总训练时长</ThemedText>
            <ThemedText type="default">
              {totalRecords.totalDuration}mins
            </ThemedText>
          </View>
          <View style={styles.card}>
            <ThemedText type="default">平均每次训练</ThemedText>
            <ThemedText type="default">{totalRecords.avgDuration}mins</ThemedText>
          </View>
        </View>
      </View>

      <View style={styles.container}>
        <View style={{ flexDirection: "row", justifyContent: "space-around", zIndex: 2 }}>
          <ThemedText
            type="defaultBold"
            style={{
              textAlign: "center",
              width: width * 0.63,
              alignSelf: "center",
            }}
          >
            动作统计
          </ThemedText>
          <View>
            <TouchableOpacity
              style={styles.motionBox}
              onPress={() => setModalVisible(true)}>
                <ThemedText type="default" style={{ textAlign: "center" }}>{bodyWeightTrend[selected].value}</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          {bodyWeightTrend[selected].motions.map((motion, index) => (
            <View key={index}>
              <ThemedText type="defaultBold" style={{ textAlign: "center" }}>{motionData[motion.m_id - 1].name}</ThemedText>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <CustomLineChart
                  parameterLabels={motion.days}
                  parameterData={motion.weight}
                  showParameterInfo={(index) => {
                    alert(`第${index + 1}天的容量为${motion.weight[index]}kg`);
                  }}
                  parameterunit="kg"
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <ThemedText type="defaultBold">选择一个部位</ThemedText>
            <ScrollView>
              {bodyWeightTrend.slice(1).map((part, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.modalItem}
                  onPress={() => {
                    setSelected(index + 1);
                    setModalVisible(false);
                  }}
                >
                  <ThemedText type="default">{part.value}</ThemedText>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <ThemedText type="defaultBold">关闭</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  totalcontainer: {
    flexDirection: "row", 
    justifyContent: "space-between", 
  },
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
    zIndex: 2,
  },
  card: {
    width: width * 0.25,
    height: height * 0.1,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  motionBox: {
    borderColor: "#007bff",
    borderRadius: 8,
    padding: 10,
    width: width * 0.3,
    borderWidth: 1,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    height: height * 0.65,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: width * 0.8,
    alignItems: 'center',
  },
  modalItem: {
    width: width * 0.4,
    padding: 10,
    margin: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ff5733',
    borderRadius: 5,
    width: width * 0.5,
    alignItems: 'center',
  },
});

export default TotalTrainingRecords;
