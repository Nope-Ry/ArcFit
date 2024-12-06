import React, { createContext, useState, useContext, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import { server } from '@/constants/APIs';
import { AsyncStorage } from '@/imports/Storage';
import { Image } from "expo-image";
export interface ServerUserInfo {
  username: string,
  first_name: string,
  last_name: string,
  email: string,
  age: number,
  gender: 0 | 1 | 2,
  phone_number: string,
  avatar_url: string,
};

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

export type UserInfo = ServerUserInfo & {
  isLogin: boolean,
  avatarLocalUri: string,
};

type useStateRet = ReturnType<typeof useState<UserInfo>>;
type UserInfoState = {
  user: useStateRet[0],
  setUser: useStateRet[1]
};

const UserContext = createContext<UserInfoState>(null);

interface UserProviderProps {
  children: React.ReactNode,
  userValue?: UserInfo
};

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

export const UserProvider = (props: UserProviderProps) => {
  const [user, setUser] = useState<UserInfo>(props.userValue ?? {
    isLogin: false,
    username: "未登录",
    first_name: "",
    last_name: "",
    email: "",
    age: 0,
    gender: 2,
    phone_number: "",
    avatar_url: null,
    avatarLocalUri: null,
  });

  useEffect(() => {
    console.log("Effect triggered");
    const prepareAvatar = async () => {
      if (user.avatarLocalUri === null && user.avatar_url) {
        console.log('Downloading avatar from server:', user.avatar_url);
        try {
          const newAvatarLocalUri = await downloadAvatarAsync(`${server}/${user.avatar_url}`);
          const newUser = {
            ...user,
            avatarLocalUri: newAvatarLocalUri,
          };
          await AsyncStorage.setItem('userInfo', JSON.stringify(newUser));
          setUser(newUser);
          console.log('Avatar downloaded:', user.avatarLocalUri);
          console.log('New user info:', JSON.stringify(user));
        } catch (e) {
          console.log('Failed to download avatar:', e);
        }
      }
    }
    prepareAvatar();
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
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
      return "未知";
    default:
      return "未知";
  }
};

export const translateAge = (age: UserInfo['age']) => {
  if (age === -1) {
    return "未知";
  } else {
    return String(age);
  }
};
