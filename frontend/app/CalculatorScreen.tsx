import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';

const Calculator = () => {
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [rm, setRm] = useState(null);

  const calculateRM = () => {
    const w = parseFloat(weight);
    const r = parseInt(reps);

    if (!isNaN(w) && !isNaN(r) && r > 0) {
      const calculatedRm = w * (1 + r / 30);
      setRm(calculatedRm.toFixed(2)); // 保留两位小数
    } else {
      setRm('输入无效');
    }

    Keyboard.dismiss(); // 关闭键盘
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedText type='title' style={styles.title}>RM计算器</ThemedText>
      <View style={styles.inputContainer}>
        <ThemedText>重量 (kg):</ThemedText>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
          placeholder="请输入重量"
        />
      </View>
      <View style={styles.inputContainer}>
        <ThemedText>次数:</ThemedText>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={reps}
          onChangeText={setReps}
          placeholder="请输入次数"
        />
      </View>
      <TouchableOpacity onPress={calculateRM} style={styles.button}>
        <ThemedText style={{textAlign:'center'}} type='defaultBold'>计算1RM</ThemedText>
      </TouchableOpacity>
      {rm !== null && (
        <ThemedText type='subtitle' style={styles.result}>
          {isNaN(rm) ? '输入无效，请重试！' : `1RM: ${rm} kg`}
        </ThemedText>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    marginVertical: 20,
  },
  inputContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    backgroundColor: '#fff',
  },
  result: {
    marginTop: 10,
    fontSize: 18,
    textAlign: 'center',
    color: 'green',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#FFA07A',
    marginVertical: 20,
    marginHorizontal: 20, 
    paddingVertical: 10,       
    paddingHorizontal: 20,     
    borderRadius: 8,    
  }
});

export default Calculator;