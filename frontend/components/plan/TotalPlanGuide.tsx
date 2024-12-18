import React, { useState } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Markdown from "react-native-markdown-display";
import { ScrollView, TouchableOpacity, Modal } from "react-native";
import { Divider } from "@/components/ui/divider";
import { ThemedText } from "@/components/ThemedText";
import { data } from "../../app/(tabs)/profile";
import { Picker } from "@react-native-picker/picker";
import motionData from "@/res/motion/json/comb.json";
import token from "@/token.json";
import axios from "axios";

const { width, height } = Dimensions.get("window");


const BodyPlanGuide = () => {
    const [loading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    
    let prompt = "你好";

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

    const handlePress = async () => {
      setLoading(true);
      const response = await getInfor(prompt);
      console.log(response);
      setResponseData(response);
    };
    
    return (
      <ScrollView>
          <View style={styles.container}>
            {/* 描述方框 */}
            <View style={styles.descriptionBox}>
              <ThemedText type="defaultBold" style={styles.text}>
                  {123}
              </ThemedText>
            </View>

            {/* 选择器 */}
            <View style={styles.correctBox}>
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
            </View>
            
        </View>
      </ScrollView>

    );
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginTop: 10,
    zIndex: 2,
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
        marginBottom: height * 0.03,
        marginTop: height * 0.02,
    },
    text: {
        margin: 10,
        padding: 5,
    },
    motiontext: {
        alignSelf: "center",
    },
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
      modalContainer: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 20,
        width: width * 0.8,
        alignItems: "center",
        paddingBottom: 30,
      },
      modalItem: {
        width: width * 0.4,
        padding: 10,
        margin: 10,
        backgroundColor: "#FFDEAD",
        borderRadius: 5,
        alignItems: "center",
      },
      closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: "#FFA07A",
        borderRadius: 10,
        width: '85%',
        alignItems: "center",
      },
      motionBox: {
        borderColor: "#000000",
        borderRadius: 8,
        padding: 10,
        width: "50%",
        height: 45,
        borderWidth: 1,
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

export default BodyPlanGuide;