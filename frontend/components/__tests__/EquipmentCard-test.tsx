import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import EquipmentCard from "@/components/equipment/EquipmentCard"; // 替换为你的文件路径
import { useNavigation } from "@react-navigation/native";



// 模拟导航功能
jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

describe("EquipmentCard Component", () => {
  let mockNavigate: jest.Mock;

  beforeEach(() => {
    mockNavigate = jest.fn();
    (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("navigates to the correct screen on press", () => {
    const mockCard = { e_id: 2, name: "Equipment 2" };

    const { getByText } = render(<EquipmentCard information={mockCard} />);

    // 模拟点击事件
    const cardElement = getByText("Equipment 2");
    fireEvent.press(cardElement);

    // 验证导航调用是否正确
    expect(mockNavigate).toHaveBeenCalledWith("EquipmentScreen", { id: 1 }); // e_id - 1
  });

  
});