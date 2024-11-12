import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { useNavigation } from "@react-navigation/native";

// 定义单个卡片组件
interface EquipmentCardProps {
  imageUri: string;
  title: string;
  description: string;
}

// 使用接口定义组件的 props 类型
const EquipmentCard: React.FC<EquipmentCardProps> = ({ imageUri, title, description }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate("EquipmentScreen", { title : title })}
    >
      <Image source={{ uri: imageUri }} style={styles.cardImage} />
      <ThemedText type="subtitle">{title}</ThemedText>
      <ThemedText type="small">{description}</ThemedText>
    </TouchableOpacity>
  );
};

// 卡片样式
const styles = StyleSheet.create({
  card: {
    width: "30%",
    height: 200, 
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
    padding: 10,
  },
  cardImage: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
  cardText: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 14,
    color: "#333",
  },
  cardDescription: {
    marginTop: 5,
    textAlign: "center",
    fontSize: 12,
    color: "#777",
  },
});

export default EquipmentCard;
