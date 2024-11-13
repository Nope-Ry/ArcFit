import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import EquipmentHeader from "../../components/equipment/EquipmentHeader";
import EquipmentCard from "../../components/equipment/EquipmentCard";

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
];

export default function TrainingScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
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

// 样式
const styles = StyleSheet.create({
  cardContainer: {
    height: "100%",
    width: "90%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    margin: 20,
    rowGap: 20,
  },
  upContainer: {
    padding: 15,
    backgroundColor: "white",
  },
});
