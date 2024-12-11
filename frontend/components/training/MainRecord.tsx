import React from "react";
import { View, StyleSheet } from "react-native";
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

const getTimes = (date: Date) => {
  const today = date.toISOString().split("T")[0];
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
  const times = getTimes(date);
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
    <View style={{ flexDirection: "column", alignItems: "center" }}>
      <View style={styles.infoBoxContainer}>
        <View style={styles.infoBox}>
          <ThemedText type="defaultBold">开始时间</ThemedText>
          <ThemedText type="default">{times}</ThemedText>
        </View>
        <View style={styles.infoBox}>
          <ThemedText type="defaultBold">运动时长</ThemedText>
          <ThemedText type="default">{duration}分钟</ThemedText>
        </View>
      </View>
      <View style={styles.container}>
        {/* 左侧的图像 */}

        {isMale ? (
          <FrontMaleSimple
            color={color}
            activeColor={activeColor}
            activeGroup={activeGroup}
            handleClick={() => {}}
            width={width * 0.4}
            height={height * 0.32}
          />
        ) : (
          <FrontFemaleSimple
            color={color}
            activeColor={activeColor}
            activeGroup={activeGroup}
            handleClick={() => {}}
            width={width * 0.4}
            height={height * 0.32}
          />
        )}

        {/* 中间的锻炼信息 */}

        {isMale ? (
          <BackMaleSimple
            color={color}
            activeColor={activeColor}
            activeGroup={activeGroup}
            handleClick={() => {}}
            width={width * 0.4}
            height={height * 0.32}
          />
        ) : (
          <BackFemaleSimple
            color={color}
            activeColor={activeColor}
            activeGroup={activeGroup}
            handleClick={() => {}}
            width={width * 0.4}
            height={height * 0.32}
          />
        )}
      </View>
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
    marginBottom: 10,
  },
  bodyImage: {
    width: width * 0.4,
  },
  infoBoxContainer: {
    width: width * 0.82,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFFAF0",
    alignContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 20,
    paddingVertical: 6,
  },
  infoBox: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
