import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { ThemedText } from "../ThemedText";
import { Dimensions } from "react-native";
import { data } from "../../app/(tabs)/profile";

import { useGender } from "@/contexts/GenderContext";
import { FrontMaleSimple } from "../body/FrontMaleSimple";
import { BackMaleSimple } from "../body/BackMaleSimple";
import { FrontFemaleSimple } from "../body/FrontFemaleSimple";
import { BackFemaleSimple } from "../body/BackFemaleSimple";

import motionData from "@/res/motion/json/comb.json";
import bodypartData from "@/res/bodypart/json/comb.json";

const map_bodyPart = (group) => {
  const bodyParts = {
    胸部: "chest",
    前肩: "front-shoulders",
    斜方肌: "traps",
    肱二头肌: "biceps",
    前臂: "forearms",
    手: "hands",
    腹外斜肌: "obliques",
    腹肌: "abdominals",
    股四头肌: "quads",
    小腿: "calves",
    后肩: "rear-shoulders",
    肱三头肌: "triceps",
    背阔肌: "lats",
    臀部: "glutes",
    斜方肌中部: "traps-middle",
    下背: "lowerback",
    腿后肌: "hamstrings",
  };
  return bodyParts[group];
};

const getDuration = (date: Date) => {
  const today = date.toISOString().split("T")[0];
  const todayData = data.filter((item) => item.date === today);
  if (todayData.length === 0) {
    return 0;
  }
  const duration = todayData.reduce((acc, item) => acc + item.duration, 0);
  return Math.floor(duration);
};

const getTimes = () => {
  const today = new Date().toISOString().split("T")[0];
  const todayData = data.filter((item) => item.date === today);
  if (todayData.length === 0) {
    return "未开始";
  }
  return todayData[0].time;
};

const getExerciseData = (date: Date) => {
  const today = date.toISOString().split("T")[0];
  const todayData = data.filter((item) => item.date === today);
  const exerciseData = [];
  todayData.forEach((item) => {
    item.records.forEach((record) => {
      exerciseData.push({
        m_id: record.m_id,
      });
    });
  });
  return exerciseData;
};

const { width, height } = Dimensions.get("window");
interface MainRecordProps {
  date: Date;
}
export default function MainRecord({ date }: MainRecordProps) {
  const duration = getDuration(date);
  const times = getTimes();
  const exerciseData = getExerciseData(date);
  const bodyParts = exerciseData.map((item) => motionData[item.m_id - 1].b_id);
  const activeGroup_id = bodyParts
    .flat()
    .filter((item, index, self) => self.indexOf(item) === index);
  const activeGroup = activeGroup_id.map((item) =>
    map_bodyPart(bodypartData[item - 1].name)
  );

  const { isMale } = useGender();
  const color = "#FFF5EE";
  const activeColor = "#FFA07A";
  return (
    <View style={styles.container}>
      {/* 左侧的图像 */}

      {isMale ? (
        <FrontMaleSimple
          color={color}
          activeColor={activeColor}
          activeGroup={activeGroup}
          handleClick={() => {}}
          width={width * 0.35}
          height={height * 0.3}
        />
      ) : (
        <FrontFemaleSimple
          color={color}
          activeColor={activeColor}
          activeGroup={activeGroup}
          handleClick={() => {}}
          width={width * 0.35}
          height={height * 0.3}
        />
      )}

      {/* 中间的锻炼信息 */}
      <View style={styles.infoBoxContainer}>
        <View style={styles.infoBox}>
          <ThemedText type="default">开始时间</ThemedText>
          <ThemedText type="defaultBold">{times}</ThemedText>
        </View>
        <View style={styles.infoBox}>
          <ThemedText type="default">运动时长</ThemedText>
          <ThemedText type="defaultBold">{duration}分钟</ThemedText>
        </View>
      </View>
      {isMale ? (
        <BackMaleSimple
          color={color}
          activeColor={activeColor}
          activeGroup={activeGroup}
          handleClick={() => {}}
          width={width * 0.35}
          height={height * 0.3}
        />
      ) : (
        <BackFemaleSimple
          color={color}
          activeColor={activeColor}
          activeGroup={activeGroup}
          handleClick={() => {}}
          width={width * 0.35}
          height={height * 0.3}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    gap: 30,
  },
  bodyImage: {
    width: width * 0.4,
  },
  infoBoxContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: height * 0.24,
  },
  infoBox: {
    backgroundColor: "#FFFAF0",
    maxWidth: width * 0.2,
    height: height * 0.1,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 10,

    elevation: 3,
    shadowColor: "#8B4513",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
