import { downloadAvatarAsync } from "@/components/Avatar";
import { subscribeUserEvents } from "@/contexts/UserContext";
import { server } from "@/constants/APIs";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const setUpCallbacks = () => {
  const unsubLoadUser = subscribeUserEvents("userInited", async (ctx) => {
    try {
      const userinfo = await AsyncStorage.getItem("userInfo");
      if (userinfo !== null) {
        const user = JSON.parse(userinfo);
        console.log("User info loaded:", user);
        ctx.setUser(user);
      }
    } catch (e) {
      console.warn("Exception when loading user info:", e);
    }
  });

  const unsubPrepareAvatar = subscribeUserEvents(["userInited", "userAvatarChanged"], async (ctx) => {
    const { user, setUser } = ctx;
    console.log('Preparing avatar for user:', user);
    
    if (user.avatarLocalUri === null && user.avatar_url) {
      try {
        const newAvatarLocalUri = await downloadAvatarAsync(`${server}/${user.avatar_url}`);
        const newUser = {
          ...user,
          avatarLocalUri: newAvatarLocalUri,
        };
        setUser(newUser);
      } catch (e) {
        console.log('Failed to download avatar:', e);
      }
    }
  });

  const unsubLoginExpired = subscribeUserEvents("loginExpired", async (ctx) => {
    console.log('Login expired, resetting user');
    await SecureStore.deleteItemAsync('accessToken');
    ctx.resetUser();
  });

  return () => {
    unsubLoadUser();
    unsubPrepareAvatar();
    unsubLoginExpired();
  }
}