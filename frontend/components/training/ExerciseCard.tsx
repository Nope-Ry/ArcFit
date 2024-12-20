import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  TextInput,
  ImageBackground,
  Modal,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Divider } from "@/components/ui/divider";
import Slider from "@react-native-community/slider";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import CustomLineChart from "../statistic/CustomLineChart";
import { data } from "../../app/(tabs)/profile";
import { Alert } from "react-native";

import { ThemedText } from "../ThemedText";
const { width, height } = Dimensions.get("window");

interface ExerciseCardProps {
  exercise: {
    name: string;
    image: any;
    m_id: number;
  };
  exerSets: { reps: string; weight: string; checked: boolean }[];
  setExerSets: (
    sets: { reps: string; weight: string; checked: boolean }[]
  ) => void;
  rating: number;
  setRating: (rating: number) => void;
  onDelete: () => void;
  motionHistory: any;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  exerSets,
  setExerSets,
  rating,
  setRating,
  onDelete,
  motionHistory,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [showindex, setShowindex] = useState(0);
  // const [rating, setRating] = useState(3);

  const navigation = useNavigation();

  const showAlert = (formattedDate, weight) => {
    Alert.alert("继续加油💪", `${formattedDate} 容量为 ${weight}kg`, [
      { text: "OK" },
    ]);
  };
  const getSliderColor = (value) => {
    if (value <= 2) return "#4CAF50"; // 绿色
    if (value <= 4) return "#FFC107"; // 黄色
    return "#FF5252"; // 红色
  };

  const firstDay = new Date(
    Math.min(...data.map((item) => new Date(item.date).getTime()))
  );
  const date = new Date(firstDay);
  date.setDate(date.getDate() + showindex);
  const formattedDate = `${date.getFullYear()}年${
    date.getMonth() + 1
  }月${date.getDate()}日`;

  const handleWeightChange = (text, index) => {
    let numericText = text.replace(/[^0-9.]/g, "");
    if (parseFloat(numericText) > 500) {
      numericText = "500";
    }
    if (numericText.includes(".")) {
      const parts = numericText.split(".");
      if (parts[1].length > 1) {
        numericText = `${parts[0]}.${parts[1].slice(0, 1)}`;
      }
    }
    if (/^0[0-9]+$/.test(numericText)) {
      numericText = numericText.replace(/^0+/, "");
    }
    updateSet(index, "weight", numericText);
  };

  const handleRepsChange = (text, index) => {
    let numericText = text.replace(/[^0-9]/g, "");
    if (parseInt(numericText, 10) > 100) {
      numericText = "100";
    }
    if (/^0[0-9]+$/.test(numericText)) {
      numericText = numericText.replace(/^0+/, "");
    }
    updateSet(index, "reps", numericText);
  };

  const addSet = () => {
    const lastSet = exerSets[exerSets.length - 1];
    setExerSets([...exerSets, { ...lastSet, checked: false }]);
  };

  const updateSet = (index, key, value) => {
    const newSets = [...exerSets];
    newSets[index][key] = value;
    setExerSets(newSets);
  };

  const deleteSet = (index) => {
    const newSets = exerSets.filter((_, i) => i !== index);
    setExerSets(newSets);
  };

  const toggleCheckbox = (index) => {
    const newSets = [...exerSets];
    newSets[index].checked = !newSets[index].checked;
    setExerSets(newSets);
  };

  const getMaxWeights = (groups) => {
    return groups.map((group) => {
      return Math.max(...group.map((set) => set.weight));
    });
  };

