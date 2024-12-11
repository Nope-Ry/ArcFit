import React, { useContext } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ThemedText } from "./ThemedText";
import { useNavigation } from "@react-navigation/native";
import { CartContext } from '@/contexts/CartContext';

const { width } = Dimensions.get("window");

export default function Cart() {
  const navigation = useNavigation();
  const { cart } = useContext(CartContext);
  if (cart.length !== 0) {
    return (
      <TouchableOpacity
        style={styles.cartContainer}
        onPress={() => {
          navigation.navigate("training");
        }}
      >
        <MaterialIcons
          name="sports-martial-arts"
          size={width * 0.1}
          color="#fff"
        />
        {
          <View style={styles.cartBadge}>
            <ThemedText type="defaultBold" style={{ color: "#fff" }}>
              {cart.length}
            </ThemedText>
          </View>
        }
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  cartContainer: {
    position: "absolute",
    zIndex: 10,
    bottom: 20,
    right: 20,
    width: width * 0.18,
    height: width * 0.18,
    backgroundColor: "#27272a",
    borderRadius: width * 0.09,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#ff6347",
    width: width * 0.06,
    height: width * 0.06,
    borderRadius: width * 0.03,
    justifyContent: "center",
    alignItems: "center",
  },
});
