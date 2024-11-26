import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ThemedText } from '../ThemedText';
import { Dimensions } from 'react-native';
import data1 from "../../hist/2024_11_23_1.json"
import data2 from "../../hist/2024_11_24_2.json"
import data3 from "../../hist/2024_11_25_3.json"
import data4 from "../../hist/2024_11_21_4.json"
import data5 from "../../hist/2024_11_16_5.json"
import data6 from "../../hist/2024_11_17_6.json"
import data7 from "../../hist/2024_11_20_7.json"
import data8 from "../../hist/2024_11_21_8.json"
import data9 from "../../hist/2024_11_16_9.json"
import data10 from "../../hist/2024_11_23_10.json"
import data11 from "../../hist/2024_11_24_11.json"
import data12 from "../../hist/2024_11_21_12.json"
import data13 from "../../hist/2024_11_20_13.json"
import data14 from "../../hist/2024_11_24_14.json"
import data15 from "../../hist/2024_11_26_15.json"

const data = [data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, data11, data12, data13, data14, data15]; // 需要读写文件

const getDuration = () => {
  const today = new Date().toISOString().split("T")[0]
  const todayData = data.filter(item => item.date === today)
  const duration = todayData.reduce((acc, item) => acc + item.duration, 0)
  const hours = Math.floor(duration / 60)
  const minutes = duration % 60
  console.log("时分", hours, minutes)
  return `${hours}小时${minutes}分钟`
}

const getTimes = () => {
  const today = new Date().toISOString().split("T")[0]
  const todayData = data.filter(item => item.date === today)
  return todayData[0].time
}

const { width } = Dimensions.get('window');

export default function MainRecord() {
  const duration = getDuration();
  const times = getTimes();

  return (
    <View style={styles.container}>
      {/* 左侧的图像 */}
      <Image
        source={require("../../assets/images/body.png")}
        style={styles.bodyImage}
        resizeMode="contain"
      />

      {/* 右侧的锻炼信息 */}
      <View style={styles.infoBox}>
        <ThemedText type="default">开始时间</ThemedText>
        <ThemedText type="subtitle">{times}</ThemedText>
        <ThemedText type="default">运动时长</ThemedText>
        <ThemedText type="subtitle">{duration}</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    gap: 30,
  },
  bodyImage: {
    width: width * 0.4,
  },
  infoBox: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,

    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
