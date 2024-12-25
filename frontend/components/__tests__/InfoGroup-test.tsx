import React from "react";
import { render } from "@testing-library/react-native";
import InfoGroup from "../profile/InfoGroup";
import { ThemedText } from "../ThemedText";

describe("InfoGroup", () => {
  it("should render the group name correctly", () => {
    const { getByText } = render(
      <InfoGroup groupName="Group 1">
        <ThemedText>Some content</ThemedText>
      </InfoGroup>
    );

    // 检查标题是否渲染
    expect(getByText("Group 1")).toBeTruthy();
  });

  it("should render children correctly", () => {
    const { getByText } = render(
      <InfoGroup groupName="Group 1">
        <ThemedText>Some content</ThemedText>
      </InfoGroup>
    );

    // 检查子组件内容是否渲染
    expect(getByText("Some content")).toBeTruthy();
  });

});
