import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Modal,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemedText } from "../ThemedText";
import clfData from "@/res/bodypart/json/comb.json";

const EquipmentHeader = ({ OnSelect }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-300)).current;

  const categories = ["全部", ...clfData.map((item) => item.name)];

  const toggleMenu = () => {
    if (isMenuVisible) {
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIsMenuVisible(false);
      });
    } else {
      setIsMenuVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleCategoryClick = (index) => {
    // 根据不同的分类
    // toggleMenu();
    toggleMenu();
    OnSelect(index);
  };

  return (
    <SafeAreaView style={styles.headerContainer}>
      {/* 左侧菜单按钮 */}
      <TouchableOpacity style={styles.iconButton} onPress={toggleMenu}>
        <MaterialIcons name="menu" size={30} color="black" />
      </TouchableOpacity>

      {/* 中间搜索框 */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search Equipment"
        placeholderTextColor="#888"
      />

      {/* 右侧相机按钮 */}
      <TouchableOpacity style={styles.iconButton}>
        <MaterialIcons
          name="camera-alt"
          size={30}
          color="black"
          onPress={() => alert("Camera")}
        />
      </TouchableOpacity>

      {/* 菜单弹出框 */}
      <Modal
        transparent={true}
        visible={isMenuVisible}
        animationType="none"
        onRequestClose={toggleMenu}
      >
        <TouchableWithoutFeedback onPress={toggleMenu}>
          <SafeAreaView
            style={{ flex: 1, backgroundColor: "rgba(240,248,255,0.2)" }}
          >
            <Animated.View
              style={[
                styles.menuContainer,
                { transform: [{ translateX: slideAnim }] },
              ]}
            >
              <Animated.ScrollView >
              {categories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleCategoryClick(index)}
                  style={{}}
                >
                  <ThemedText
                    type="defaultBold"
                    style={{ marginVertical: 10, paddingLeft: 10 }}
                  >
                    {category}
                  </ThemedText>
                </TouchableOpacity>
              ))}
              </Animated.ScrollView>
            </Animated.View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  iconButton: {
    padding: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 20,
    backgroundColor: "#f0f0f0",
  },
  menuContainer: {
    width: "50%",
    backgroundColor: "white",
    paddingVertical: 50,
    padding: 20,
  },
  menuItem: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default EquipmentHeader;
