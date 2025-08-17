import { Appearance } from "react-native";

const colorScheme = Appearance.getColorScheme(); // 'light' | 'dark' | null

export const COLORS = {
  PRIMARY: "#00B262",
  SECONDARY: "#DFF6E8",
  BACKGROUND: "#FFD600",
  TEXT_TITLE: colorScheme === "dark" ? "#FFFFFF" : "#212121",
  TEXT_DESCRIPTION: "#616161",
  INPUT_FIELD_COLOR: "#F5FDF9",
  INPUT_FIELD_BACKGROUND: "rgba(0, 255, 0, 0.05)",
  SOCIAL_ICON_BACKGROUND: "#F5F5F5",
  GREY: "#9E9E9E",
  WHITE: colorScheme === "dark" ? "#000000" : "#FFFFFF",
  BLACK: colorScheme === "dark" ? "#FFFFFF" : "#000000",
} as const;

export type ColorKeys = keyof typeof COLORS;
