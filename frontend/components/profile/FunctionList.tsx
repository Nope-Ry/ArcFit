import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { ThemedText } from "../ThemedText";
const { width, height } = Dimensions.get("window");

interface FunctionListProps {
  items: { icon: any; text: string; onPress: () => void }[];
}

const FunctionList: React.FC<FunctionListProps> = ({ items }) => {
  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.item}
          onPress={item.onPress}
        >
          <Image source={item.icon} style={styles.icon} />
          <ThemedText type="medium" style={styles.text}>{item.text}</ThemedText>
          <Ionicons
            name="chevron-forward"
            size={width * 0.06}
            color="black"
            style={styles.arrow}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: width * 0.04, // 4% of screen width
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: height * 0.02, // 2% of screen height
    paddingHorizontal: width * 0.05, // 5% of screen width
    backgroundColor: "#fafafa",
    borderRadius: width * 0.02, // 2% of screen width
    marginVertical: height * 0.006, // 1% of screen height
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 }, 
    shadowOpacity: 0.1,
    shadowRadius: 2, // 2% of screen width
    elevation: 5,
  },
  icon: {
    width: width * 0.08, // 8% of screen width
    height: width * 0.08, // 8% of screen width
    marginRight: width * 0.04, // 4% of screen width
  },
  text: {
    flex: 1,
    color: "#000",
    marginLeft: width * 0.05,
  },
  arrow: {
    marginLeft: width * 0.04, // 4% of screen width
  },
});

export default FunctionList;
