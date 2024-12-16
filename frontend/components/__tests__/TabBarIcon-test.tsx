import React from "react";
import { render } from "@testing-library/react-native";
import { TabBarIcon } from "../navigation/TabBarIcon"; // 替换为实际路径
import Ionicons from "@expo/vector-icons/Ionicons";

jest.mock("@expo/vector-icons/Ionicons", () => {
  return jest.fn(() => null); // 模拟组件，避免依赖真实的图标库
});

describe("TabBarIcon Component", () => {
  it("renders Ionicons with correct props", () => {
    const mockName = "home"; // 使用图标名称示例
    const mockStyle = { color: "blue" };

    render(<TabBarIcon name={mockName} style={mockStyle} />);

    expect(Ionicons).toHaveBeenCalledWith(
      expect.objectContaining({
        name: mockName,
        size: 28,
        style: expect.arrayContaining([
          expect.objectContaining({ marginBottom: -3 }),
          mockStyle,
        ]),
      }),
      {}
    );
  });

  it("applies default marginBottom style", () => {
    render(<TabBarIcon name="settings" />);
    expect(Ionicons).toHaveBeenCalledWith(
      expect.objectContaining({
        style: expect.arrayContaining([
          expect.objectContaining({ marginBottom: -3 }),
        ]),
      }),
      {}
    );
  });

});