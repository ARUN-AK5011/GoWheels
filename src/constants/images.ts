export const IMAGES = {
  WELCOMESCREEN_IMAGE1 : require("../../assets/screenImages/Walkthrough_element.png"),
  WELCOMESCREEN_IMAGE2 : require("../../assets/screenImages/Walkthrough_logo.png"),
  LOGIN_LOADING : require("../../assets/screenImages/Login_Loading.png")
} as const;

export type ImageKeys = keyof typeof IMAGES;
