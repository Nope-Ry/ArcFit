import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import EquipmentHeader from "../../components/equipment/EquipmentHeader";
import EquipmentCard from "../../components/equipment/EquipmentCard";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const cardData = [
  {
    imageUri: "https://via.placeholder.com/150",
    title: "Card 1",
    description: "Description for Card 1",
  },
  {
    imageUri: "https://via.placeholder.com/150",
    title: "Card 2",
    description: "Description for Card 2",
  },
  {
    imageUri: "https://via.placeholder.com/150",
    title: "Card 3",
    description: "Description for Card 3",
  },
  {
    imageUri: "https://via.placeholder.com/150",
    title: "Card 4",
    description: "Description for Card 4",
  },
];

export default function TrainingScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {/* 上部容器 */}
      <View style={styles.upContainer}>
        <EquipmentHeader />
      </View>

      {/* 图片卡片容器 */}
      <ScrollView contentContainerStyle={styles.cardContainer}>
        {cardData.map((card, index) => (
          <EquipmentCard
            key={index}
            imageUri={card.imageUri}
            title={card.title}
            description={card.description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    margin: width * 0.05,
    rowGap: height * 0.02,
    columnGap: width * 0.04,
  },
  upContainer: {
    padding: 15,
    backgroundColor: "white",
  },
});
