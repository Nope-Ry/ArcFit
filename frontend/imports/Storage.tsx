import { Platform } from "react-native";

export const SecureStore = (() => {
  if (Platform.OS === "android") {
    console.log("SecureStore: loading android");
    return require("expo-secure-store");
  } else if (Platform.OS === "ios") {
    console.log("SecureStore: loading ios");
    return require("expo").SecureStore;
  }
})();

export const AsyncStorage = (() => {
  if (Platform.OS === "android") {
    console.log("AsyncStorage: loading android");
    return require("@react-native-async-storage/async-storage").default;
  } else if (Platform.OS === "ios") {
    console.log("AsyncStorage: loading ios");
    return require("react-native").AsyncStorage;
  }
})();
