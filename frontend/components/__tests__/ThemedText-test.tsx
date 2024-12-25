import React from "react";
import { render } from "@testing-library/react-native";
import { ThemedText } from "../ThemedText"; // 替换为实际路径
import { useThemeColor } from "@/hooks/useThemeColor";

jest.mock("@/hooks/useThemeColor", () => ({
  useThemeColor: jest.fn(),
}));

describe("ThemedText Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with default type and theme color", () => {
    (useThemeColor as jest.Mock).mockReturnValue("#000");

    const { getByText } = render(
      <ThemedText lightColor="#fff">Default Text</ThemedText>
    );

    const textElement = getByText("Default Text");

    // 验证文本内容
    expect(textElement).toBeTruthy();

    // 验证样式是否包含默认样式
    expect(textElement.props.style).toContainEqual({ color: "#000" });
    expect(textElement.props.style).toContainEqual({
      fontSize: expect.any(Number),
      lineHeight: expect.any(Number),
    });
  });

  it("renders with 'title' type and correct styles", () => {
    (useThemeColor as jest.Mock).mockReturnValue("#0a7ea4");

    const { getByText } = render(
      <ThemedText type="title">Title Text</ThemedText>
    );

    const textElement = getByText("Title Text");

    // 验证文本内容
    expect(textElement).toBeTruthy();

    // 验证样式是否包含 'title' 类型的样式
    expect(textElement.props.style).toContainEqual({ color: "#0a7ea4" });
    expect(textElement.props.style).toContainEqual({
      fontSize: expect.any(Number),
      fontWeight: "bold",
      lineHeight: expect.any(Number),
    });
  });

  it("renders with 'link' type and correct styles", () => {
    const { getByText } = render(<ThemedText type="link">Link Text</ThemedText>);

    const textElement = getByText("Link Text");

    // 验证文本内容
    expect(textElement).toBeTruthy();

    // 验证样式是否包含 'link' 类型的样式
    expect(textElement.props.style).toContainEqual({
      fontSize: expect.any(Number),
      lineHeight: expect.any(Number),
      color: "#0a7ea4",
    });
  });

  it("applies custom styles passed via the `style` prop", () => {
    const { getByText } = render(
      <ThemedText style={{ fontSize: 20, color: "#ff0000" }}>
        Custom Styled Text
      </ThemedText>
    );

    const textElement = getByText("Custom Styled Text");

    // 验证文本内容
    expect(textElement).toBeTruthy();

    // 验证自定义样式是否生效
    expect(textElement.props.style).toContainEqual({
      fontSize: 20,
      color: "#ff0000",
    });
  });
});