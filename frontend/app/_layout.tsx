import {
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { ContextProviders } from "@/contexts/ContextProviders";
import { setUpCallbacks } from "@/services/UserService";

const appInit = async () => {
  const deInitUserCallbacks = setUpCallbacks();

  return () => {
    deInitUserCallbacks();
  };
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [appInited, setAppInited] = useState(false);

  useEffect(() => {
    let deInit = () => {};
    
    appInit().then(func => {
      deInit = func;
      setAppInited(true);
    });

    return () => {
      deInit();
    };
  }, []);

  useEffect(() => {
    if (fontLoaded && appInited) {
      console.log("Initialized, hiding splash screen");
      SplashScreen.hideAsync();
    }
  }, [appInited, fontLoaded]);

  if (!fontLoaded || !appInited) {
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
              name="(accounts)/AccountScreen"
              options={{ headerTitle: "个人信息", headerBackTitle: "返回" }}
            />
            <Stack.Screen
              name="(accounts)/LoginScreen"
              options={{ headerTitle: "登录/注册", headerBackTitle: "返回" }}
            />
            <Stack.Screen
              name="(accounts)/RegisterScreen"
              options={{ headerTitle: "注册", headerBackTitle: "返回" }}
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
            <Stack.Screen
              name="MotionScreen"
              options={{ headerTitle: "动作详情", headerBackTitle: "返回" }}
            />
            <Stack.Screen
              name="CalculatorScreen"
              options={{ headerTitle: "RM计算器", headerBackTitle: "返回" }}
            />
          </Stack>
        </ThemeProvider>
      </ContextProviders>
    </GluestackUIProvider>
  );
}