  const maxWeights = getMaxWeights(motionHistory.groups);

  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => setIsExpanded(!isExpanded)}
        style={styles.cardHeader}
      >
        <ImageBackground
          source={exercise.image}
          style={styles.image}
          imageStyle={styles.imageStyle}
        />
        <View style={styles.textContainer}>
          <ThemedText type="subtitle" style={styles.exerciseName}>
            {exercise.name}
          </ThemedText>
          <ThemedText type="small" style={styles.groupInfo}>
            已完成 {exerSets.filter((set) => set.checked).length} /{" "}
            {exerSets.length} 组
          </ThemedText>
        </View>
        <TouchableOpacity onPress={onDelete}>
          {/* <Ionicons name="settings-outline" size={width * 0.06} /> */}
          <MaterialIcons
            name="delete-forever"
            size={width * 0.07}
            color="black"
          />
        </TouchableOpacity>
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.expandedContent}>
          {/* 训练组信息 */}
          <Divider />
          <View style={{ flex: 1, height: height * 0.015 }} />

          {exerSets.map((set, index) => (
            <View key={index} style={styles.row}>
              <ThemedText type="defaultBold">{index + 1}</ThemedText>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={set.weight}
                  onChangeText={(text) => handleWeightChange(text, index)}
                  keyboardType="numeric"
                />
                <ThemedText type="small" style={styles.unitText}>
                  kg
                </ThemedText>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={set.reps}
                  onChangeText={(text) => handleRepsChange(text, index)}
                  keyboardType="numeric"
                />
                <ThemedText type="small" style={styles.unitText}>
                  次
                </ThemedText>
              </View>
              <TouchableOpacity onPress={() => deleteSet(index)}>
                <Ionicons name="trash-outline" size={width * 0.06} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => toggleCheckbox(index)}>
                <Ionicons
                  name={set.checked ? "checkbox" : "checkbox-outline"}
                  size={width * 0.06}
                  color={set.checked ? "#000" : "#ccc"}
                />
              </TouchableOpacity>
            </View>
          ))}

          <View style={styles.row}>
            <TouchableOpacity onPress={addSet}>
              <Ionicons name="add-circle-outline" size={width * 0.06} />
            </TouchableOpacity>
            <View style={styles.ratingContainer}>
              <View style={{ flex: 1 }} />
              {/* <ThemedText type="defaultBold">强度</ThemedText> */}
              <Slider
                style={styles.slider}
                value={rating}
                onValueChange={setRating}
                minimumValue={1}
                maximumValue={5}
                step={1}
                minimumTrackTintColor={getSliderColor(rating)}
                maximumTrackTintColor="#D3D3D3"
                thumbTintColor={getSliderColor(rating)}
              />
              <ThemedText type="default" style={styles.ratingText}>
                {rating.toFixed(0)}
              </ThemedText>
            </View>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate("MotionScreen", { m_id: exercise.m_id })
              }
            >
              <ThemedText type="defaultBold" style={styles.buttonText}>
                动作纠正
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setModalVisible(true);
              }}
            >
              <ThemedText type="defaultBold" style={styles.buttonText}>
                历史记录
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <ThemedText type="subtitle" style={{ padding: 10 }}>
              历史记录
            </ThemedText>
            {motionHistory.days.length === 0 ? (
              <ThemedText type="default">没有当前动作历史记录</ThemedText>
            ) : (
              <>
                {/* 上次做此动作的信息 */}
                <ThemedText type="default">
                  上次做此动作是在{formattedDate}
                </ThemedText>
                <ScrollView
                  style={{
                    marginTop: 20,
                    maxHeight: height * 0.2,
                    marginBottom: 10,
                  }}
                >
                  {motionHistory.groups[showindex].map((set, index) => (
                    <View
                      key={index}
                      style={{ width: width * 0.8, height: height * 0.05 }}
                    >
                      <ThemedText
                        type="default"
                        style={{ textAlign: "center" }}
                      >{`${index + 1}         重量：${
                        set.weight
                      }kg         次数：${set.reps}次`}</ThemedText>
                    </View>
                  ))}
                </ScrollView>
                <Divider />
                {/* 动作历史记录 */}
                <ThemedText
                  type="subtitle"
                  style={{ marginTop: 20, marginBottom: 10 }}
                >
                  重量记录
                </ThemedText>
                <CustomLineChart
                  parameterData={maxWeights}
                  parameterLabels={motionHistory.days}
                  showParameterInfo={(index) => {
                    setShowindex(index);
                    showAlert(formattedDate, maxWeights[index]);
                  }}
                />
              </>
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <ThemedText type="defaultBold" lightColor="black">
                关闭
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: height * 0.01,
    padding: width * 0.03,
    backgroundColor: "#fff",
    borderRadius: width * 0.02,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: (width * 0.15) / 2,
    overflow: "hidden",
  },
  imageStyle: {
    borderRadius: (width * 0.15) / 2,
  },
  textContainer: {
    marginTop: height * 0.01,
    flex: 1,
    marginLeft: width * 0.03,
    justifyContent: "center",
  },
  exerciseName: {
    flex: 1,
    marginLeft: width * 0.03,
  },
  groupInfo: {
    flex: 1,
    marginLeft: width * 0.03,
  },
  expandedContent: {
    paddingTop: height * 0.02,
  },
  row: {
    marginTop: height * 0.01,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: height * 0.01,
  },
  numberText: {
    fontSize: width * 0.04,
  },
  inputContainer: {
    position: "relative",
    width: width * 0.2,
  },
  input: {
    height: height * 0.05,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: width * 0.02,
    textAlign: "center",
    fontSize: width * 0.04,
  },
  unitText: {
    position: "absolute",
    right: width * 0.02,
    top: -height * 0.01,
    backgroundColor: "#fff",
    paddingHorizontal: width * 0.01,
  },
  ratingContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
    width: width * 0.6,
  },
  slider: {
    flex: 1,
    height: height * 0.04,
    marginHorizontal: width * 0.02,
  },
  ratingText: {
    width: width * 0.08,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: height * 0.02,
  },
  button: {
    flex: 1,
    padding: width * 0.03,
    backgroundColor: "#FFA07A",
    borderRadius: width * 0.02,
    alignItems: "center",
    marginHorizontal: width * 0.01,
  },
  buttonText: {
    color: "#260d01",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: width * 0.9,
    height: height * 0.8,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#FFA07A",
    borderRadius: 5,
    width: width * 0.5,
    alignItems: "center",
  },
});

export default ExerciseCard;
