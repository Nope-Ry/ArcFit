import { View, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AccountInfo from "@/components/profile/AccountInfo";
import FunctionList from "@/components/profile/FunctionList"; 
import * as FileSystem from "expo-file-system";
import { useNavigation } from "@react-navigation/native";
import AntDesign from '@expo/vector-icons/AntDesign';

const path = FileSystem.documentDirectory;
export let data: any[] = [];
FileSystem.readDirectoryAsync(path).then((files) => {
  files = files.filter((file) => file.endsWith(".json"));
  Promise.all(
    files.map((file) => FileSystem.readAsStringAsync(path + file))
  ).then((contents) => {
    contents.forEach((content) => {
      const parsedContent = JSON.parse(content);
      const requiredFields = ["duration", "date", "time", "cnt", "records"];
      const recordFields = ["name", "m_id", "group", "rating"];
      const groupFields = ["weight", "reps"];

      const hasRequiredFields = requiredFields.every(field => field in parsedContent);
      if (!hasRequiredFields) return;

      const hasValidRecords = parsedContent.records.every(record => {
        const hasRecordFields = recordFields.every(field => field in record);
        if (!hasRecordFields) return false;

        const hasValidGroups = record.group.every(group => 
          groupFields.every(field => field in group)
        );
        return hasValidGroups;
      });

      if (hasValidRecords) {
        data.push(parsedContent);
      }
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
                icon: require("../../assets/images/setting.png"),
                text: "偏好设置",
                onPress: () => { },
              },
              {
                icon: require("../../assets/images/images.png"),
                text: "计划指导",
                onPress: () => navigation.navigate("PlanGuideScreen"),
              },
              {
                icon: require("../../assets/images/statistics.png"),
                text: "训练统计",
                onPress: () => navigation.navigate("TrainingStatisticsScreen"),
              },
              {
                icon: require("../../assets/images/calculator.png"),
                text: "RM计算器",
                onPress: () => navigation.navigate("CalculatorScreen"),
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
    backgroundColor: "#fff",
  },
});
