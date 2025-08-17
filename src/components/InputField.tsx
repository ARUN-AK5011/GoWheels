import React, { useState, useEffect, useRef } from "react";
import { View, TextInput, Animated, StyleSheet, TextInputProps, ViewStyle, TextStyle } from "react-native";
import { COLORS } from "../constants/colors";

interface FloatingLabelInputProps extends TextInputProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    containerStyle?: ViewStyle;
    inputStyle?: TextStyle;
    activeColor?: string;
    inactiveColor?: string;
    backgroundColor?: string;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
    label,
    value,
    onChangeText,
    containerStyle,
    inputStyle,
    activeColor = COLORS.PRIMARY,
    inactiveColor = COLORS.GREY,
    backgroundColor = "rgba(0, 255, 0, 0.05)",
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const labelAnim = useRef(new Animated.Value(value ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(labelAnim, {
            toValue: isFocused || value ? 1 : 0,
            duration: 200,
            useNativeDriver: false
        }).start();
    }, [isFocused, value]);

    const labelStyle = {
        position: "absolute" as const,
        left: 15,
        top: labelAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [18, 5]
        }),
        fontSize: labelAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [16, 12]
        }),
        color: isFocused ? activeColor : inactiveColor
    };

    return (
        <View style={[styles.container, containerStyle]}>
            <Animated.Text style={labelStyle}>{label}</Animated.Text>
            <TextInput
                style={[styles.input, { backgroundColor }, inputStyle]}
                value={value}
                onChangeText={onChangeText}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                {...props}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 18,
        marginVertical: 10
    },
    input: {
        height: 50,
        width: "100%",
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        color: COLORS.BLACK
    }
});

export default FloatingLabelInput;
