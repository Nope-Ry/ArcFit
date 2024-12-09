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
import Markdown from "react-native-markdown-display";
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
import axios from "axios";
import { useGender } from "@/contexts/GenderContext";
import { FrontMaleSimple } from "@/components/body/FrontMaleSimple";
import { BackMaleSimple } from "@/components/body/BackMaleSimple";
import { FrontFemaleSimple } from "@/components/body/FrontFemaleSimple";
import { BackFemaleSimple } from "@/components/body/BackFemaleSimple";
import token from "@/token.json";

const { width, height } = Dimensions.get("window");

type RouteParams = {
  params: {
    m_id: number;
  };
};

export default function EquipmentScreen() {
  const route = useRoute<RouteProp<RouteParams, "params">>();
  const { cart, incrementCart } = useContext(CartContext);
  const { isMale } = useGender();
  const { m_id } = route.params;
  const id = m_id;
  const navigation = useNavigation();
  const previousRoute =
    navigation.getState().routes[navigation.getState().index - 1]?.name;

  const [responseData, setResponseData] = useState(null);
  const [activeGroup, setActiveGroup] = useState([]);
  // 百度API
  const AK = token['AK'];
  const SK = token['SK'];


  async function getInfor(userMessage: string) {
    var options = {
      method: "POST",
      url:
        "https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/ernie-lite-8k?access_token=" +
        (await getAccessToken()),
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        messages: [
          {
            role: "user",
            content: userMessage,
          },
        ],
        temperature: 0.95,
        top_p: 0.7,
        penalty_score: 1,
      }),
    };

    axios(options)
      .then((response) => {
        console.log(response.data);
        setResponseData(response.data);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  /**
   * 使用 AK，SK 生成鉴权签名（Access Token）
   * @return string 鉴权签名信息（Access Token）
   */
  function getAccessToken() {
    let options = {
      method: "POST",
      url:
        "https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=" +
        AK +
        "&client_secret=" +
        SK,
    };
    return new Promise((resolve, reject) => {
      axios(options)
        .then((res) => {
          resolve(res.data.access_token);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  const color = "#FFF5EE";
  const activeColor = "#FFA07A";
  const handleClick = (group) => {
    setActiveGroup((prevGroups) => {
      if (prevGroups.includes(group)) {
        return prevGroups.filter((g) => g !== group);
      } else {
        return [...prevGroups, group];
      }
    });
  };

  let prompt = "请给出关于以下动作的纠正意见：";
  prompt += motionData[id - 1].name;
  prompt += "。";
  prompt += "我的发力点包括了："
  prompt += activeGroup.join("、");
  prompt += "。请分析我的发力点是否正确，如果不正确，给出应该如何修改动作。"; 
  console.log("prompt: ", prompt);

  console.log(activeGroup);
  const debugtext = `对于“斯万推胸”这个动作，发力点的准确性对于锻炼效果和避免受伤都非常重要。根据您提供的发力点“chest”和“biceps”，我们来分析一下。

首先，“chest”即胸部，是推胸动作的主要发力部位，这是正确的。推胸动作主要锻炼的就是胸大肌，所以胸部应该是主要的发力点。

然而，“biceps”指的是二头肌，这通常是在做臂部动作时的主要发力肌肉。在推胸动作中，虽然手臂的参与是必要的，以帮助稳定身体和推动重量，但二头肌并不是推胸动作的主要发力点。

因此，您的发力点在某种程度上是正确的，但可以更专注于胸部肌肉的发力。为了更准确地执行这个动作，您可以尝试以下建议来修改动作：

- 集中注意力在胸部肌肉上。当您进行推胸动作时，要时刻关注胸部的肌肉收缩和伸展感。
- 确保手臂的角度和位置正确。手臂应该稍微弯曲，以减轻二头肌的负担，让更多的力量转移到胸部肌肉上。
3. 注重呼吸配合。在推胸动作中，吸气时准备并收紧胸部肌肉，呼气时则用力推起重量，这样可以帮助您更好地集中力量并感受胸部的发力。
4. 可以在专业教练的指导下进行训练，他们可以提供更具体的指导，帮助您纠正动作和调整发力点。

综上所述，您在进行斯万推胸动作时，应该将注意力更多地放在胸部肌肉上，而不仅仅是二头肌。通过以上建议的修改，您可以更有效地锻炼到胸部肌肉，并避免不必要的伤害。`;
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
        <View style={styles.correctBox}>
          <View style={styles.bodyBox}>
            {isMale ? (
              <FrontMaleSimple
                color={color}
                activeColor={activeColor}
                activeGroup={activeGroup}
                handleClick={handleClick}
                width={width * 0.3}
                height={height * 0.3}
              />
            ) : (
              <FrontFemaleSimple
                color={color}
                activeColor={activeColor}
                activeGroup={activeGroup}
                handleClick={handleClick}
                width={width * 0.3}
                height={height * 0.3}
              />
            )}
            {isMale ? (
              <BackMaleSimple
                color={color}
                activeColor={activeColor}
                activeGroup={activeGroup}
                handleClick={handleClick}
                width={width * 0.3}
                height={height * 0.3}
              />
            ) : (
              <BackFemaleSimple
                color={color}
                activeColor={activeColor}
                activeGroup={activeGroup}
                handleClick={handleClick}
                width={width * 0.3}
                height={height * 0.3}
              />
            )}
          </View>
          <TouchableOpacity onPress={async () => await getInfor(prompt)}>
            <ThemedText type="subtitle" style={styles.text}>
              开始分析
            </ThemedText>
          </TouchableOpacity>
          <Divider />
          <Markdown style={markdownStyles}>
            {responseData ? responseData.result : ""}
            {/* {debugtext} */}
          </Markdown>
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
    shadowOpacity: 0.5,
    shadowRadius: 5,
    marginBottom: 20,
  },
  correctBox: {
    flex: 1,
    width: width * 0.8,
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    padding: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    marginBottom: 20,
  },
  bodyBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: width * 0.8,
    flex: 1,
  },
  text: {
    margin: 10,
    padding: 5,
  },
});

const markdownStyles = StyleSheet.create({
  text: {
    color: "#000",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "black",
  },
  list_item: {
    fontSize: 16,
    lineHeight: 24,
    marginEnd: 20,
    alignSelf: "flex-start",
    flex: 0,
  },
});
