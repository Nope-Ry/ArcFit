import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native";
import TrainingHeader from "../../components/training/TrainingHeader";
import ExerciseCard from "../../components/training/ExerciseCard";
import HistoryRecordHeader from "@/components/training/HistoryRecordHeader";
import RecordList from "@/components/training/RecordCard";
import MainRecord from "@/components/training/MainRecord";
import { ThemedText } from "@/components/ThemedText";
import { readFileSync } from 'fs';
import { join } from 'path';

import { SafeAreaView } from "react-native-safe-area-context";
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
      // console.log("当前的exerSetsMap为：", exerSetsMap);
      // console.log("当前的ratingMap为：", ratingMap);

      // 创建一个json对象

      // time除以60000得到分钟数，然后转换为字符串
      const mins = (time / 60000).toString();
      console.log("当前的时间为：", mins);
      const hist = {
        "duration" : mins,
        "date": new Date().toISOString().split("T")[0],
        "time": new Date().toLocaleTimeString(),
        "cnt": 0, // 未完成，需要读写文件
        "record": []
      };

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
        hist["record"].push(records);
      }

      console.log("当前的hist为：", hist);
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
