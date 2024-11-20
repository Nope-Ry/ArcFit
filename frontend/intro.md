# 开发说明

## 不要轻易修改文件名和文件结构

## 文件结构

https://docs.expo.dev/tutorial/add-navigation/#expo-router-basics

## 页面跳转

https://spin.atomicobject.com/not-assignable-parameter-never/
采用navigation实现，example参见
- frontend/app/_layout.tsx 
```tsx
<Stack.Screen
    name="AccountScreen"
    options={{ headerBackTitle: "hhh", headerTitle: "good" }}
/>
```
- frontend/app/(tabs)/index.tsx
```tsx
<AccountInfo
    avatar={require("../../assets/images/icon.png")}
    username="Ruchang Yao"
    email="hhh"
    onPress={() => navigation.navigate("AccountScreen")}
/>
```

## UI库

引入gluestack-ui v2

详见文档
https://gluestack.io/ui/docs/home/overview/introduction

## IOS simulator

参阅
https://www.waldo.com/blog/react-native-run-ios
https://docs.expo.dev/develop/development-builds/create-a-build/#create-a-build-for-emulatorsimulator

不更新版本
