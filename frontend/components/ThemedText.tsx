import { Text, type TextProps, StyleSheet, Dimensions } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

const { width, height } = Dimensions.get("window");

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultBold" | "subtitle" | "link" | "small";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultBold" ? styles.defaultBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        type === "small" ? styles.small : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: width * 0.04, // Example: 4% of the screen width
    lineHeight: height * 0.03, // Example: 3% of the screen height
  },
  defaultBold: {
    fontSize: width * 0.04, // Example: 4% of the screen width
    lineHeight: height * 0.03, // Example: 3% of the screen height
    fontWeight: '600',
  },
  title: {
    fontSize: width * 0.08, // Example: 8% of the screen width
    fontWeight: 'bold',
    lineHeight: height * 0.04, // Example: 4% of the screen height
  },
  subtitle: {
    fontSize: width * 0.05, // Example: 5% of the screen width
    fontWeight: 'bold',
  },
  small: {
    fontSize: width * 0.03, // Example: 3% of the screen width
    lineHeight: height * 0.02, // Example: 2% of the screen height
  },
  link: {
    lineHeight: height * 0.04, // Example: 4% of the screen height
    fontSize: width * 0.04, // Example: 4% of the screen width
    color: '#0a7ea4',
  },
});