import React, { createContext, useState, useContext } from 'react';

export interface UserInfo {
  is_login: boolean,
  username: string,
  first_name: string,
  last_name: string,
  email: string,
  age: number,
  gender: 0 | 1 | 2,
  phone_number: string
};

type useStateRet = ReturnType<typeof useState<UserInfo>>;
type UserInfoState = {
  user: useStateRet[0],
  setUser: useStateRet[1]
};

const UserContext = createContext<UserInfoState>(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState<UserInfo>({
    is_login: false,
    username: "未登录",
    first_name: "",
    last_name: "",
    email: "",
    age: 0,
    gender: 2,
    phone_number: ""
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
