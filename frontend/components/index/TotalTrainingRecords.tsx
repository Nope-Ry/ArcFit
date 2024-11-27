import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Dimensions,
  StyleSheet,
  FlatList,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";

import { SafeAreaView } from "react-native-safe-area-context";
import { Text as SvgText } from "react-native-svg";
import { LineChart, Grid, PieChart } from "react-native-svg-charts";
import { MaxEquation } from "three";
import * as shape from "d3-shape";
import { SelectList } from "react-native-dropdown-select-list";
import * as FileSystem from "expo-file-system";
import { data }from "../../app/(tabs)/index";

const firstDay = new Date(
  Math.min(...data.map((item) => new Date(item.date).getTime()))
);

const lastDay = new Date(
  Math.max(...data.map((item) => new Date(item.date).getTime()))
);

const intervalDays =
  Math.floor((lastDay.getTime() - firstDay.getTime()) / (1000 * 60 * 60 * 24)) +
  1;

const { width, height } = Dimensions.get("window");

interface IRecord {}

const interpolate = (array: number[]) => {
  // 找到所有非零点的索引
  const nonZeroIndices = array
    .map((value, index) => (value !== 0 ? index : -1))
    .filter((index) => index !== -1);

  // 如果没有非零点，返回原数组
  if (nonZeroIndices.length === 0) return array;

  // 如果头尾为0，填充它们
  if (nonZeroIndices[0] > 0) {
    // 头部为0
    for (let i = 0; i < nonZeroIndices[0]; i++) {
      array[i] = array[nonZeroIndices[0]];
    }
  }

  if (nonZeroIndices[nonZeroIndices.length - 1] < array.length - 1) {
    // 尾部为0
    for (
      let i = nonZeroIndices[nonZeroIndices.length - 1] + 1;
      i < array.length;
      i++
    ) {
      array[i] = array[nonZeroIndices[nonZeroIndices.length - 1]];
    }
  }

  // 分段线性插值
  for (let i = 0; i < nonZeroIndices.length - 1; i++) {
    const start = nonZeroIndices[i];
    const end = nonZeroIndices[i + 1];
    const startValue = array[start];
    const endValue = array[end];

    // 对于中间的0值进行插值
    for (let j = start + 1; j < end; j++) {
      const t = (j - start) / (end - start); // 计算比例
      array[j] = startValue + t * (endValue - startValue); // 插值公式
    }
  }

  return array;
};

const getTotalTrainingRecords = () => {
  const totalDays = new Set(data.map((item) => item.date));
  const totalDuration = Math.floor(data.reduce((acc, item) => acc + item.duration, 0));
  const avgDuration = Math.floor(totalDuration / totalDays.size);
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
          bodyWeight[index].motions[motionIndex].weight[nowday] = weight;
        } else {
          const weightTrend = new Array(intervalDays).fill(0);
          weightTrend[nowday] = weight;
          bodyWeight[index].motions.push({
            m_id: record.m_id,
            weight: weightTrend,
          });
        }
      });
    });
  });

  // 对每个部位的负重趋势进行插值
  bodyWeight.forEach((item) => {
    item.motions.forEach((motion) => {
      motion.weight = interpolate(motion.weight);
    });
  });
  return bodyWeight;
};

const TotalTrainingRecords: React.FC = () => {
  const totalRecords = getTotalTrainingRecords();
  const bodyWeightTrend = getBodyWeightTrend();
  const [selected, setSelected] = useState("1");

  const days = Array.from({ length: intervalDays }, (_, index) => index + 1);
  return (
    <ScrollView>
      {/* 预卡片总览 */}
      <View style={styles.container}>
        <ThemedText type="defaultBold" style={{ textAlign: "center" }}>
          总统计
        </ThemedText>
        <View style={styles.card}>
          <ThemedText type="default">总训练天数</ThemedText>
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

      {/* 身体部位负重的趋势 */}
      <View style={styles.container}>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
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
          {/* 下拉框 */}
          <View>
            <SelectList
              setSelected={(value) => setSelected(value)}
              data={bodyWeightTrend
                .slice(1)
                .map((item) => ({ key: item.key, value: item.value }))}
              placeholder="选择一个部位"
              boxStyles={styles.motionBox}
              dropdownStyles={styles.dropdown}
              search={false}
              defaultOption={{ key: "1", value: "胸部" }}
            />
          </View>
        </View>
        {/* 对当前选定的bodyWeightTrend[selected]的每个motions都画一个LineChart */}
        <View>
          {bodyWeightTrend[selected].motions.map((motion, index) => (
            <View key={index} style={{ marginVertical: 10 }}>
              <ThemedText type="defaultBold" style={{ textAlign: "center" }}>
              动作ID: {motion.m_id}
              </ThemedText>
              <LineChart
              style={{ height: 200 }}
              data={motion.weight}
              svg={{ stroke: "rgb(134, 65, 244)" }}
              contentInset={{ top: 20, bottom: 20 }}
              curve={shape.curveLinear}
              >
              </LineChart>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
              {days.map((day, index) => (
                <Text key={index} style={{ textAlign: "center", width: `${100 / days.length}%` }}>
                {day}
                </Text>
              ))}
              </View>
            </View>
          ))}
        </View>

      </View>

      {/* 容量统计 */}
      <View style={styles.container}>
        <ThemedText type="defaultBold" style={{ textAlign: "center" }}>
          容量统计
        </ThemedText>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginTop: 10,
  },
  cardContainer: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    backgroundColor: "grey",
  },
  card: {
    width: 100,
    height: 100,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  motionBox: {
    borderColor: "#007bff",
    borderRadius: 8,
    padding: 10,
    width: width * 0.4,
  },
  dropdown: {
    borderColor: "#007bff",
    borderRadius: 8,
  },
});

export default TotalTrainingRecords;
