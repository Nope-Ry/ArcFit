import React, { useState } from "react";
import { View, Modal, Dimensions, StyleSheet } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";

import { Alert } from "react-native";

import { data } from "../../app/(tabs)/profile";

import motionData from "@/res/motion/json/comb.json";

import CustomLineChart from "../statistic/CustomLineChart";
import CustomPieChart from "../statistic/CustomPieChart";
import { Picker } from "@react-native-picker/picker";
const { width, height } = Dimensions.get("window");

const showAlertDuration = (formattedDate, weight) => {
  Alert.alert("继续保持💪", `${formattedDate}的训练时长为${weight}分钟`, [
    { text: "OK" },
  ]);
};

const showAlertWeight = (formattedDate, weight) => {
  Alert.alert("继续努力💪", `${formattedDate}的训练容量为${weight}kg`, [
    { text: "OK" },
  ]);
};

const getWeeklyDay = () => {
  const today = new Date();
  const week = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    week.push(date.toISOString().split("T")[0]);
  }
  return week;
};
const week = getWeeklyDay();
const days = week.map((date) => date.split("-")[2]);

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
    "NULL",
    "胸部",
    "前肩",
    "斜方肌",
    "肱二头肌",
    "前臂",
    "手",
    "腹外斜肌",
    "腹肌",
    "股四头肌",
    "小腿",
    "后肩",
    "肱三头肌",
    "背阔肌",
    "臀部",
    "斜方肌中部",
    "下背",
    "腿后肌",
  ];

  const weights = bodyParts.map((part, index) => ({
    key: index,
    value: part,
    weight: new Array(7).fill(0),
    motions: [],
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
          for (let l = 0; l < b_id.length; l++) {
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
              motions.push({
                m_id: m_id,
                value: reps * weightValue,
                name: motionData[m_id - 1].name,
              });
          }
        }
      }
    }
  }

  return weights;
};

const getPreviousDate = (daysAgo) => {
  const today = new Date();
  const previousDate = new Date(today);
  previousDate.setDate(today.getDate() - daysAgo);
  return previousDate.toISOString().split("T")[0];
};
const WeeklyTrainingRecords = () => {
  const [selected, setSelected] = useState(1);
  const [isModalVisible, setModalVisible] = useState(false);

  const weeklyRecord = getWeeklyTrainingRecords();
  const weeklyBodyRecords = getWeeklyBodyRecords();

  return (
    <ScrollView>
      {/* 训练时长柱状图 */}
      <View style={styles.container}>
        <ThemedText type="defaultBold" style={{ textAlign: "center" }}>
          训练时长(min)
        </ThemedText>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <CustomLineChart
            parameterData={weeklyRecord}
            parameterLabels={days}
            showParameterInfo={(index) => {
              const previousDate = getPreviousDate(6 - index)
                .replace(/-/g, "年")
                .replace(/年(\d{2})$/, "月$1日");
              showAlertDuration(previousDate, weeklyRecord[index]);
            }}
          />
        </View>
      </View>

      {/* 动作统计 */}
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            zIndex: 2,
          }}
        >
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
              onPress={() => setModalVisible(true)}
            >
              <ThemedText type="default" style={{ textAlign: "center" }}>
                {weeklyBodyRecords[selected].value}
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
        <ThemedText type="defaultBold" style={{ textAlign: "center" }}>
          容量统计(kg)
        </ThemedText>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <CustomLineChart
            parameterLabels={days}
            parameterData={weeklyBodyRecords[selected].weight}
            showParameterInfo={(index) => {
              const previousDate = getPreviousDate(6 - index)
                .replace(/-/g, "年")
                .replace(/年(\d{2})$/, "月$1日");
              showAlertWeight(
                previousDate,
                weeklyBodyRecords[selected].weight[index]
              );
            }}
          />
        </View>
        <ThemedText type="defaultBold" style={{ textAlign: "center" }}>
          动作分布
        </ThemedText>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <CustomPieChart
            parameterdata={weeklyBodyRecords[selected].motions.map((item) => ({
              name: item.name,
              value: item.value,
            }))}
          />
        </View>
      </View>
      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <ThemedText type="subtitle" style={{paddingTop: 10}}>选择部位</ThemedText>
            <Picker
                style={{ width: "90%" }}
                selectedValue={selected}
                onValueChange={(itemValue) => setSelected(itemValue)}
                >
                {weeklyBodyRecords.slice(1).map((part, index) => {
                    return <Picker.Item
                        key={index}
                        label={part.value}
                        value={index + 1}
                    />
                })}
            </Picker>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <ThemedText type="defaultBold">确认</ThemedText>
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
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginTop: 10,
    zIndex: 2,
  },
  motionBox: {
    borderColor: "#000000",
    borderRadius: 8,
    padding: 10,
    width: width * 0.3,
    borderWidth: 1,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    width: width * 0.8,
    alignItems: "center",
    paddingBottom: 30,
  },
  modalItem: {
    width: width * 0.4,
    padding: 10,
    margin: 10,
    backgroundColor: "#FFDEAD",
    borderRadius: 5,
    alignItems: "center",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#FFA07A",
    borderRadius: 10,
    width: '85%',
    alignItems: "center",
  },
});

export default WeeklyTrainingRecords;
