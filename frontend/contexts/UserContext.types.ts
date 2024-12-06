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

export type UserInfo = ServerUserInfo & {
  isLogin: boolean,
  avatarLocalUri: string,
};
