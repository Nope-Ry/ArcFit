import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Alert,
  Switch,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { Dimensions } from "react-native";
import { ThemedText } from "../ThemedText";

import { FrontMaleSimple } from "./FrontMaleSimple";
import { BackMaleSimple } from "./BackMaleSimple";
import { FrontFemaleSimple } from "./FrontFemaleSimple";
import { BackFemaleSimple } from "./BackFemaleSimple";

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
  const [isMale, setIsMale] = useState(true);
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

  const navigation = useNavigation();

  const currentPage = () => {
    if (pageView === "FrontMaleSimple") {
      return (
        <FrontMaleSimple
          color={color}
          activeColor={activeColor}
          activeGroup={activeGroup}
          handleClick={handleClick}
        />
      );
    } else if (pageView === "BackMaleSimple") {
      return (
        <BackMaleSimple
          color={color}
          activeColor={activeColor}
          activeGroup={activeGroup}
          handleClick={handleClick}
        />
      );
    } else if (pageView === "FrontFemaleSimple") {
      return (
        <FrontFemaleSimple
          color={color}
          activeColor={activeColor}
          activeGroup={activeGroup}
          handleClick={handleClick}
        />
      );
    } else if (pageView === "BackFemaleSimple") {
      return (
        <BackFemaleSimple
          color={color}
          activeColor={activeColor}
          activeGroup={activeGroup}
          handleClick={handleClick}
        />
      );
    } else {
      return <Text>Not Found</Text>;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <ThemedText type="defaultBold">{isMale ? "男性" : "女性"}</ThemedText>
          <Switch
            value={isMale}
            onValueChange={setIsMale}
            thumbColor={isMale ? "#FFFFFF" : "#FFA07A"}
            trackColor={{ false: "#FFA07A", true: "#FFA07A" }}
          />
        </View>
        {/* <View style={{ alignItems: "center" }}>
          <ThemedText type="defaultBold">
            {isSimple ? "简单" : "复杂"}
          </ThemedText>
          <Switch
            value={isSimple}
            onValueChange={setIsSimple}
            disabled
            thumbColor={isSimple ? "#FFFFFF" : "#FFA07A"}
            trackColor={{ false: "#FFA07A", true: "#FFA07A" }}
          />
        </View> */}
        <View style={{ alignItems: "center" }}>
          <ThemedText type="defaultBold">
            {isFront ? "前面" : "后面"}
          </ThemedText>
          <Switch
            value={isFront}
            onValueChange={setIsFront}
            thumbColor={isFront ? "#FFFFFF" : "#FFA07A"}
            trackColor={{ false: "#FFA07A", true: "#FFA07A" }}
          />
        </View>
      </SafeAreaView>
      {currentPage()}
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("BodyInfoScreen", {
              name: mapBodyPart(activeGroup),
            });
          }}
          style={{
            backgroundColor: "#FFA07A",
            width: width,
            height: height * 0.05,
            alignItems: "center",
            justifyContent: "center",
            marginTop: height * 0.04,
          }}
        >
          <ThemedText type="defaultBold">{mapBodyPart(activeGroup)}</ThemedText>
          {/* <ThemedText type="defaultBold">{activeGroup}</ThemedText> */}
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
});

export default InteractBody;
