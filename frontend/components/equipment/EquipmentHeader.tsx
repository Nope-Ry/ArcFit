import React, { useState, useRef, useEffect } from "react";
import { View, TouchableOpacity, TextInput, Modal, Text, Animated, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const EquipmentHeader = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-300)).current;

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
  
  return (

    <View style={styles.headerContainer}>
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
        <MaterialIcons name="camera-alt" size={30} color="black" />
      </TouchableOpacity>

      {/* 菜单弹出框 */}
      <Modal
      transparent={true}
      visible={isMenuVisible}
      animationType="none"
      onRequestClose={toggleMenu}
    >
      <TouchableWithoutFeedback onPress={toggleMenu}>
        <View style={{ flex: 1 }}>
          <Animated.View style={[styles.menuContainer, { transform: [{ translateX: slideAnim }] }]}>
            <Text style={styles.menuItem}>Menu Item 1</Text>
            <Text style={styles.menuItem}>Menu Item 2</Text>
            <Text style={styles.menuItem}>Menu Item 3</Text>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
    </View>
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
    width: "70%",
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
