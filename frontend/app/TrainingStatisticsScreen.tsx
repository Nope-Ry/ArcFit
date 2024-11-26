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
import TotalTrainingRecords from "../components/index/TotalTrainingRecords";

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
            <WeeklyTrainingRecords />
        ) : (
            <TotalTrainingRecords />
        )}
      </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
      padding: 20,
      flex: 1,
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