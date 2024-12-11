import React, { createContext, useState, useContext, useEffect } from 'react';
import { ServerUserInfo, UserInfo } from '@/contexts/UserContext.types'

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
type UserContextType = {
  user: useStateRet[0],
  setUser: useStateRet[1],
  resetUser: () => void,
};

const UserContext = createContext<UserContextType>(null);
let ctx: UserContextType = null;

type CallbackType = ((ctx: UserContextType) => void) | ((ctx: UserContextType) => Promise<void>);
const subscribers: Map<string, Set<CallbackType>> = new Map();

export const subscribeUserEvents = (event: string | string[], callback: CallbackType) => {
  const events = Array.isArray(event)? event : [event];

  const unsubs = events.map(e => {
    if (!subscribers.has(e)) {
      subscribers.set(e, new Set());
    }
    subscribers.get(e).add(callback);
    return () => {
      subscribers.get(e).delete(callback);
    };
  });

  return () => {
    unsubs.forEach(unsub => unsub());
  }
};

export const emitUserEvent = (event: string) => {
  console.log(`User event ${event} emitted`);
  if (subscribers.has(event)) {
    subscribers.get(event).forEach(callback => {
      if (callback.constructor.name === "AsyncFunction") {
        (callback(ctx) as Promise<void>).catch(console.error);
      } else {
        callback(ctx);
      }
    });
  }
};

const defaultUserInfo: UserInfo = {
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
};

export const UserProvider = ({children}) => {
  const [user, setUser] = useState<UserInfo>(defaultUserInfo);

  const resetUser = () => {
    setUser(defaultUserInfo);
  };
  
  useEffect(() => {
    const prevCtx = ctx;
    ctx = {user, setUser, resetUser};

    if (prevCtx === null) {
      emitUserEvent("userInited");
    }
    emitUserEvent("userChanged");
  }, [user]);

  return (
    <UserContext.Provider value={{user, setUser, resetUser}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

const genderOptions = ["男", "女", "保密"];

export const translateGender = (gender: UserInfo['gender']) => {
  return genderOptions[gender];
};

export const reverseGender = (val: any) => {
  return genderOptions.indexOf(val);
};

export const translateAge = (age: UserInfo['age']) => {
  if (age === -1) {
    return "未设置";
  } else {
    return String(age);
  }
};
