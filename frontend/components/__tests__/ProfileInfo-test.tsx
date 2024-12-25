import React from "react";
import { render } from "@testing-library/react-native";
import ProfileInfo from "../profile/ProfileInfo";

// 模拟 Ionicons 以避免图标的实际渲染
jest.mock("@expo/vector-icons", () => ({
  Ionicons: "Ionicons",
}));

describe("ProfileInfo", () => {
  it("should render label and value correctly", () => {
    const { getByText } = render(
      <ProfileInfo label="Username" value="John Doe" icon={{ uri: "https://example.com/icon.png" }} />
    );

    // 检查 label 和 value 是否渲染
    expect(getByText("Username")).toBeTruthy();
    expect(getByText("John Doe")).toBeTruthy();
  });

  it("should render '未设置' if value is an empty string", () => {
    const { getByText } = render(
      <ProfileInfo label="Username" value="" icon={{ uri: "https://example.com/icon.png" }} />
    );

    // 检查是否渲染 '未设置'
    expect(getByText("未设置")).toBeTruthy();
  });

});
