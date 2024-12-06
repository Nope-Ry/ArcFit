import { UserInfo } from "@/contexts/UserContext.types";

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

type CallbackType = ((user: UserInfo) => void) | ((user: UserInfo) => Promise<void>);

let user: UserInfo = defaultUserInfo;
const subscribers: Map<string, Set<CallbackType>> = new Map();

export const subscribe = (event: string | string[], subscriber: CallbackType) => {
  const subscribeSingleEvent = (event: string) => {
    if (!subscribers.has(event)) {
      subscribers.set(event, new Set());
    }
    subscribers.get(event)!.add(subscriber);
    return () => {
      subscribers.get(event)!.delete(subscriber);
    }
  }

  if (Array.isArray(event)) {
    const unsubs = event.map(subscribeSingleEvent);
    return () => {
      unsubs.forEach((unsub) => unsub());
    }
  } else {
    return subscribeSingleEvent(event);
  }
};

export const notify = (event: string) => {
  if (subscribers.has(event)) {
    subscribers.get(event)!.forEach((subscriber) => {
      if (subscriber.constructor.name === "AsyncFunction") {
        (subscriber(user) as Promise<void>).catch((error) => {
          console.error(error);
        });
      } else {
        subscriber(user);
      }
    });
  }
};

export const getUser = (): UserInfo => {
  return user;
};

export const setUser = (newUser: UserInfo) => {
  user = newUser;
  notify("userChanged");
};

export const resetUser = () => {
  setUser(defaultUserInfo);
};
