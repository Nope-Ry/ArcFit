import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Slider from '@react-native-community/slider';
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import WeeklyTrainingRecords from "../components/index/WeeklyTrainingRecords";

const TrainingStatistics: React.FC = () => {

    const [selectedMode, setSelectedMode] = useState('week'); // 默认选择 "7天"
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, selectedMode === 'week' && styles.selectedButton]}
            onPress={() => setSelectedMode('week')}
          >
            <ThemedText type="default">7天</ThemedText>
          </TouchableOpacity>
  
          <TouchableOpacity
            style={[styles.toggleButton, selectedMode === 'all' && styles.selectedButton]}
            onPress={() => setSelectedMode('all')}
          >
            <ThemedText type="default">总览</ThemedText>
          </TouchableOpacity>
        </View>
  
        {/* 根据选择的模式显示不同的内容 */}
        {selectedMode === 'week' ? (
            <WeeklyTrainingRecords 
                weeklyDuration={[20, 40, 50, 30, 60, 70, 80]}
            />
        ) : (
            <ThemedText type="default">总览内容展示</ThemedText>
        )}
      </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
    toggleContainer: {
      flexDirection: 'row', 
      borderRadius: 20, 
      overflow: 'hidden', 
      marginBottom: 20,
    },
    toggleButton: {
      flex: 1, 
      paddingVertical: 10, 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#ddd', 
    },
    selectedButton: {
      backgroundColor: '#007BFF',
    },
  });


export default TrainingStatistics;