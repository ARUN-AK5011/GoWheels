// src/Utils/Otp.tsx
import React, { useRef, useState, useCallback } from "react";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { firebaseAuth } from "../config/FirebaseConfig";

export const Recaptcha = React.forwardRef<FirebaseRecaptchaVerifierModal | null>((_, ref) => (
  <FirebaseRecaptchaVerifierModal
    ref={ref}
    firebaseConfig={firebaseAuth.app.options}
    attemptInvisibleVerification
  />
));

Recaptcha.displayName = "Recaptcha";

type UsePhoneAuthReturn = {
  recaptchaRef: React.RefObject<FirebaseRecaptchaVerifierModal | null>;
  sendOtp: (phoneE164: string) => Promise<string>;
  confirmCode: (verificationId: string, code: string) => Promise<void>;
  loading: boolean;
  error: string | null;
};

export function usePhoneAuth(): UsePhoneAuthReturn {
  const recaptchaRef = useRef<FirebaseRecaptchaVerifierModal | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const sendOtp = useCallback(async (phoneE164: string) => {
    console.log("[OTP] sendOtp() called with:", phoneE164);
    setError(null);
    setLoading(true);
    return "1234"
  }, []);


  const confirmCode = useCallback(async (verificationId: string, code: string) => {
    console.log("[OTP] confirmCode() called with verificationId:", verificationId, "and code:", code);
    setError(null);
    setLoading(true);
  }, []);

  return { recaptchaRef, sendOtp, confirmCode, loading, error };
}
