import React, { useEffect, useRef, useState } from "react";
import { ImageBackground, Animated, Easing } from "react-native";
import { useRouter } from "expo-router";
import { IMAGES } from "../constants/images";
import LoginStyle from "../styles/LoginScreenStyle";

import LoginPopup from "../components/LoginScreen";
import SignupPopup from "../components/SignUpScreen";
import OTPScreen from "../components/OTPScreen";

export default function AuthWrapper() {
  const router = useRouter();

  const slideAnim = useRef(new Animated.Value(1000)).current; // new popup in
  const fadeAnim = useRef(new Animated.Value(1)).current; // old popup fade
  const oldSlideAnim = useRef(new Animated.Value(0)).current; // old popup out
  const [otpData, setOtpData] = useState<{ username: string; phone: string; email: string; referral: string } | null>(null);

  const [activeScreen, setActiveScreen] = useState<"login" | "signup" | "otp">("login");
  const [prevScreen, setPrevScreen] = useState<null | "login" | "signup" | "otp">(null);

  const getHeightForScreen = (screen: "login" | "signup" | "otp" | null) => {
    if (!screen) return "70%";
    if (screen === "otp") return "40%";
    return "70%";
  };

  // Initial mount animation
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 600,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, []);

  const handleNavigate = (
    screen: "login" | "signup" | "otp",
    data?: { username: string; phone: string; email: string; referral: string }
  ) => {
    setPrevScreen(activeScreen);
    setActiveScreen(screen);

    // TODO: you can store `data` in state so OTP screen can use it
    if (data) {
      console.log("Received data:", data);
      setOtpData(data); // ✅ keep it here
    }

    // reset animation values
    fadeAnim.setValue(1);
    oldSlideAnim.setValue(0);
    slideAnim.setValue(1000);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(oldSlideAnim, {
        toValue: 50,
        duration: 300,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start(() => {
      setPrevScreen(null);
    });
  };


  const renderPopup = (screen: "login" | "signup" | "otp" | null) => {
    switch (screen) {
      case "login":
        return <LoginPopup onNavigate={handleNavigate} />;
      case "signup":
        return <SignupPopup onNavigate={handleNavigate} />;
      case "otp":
        return (
          <OTPScreen
            onNavigate={handleNavigate}
            phone={otpData?.phone} // ✅ fix
          />
        );
      default:
        return null;
    }
  };


  return (
    <ImageBackground
      source={IMAGES.LOGIN_LOADING}
      resizeMode="cover"
      style={LoginStyle.LoginContainer}
    >
      {prevScreen && (
        <Animated.View
          style={[
            LoginStyle.Popup_Container,
            {
              height: getHeightForScreen(prevScreen),
              position: "absolute",
              opacity: fadeAnim,
              transform: [{ translateY: oldSlideAnim }],
            },
          ]}
        >
          {renderPopup(prevScreen)}
        </Animated.View>
      )}

      <Animated.View
        style={[
          LoginStyle.Popup_Container,
          {
            height: getHeightForScreen(activeScreen),
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {renderPopup(activeScreen)}
      </Animated.View>
    </ImageBackground>
  );
}
