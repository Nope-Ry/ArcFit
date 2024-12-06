import { View, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AccountInfo from "@/components/profile/AccountInfo";
import FunctionList from "@/components/FunctionList";
import * as FileSystem from "expo-file-system";
import { useNavigation } from "@react-navigation/native";

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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* 个人资料卡片 */}
        <AccountInfo />

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
