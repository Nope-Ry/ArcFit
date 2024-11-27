import React, { useState, useEffect} from "react";
import { View, Text, Button } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native";
import TrainingHeader from "../../components/training/TrainingHeader";
import ExerciseCard from "../../components/training/ExerciseCard";
import HistoryRecordHeader from "@/components/training/HistoryRecordHeader";
import RecordList from "@/components/training/RecordCard";
import MainRecord from "@/components/training/MainRecord";
import { ThemedText } from "@/components/ThemedText";
import { data } from "../../app/(tabs)/index";
import * as FileSystem from "expo-file-system";

import { SafeAreaView } from "react-native-safe-area-context";

let cnt = 0;

export default function TrainingScreen() {
  // TODO: 更改为useContext
  const [isTraining, setIsTraining] = useState(false);
  const [time, setTime] = useState(0);

  const m_id_list = [3, 1, 2];

  const [exerSetsMap, setExerSetsMap] = useState(
    m_id_list.reduce((acc, id) => { 
      acc[id] = [
        { reps: "10", weight: "60", checked: false },
        { reps: "10", weight: "60", checked: false },
        { reps: "12", weight: "50", checked: false },
      ];
      return acc;
    }, {})
  ); 

  const [ratingMap, setRatingMap] = useState(
    m_id_list.reduce((acc, id) => {
      acc[id] = 3;
      return acc;
    }, {})
  );

  // 切换显示方式
  const toggleView = () => {
    if(isTraining){
      // 保存当前的训练记录
      const mins = Math.floor(time / 60000);
      const paths = FileSystem.documentDirectory;
      // 查询FileSystem.documentDirectory下有几个文件

      const hist = {
        "duration" : mins,
        "date": new Date().toISOString().split("T")[0],
        "time": new Date().toLocaleTimeString(),
        "cnt": cnt, 
        "records": []
      };

      cnt += 1;
      for (let key in exerSetsMap) {
        exerSetsMap[key] = exerSetsMap[key].map(({ checked, ...rest }) => rest);
      }

      for (let key in m_id_list){
        // 找到m_id_list[key]对应的b_id数组，已知存在../../res/motion/json/x.json，其中x为m_id_list[key]，需要读写文件
        const b_id = [];
        const records = {
          "name": `练习 ${m_id_list[key]}`,
          "m_id": m_id_list[key],
          "b_id": b_id, // 寻找m_id到b_id的映射，未完成
          "group": exerSetsMap[m_id_list[key]],
          "rating": ratingMap[m_id_list[key]]
        };
        hist["records"].push(records);
      }
      // 把这个json对象写入文件,文件名为hist/YYYY_MM_DD_cnt.json，cnt为当天的第几次训练，需要读写文件
      const path = FileSystem.documentDirectory + hist["date"] + "_" + hist["cnt"] + ".json";
      console.log("path", path);
      FileSystem.writeAsStringAsync(path, JSON.stringify(hist)).then(() => {
        console.log("写入成功");
        console.log("写到了", path);
      }).catch((err) => {
        console.log("写入失败");
      });
      data.push(hist);
    }
    else{

    }
    setIsTraining(!isTraining);
    
  };

  if (isTraining) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        {/* 上部容器 */}
        <View style={{ padding: 15, backgroundColor: "white" }}>
          <TrainingHeader 
          onButtonPress={toggleView}
          time={time}
          setTime={(newTime) => setTime(newTime)}
          />
        </View>

        {/* 下部滚动容器 */}
        <ScrollView style={{ flex: 1, padding: 15 }}>
          {m_id_list.map((item) => ( 
            <ExerciseCard
              key={item}
              exercise={{
                name: `练习 ${item}`,
                image: require("../../assets/images/icon.png"),
              }}
              exerSets={exerSetsMap[item]} 
              setExerSets={(newSets) =>
                setExerSetsMap((prev) => ({ ...prev, [item]: newSets }))
              }
              rating={ratingMap[item]}
              setRating={(newRating) =>
                setRatingMap((prev) => ({ ...prev, [item]: newRating }))
              }
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <HistoryRecordHeader />
        <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
          <MainRecord />
          <RecordList />
        </ScrollView>
        <View className="bg-white h-20 px-4 py-4">
          <TouchableOpacity
            className="w-full h-full flex justify-center items-center bg-[#007BFF] rounded-md"
            onPress={toggleView}
          >
            <ThemedText type="default" lightColor="white">
              开始训练
            </ThemedText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
