import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
          <Text style={styles.text}>{item.text}</Text>
          <Ionicons
            name="chevron-forward"
            size={24}
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
    backgroundColor: "#fff",
    borderRadius: width * 0.02, // 2% of screen width
    marginVertical: height * 0.003, // 1% of screen height
    shadowColor: "#000",
    shadowOffset: { width: 0, height: height * 0.01 }, // 1% of screen height
    shadowOpacity: 0.1,
    shadowRadius: width * 0.02, // 2% of screen width
    elevation: 5,
  },
  icon: {
    width: width * 0.08, // 8% of screen width
    height: width * 0.08, // 8% of screen width
    marginRight: width * 0.04, // 4% of screen width
  },
  text: {
    flex: 1,
    fontSize: width * 0.04, // 4% of screen width
  },
  arrow: {
    marginLeft: width * 0.04, // 4% of screen width
  },
});

export default FunctionList;
