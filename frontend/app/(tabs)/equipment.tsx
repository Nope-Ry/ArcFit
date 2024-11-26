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
import cardData from "../../res/equipment/json/comb.json";
import bodypartData from "@/res/bodypart/json/comb.json";

const { width, height } = Dimensions.get("window");

export default function TrainingScreen() {
  const [selectedEquipment, setSelectedEquipment] = useState(0);

  const handleEquipmentSelect = (index) => {
    setSelectedEquipment(index);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {/* 上部容器 */}
      <View style={styles.upContainer}>
        <EquipmentHeader OnSelect={handleEquipmentSelect}/>
      </View>

      {/* 图片卡片容器 */}
      <ScrollView contentContainerStyle={styles.cardContainer}>
        {cardData
          .filter((card) => !selectedEquipment || bodypartData[selectedEquipment - 1].e_id.includes(card.e_id))
          .map((card, index) => (
            <EquipmentCard
              key={index}
              information={card}
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
    justifyContent: "center",
    margin: width * 0.05,
    rowGap: height * 0.02,
    columnGap: width * 0.04,
    gap: width * 0.05,
  },
  upContainer: {
    padding: 15,
    backgroundColor: "white",
  },
});
