# 开发说明

## 文件结构

https://docs.expo.dev/tutorial/add-navigation/#expo-router-basics

## 页面跳转

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