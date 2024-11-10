import { Image, StyleSheet, Platform } from "react-native";

import { Text } from "react-native";

import { Box } from "@/components/ui/box";

export default function HomeScreen() {
  return (
    <Box className="bg-primary-500 p-5">
      <Text className="text-typography-0">This is the Box</Text>
    </Box>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
