import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { ThemedText } from "../ThemedText";
import { data } from "../../app/(tabs)/profile";
import { motion_imgs } from "@/res/motion/motion_img";

import { Dimensions } from "react-native";
import { API } from "@/constants/APIs";
import motionData from "@/res/motion/json/comb.json";
import * as FileSystem from "expo-file-system";

const { width, height } = Dimensions.get("window");

const getExerciseData = (date: Date) => {
  const today = date.toISOString().split("T")[0];
  const todayData = data.filter((item) => item.date === today);
  const exerciseData = [];
  todayData.forEach((item) => {
    item.records.forEach((record) => {
      const sets = record.group.map((set) => ({
        weight: set.weight,
        reps: set.reps,
      }));
      exerciseData.push({
        type: record.name,
        sets,
        img: motion_imgs[record.m_id],
      });
    });
  });
  return exerciseData;
};
function ExerciseItem({ type, sets, img }) {
  return (
    <View style={styles.exerciseItem}>
      <ImageBackground
        source={img}
        style={styles.imgcontainer}
        imageStyle={styles.imgstyle}
      />
      <View style={styles.contentContainer}>
        <ThemedText type="subtitle">{type}</ThemedText>
        <View style={styles.divider} />
        {sets.map((set, index) => (
          <View key={index} style={styles.setRow}>
            <ThemedText type="default">{index + 1}</ThemedText>
            <ThemedText type="default">
              <ThemedText type="defaultBold">{set.weight}</ThemedText> kg
            </ThemedText>
            <ThemedText type="default">
              <ThemedText type="defaultBold">{set.reps}</ThemedText> 次
            </ThemedText>
          </View>
        ))}
      </View>
    </View>
  );
}
interface ExerciseItemProps {
  date: Date;
}
export default function RecordCard({ date }: ExerciseItemProps) {
  const [refresh, setRefresh] = React.useState(false);
  var ExerciseData = getExerciseData(date);
  if (ExerciseData.length === 0) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const start_time = startOfDay.toISOString();
    const end_time = endOfDay.toISOString();

    const getRecord = async () => {
      try {
        const response = await API.call(API.Account.getHistoryRecord, {
          start_time,
          end_time,
        });
        console.log(response);
        const today_record = response.map((record) => ({
          date: record.start_time.split("T")[0],
          time: record.start_time.split("T")[1].split(".")[0],
          duration: record.duration_seconds,
          records: record.records,
          cnt: record.id,
          dataTime: record.start_time,
        }));
        today_record.map((record) => {
          record.records.map((r) => {
            r.name = motionData[r.m_id - 1].name;
          });
        });
        today_record.map((record) => {
          const path =
            FileSystem.documentDirectory +
            record["date"] +
            "_" +
            record["cnt"] +
            ".json";
          console.log(path);
          if(record.records.length > 0){
            FileSystem.writeAsStringAsync(path, JSON.stringify(record))
              .then(() => {
                console.log("写到了", path);
              })
              .catch((err) => {
                console.log(err);
              });
            data.push(record);
            setRefresh(true);
          }
        });

      } catch (e) {
        console.error(e);
      }
    }
    getRecord();
  }
  ExerciseData = getExerciseData(date);
  return (
    <View style={styles.container}>
      {ExerciseData.map((exercise, index) => (
        <ExerciseItem
          key={index}
          type={exercise.type}
          sets={exercise.sets}
          img={exercise.img}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    gap: 20,
  },
  exerciseItem: {
    flexDirection: "row",
    backgroundColor: "#FAF0E6",
    padding: 30,
    borderRadius: 20,
    gap: 30,

    // ios shawdow
    shadowColor: "#8B4513",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,

    // Android shadow
    elevation: 8,
  },
  imgcontainer: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: (width * 0.15) / 2,
    overflow: "hidden",
  },
  imgstyle: {
    borderRadius: (width * 0.15) / 2,
  },
  contentContainer: {
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },
  setRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
});
