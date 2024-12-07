import React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { ThemedText } from "../ThemedText";
import Avatar from "../Avatar";
import { useUser } from "@/contexts/UserContext";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

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
      <Avatar size={width * 0.24} />
      <View style={styles.infoContainer}>
        <ThemedText type="title">{user.username}</ThemedText>
        <ThemedText type="medium">{user.email}</ThemedText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: height * 0.18,
    padding: width * 0.04, 
    marginHorizontal: width * 0.05, 
    marginVertical: height * 0.02,
    backgroundColor: "#FAF0E6",
    borderRadius: width * 0.02, 
    shadowColor: "#8B4513",
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  avatar: {
    width: width * 0.24, // 12% of screen width
    height: width * 0.24, // 12% of screen width
    borderRadius: (width * 0.24) / 2, // Half of avatar width
  },
  infoContainer: {
    marginLeft: width * 0.1, // 4% of screen width
  },
});
