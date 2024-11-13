import { ThemedText } from "@/components/ThemedText";
import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  View,
} from "react-native";

const Equipment = {
  description:
    "高位下拉器主要用于锻炼背部、肩部和手臂的肌肉。它通常由一个高位拉索、滑轮系统和可调节的坐垫组成。使用者可以通过拉动手柄向下拉动拉索，锻炼到主要的背阔肌、斜方肌和肱二头肌。高位下拉器的多样化握柄设计允许用户进行不同的锻炼变体，以达到最佳的肌肉发展效果。",
  imageUri: "https://via.placeholder.com/150",
  title: "高位下拉器",
  recommendedActions: ["宽握高位下拉", "中握高位下拉", "窄握高位下拉"],
};
const EquipmentScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* 图片部分 */}
      <Image source={{ uri: Equipment.imageUri }} style={styles.picture} />

      {/* 描述方框 */}
      <View style={styles.descriptionBox}>
        <ThemedText type="default" style={styles.text}>
          {" "}
          {Equipment.description}{" "}
        </ThemedText>
      </View>

      {/* 推荐动作方框 */}
      <View style={styles.recommendedBox}>
        <ThemedText type="subtitle" style={{ marginBottom: 15, padding: 10 }}>
          推荐动作
        </ThemedText>
        {Equipment.recommendedActions.map((action, index) => (
          <View key={index} style={styles.recommendedAction}>
            <TouchableOpacity style={styles.plusButton}>
              <ThemedText type="defaultBold" style={{ color: "#fff" }}>
                +
              </ThemedText>
            </TouchableOpacity>
            <View
              style={{ flex: 1, justifyContent: "center", marginRight: "8%" }}
            >
              <ThemedText type="defaultBold" style={{ textAlign: "center" }}>
                {action}
              </ThemedText>
            </View>
          </View>
        ))}
      </View>
      <View className="h-12">

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  picture: {
    width: "60%",
    height: "40%",
    marginBottom: 20,
    alignSelf: "center",
  },
  descriptionBox: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    marginBottom: 20,
  },
  recommendedBox: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  recommendedAction: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "10%",
    marginRight: "10%",
    marginBottom: 20,
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 60,
  },
  text: {
    margin: 10,
    padding: 5,
  },
  plusButton: {
    backgroundColor: "#007bff",
    padding: 5,
    marginRight: "5%",
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EquipmentScreen;
