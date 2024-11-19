import { ThemedText } from "@/components/ThemedText";
import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  View,
  Dimensions,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import motionData from "@/res/motion/json/comb.json";

import { RouteProp } from "@react-navigation/native";
import { equipment_imgs } from "@/assets/res/equipment_img";
const { width, height } = Dimensions.get("window");

type RouteParams = {
  params: {
    information: any;
  };
};

export default function EquipmentScreen() {
  const route = useRoute<RouteProp<RouteParams, 'params'>>();
  const {information} = route.params;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={styles.container}>
        {/* 图片部分 */}
        {/* <Image source={{ uri: Equipment.imageUri }} style={styles.picture} /> */}
        {/* <Image source={information.img_path} style={styles.picture} /> */}
        <Image source={equipment_imgs[information.e_id]} style={styles.picture} />

        {/* 标题 */}

        {/* 描述方框 */}
        <View style={styles.descriptionBox}>
          <ThemedText type="default" style={styles.text}>
            {information.description}
          </ThemedText>
        </View>

        {/* 推荐动作方框 */}
        <View style={styles.recommendedBox}>
          <ThemedText type="subtitle" style={{ marginBottom: 15, padding: 10 }}>
            推荐动作
          </ThemedText>
          {information.m_id.map((action, index) => {
            
            return (
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
                    {motionData[action-1].name}
                  </ThemedText>
                </View>
              </View>
            );
          })}
        </View>
        <View style={{ height: 35 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  picture: {
    width: width * 0.6,
    height: height * 0.3,
    marginBottom: 20,
    alignSelf: "center",
  },
  descriptionBox: {
    width: width * 0.8,
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
    width: width * 0.8,
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
    marginLeft: width * 0.1,
    marginRight: width * 0.1,
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