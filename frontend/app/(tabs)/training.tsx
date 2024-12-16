import React, { useState, useEffect } from "react";
import { View, Button, Alert } from "react-native";
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import TrainingHeader from "../../components/training/TrainingHeader";
import ExerciseCard from "../../components/training/ExerciseCard";
import HistoryRecordHeader from "@/components/training/HistoryRecordHeader";
import RecordList from "@/components/training/RecordCard";
import MainRecord from "@/components/training/MainRecord";
import { ThemedText } from "@/components/ThemedText";

import { data } from "./profile";
import * as FileSystem from "expo-file-system";

import { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";

import { SafeAreaView } from "react-native-safe-area-context";

import motionData from "@/res/motion/json/comb.json";
import { motion_imgs } from "@/res/motion/motion_img";

import { useNavigationState } from "@react-navigation/native";
import { API } from "@/constants/APIs";


const { width, height } = Dimensions.get("window");

let cnt = 0;

const getMotionHistory = (m_id) => {
  // 出来一个弹窗，显示该动作的m_id，并利用CustomLineChart展示历史记录
  const firstDay = new Date(
    Math.min(...data.map((item) => new Date(item.date).getTime()))
  );

  const lastDay = new Date(
    Math.max(...data.map((item) => new Date(item.date).getTime()))
  );

  const intervalDays =
    Math.floor(
      (lastDay.getTime() - firstDay.getTime()) / (1000 * 60 * 60 * 24)
    ) + 1;

  const motionHistory = {
    days: [],
    groups: [],
  };

  data.forEach((item) => {
    item.records.forEach((record) => {
      const nowday =
        Math.floor(
          (new Date(item.date).getTime() - firstDay.getTime()) /
            (1000 * 60 * 60 * 24)
        ) + 1;

      if (record.m_id === m_id) {
        const dayIndex = motionHistory.days.indexOf(nowday);
        if (dayIndex !== -1) {
          record.group.forEach((group) => {
            motionHistory.groups[dayIndex].push(
              JSON.parse(JSON.stringify(group))
            );
          });
        } else {
          motionHistory.days.push(nowday);
          motionHistory.groups.push(
            record.group.map((group) => JSON.parse(JSON.stringify(group)))
          );
        }
      }
    });
  });

  // 要根据days进行排序，同时也要对groups根据days进行排序
  const sortedIndices = motionHistory.days
    .map((day, index) => ({ day, index }))
    .sort((a, b) => a.day - b.day)
    .map(({ index }) => index);

  motionHistory.days = sortedIndices.map((index) => motionHistory.days[index]);
  motionHistory.groups = sortedIndices.map(
    (index) => motionHistory.groups[index]
  );

  return motionHistory;
};

export default function TrainingScreen() {
  const path = FileSystem.documentDirectory;
  // TODO: 更改为useContext
  const [isTraining, setIsTraining] = useState(false);
  const [time, setTime] = useState(0);
  const [date, setDate] = useState(new Date());

  const [m_id_list, setM_id_list] = useState([]);
  const { cart, clearCart } = useContext(CartContext);

  const currentRoute = useNavigationState((state) => {
    const route = state.routes[state.index];
    return route.name;
  });

  useEffect(() => {
    if (cart.length > 0 && currentRoute === "training" && isTraining) {
      setM_id_list((prevM_id_list) => [...prevM_id_list, ...cart]);
      setExerSetsMap((prevExerSetsMap) => ({
        ...prevExerSetsMap,
        ...cart.reduce((acc, id) => {
          acc[id] = [
            { reps: "10", weight: "60", checked: false },
            { reps: "10", weight: "60", checked: false },
            { reps: "12", weight: "50", checked: false },
          ];
          return acc;
        }, {}),
      }));
      setRatingMap((prevExerSetsMap) => ({
        ...prevExerSetsMap,
        ...cart.reduce((acc, id) => {
          acc[id] = 3;
          return acc;
        }, {}),
      }));
      clearCart();
    }
  }, [cart, currentRoute, isTraining, clearCart]);

  const [exerSetsMap, setExerSetsMap] = useState(
    m_id_list.reduce((acc, id) => {
      acc[id] = [
        { reps: "10", weight: "60", checked: false },
        { reps: "10", weight: "60", checked: false },
        { reps: "12", weight: "50", checked: false },
      ];
      return acc;
    }, {})
  );

  const [ratingMap, setRatingMap] = useState(
    m_id_list.reduce((acc, id) => {
      acc[id] = 3;
      return acc;
    }, {})
  );

  // 切换显示方式
  const toggleView = () => {
    if (isTraining) {
      // 清空useState数据
      setM_id_list([]);
      setExerSetsMap({});
      setRatingMap({});

      // time除以60000得到分钟数，然后转换为字符串
      const mins = Math.floor(time / 60000);
      const paths = FileSystem.documentDirectory;

      console.log("当前的时间为：", mins);

      const hist = {
        duration: mins,
        date: new Date().toISOString().split("T")[0],
        time: new Date().toLocaleTimeString(),
        cnt: cnt,
        records: [],
      };

      cnt += 1;
      for (let key in exerSetsMap) {
        exerSetsMap[key] = exerSetsMap[key].map(({ checked, ...rest }) => rest);
      }

      for (let key in m_id_list) {
        const b_id = motionData[m_id_list[key] - 1].b_id;
        const records = {
          name: motionData[m_id_list[key] - 1].name,
          m_id: m_id_list[key],
          b_id: b_id,
          group: exerSetsMap[m_id_list[key]],
          rating: ratingMap[m_id_list[key]],
        };
        hist["records"].push(records);
      }
      const stringdate = hist["date"].replace(/-/g, "_");
      const path =
        FileSystem.documentDirectory +
        hist["date"] +
        "_" +
        hist["cnt"] +
        ".json";
      console.log(path);
      FileSystem.writeAsStringAsync(path, JSON.stringify(hist))
        .then(() => {
          console.log("写到了", path);
        })
        .catch((err) => {
          console.log(err);
        });
      data.push(hist);
      setTime(0);

      const postHistoryRrcord = async () => {
        try {
          const response = await API.call(API.Account.uploadHistoryRecord, {
            start_time: hist["time"],
            duration_seconds: hist["duration"],
            records: hist["records"],
          });
          const result = await response.json();
          console.log(result);
        }
        catch (e) {
          console.error(e);
          Alert.alert("上传失败，请稍后再试");
        }
      }

      postHistoryRrcord();
    }

    setIsTraining(!isTraining);
  };

  const handleDelete = (item) => {
    setM_id_list((prev) => prev.filter((id) => id !== item));
    setExerSetsMap((prev) => {
      const newMap = { ...prev };
      delete newMap[item];
      return newMap;
    });
    setRatingMap((prev) => {
      const newMap = { ...prev };
      delete newMap[item];
      return newMap;
    });
  };

  if (isTraining) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        {/* 上部容器 */}
        <View style={{ padding: 15, backgroundColor: "white" }}>
          <TrainingHeader
            onButtonPress={toggleView}
            time={time}
            setTime={(newTime) => setTime(newTime)}
          />
        </View>

        {/* 下部滚动容器 */}
        <ScrollView style={{ flex: 1, padding: 15 }}>
          {m_id_list.map((item, index) => (
            <ExerciseCard
              key={index}
              exercise={{
                name: `${motionData[item - 1].name}`,
                image: motion_imgs[item],
                m_id: item,
              }}
              exerSets={exerSetsMap[item]}
              setExerSets={(newSets) =>
                setExerSetsMap((prev) => ({ ...prev, [item]: newSets }))
              }
              rating={ratingMap[item]}
              setRating={(newRating) =>
                setRatingMap((prev) => ({ ...prev, [item]: newRating }))
              }
              onDelete={() => {
                handleDelete(item);
              }}
              motionHistory={getMotionHistory(item)}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          <HistoryRecordHeader
            date={date}
            setDate={(newDate) => setDate(newDate)}
          />
          <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
            <MainRecord date={date} />
            <RecordList date={date} />
          </ScrollView>
        </SafeAreaView>

        <TouchableOpacity style={styles.button} onPress={toggleView}>
          <ThemedText type="defaultBold">开始训练</ThemedText>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    height: height * 0.05,
    width: width,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFA07A",
  },
});
