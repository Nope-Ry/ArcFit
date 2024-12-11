import { ThemedText } from "@/components/ThemedText";
import React, { useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  View,
  Dimensions,
  ActivityIndicator,
  Modal,
} from "react-native";
import Markdown from "react-native-markdown-display";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import Fontisto from "@expo/vector-icons/Fontisto";
import AntDesign from "@expo/vector-icons/AntDesign";
import Cart from "@/components/Cart";
import { CartContext } from "@/contexts/CartContext";
import { useContext } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import motionData from "@/res/motion/json/comb.json";
import { motion_imgs } from "@/res/motion/motion_img";
import { Divider } from "@/components/ui/divider";
import axios from "axios";
import { useGender } from "@/contexts/GenderContext";
import { FrontMaleComplex } from "@/components/body/FrontMaleComplex";
import { BackMaleComplex } from "@/components/body/BackMaleComplex";
import { FrontFemaleComplex } from "@/components/body/FrontFemaleComplex";
import { BackFemaleComplex } from "@/components/body/BackFemaleComplex";
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
  const [loading, setLoading] = useState(false);

  const [isModalVisible1, setModalVisible1] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  // 百度API
  const AK = token["AK"];
  const SK = token["SK"];

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
        setLoading(false);
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

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  const handlePress = async () => {
    setLoading(true);
    const response = await getInfor(prompt);
    console.log(response);
    setResponseData(response);
  };
  console.log(loading);
  let prompt = "请给出关于以下动作的纠正意见：";
  prompt += motionData[id - 1].name;
  prompt += "。";
  prompt += "我的发力点包括了：";
  prompt += activeGroup.join("、");
  prompt += "。请分析我的发力点是否正确，如果不正确，给出应该如何修改动作。";
  // console.log("prompt: ", prompt);

  const renderComplex = (Component: React.ElementType) => (
    <Component
      color={color}
      activeColor={activeColor}
      activeGroup={activeGroup}
      handleClick={handleClick}
      width={width * 0.3}
      height={height * 0.3}
    />
  );

  const renderZoom = (Component: React.ElementType) => (
    <Component
      color={color}
      activeColor={activeColor}
      activeGroup={activeGroup}
      handleClick={handleClick}
      width={width * 0.85}
      height={height * 0.8}
    />
  );

  const toggleModal1 = () => {
    setModalVisible1(!isModalVisible1);
  };
  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  };

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
          <ThemedText type="defaultBold">点击发力点部位</ThemedText>

          <View style={styles.bodyBox}>
            {isMale
              ? renderComplex(FrontMaleComplex)
              : renderComplex(FrontFemaleComplex)}
            {isMale
              ? renderComplex(BackMaleComplex)
              : renderComplex(BackFemaleComplex)}
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-around",
              width: width * 0.8,
            }}
          >
            <TouchableOpacity onPress={toggleModal1}>
              <Fontisto name="zoom-plus" size={width * 0.06} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModal2}>
              <Fontisto name="zoom-plus" size={width * 0.06} color="black" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={handlePress}>
            <ThemedText type="subtitle" style={styles.text}>
              开始分析
            </ThemedText>
          </TouchableOpacity>
          <Divider />
          {loading && (
            <View style={{ flex: 1, padding: 8, marginVertical:20 }}>
              <ActivityIndicator size="large" color="#000" />
              <ThemedText type="subtitle">正在分析中...</ThemedText>
            </View>
          )}
          <Markdown style={markdownStyles}>
            {responseData ? responseData.result : ""}
          </Markdown>

          <Modal visible={isModalVisible1} transparent={true}>
            <View style={styles.modalContainer}>
              <TouchableOpacity
                onPress={toggleModal1}
                style={styles.modalCloseButton}
              >
                <AntDesign
                  name="closecircleo"
                  size={width * 0.08}
                  color="black"
                />
              </TouchableOpacity>
              <View style={styles.modalContent}>
                {isMale
                  ? renderZoom(FrontMaleComplex)
                  : renderZoom(FrontFemaleComplex)}
              </View>
            </View>
          </Modal>
          <Modal visible={isModalVisible2} transparent={true}>
            <View style={styles.modalContainer}>
              <TouchableOpacity
                onPress={toggleModal2}
                style={styles.modalCloseButton}
              >
                <AntDesign
                  name="closecircleo"
                  size={width * 0.08}
                  color="black"
                />
              </TouchableOpacity>
              <View style={styles.modalContent}>
                {isMale
                  ? renderZoom(BackMaleComplex)
                  : renderZoom(BackFemaleComplex)}
              </View>
            </View>
          </Modal>
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
    paddingTop: 20,
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    // borderRadius: 10,
  },
  modalCloseButton: {
    position: "absolute",
    top: height * 0.08,
    right: width * 0.07,
    padding: 10,
    borderRadius: 10,
    zIndex: 1,
  },
  modalContent: {
    width: "93%",
    height: height * 0.87,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
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
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold",
    alignSelf: "flex-start",
    flex: 0,
    marginVertical: 5,
  },
  paragraph: {
    marginStart: 14,
  },
});
