import React, { useRef, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { COLORS } from "../constants/colors";
import LoginStyle from "../styles/LoginScreenStyle";
import { usePhoneAuth, Recaptcha } from "../utils/Otp"; 

interface Props {
  onNavigate: (screen: "login" | "signup" | "otp", params?: any) => void;
  route?: { params?: { phone?: string } }; // if using react-navigation
  phone?: string; // fallback
}

export default function OTPScreen({ onNavigate, route, phone }: Props) {
  const actualPhone = route?.params?.phone || phone; 
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputs = useRef<(TextInput | null)[]>([]);

  const { recaptchaRef, sendOtp, confirmCode, loading, error } = usePhoneAuth();
  const [verificationId, setVerificationId] = useState<string | null>(null);

  useEffect(() => {
    if (actualPhone) {
      handleSendOtp();
    }else{
      console.log("No phone number detected", actualPhone)
    }
  }, [actualPhone]);


  const handleChange = async (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < otp.length - 1) {
      inputs.current[index + 1]?.focus();
    }

    // 👉 If all 4 digits entered, auto-verify
    if (index === otp.length - 1 && newOtp.every((d) => d !== "")) {
      const code = newOtp.join("");
      console.log("[UI] Auto verifying OTP code:", code);

      if (!verificationId) {
        return Alert.alert("Error", "OTP not requested yet.");
      }

      try {
        await confirmCode(verificationId, code);
        Alert.alert("Success", "Phone number verified successfully!");
        onNavigate("login"); // or home
      } catch (e: any) {
        Alert.alert("Error", e.message || "Invalid OTP");
      }
    }
  };

  const handleBackspace = (text: string, index: number) => {
    if (!text && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleSendOtp = async () => {
    if (!actualPhone) {
      Alert.alert("Error", "Phone number is missing");
      return;
    }

    try {
      console.log("[UI] Resend OTP for:", actualPhone);
      const id = await sendOtp(actualPhone);
      setVerificationId(id);
      Alert.alert("OTP Sent", "Please check your phone.");
    } catch (e: any) {
      Alert.alert("Error", e.message || "Failed to resend OTP");
    }
  };


  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 200 }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={LoginStyle.SignupContainer}>
        <View style={LoginStyle.Divider} />
        <View style={LoginStyle.LoginHeader}>
          <TouchableOpacity onPress={() => onNavigate("login")}>
            <Ionicons name="arrow-back" size={28} color={COLORS.BLACK} />
          </TouchableOpacity>
          <Text style={LoginStyle.LoginText}>Verification</Text>
        </View>

        <Text style={LoginStyle.LoginSubText}>
          Enter the Code sent to <Text style={{ fontWeight: "bold" }}>{actualPhone}</Text>
        </Text>

        {/* OTP Input */}
        <View style={LoginStyle.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(el) => {
                inputs.current[index] = el;
              }}
              style={LoginStyle.otpBox}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace") {
                  handleBackspace("", index);
                }
              }}
            />
          ))}
        </View>

        {/* Resend OTP */}
        <View style={LoginStyle.resendContainer}>
          <Text style={LoginStyle.resendContainerText}>Not Received Yet?</Text>
          <TouchableOpacity onPress={handleSendOtp}>
            <Text style={LoginStyle.resendText}> Resend</Text>
          </TouchableOpacity>
        </View>

        {/* Loader instead of Verify button */}
        {loading && <ActivityIndicator style={{ marginTop: 20 }} color={COLORS.BLACK} />}

        {/* Error message */}
        {error && <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>}

        {/* Invisible Recaptcha Modal */}
        <Recaptcha ref={recaptchaRef} />
      </View>
    </KeyboardAwareScrollView>
  );
}
