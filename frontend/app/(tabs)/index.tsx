import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AccountInfo from "@/components/AccountInfo";
import FunctionList from "@/components/FunctionList";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* 个人资料卡片 */}
      <AccountInfo
        avatar={require("../../assets/images/icon.png")}
        username="Ruchang Yao"
        email="hhh"
        onPress={() => {}}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});
