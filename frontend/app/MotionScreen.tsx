import { ThemedText } from "@/components/ThemedText";
import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  View,
  Dimensions,
} from "react-native";

import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

import Cart from "@/components/Cart";
import { CartContext } from "@/contexts/CartContext";
import { useContext } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import motionData from "@/res/motion/json/comb.json";
import { motion_imgs } from "@/res/motion/motion_img";
import { Divider } from "@/components/ui/divider";
import axios from 'axios';

const { width, height } = Dimensions.get("window");

type RouteParams = {
  params: {
    m_id: number;
  };
};

export default function EquipmentScreen() {
  const route = useRoute<RouteProp<RouteParams, "params">>();
  const { cart, incrementCart } = useContext(CartContext);
  const { m_id } = route.params;
  const id = m_id;
  const navigation = useNavigation();
  const previousRoute =
    navigation.getState().routes[navigation.getState().index - 1]?.name;

  const [responseData, setResponseData] = useState(null);
  // 百度API
  const AK = "8PQjHiFUFS4lN97Wdj70m2XY"
  const SK = "43K1K47lBQbNH5xKTZRs3OsD9C86Gtbl"

  async function getInfor(userMessage: string) {
      var options = {
          'method': 'POST',
          'url': 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/ernie-lite-8k?access_token=' + await getAccessToken(),
          'headers': {
                  'Content-Type': 'application/json'
          },
          data: JSON.stringify({
                  "messages": [
                          {
                                  "role": "user",
                                  "content": userMessage,
                          }
                  ],
                  "temperature": 0.95,
                  "top_p": 0.7,
                  "penalty_score": 1
          })

      };

      axios(options)
          .then(response => {
              console.log(response.data);
              setResponseData(response.data);
          })
          .catch(error => {
              throw new Error(error);
          })
  }

  /**
   * 使用 AK，SK 生成鉴权签名（Access Token）
   * @return string 鉴权签名信息（Access Token）
   */
  function getAccessToken() {

      let options = {
          'method': 'POST',
          'url': 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=' + AK + '&client_secret=' + SK,
      }
      return new Promise((resolve, reject) => {
        axios(options)
            .then(res => {
                resolve(res.data.access_token)
            })
            .catch(error => {
                reject(error)
            })
      })
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Cart />
      <ScrollView style={styles.container}>
        {/* 标题 */}
        <ThemedText type="title" style={{ textAlign: "center" }}>
          {motionData[id - 1].name}
        </ThemedText>

        {/* 由动作跳转时不显示 + 按钮 */}
        {previousRoute !== "(tabs)" && (
          <TouchableOpacity
            style={{
              position: "absolute",
              right: width * 0.07,
              top: height * 0.005,
            }}
            onPress={() => {
              incrementCart(m_id);
            }}
          >
            <Ionicons name="add-circle" size={width * 0.08} color="#000" />
          </TouchableOpacity>
        )}

        <Divider style={{ marginTop: height * 0.02 }} />

        {/* 图片部分 */}
        <ImageBackground
          source={motion_imgs[id]}
          style={styles.picture}
          imageStyle={styles.picture}
        />

        {/* 描述方框 */}
        <View style={styles.descriptionBox}>
          <ThemedText type="default" style={styles.text}>
            {motionData[id - 1].info}
          </ThemedText>
        </View>

        {/* baidu API 在 getInfor 里面编辑 prompt 调取有点慢 点击 baidu Button 直接显示返回结果 */}
        <View style={styles.descriptionBox}>
          <TouchableOpacity onPress={async () => await getInfor("在健身房练腿的动作要领")}
          >
            <ThemedText type="default" style={styles.text}>
              baidu Button
            </ThemedText>
          </TouchableOpacity>
          <ThemedText type="default" style={styles.text}>
            {responseData ? responseData.result : "No response"}
          </ThemedText>
        </View>
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
    height: width * 0.6,
    marginTop: height * 0.01,
    marginBottom: height * 0.03,
    alignSelf: "center",
    borderRadius: width * 0.3,
    borderWidth: 6,
    borderColor: "#fff",
    overflow: "hidden",
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
  text: {
    margin: 10,
    padding: 5,
  },
});
