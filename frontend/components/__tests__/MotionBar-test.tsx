import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import MotionBar from "../motion/MotionBar";
import { CartContext } from "@/contexts/CartContext"; 
import { ThemedText } from "@/components/ThemedText";
import { useNavigation } from "@react-navigation/native";

// Mock navigation hook
jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

// Mock FontAwesome icon
jest.mock("react-native-vector-icons/FontAwesome", () => "FontAwesome");

describe("MotionBar", () => {
  const mockIncrementCart = jest.fn();
  const mockNavigate = jest.fn();


  it("should render the name correctly", () => {
    const { getByText } = render(
      <CartContext.Provider value={{ cart: [], incrementCart: mockIncrementCart }}>
        <MotionBar name="Test Item" m_id="1" />
      </CartContext.Provider>
    );

    // Check if name is rendered correctly
    expect(getByText("Test Item")).toBeTruthy();
  });

});
