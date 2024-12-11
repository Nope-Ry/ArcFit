import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { CheckBox } from "react-native-elements";

import { Dimensions } from "react-native";
import { ThemedText } from "../ThemedText";
import Entypo from "@expo/vector-icons/Entypo";
import { FrontMaleSimple } from "./FrontMaleSimple";
import { BackMaleSimple } from "./BackMaleSimple";
import { FrontFemaleSimple } from "./FrontFemaleSimple";
import { BackFemaleSimple } from "./BackFemaleSimple";
import { FrontMaleComplex } from "./FrontMaleComplex";
import { BackMaleComplex } from "./BackMaleComplex";
import { FrontFemaleComplex } from "./FrontFemaleComplex";
import { BackFemaleComplex } from "./BackFemaleComplex";
import { useGender } from "@/contexts/GenderContext";

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
  const [pageView, setPageView] = useState("FrontMaleSimple");
  // TODO: set gender in settings
  const { isMale, setIsMale } = useGender();
  const [isSimple, setIsSimple] = useState(true);
  const [isFront, setIsFront] = useState(true);
  const [activeGroup, setActiveGroup] = useState("chest");
  const color = "#FFF5EE";
  const activeColor = "#FFA07A";
  useEffect(() => {
    const gender = isMale ? "Male" : "Female";
    const complexity = isSimple ? "Simple" : "Complex";
    const side = isFront ? "Front" : "Back";
    setPageView(`${side}${gender}${complexity}`);
  }, [isMale, isSimple, isFront]);

  const handleClick = (group) => {
    // Alert.alert(`Clicked on ${group}`);
    setActiveGroup(group);
  };
  const clickArrow = () => {
    setIsFront(!isFront);
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

    const SelectedComponent = componentsMap[pageView];

    return (
      <SelectedComponent
        color={color}
        activeColor={activeColor}
        activeGroup={activeGroup}
        handleClick={handleClick}
        width={width * 0.8}
        height={height * 0.7}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
      </SafeAreaView>
      {currentPage()}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: height * 0.02,
        }}
      >
        <TouchableOpacity onPress={clickArrow} style={styles.leftArrow}>
          <Entypo name="arrow-bold-left" size={width * 0.06} color="white" />
        </TouchableOpacity>
        <CheckBox
          checked={isSimple}
          onPress={() => setIsSimple(!isSimple)}
          checkedColor="#FFA07A"
          uncheckedColor="#FFA07A"
          size={width * 0.07}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
        />
        <TouchableOpacity onPress={clickArrow} style={styles.rightArrow}>
          <Entypo name="arrow-bold-right" size={width * 0.06} color="white" />
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
              alert("敬请期待！");
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
  leftArrow: {
    backgroundColor: "#FFA07A",
    width: width * 0.1,
    height: height * 0.05,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: width * 0.12,
  },
  rightArrow: {
    backgroundColor: "#FFA07A",
    width: width * 0.1,
    height: height * 0.05,
    alignItems: "center",
    justifyContent: "center",
    marginRight: width * 0.12,
  },
});

export default InteractBody;
