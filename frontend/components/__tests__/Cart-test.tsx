import React from "react";
import { render } from "@testing-library/react-native";
import Cart from "../Cart"; // 替换为实际路径
import { CartContext } from "@/contexts/CartContext";
import { NavigationContainer } from "@react-navigation/native";

jest.mock("@expo/vector-icons/MaterialIcons", () => {
  return jest.fn(() => null); // 模拟 MaterialIcons，避免依赖外部库
});

describe("Cart Component", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithNavigation = (cart) =>
    render(
      <CartContext.Provider value={{ cart }}>
        <NavigationContainer>
          <Cart />
        </NavigationContainer>
      </CartContext.Provider>
    );

  it("does not render when the cart is empty", () => {
    const { queryByTestId } = renderWithNavigation([]);

    // 验证组件未渲染
    expect(queryByTestId("cart-icon")).toBeNull();
  });


});