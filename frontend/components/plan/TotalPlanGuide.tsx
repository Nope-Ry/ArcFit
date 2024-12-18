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
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const { width, height } = Dimensions.get("window");

const getHistory = () => {
  // 获取前三天的训练记录
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const beforeYesterday = new Date(today);
  beforeYesterday.setDate(beforeYesterday.getDate() - 2);

  // 获取前三天的训练记录
  const todayData = data.filter((item) => item.date === today.toISOString().split("T")[0]);
  const yesterdayData = data.filter((item) => item.date === yesterday.toISOString().split("T")[0]);
  const beforeYesterdayData = data.filter((item) => item.date === beforeYesterday.toISOString().split("T")[0]);
  return [beforeYesterdayData, yesterdayData, todayData];
};
const BodyPlanGuide = () => {
    const [loading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState(null);
    
    let prompt = "你好";
    const hist = getHistory();
    console.log(hist);

    // 将hist全部转化为字符串
    for (let i = 0; i < hist.length; i++) {
        const today = new Date();
        prompt += "在" + new Date(today.setDate(today.getDate() - i)).toISOString().split("T")[0] + "日，";
        if (hist[i].length === 0) {
            prompt += "你没有进行训练。";
        } else {
          for (let j = 0; j < hist[i].length; j++) {
            for (let k = 0; k < hist[i][j].records.length; k++) {
                prompt += hist[i][j].records[k].name;
                for (let l = 0; l < hist[i][j].records[k].group.length; l++) {
                    prompt += "第" + (l + 1) + "次";
                    prompt += hist[i][j].records[k].group[l].weight + "kg";
                    prompt += hist[i][j].records[k].group[l].reps + "组";
                }
            }
        }
      }
    }
    prompt += "请据此生成今日的训练计划。"

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
              三分化训练：这种训练方法将一周的训练分为三天，每天集中训练不同的肌肉群。常见的分配方式是胸背腿，即分别在不同的日子训练胸部、背部和腿部。这种训练方式的基本原则是通过高频率的训练，让每个肌群得到足够的刺激，促使其增长。在这种方法中，运动员通常每周训练三次，每次专注于一个大肌群，间隔时间可以让肌肉得到恢复。三分化的好处是能够避免过度训练某一肌群，同时能让每个肌群得到充分的训练刺激。
              </ThemedText>
              <ThemedText type="defaultBold" style={styles.text}>
              五分化训练将一周的训练分为五天，每天训练不同的肌肉群，常见的分配方式是：胸部、背部、腿部、肩部、手臂（包括肱二头肌和肱三头肌）。这种方法的基本原则是通过更多的训练天数，让每个肌群得到更多的专注和细致的训练，同时也能有效避免疲劳积累。五分化适合那些已经有一定基础的运动员或健身者，目的是通过更细化的训练计划，提高每个肌群的力量和体型塑造。
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
        elevation: 10,
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
        elevation: 10,
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