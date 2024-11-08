import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native";
import TrainingHeader from "../../components/training/TrainingHeader";
import ExerciseCard from "../../components/training/ExerciseCard";

export default function TrainingScreen() {
  // TODO: 更改为useContext
  const [isTraining, setIsTraining] = useState(true);

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

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>开始训练</Text>
      <Button title="开始训练" onPress={toggleView} />
    </View>
  );
}
