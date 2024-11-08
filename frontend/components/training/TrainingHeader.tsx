import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "../ThemedText";

const { width, height } = Dimensions.get("window");

interface TrainingHeaderProps {
  onButtonPress: () => void;
}

export default function TrainingHeader({ onButtonPress }: TrainingHeaderProps) {
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isPaused) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1000); // Increment by 1000 milliseconds (1 second)
      }, 1000);
    } else if (isPaused && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPaused]);

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
        <TouchableOpacity onPress={() => setIsPaused(!isPaused)}>
          <Ionicons name={isPaused ? "play" : "pause"} size={width * 0.06} />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={onButtonPress} style={styles.button}>
          <ThemedText type="default" style={styles.buttonText}>
            结束训练
          </ThemedText>
        </TouchableOpacity>
      </View>
      <View style={styles.line2}>
        {/* <Text>{new Date().toLocaleDateString()}</Text> */}
        <ThemedText type="default">{new Date().toLocaleDateString()}</ThemedText>
        <ThemedText type="default">1/8</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    marginTop: height * 0.06,
  },
  line1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: height * 0.01,
  },
  button: {
    padding: width * 0.02,
    backgroundColor: "#007BFF",
    borderRadius: width * 0.02,
  },
  buttonText: {
    color: "#FFFFFF",
  },
  line2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
