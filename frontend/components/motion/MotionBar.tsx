import { ThemedText } from "@/components/ThemedText";
import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  View,
  Dimensions,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";

const { width, height } = Dimensions.get("window");

const MotionBar = ({ name, m_id }) => {
  const { cart, incrementCart } = useContext(CartContext);
  return (
    <View style={styles.recommendedAction}>
      <TouchableOpacity style={styles.plusButton}
        onPress={()=>{incrementCart(m_id);}}>
        <FontAwesome name="plus" size={width * 0.03} color="#fff" />
      </TouchableOpacity>
      <View style={styles.textContent}>
        {cart.includes(m_id) ? (
          <ThemedText type="defaultBold" style={{ textAlign: "center", color: "#D3D3D3" }}>
            {name}
          </ThemedText>
        ) :
        <ThemedText type="defaultBold" style={{ textAlign: "center",color: "black" }}>
          {name}
        </ThemedText>}
      </View>
      <TouchableOpacity style={styles.infoButton}>
        <FontAwesome name="info-circle" size={width * 0.06} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  plusButton: {
    backgroundColor: "#000",
    padding: 5,
    marginRight: "5%",
    width: width * 0.05,
    height: width * 0.05,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  recommendedAction: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: width * 0.05,
    marginRight: width * 0.05,
    marginBottom: 20,
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 60,
  },
  textContent: {
    flex: 1,
    justifyContent: "center",
    marginRight: "8%",
  },
  infoButton: {
    marginLeft: "5%",
    width: width * 0.07,
    height: width * 0.07,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MotionBar;
