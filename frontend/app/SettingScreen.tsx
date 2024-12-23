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
import motionData from "@/res/motion/json/comb.json"; // Adjust the import path as necessary
import { data } from "./(tabs)/profile";
import { API } from "@/constants/APIs";


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

    const getAllFiles = () => {
        const date = new Date();
        const startOfDay = new Date(date);
        startOfDay.setFullYear(startOfDay.getFullYear() - 1);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        console.log(startOfDay, endOfDay);

        const start_time = startOfDay.toISOString();
        const end_time = endOfDay.toISOString();

        const getRecord = async () => {
            try {
                const response = await API.call(API.Account.getHistoryRecord, {
                    start_time,
                    end_time,
                });
                console.log(response);
                const today_record = response.map((record) => ({
                    date: record.start_time.split("T")[0],
                    time: record.start_time.split("T")[1].split(".")[0],
                    duration: record.duration_seconds,
                    records: record.records,
                    cnt: record.id,
                    dateTime: record.start_time,
                }));
                today_record.map((record) => {
                    record.records.map((r) => {
                        r.name = motionData[r.m_id - 1].name;
                        r.b_id = motionData[r.m_id - 1].b_id;
                    });
                });
                today_record.map((record) => {
                    const path =
                        FileSystem.documentDirectory +
                        record["date"] +
                        "_" +
                        record["cnt"] +
                        ".json";
                    console.log(path);
                    if(record.records.length > 0){
                        FileSystem.writeAsStringAsync(path, JSON.stringify(record))
                        .then(() => {
                            console.log("写到了", path);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                        data.push(record);
                    }
                });

            } catch (e) {
                console.error(e);
            }
        }
        getRecord();
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
                onPress={() => getAllFiles()}
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