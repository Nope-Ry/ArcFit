import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { ContextProviders } from "@/contexts/ContextProviders";



// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GluestackUIProvider mode="light">
      <ContextProviders>
        <ThemeProvider value={DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
            <Stack.Screen
              name="AccountScreen"
              options={{ headerBackTitle: "未登录", headerTitle: "Login" }}
            />
            <Stack.Screen
              name="EquipmentScreen"
              options={{ headerTitle: "器材详情", headerBackTitle: "器械" }}
            />
            <Stack.Screen
              name="BodyInfoScreen"
              options={{ headerTitle: "肌群详情", headerBackTitle: "身体" }}
            />
            <Stack.Screen
              name="TrainingStatisticsScreen"
              options={{ headerTitle: "训练统计", headerBackTitle: "主页" }}
            />
          </Stack>
        </ThemeProvider>
      </ContextProviders>
    </GluestackUIProvider>
  );
}
