import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { ThemedText } from '../ThemedText';
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
    console.log("data", data);
  }).catch((err) => {
    console.log("读取失败");
    console.log(err);
  });
});

const getExerciseData = () => {
  // 筛选出当天的数据，但是后续要修改成选择的日期
  const today = new Date().toISOString().split("T")[0]
  const todayData = data.filter(item => item.date === today)
  // 遍历当天的数据，将每个练习的数据提取出来
  const exerciseData = []
  todayData.forEach(item => {
    item.records.forEach(record => {
      const sets = record.group.map(set => ({
        weight: set.weight,
        reps: set.reps,
      }))
      exerciseData.push({
        type: record.name,
        sets,
        img: require('../../assets/images/icon.png'),
      })
    })
  })
  return exerciseData
};
function ExerciseItem({ type, sets, img }) {
  return (
    <View style={styles.exerciseItem}>
      <Image source={img} style={styles.imgcontainer} />
      <View style={styles.contentContainer}>
        <ThemedText type="subtitle">{type}</ThemedText>
        <View style={styles.divider} />
        {sets.map((set, index) => (
          <View key={index} style={styles.setRow}>
            <ThemedText type="default">{index + 1}</ThemedText>
            <ThemedText type="default">{set.weight} kg</ThemedText>
            <ThemedText type="default">{set.reps} 次</ThemedText>
          </View>
        ))}
      </View>
    </View>
  );
}

export default function RecordList() {
  console.log("data", data);
  const ExerciseData = getExerciseData();
  return (
    <View style={styles.container}>
      {ExerciseData.map((exercise, index) => (
        <ExerciseItem key={index} type={exercise.type} sets={exercise.sets} img={exercise.img}/>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    gap : 20,
  },
  exerciseItem: {
    flexDirection: 'row',
    backgroundColor: '#D9D9D9',
    padding: 30,
    borderRadius: 20,
    gap: 30,

    // ios shawdow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,

    // Android shadow
    elevation: 8,
  },
  imgcontainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  contentContainer: {
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  setRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
});
