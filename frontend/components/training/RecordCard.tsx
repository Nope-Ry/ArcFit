import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { ThemedText } from '../ThemedText';

const ExerciseData = [
  {
    type: '哑铃卧推',
    sets: [
      { weight: 15, reps: 10 },
      { weight: 15, reps: 10 },
      { weight: 15, reps: 10 },
      { weight: 15, reps: 10 },
      { weight: 15, reps: 10 },
    ],
    img: require('../../assets/images/icon.png'),
  },
  {
    type: '杠铃卧推',
    sets: [
      { weight: 15, reps: 10 },
      { weight: 15, reps: 10 },
      { weight: 15, reps: 10 },
    ],
    img: require('../../assets/images/icon.png'),
  },
  {
    type: '杠铃卧推',
    sets: [
    ],
    img: require('../../assets/images/icon.png'),
  },
  {
    type: '杠铃卧推',
    sets: [
      { weight: 15, reps: 10 },
      { weight: 15, reps: 10 },
      { weight: 15, reps: 10 },
    ],
    img: require('../../assets/images/icon.png'),
  },
  {
    type: '杠铃卧推',
    sets: [
      { weight: 15, reps: 10 },
      { weight: 15, reps: 10 },
      { weight: 15, reps: 10 },
    ],
    img: require('../../assets/images/icon.png'),
  },
];

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
