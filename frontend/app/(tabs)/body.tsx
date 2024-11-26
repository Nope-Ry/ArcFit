
import { View, Text } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import InteractBody from "../../components/body/InteractBody";
// TODO: 尝试expo three：
// https://github.com/expo/expo-three?tab=readme-ov-file

export default function BodyScreen() {
  return (
    // <SafeAreaView>
      <InteractBody  />
    // </SafeAreaView>
  );
}


