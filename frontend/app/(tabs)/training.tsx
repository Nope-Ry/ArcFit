import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native";
import TrainingHeader from "../../components/training/TrainingHeader";
import ExerciseCard from "../../components/training/ExerciseCard";
import HistoryRecordHeader from "@/components/training/HistoryRecordHeader";
import RecordList from "@/components/training/RecordCard";
import MainRecord from "@/components/training/MainRecord";
import { ThemedText } from "@/components/ThemedText";

export default function TrainingScreen() {
  // TODO: 更改为useContext
  const [isTraining, setIsTraining] = useState(false);

  // 切换显示方式
  const toggleView = () => {
    setIsTraining(!isTraining);
  };

  if (isTraining) {
    return (
      <View style={{ flex: 1 }}>
        {/* 上部容器 */}
        <View style={{ padding: 15, backgroundColor: "white" }}>
          <TrainingHeader onButtonPress={toggleView} />
        </View>

        {/* 下部滚动容器 */}
        <ScrollView style={{ flex: 1, padding: 15 }}>
          {[1, 2, 3].map((item) => (
            <ExerciseCard
              key={item}
              exercise={{
                name: `练习 ${item}`,
                image: require("../../assets/images/icon.png"),
              }}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
  else{
    return (
      <View style={{flex : 1}}>
        <HistoryRecordHeader />
        <ScrollView style={{flex : 1, backgroundColor: '#fff',}}>
          <MainRecord />
          <RecordList />
        </ScrollView>
        <View className="bg-white h-20 px-4 py-4">
          <TouchableOpacity className="w-full h-full flex justify-center items-center bg-[#007BFF] rounded-md" onPress={toggleView}>
            <ThemedText type="default" lightColor="white">开始训练</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
