import React, { useEffect, useState } from "react";
import { StyleSheet, View, Alert, Switch, Text } from "react-native";
import Svg, {
  G,
  Defs,
  RadialGradient,
  Stop,
  Path,
  Line,
} from "react-native-svg";
import { Dimensions } from "react-native";
import { ThemedText } from "../ThemedText";

import { FrontMaleSimple } from "./FrontMaleSimple";
import { BackMaleSimple } from "./BackMaleSimple";
const { width, height } = Dimensions.get("window");


const InteractBody = () => {
  const [pageView, setPageView] = useState("FrontMaleSimple");
  const [isMale, setIsMale] = useState(true);
  const [isSimple, setIsSimple] = useState(true);
  const [isFront, setIsFront] = useState(true);
  const [activeGroup, setActiveGroup] = useState(null);
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
    } else {
      return <Text>Not Found</Text>;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {currentPage()}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <ThemedText type="defaultBold">
            {isMale ? "Male" : "Female"}
          </ThemedText>
          <Switch value={isMale} onValueChange={setIsMale} disabled />
        </View>
        <View style={{ alignItems: "center" }}>
          <ThemedText type="defaultBold">
            {isSimple ? "Simple" : "Complex"}
          </ThemedText>
          <Switch value={isSimple} onValueChange={setIsSimple} disabled />
        </View>
        <View style={{ alignItems: "center" }}>
          <ThemedText type="defaultBold">
            {isFront ? "Front" : "Back"}
          </ThemedText>
          <Switch value={isFront} onValueChange={setIsFront} />
        </View>
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
