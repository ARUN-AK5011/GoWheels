export const FONTS = {
  INTER_REGULAR: "Inter-Regular",
  INTER_BOLD: "Inter-Bold",
} as const;

export const FONT_FILES = {
  [FONTS.INTER_REGULAR]: require("../../assets/fonts/GoWheelsFont-Regular.ttf"),
  [FONTS.INTER_BOLD]: require("../../assets/fonts/GoWheelsFont-Regular.otf"),
} as const;
