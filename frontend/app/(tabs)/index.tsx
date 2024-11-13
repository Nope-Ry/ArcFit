import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AccountInfo from "@/components/AccountInfo";
import FunctionList from "@/components/FunctionList";

import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* 个人资料卡片 */}
        <AccountInfo
          avatar={require("../../assets/images/icon.png")}
          username="Ruchang Yao"
          email="hhh"
          onPress={() => navigation.navigate("AccountScreen")}
        />

        {/* 按钮列表 */}
        <View style={{ flex: 1 }}>
          <FunctionList
            items={[
              {
                icon: require("../../assets/images/favicon.png"),
                text: "偏好设置",
                onPress: () => {},
              },
              {
                icon: require("../../assets/images/favicon.png"),
                text: "照片时刻",
                onPress: () => {},
              },
              {
                icon: require("../../assets/images/favicon.png"),
                text: "模式切换",
                onPress: () => {},
              },
              {
                icon: require("../../assets/images/favicon.png"),
                text: "训练统计",
                onPress: () => {},
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
