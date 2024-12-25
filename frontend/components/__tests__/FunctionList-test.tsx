import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import FunctionList from "../profile/FunctionList"; // 组件路径

jest.mock("@expo/vector-icons", () => ({
  Ionicons: "Ionicons", // 模拟 Ionicons
}));

describe("FunctionList", () => {
  const mockOnPress = jest.fn();

  const items = [
    {
      icon: { uri: "https://example.com/icon1.png" },
      text: "Item 1",
      onPress: mockOnPress,
    },
    {
      icon: { uri: "https://example.com/icon2.png" },
      text: "Item 2",
      onPress: mockOnPress,
    },
  ];

  it("should render a list of items", () => {
    const { getByText } = render(<FunctionList items={items} />);

    // 检查文本是否正确渲染
    expect(getByText("Item 1")).toBeTruthy();
    expect(getByText("Item 2")).toBeTruthy();
  });


  it("should trigger onPress when an item is clicked", () => {
    const { getByText } = render(<FunctionList items={items} />);

    // 模拟点击事件
    fireEvent.press(getByText("Item 1"));

    // 验证 onPress 是否被调用
    expect(mockOnPress).toHaveBeenCalledTimes(1);
    expect(mockOnPress).toHaveBeenCalledWith(); // 可以检查传递的参数
  });

  it("should handle empty list without rendering items", () => {
    const { queryByText } = render(<FunctionList items={[]} />);

    // 确保没有渲染任何项
    expect(queryByText("Item 1")).toBeNull();
    expect(queryByText("Item 2")).toBeNull();
  });

});
