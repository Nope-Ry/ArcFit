import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

import { Dimensions } from "react-native";
import { ThemedText } from "../ThemedText";
import { FrontMaleSimple } from "./FrontMaleSimple";
import { BackMaleSimple } from "./BackMaleSimple";
import { FrontFemaleSimple } from "./FrontFemaleSimple";
import { BackFemaleSimple } from "./BackFemaleSimple";
import { FrontMaleComplex } from "./FrontMaleComplex";
import { BackMaleComplex } from "./BackMaleComplex";
import { FrontFemaleComplex } from "./FrontFemaleComplex";
import { BackFemaleComplex } from "./BackFemaleComplex";
import { useGender } from "@/contexts/GenderContext";
import PagerView from "react-native-pager-view";
import FontAwesome from "@expo/vector-icons/FontAwesome";
const { width, height } = Dimensions.get("window");

const mapBodyPart = (group) => {
  const bodyParts = {
    chest: "胸部",
    "front-shoulders": "前肩",
    traps: "斜方肌",
    biceps: "肱二头肌",
    forearms: "前臂",
    hands: "手",
    obliques: "腹外斜肌",
    abdominals: "腹肌",
    quads: "股四头肌",
    calves: "小腿",
    "rear-shoulders": "后肩",
    triceps: "肱三头肌",
    lats: "背阔肌",
    glutes: "臀部",
    "traps-middle": "斜方肌中部",
    lowerback: "下背",
    hamstrings: "腿后肌",
  };
  return bodyParts[group];
};

const InteractBody = () => {
  const [pageView, setPageView] = useState("MaleSimple");
  const { isMale } = useGender();
  const [isSimple, setIsSimple] = useState(true);
  const [activeGroup, setActiveGroup] = useState("chest");
  const color = "#FFF5EE";
  const activeColor = "#FFA07A";
  useEffect(() => {
    const gender = isMale ? "Male" : "Female";
    const complexity = isSimple ? "Simple" : "Complex";
    setPageView(`${gender}${complexity}`);
  }, [isMale, isSimple]);

  const handleClick = (group) => {
    // Alert.alert(`Clicked on ${group}`);
    setActiveGroup(group);
  };
  const navigation = useNavigation();

  const currentPage = () => {
    const componentsMap = {
      FrontMaleSimple,
      BackMaleSimple,
      FrontFemaleSimple,
      BackFemaleSimple,
      FrontMaleComplex,
      BackMaleComplex,
      FrontFemaleComplex,
      BackFemaleComplex,
    };

    return ["Front", "Back"].map((item, index) => {
      const SelectedComponent = componentsMap[`${item}${pageView}`];
      return (
        <SelectedComponent
          key={index}
          color={color}
          activeColor={activeColor}
          activeGroup={activeGroup}
          handleClick={handleClick}
          width={width * 0.79}
          height={height * 0.7}
        />
      );
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      ></SafeAreaView>

      <PagerView style={{ flex: 1 }} initialPage={0}>
        {currentPage()}
      </PagerView>
      <View style={{ flexDirection: "row-reverse" }}>
        <TouchableOpacity
          onPress={() => setIsSimple(!isSimple)}
          style={styles.modeButton}
        >
          <FontAwesome name="modx" size={width * 0.06} color="white" />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            const bodypart = mapBodyPart(activeGroup);
            if (bodypart) {
              navigation.navigate("BodyInfoScreen", {
                name: bodypart,
              });
            } else {
              Alert.alert(
                "敬请期待！", // 弹窗标题
                "", // 弹窗内容
                [{ text: "确定", onPress: () => console.log("确定 Pressed") }],
                { cancelable: false }
              );
            }
          }}
          style={{
            backgroundColor: "#FFA07A",
            width: width,
            height: height * 0.05,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ThemedText type="defaultBold">
            {mapBodyPart(activeGroup) && mapBodyPart(activeGroup)}
            {!mapBodyPart(activeGroup) && activeGroup}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  modeButton: {
    backgroundColor: "#FFA07A",
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: width * 0.06,
    alignItems: "center",
    justifyContent: "center",
    marginRight: width * 0.04,
    marginBottom: width * 0.04,
  },
});

export default InteractBody;
