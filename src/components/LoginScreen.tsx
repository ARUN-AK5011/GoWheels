import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRouter } from "expo-router";
import { COLORS } from "../constants/colors";
import FloatingLabelInput from "./InputField";
import LoginStyle from "../styles/LoginScreenStyle";
import { ROUTES } from "../constants/routes";

interface Props {
  onNavigate: (screen: "login" | "signup" | "otp") => void;
}

export default function LoginScreen({ onNavigate }: Props) {
  const router = useRouter();
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 50}}
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled"
    >
      <View>
        <View style={LoginStyle.Divider} />
        <View style={LoginStyle.LoginHeader}>
          <TouchableOpacity onPress={() => router.push(ROUTES.WELCOME)}>
            <Ionicons name="arrow-back" size={28} color={COLORS.BLACK} />
          </TouchableOpacity>
          <Text style={LoginStyle.LoginText}>Login</Text>
        </View>

        <Text style={LoginStyle.LoginSubText}>
          Enter the Details to continue
        </Text>

        <View style={LoginStyle.LoginInputContainer}>
          <FloatingLabelInput
            label="Country of residence"
            value={country}
            onChangeText={setCountry}
            backgroundColor={COLORS.INPUT_FIELD_BACKGROUND}
          />
          <FloatingLabelInput
            label="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            backgroundColor={COLORS.INPUT_FIELD_BACKGROUND}
          />
        </View>

        <TouchableOpacity style={LoginStyle.LoginButton}
          onPress={() => {
            router.push({
              pathname: ROUTES.WELCOME,
              params: { phone }, 
            });
          }}
        >
          <Text style={LoginStyle.LoginButtonText}>Get OTP</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={LoginStyle.LoginSignUpContainer}
          onPress={() => onNavigate("signup")}
        >
          <Text style={LoginStyle.LoginSignUpText}>New User? Sign Up</Text>
        </TouchableOpacity>

        <View style={LoginStyle.LoginContainerDivider}>
          <LinearGradient
            colors={[`${COLORS.GREY}00`, COLORS.GREY, `${COLORS.GREY}00`]}
            style={LoginStyle.LoginContainerDividerLine}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          />
          <Text style={LoginStyle.LoginContainerDividerText}>or</Text>
          <LinearGradient
            colors={[`${COLORS.GREY}00`, COLORS.GREY, `${COLORS.GREY}00`]}
            style={LoginStyle.LoginContainerDividerLine}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          />
        </View>

        <View style={LoginStyle.LoginContainerSocialProviderIcons}>
          <TouchableOpacity style={LoginStyle.LoginContainerSocialProviderIconCircle}>
            <Ionicons name="logo-google" color={COLORS.TEXT_DESCRIPTION} size={22}/>
          </TouchableOpacity>
          <TouchableOpacity style={LoginStyle.LoginContainerSocialProviderIconCircle}>
            <Ionicons name="logo-apple" color={COLORS.TEXT_DESCRIPTION} size={22}/>
          </TouchableOpacity>
          <TouchableOpacity style={LoginStyle.LoginContainerSocialProviderIconCircle}>
            <Ionicons name="mail" color={COLORS.TEXT_DESCRIPTION} size={22}/>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
