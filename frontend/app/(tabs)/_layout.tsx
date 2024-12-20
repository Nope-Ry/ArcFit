import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme],
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "器械",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "barbell" : "barbell-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="body"
        options={{
          title: "身体",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "body" : "body-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="training"
        options={{
          title: "训练",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "bar-chart" : "bar-chart-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "我的",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
