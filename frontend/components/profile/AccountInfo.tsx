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
      <Avatar size={width * 0.16} />
      <View style={styles.infoContainer}>
        <ThemedText type="title">{user.username}</ThemedText>
        <ThemedText type="default">{user.email}</ThemedText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: height * 0.14,
    padding: width * 0.04, 
    marginHorizontal: width * 0.05, 
    marginVertical: height * 0.02,
    backgroundColor: "#fff7ed",
    borderRadius: width * 0.02, 
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  infoContainer: {
    marginLeft: width * 0.1, // 4% of screen width
  },
});
