import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const { width, height } = Dimensions.get("window");

interface AccountInfoProps {
  avatar: any;
  username: string;
  email: string;
  onPress: () => void;
}

const AccountInfo: React.FC<AccountInfoProps> = ({
  avatar,
  username,
  email,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={avatar} style={styles.avatar} />
      <View style={styles.infoContainer}>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.email}>{email}</Text>
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
  username: {
    fontSize: width * 0.04, // 4% of screen width
    fontWeight: "bold",
  },
  email: {
    fontSize: width * 0.035, // 3.5% of screen width
    color: "gray",
  },
});

export default AccountInfo;
