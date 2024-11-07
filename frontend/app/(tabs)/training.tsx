import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

export default function TrainingScreen() {
  // TODO: 更改为useContext
  const [isTraining, setIsTraining] = useState(false);

  // 切换显示方式
  const toggleView = () => {
    setIsTraining(!isTraining);
  };

  if (isTraining) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>训练中...</Text>
        <Button title="结束训练" onPress={toggleView} />
      </View>
    );
  }

  else
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>准备训练</Text>
        <Button title="开始训练" onPress={toggleView} />
      </View>
    );
}
