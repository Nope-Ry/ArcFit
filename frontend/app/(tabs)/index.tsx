import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AccountInfo from "@/components/AccountInfo";
import FunctionList from "@/components/FunctionList";
import * as FileSystem from "expo-file-system";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useUser } from "@/contexts/UserContext";

// for Android
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as SecureStore from "expo-secure-store";

// for IOS
import { AsyncStorage } from "react-native";
import { SecureStore } from "expo";

const path = FileSystem.documentDirectory;
export let data: any[] = [];
FileSystem.readDirectoryAsync(path).then((files) => {
  files = files.filter((file) => file.endsWith(".json"));
  Promise.all(
    files.map((file) => FileSystem.readAsStringAsync(path + file))
  ).then((contents) => {
    contents.forEach((content) => {
      data.push(JSON.parse(content));
    });
  });
});

export default function ProfileScreen() {
  const navigation = useNavigation();
  const path = FileSystem.documentDirectory;

  const [userInited, setUserInited] = useState(false);
  const { user, setUser } = useUser();

  useEffect(() => {
    const init = async () => {
      try {
        const userinfo = await AsyncStorage.getItem("userinfo");
        if (userinfo !== null) {
          const user = JSON.parse(userinfo);
          console.log("Loaded user info from AsyncStorage:", user);
          setUser(user);
        }
        const token = await SecureStore.getItemAsync("access_token");
        console.log("Access token is:", token);
      } catch (e) {
        console.warn("Exception when loading user info:", e);
      }

      // await AsyncStorage.removeItem("userinfo");
      setUserInited(true);
    };

    console.log("Init called");
    init();
  }, [setUser]);

  if (!userInited) {
    return null;
  }

  console.log("Redraw triggered");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* 个人资料卡片 */}
        <AccountInfo
          avatar={require("../../assets/images/icon.png")}
          username={user.username}
          email={user.email}
          onPress={() => navigation.navigate("AccountScreen")}
        />

        {/* 按钮列表 */}
        <View style={{ flex: 1 }}>
          <FunctionList
            items={[
              {
                icon: require("../../assets/images/favicon.png"),
                text: "偏好设置",
                onPress: () => { },
              },
              {
                icon: require("../../assets/images/favicon.png"),
                text: "照片时刻",
                onPress: () => { },
              },
              {
                icon: require("../../assets/images/favicon.png"),
                text: "模式切换",
                onPress: () => { },
              },
              {
                icon: require("../../assets/images/favicon.png"),
                text: "训练统计",
                onPress: () => navigation.navigate("TrainingStatisticsScreen"),
              },
            ]}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});
