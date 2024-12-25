import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Alert,
  ScrollView,
} from "react-native";
import FunctionList from "@/components/profile/FunctionList"; 
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
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1 }}>
                <FunctionList
                    items={[
                    {
                        icon: require("../assets/images/delete.png"),
                        text: "删除所有数据",
                        onPress: removeAllFiles,
                    },
                    {
                        icon: require("../assets/images/download.png"),
                        text: "同步所有数据",
                        onPress: getAllFiles,
                    },
                    ]}
                />
                </View>
            </ScrollView>
      </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});

export default Setting;