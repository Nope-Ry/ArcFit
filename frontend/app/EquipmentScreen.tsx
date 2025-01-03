import { ThemedText } from "@/components/ThemedText";
import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  View,
  Dimensions,
} from "react-native";

import MotionBar from "@/components/motion/MotionBar";

import { useRoute } from "@react-navigation/native";
import motionData from "@/res/motion/json/comb.json";
import cardData from "@/res/equipment/json/comb.json";

import { RouteProp } from "@react-navigation/native";
import { equipment_imgs } from "@/res/equipment/equipment_img";
import Cart from "@/components/Cart";
import { CartContext } from "@/contexts/CartContext";
import { useContext } from "react";
const { width, height } = Dimensions.get("window");

type RouteParams = {
  params: {
    id: number;
  };
};

export default function EquipmentScreen() {
  const route = useRoute<RouteProp<RouteParams, "params">>();
  const { id } = route.params;
  const { cart, incrementCart } = useContext(CartContext);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Cart />
      <ScrollView style={styles.container}>
        {/* 标题 */}
        <ThemedText type="title" style={{ textAlign: "center" }}>
          {cardData[id].name}
        </ThemedText>

        {/* 图片部分 */}
        {/* <Image source={{ uri: Equipment.imageUri }} style={styles.picture} /> */}
        {/* <Image source={information.img_path} style={styles.picture} /> */}
        <Image source={equipment_imgs[id + 1]} style={styles.picture} />

        {/* 描述方框 */}
        <View style={styles.descriptionBox}>
          <ThemedText type="default" style={styles.text}>
            {cardData[id].description}
          </ThemedText>
        </View>

        {/* 推荐动作方框 */}
        <View style={styles.recommendedBox}>
          <ThemedText type="subtitle" style={{ marginBottom: 15, padding: 10 }}>
            推荐动作
          </ThemedText>
          {cardData[id].m_id.map((action, index) => {
            return (
              <MotionBar
                key={index}
                name={motionData[action - 1].name}
                m_id={action}
              />
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
  },
  picture: {
    width: width * 0.6,
    height: height * 0.3,
    marginTop: height * 0.04,
    marginBottom: height * 0.03,
    alignSelf: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
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
    elevation: 10,
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
    elevation: 10,
  },
  recommendedAction: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: width * 0.05,
    marginRight: width * 0.05,
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
    marginRight: "5%",
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
