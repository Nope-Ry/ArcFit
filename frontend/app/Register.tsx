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

function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    // Call your API to authenticate the user
    const response = await fetch("http://101.34.70.123:8000/api/accounts/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      // Handle successful login
      const data = await response.json();
      Alert.alert("注册成功", `欢迎回来，${username}`, [{ text: "确定", onPress: () => navigation.navigate("index") }]);
    } else {
      // Handle login error
      Alert.alert("注册失败", "用户名或密码错误");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>注册</Text>

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
        <Text style={styles.buttonText}>注册</Text>
      </TouchableOpacity>

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
