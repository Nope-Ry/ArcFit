import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "../ThemedText";

const { width, height } = Dimensions.get("window");

interface TrainingHeaderProps {
  onButtonPress: () => void;
  time: any;
  setTime: (time: any) => void;
}

export default function TrainingHeader({ onButtonPress, time, setTime }: TrainingHeaderProps) {
  const [isPaused, setIsPaused] = useState(true);
  // const [time, setTime] = useState(0);


  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (!isPaused) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1000); // Increment by 1000 milliseconds (1 second)
      }, 1000);
    } else if (isPaused && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPaused, time, setTime]);

  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const getSeconds = `0${seconds % 60}`.slice(-2);
    const minutes = Math.floor(seconds / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    return `${getMinutes}:${getSeconds}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.line1}>
        <ThemedText type="title">{formatTime(time)}</ThemedText>
        <TouchableOpacity
          onPress={() => setIsPaused(!isPaused)}
          style={{ position: "absolute", left: width * 0.26 }}
        >
          <Ionicons name={isPaused ? "play" : "pause"} size={width * 0.06} />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={onButtonPress} style={styles.button}>
          <ThemedText type="defaultBold" style={styles.buttonText}>
            结束训练
          </ThemedText>
        </TouchableOpacity>
      </View>
      <View style={styles.line2}>
        {/* <Text>{new Date().toLocaleDateString()}</Text> */}
        <ThemedText type="defaultBold">
          {new Date().toLocaleDateString()}
        </ThemedText>
        <ThemedText type="defaultBold"></ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    // marginTop: height * 0.01,
  },
  line1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: height * 0.01,
  },
  button: {
    padding: width * 0.02,
    backgroundColor: "#FFA07A",
    borderRadius: width * 0.02,
  },
  buttonText: {
    color: "#260d01",
  },
  line2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
