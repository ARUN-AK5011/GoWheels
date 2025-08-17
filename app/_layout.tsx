import { Slot, Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { FONT_FILES } from "../src/constants/fonts";
import { StatusBar, View, Platform } from "react-native";
import { COLORS } from "@/src/constants/colors";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts(FONT_FILES);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      {Platform.OS === "android" && (
        <View style={{ height: StatusBar.currentHeight, backgroundColor: COLORS.WHITE }} />
      )}
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

        <Slot />
    </>
  );
}
