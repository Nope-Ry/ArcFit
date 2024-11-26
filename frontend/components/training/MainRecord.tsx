import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ThemedText } from '../ThemedText';
import { Dimensions } from 'react-native';
import * as FileSystem from 'expo-file-system';

const path = FileSystem.documentDirectory;
const data = [];
FileSystem.readDirectoryAsync(path).then((files) => {
  files = files.filter((file) => file.endsWith(".json"));
  Promise.all(
    files.map((file) => FileSystem.readAsStringAsync(path + file))
  ).then((contents) => {
    contents.forEach((content) => {
      data.push(JSON.parse(content));
    });
  });
});


const getDuration = () => {
  const today = new Date().toISOString().split("T")[0]
  const todayData = data.filter(item => item.date === today)
  const duration = todayData.reduce((acc, item) => acc + item.duration, 0)
  return Math.floor(duration);
}

const getTimes = () => {
  const today = new Date().toISOString().split("T")[0]
  const todayData = data.filter(item => item.date === today)
  return todayData[0].time;
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
        <ThemedText type="subtitle">{duration}分钟</ThemedText>
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
