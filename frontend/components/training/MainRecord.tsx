import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { ThemedText } from "../ThemedText";
import { Dimensions } from "react-native";
import { data } from "../../app/(tabs)/index";

import { FrontMale } from "../statistic/body/FrontMale";

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

const { width } = Dimensions.get("window");
interface MainRecordProps {
  date: Date;
}
export default function MainRecord({ date }: MainRecordProps) {
  const duration = getDuration(date);
  const times = getTimes();

  return (
    <View style={styles.container}>
      {/* 左侧的图像 */}
      {/* <Image
        source={require("../../assets/images/body.png")}
        style={styles.bodyImage}
        resizeMode="contain"
      /> */}

      <FrontMale/>

      {/* 右侧的锻炼信息 */}
      <View style={styles.infoBox}>
        <ThemedText type="default">开始时间</ThemedText>
        <ThemedText type="subtitle">{times}</ThemedText>
        <ThemedText type="default">运动时长</ThemedText>
        <ThemedText type="subtitle">{duration}分钟</ThemedText>
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
  },
  bodyImage: {
    width: width * 0.4,
  },
  infoBox: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,

    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
