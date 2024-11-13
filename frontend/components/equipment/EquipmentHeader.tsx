import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView, TouchableOpacity, TextInput, Modal, Text, Animated, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemedText } from "../ThemedText";

const EquipmentHeader = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-300)).current;

  const categories = ["Cardio", "Strength", "Flexibility", "Balance"];

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
  
  const handleCategoryClick = (category) => {
    // 根据不同的分类
    // toggleMenu();
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
        <MaterialIcons name="camera-alt" size={30} color="black" onPress={() => alert("Camera")} />
      </TouchableOpacity>

      {/* 菜单弹出框 */}
      <Modal
        transparent={true}
        visible={isMenuVisible}
        animationType="none"
        onRequestClose={toggleMenu}
        >
        <TouchableWithoutFeedback onPress={toggleMenu}>
          <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
            <Animated.View style={[styles.menuContainer, { transform: [{ translateX: slideAnim }] }]}>
              {categories.map((category, index) => (
                <ThemedText
                  key={index} 
                  type="defaultBold"
                  onPress={() => handleCategoryClick(category)}
                  style={{ marginVertical: 10 }}
                >
                  {category}
                </ThemedText>
              ))}
            </Animated.View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff', 
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
    backgroundColor: '#f0f0f0',
  },
  menuContainer: {
    width: "50%",
    height: "100%",
    backgroundColor: "white",
    padding: 20,
  },
  menuItem: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default EquipmentHeader;
