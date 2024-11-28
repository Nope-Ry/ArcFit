import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "@/contexts/UserContext";
import { login_api } from "@/constants/APIs";

function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const { setUser } = useUser();

  const handleLogin = async () => {
    // Call your API to authenticate the user
    try {
      const response = await fetch(login_api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Handle successful login
        const { token, user } = await response.json();
        await SecureStore.setItemAsync("access_token", token);
        await AsyncStorage.setItem("userinfo", JSON.stringify(user));
        setUser({ ...user, is_login: true });

        Alert.alert("登录成功", `欢迎回来，${username}`, [{ text: "确定", onPress: () => navigation.navigate("index") }]);
      } else {
        // Handle login error
        Alert.alert("登录失败", "用户名或密码错误");
      }
    } catch (e) {
      Alert.alert("登录失败", `错误：${e}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>登录</Text>

      {/* 用户名输入框 */}
      <TextInput
        style={styles.input}
        placeholder="用户名"
        value={username}
        onChangeText={setUsername}
      />

      {/* 密码输入框 */}
      <TextInput
        style={styles.input}
        placeholder="密码"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* 登录按钮 */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>登录</Text>
      </TouchableOpacity>

      {/* 注册提示 */}
      <View style={styles.registerContainer}>
        <Text>还没有账号？</Text>
        <TouchableOpacity>
          <Text style={styles.registerText} onPress={() => navigation.navigate("Register")}>立即注册</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 30,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },
  input: {
    height: 50,
    borderColor: "#525252",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  button: {
    height: 50,
    backgroundColor: "#525252",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  registerText: {
    color: "#525252",
    marginLeft: 5,
  },
});

export default LoginScreen;
