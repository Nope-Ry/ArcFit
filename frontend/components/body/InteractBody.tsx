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

import { Dimensions } from "react-native";
import { ThemedText } from "../ThemedText";

import { FrontMaleSimple } from "./FrontMaleSimple";
import { BackMaleSimple } from "./BackMaleSimple";
import { FrontFemaleSimple } from "./FrontFemaleSimple";
import { BackFemaleSimple } from "./BackFemaleSimple";
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
          <ThemedText type="defaultBold">
            {isMale ? "Male" : "Female"}
          </ThemedText>
          <Switch
            value={isMale}
            onValueChange={setIsMale}
            thumbColor={isMale ? "#FFFFFF" : "#FFA07A"}
            trackColor={{ false: "#FFA07A", true: "#FFA07A" }}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <ThemedText type="defaultBold">
            {isSimple ? "Simple" : "Complex"}
          </ThemedText>
          <Switch
            value={isSimple}
            onValueChange={setIsSimple}
            disabled
            thumbColor={isSimple ? "#FFFFFF" : "#FFA07A"}
            trackColor={{ false: "#FFA07A", true: "#FFA07A" }}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <ThemedText type="defaultBold">
            {isFront ? "Front" : "Back"}
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
            Alert.alert("Clicked on Save");
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
          <ThemedText type="defaultBold">{activeGroup}</ThemedText>
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