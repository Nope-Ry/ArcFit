import React from "react";
import { TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";
import { ThemedText } from "../ThemedText";
import { useNavigation } from "@react-navigation/native";

// 定义单个卡片组件
interface EquipmentCardProps {
  imageUri: string;
  title: string;
  description: string;
}

const { width, height } = Dimensions.get("window");

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
    width: width * 0.25,
    height: height * 0.2,
    backgroundColor: "#F5F5F5",
    borderRadius: width * 0.02, // 2% of screen width
    marginVertical: height * 0.003, // 1% of screen height
    shadowColor: "#000",
    shadowOffset: { width: 0, height: height * 0.01 }, // 1% of screen height
    shadowOpacity: 0.1,
    shadowRadius: width * 0.02, // 2% of screen width
    elevation: 5,
    alignItems: "center",
    padding: 10,
  },
  cardImage: {
    width: width * 0.2,
    height: height * 0.1,
    borderRadius: 10,
  },
});

export default EquipmentCard;
