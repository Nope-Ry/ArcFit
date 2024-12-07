import React, { createContext, useState, useContext, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import { server } from '@/constants/APIs';

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { Image } from "expo-image";
import { ServerUserInfo, UserInfo } from '@/contexts/UserContext.types'
import * as UserService from '@/services/UserService';

export const serverUserInfoKeys: (keyof ServerUserInfo)[] = [
  "username",
  "first_name",
  "last_name",
  "email",
  "age",
  "gender",
  "phone_number",
  "avatar_url",
];

type useStateRet = ReturnType<typeof useState<UserInfo>>;
type UserInfoState = {
  user: useStateRet[0],
  setUser: useStateRet[1],
};

const UserContext = createContext<UserInfoState>(null);

async function downloadAvatarAsync(url: string) {
  const split = url.split(".");
  const suffix = split[split.length - 1];
  const localUri = FileSystem.documentDirectory + 'avatar.' + suffix;

  console.log("Trying to download avatar: remote URL", url, "local URI", localUri);
  await FileSystem.downloadAsync(url, localUri);
  console.log("Avatar downloaded.");

  await Image.clearDiskCache();
  return localUri;
}

export const setUpCallbacks = () => {
  const unsubPrepareAvatar = UserService.subscribe(["userInited", "userAvatarChanged"], async (user) => {
    console.log("Preparing avatar for user:", JSON.stringify(user));
    if (user.avatarLocalUri === null && user.avatar_url) {
      try {
        const newAvatarLocalUri = await downloadAvatarAsync(`${server}/${user.avatar_url}`);
        const newUser = {
          ...user,
          avatarLocalUri: newAvatarLocalUri,
        };
        UserService.setUser(newUser);
      } catch (e) {
        console.log('Failed to download avatar:', e);
      }
    }
  });

  const unsubLoginExpired = UserService.subscribe("loginExpired", async () => {
    await SecureStore.deleteItemAsync('accessToken');
    UserService.resetUser();
  });

  return () => {
    unsubPrepareAvatar();
    unsubLoginExpired();
  }
}

export const UserProvider = ({children}) => {
  const [user, setUser] = useState<UserInfo>(UserService.getUser());
  
  useEffect(() => {
    const unsubSetUser = UserService.subscribe("userChanged", async (user) => {
      await AsyncStorage.setItem('userInfo', JSON.stringify(user));
      setUser(user);
    });

    return () => {
      unsubSetUser();
    };
  }, []);

  return (
    <UserContext.Provider value={{user, setUser: UserService.setUser}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export const translateGender = (gender: UserInfo['gender']) => {
  switch (gender) {
    case 0:
      return "男";
    case 1:
      return "女";
    case 2:
      return "未设置";
    default:
      return "未知";
  }
};

export const translateAge = (age: UserInfo['age']) => {
  if (age === -1) {
    return "未设置";
  } else {
    return String(age);
  }
};
