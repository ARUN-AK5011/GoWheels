import React, {useState} from "react";
import { View, Text, TouchableOpacity, Alert} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { COLORS } from "../constants/colors";
import FloatingLabelInput from "./InputField";
import LoginStyle from "../styles/LoginScreenStyle";
import { router } from "expo-router";
import { ROUTES } from "../constants/routes";

interface SignupPopupProps {
  onNavigate: (
    screen: "login" | "signup" | "otp",
    data?: { username: string; phone: string; email: string; referral: string }
  ) => void;
}

export default function SignupPopup({ onNavigate }: SignupPopupProps) {
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");    
    const [email, setEmail] = useState("");
    const [referral, setReferral] = useState("");

  const validate = () => {
    if (!username.trim()) return "Enter username";
    if (!/^\+\d{8,15}$/.test(phone)) return "Enter phone in E.164 (e.g. +919876543210)";
    if (email && !/^\S+@\S+\.\S+$/.test(email)) return "Enter a valid email";
    return null;
  };

  const onGetOtp = () => {
    console.log("UserName:", username, "Phone :", phone, "email:", email )
    const err = validate();
    if (err) return Alert.alert("Validation", err);
    onNavigate("otp", { username, phone, email, referral });
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 200 }}
      enableOnAndroid={true}
      extraScrollHeight={60} 
      keyboardShouldPersistTaps="handled"
    >
      <View style={LoginStyle.SignupContainer}>
        <View style={LoginStyle.Divider} />
        <View style={LoginStyle.LoginHeader}>
          <TouchableOpacity onPress={() => router.push(ROUTES.WELCOME)}>
            <Ionicons name="arrow-back" size={28} color={COLORS.BLACK} />
          </TouchableOpacity>
          <Text style={LoginStyle.LoginText}>SignUp</Text>
        </View>
        <Text style={LoginStyle.LoginSubText}>
          Enter the Details to continue
        </Text>

        <View style={LoginStyle.LoginInputContainer}>
          <FloatingLabelInput
            label="User Name"
            value={username}
            onChangeText={setUsername}
            backgroundColor={COLORS.INPUT_FIELD_BACKGROUND}
          />
          <FloatingLabelInput
            label="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            backgroundColor={COLORS.INPUT_FIELD_BACKGROUND}
          />
          <FloatingLabelInput
            label="Email ID"
            value={email}
            onChangeText={setEmail}
            backgroundColor={COLORS.INPUT_FIELD_BACKGROUND}
          />
          <FloatingLabelInput
            label="Referral ID"
            value={referral}
            onChangeText={setReferral}
            backgroundColor={COLORS.INPUT_FIELD_BACKGROUND}
          />
        </View>
        <TouchableOpacity style={LoginStyle.LoginButton} onPress={onGetOtp}>
          <Text style={LoginStyle.LoginButtonText}>Get OTP</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>


  );
}
