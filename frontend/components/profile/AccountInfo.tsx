import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { ThemedText } from "../ThemedText";
import Avatar from "../Avatar";
import { useUser } from "@/contexts/UserContext";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
// TODO: 响应设计

export default function AccountInfo() {
  const { user } = useUser();
  const navigation = useNavigation();

  const onAccountInfoPress = () => {
    if (user.isLogin) {
      navigation.navigate("(accounts)/AccountScreen");
    } else {
      navigation.navigate("(accounts)/LoginScreen");
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onAccountInfoPress}>
      <Avatar size={width * 0.12} />
      <View style={styles.infoContainer}>
        <ThemedText type='subtitle'>{user.username}</ThemedText>
        <ThemedText type='default'>{user.email}</ThemedText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: width * 0.04, // 4% of screen width
    marginHorizontal: width * 0.05, // 5% of screen width
    marginVertical: height * 0.02, // 2% of screen height
    backgroundColor: "#fff",
    borderRadius: width * 0.02, // 2% of screen width
    shadowColor: "#000",
    shadowOffset: { width: 0, height: height * 0.01 }, // 1% of screen height
    shadowOpacity: 0.2,
    shadowRadius: width * 0.02, // 2% of screen width
    elevation: 5,
  },
  avatar: {
    width: width * 0.12, // 12% of screen width
    height: width * 0.12, // 12% of screen width
    borderRadius: (width * 0.12) / 2, // Half of avatar width
  },
  infoContainer: {
    marginLeft: width * 0.04, // 4% of screen width
  },
});
