import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import BodyPlanGuide from "../components/plan/BodyPlanGuide";
import TotalPlanGuide from "../components/plan/TotalPlanGuide";

const {width, height} = Dimensions.get("window");

const TrainingStatistics: React.FC = () => {

    const [selectedMode, setSelectedMode] = useState('body'); // 默认选择 "部位计划"
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, selectedMode === 'all' && styles.selectedButton]}
            onPress={() => setSelectedMode('all')}
          >
            <ThemedText type="default">全身计划</ThemedText>
          </TouchableOpacity>
  
          <TouchableOpacity
            style={[styles.toggleButton, selectedMode === 'body' && styles.selectedButton]}
            onPress={() => setSelectedMode('body')}
          >
            <ThemedText type="default">部位计划</ThemedText>
          </TouchableOpacity>
        </View>
  
        {/* 根据选择的模式显示不同的内容 */}
        {selectedMode === 'body' ? (
            <BodyPlanGuide />
        ) : (
            <TotalPlanGuide />
        )}
      </SafeAreaView>
    );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  toggleContainer: {
    marginTop: 20,
    width: width * 0.6,
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
    backgroundColor: '#FBE8D5',
  },
  selectedButton: {
    backgroundColor: '#FFB77F',
  },
});

export default TrainingStatistics;