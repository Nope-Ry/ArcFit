import React, { useState, useEffect } from "react";
import { View, Button } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native";
import TrainingHeader from "../../components/training/TrainingHeader";
import ExerciseCard from "../../components/training/ExerciseCard";
import HistoryRecordHeader from "@/components/training/HistoryRecordHeader";
import RecordList from "@/components/training/RecordCard";
import MainRecord from "@/components/training/MainRecord";
import { ThemedText } from "@/components/ThemedText";

import { data } from "../../app/(tabs)/index";
import * as FileSystem from "expo-file-system";

import { useContext } from "react";
import { CartContext } from "@/components/CartContext";

import { SafeAreaView } from "react-native-safe-area-context";

import motionData from "@/res/motion/json/comb.json";
import { motion_imgs } from "@/res/motion/motion_img";

import { useNavigationState } from "@react-navigation/native";

let cnt = 0;

export default function TrainingScreen() {
  const path = FileSystem.documentDirectory;
  // console.log(path);
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
      console.log("当前的m_id_list为：", m_id_list);
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
      console.log("当前的exerSetsMap为：", exerSetsMap);
      setRatingMap((prevExerSetsMap) => ({
        ...prevExerSetsMap,
        ...cart.reduce((acc, id) => {
          acc[id] = 3;
          return acc;
        }, {}),
      }));
      clearCart();
    }
  }, [cart, currentRoute, isTraining]);

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
          b_id: b_id, // 寻找m_id到b_id的映射，未完成
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
    }

    setIsTraining(!isTraining);
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
              }}
              exerSets={exerSetsMap[item]}
              setExerSets={(newSets) =>
                setExerSetsMap((prev) => ({ ...prev, [item]: newSets }))
              }
              rating={ratingMap[item]}
              setRating={(newRating) =>
                setRatingMap((prev) => ({ ...prev, [item]: newRating }))
              }
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <HistoryRecordHeader
          date={date}
          setDate={(newDate) => setDate(newDate)}
        />
        <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
          <MainRecord date={date} />
          <RecordList date={date} />
        </ScrollView>
        <View className="bg-white h-20 px-4 py-4">
          <TouchableOpacity
            className="w-full h-full flex justify-center items-center bg-[#007BFF] rounded-md"
            onPress={toggleView}
          >
            <ThemedText type="default" lightColor="white">
              开始训练
            </ThemedText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
