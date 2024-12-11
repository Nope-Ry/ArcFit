import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Divider } from "@/components/ui/divider";
import React, { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
interface IHistoryRecordHeaderProps {
  date: Date;
  setDate: (date: Date) => void;
}

export default function HistoryRecordHeader({
  date,
  setDate,
}: IHistoryRecordHeaderProps) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate: Date) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString();
  };

  return (
    <View
      className="flex flex-col items-center bg-white"
      style={styles.container}
    >
      <View className="h-20 justify-center">
        <ThemedText type="title">历史记录</ThemedText>
      </View>
      <Divider />
      <View className="h-12 justify-center">
        <TouchableOpacity style={styles.button} onPress={showDatePicker}>
          <ThemedText type="subtitle">{formatDate(date)}</ThemedText>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,

    // Android shadow
    elevation: 8,

    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#fff", 
    padding: 10,
    borderRadius: width * 0.02,
    alignItems: "center",
  },
});
