import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Alert,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import * as FileSystem from "expo-file-system";
import { data } from "./(tabs)/profile";


const Setting = () => {
    const path = FileSystem.documentDirectory

    const removeAllFiles = () => {
        // 删去path下的所有文件
        FileSystem.readDirectoryAsync(path).then((files) => {
            files.forEach((file) => {
                FileSystem.deleteAsync(path + file);
                console.log("Deleted: " + file);
            });
            data.splice(0, data.length);
            Alert.alert("已清除所有数据");
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.toggleButton}
                onPress={() => removeAllFiles()}
            >
                <ThemedText>清除所有数据</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.toggleButton}
                onPress={() => console.log("Pressed")}
            >
                <ThemedText>同步远程数据</ThemedText>
            </TouchableOpacity>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
    toggleButton: {
        padding: 10,
        backgroundColor: '#FFA07A',
        borderRadius: 10,
        marginBottom: 10,
    },
});

export default Setting;