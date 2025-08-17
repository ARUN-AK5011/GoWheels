import { StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";


const LoginStyle = StyleSheet.create({
    LoginContainer: {
        flex: 1,
    },
    Popup_Container: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        alignItems: "stretch",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingHorizontal: 25,
        backgroundColor: COLORS.WHITE, 
        paddingTop: 15,
        flexGrow: 0,
    },

    Divider: {
        backgroundColor: COLORS.BLACK,
        width: "20%",
        height: 4,
        borderRadius: 2,
        alignSelf: "center",
    },
    LoginHeader: {
        top:20,
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
        alignSelf: "flex-start",
        marginBottom: 30
    },
    LoginText: { 
        fontSize: 25,
        color: COLORS.TEXT_TITLE,
        fontFamily: FONTS.INTER_BOLD
    },
    LoginSubText: {
        top:15,
        fontFamily: FONTS.INTER_REGULAR,
        fontSize: 16,
        color: COLORS.TEXT_DESCRIPTION,
        alignSelf: "flex-start",
        marginBottom: 20
    },
    LoginInputContainer: {
        width: "100%",
        marginBottom: 30
    },
    LoginButton: {
        backgroundColor: COLORS.PRIMARY,
        alignItems: "center",
        justifyContent: "center",
        height: 45,
        width: "100%",
        borderRadius: 15
    },
    LoginButtonText: {
        color: COLORS.WHITE,
        fontFamily: FONTS.INTER_BOLD,
        fontSize: 16,
    },
    LoginSignUpContainer:{
        alignItems:"center",
        top:30,
    },
    LoginSignUpText:{
        fontFamily:FONTS.INTER_REGULAR,
        fontSize:18,
        color:COLORS.TEXT_DESCRIPTION
    },
    LoginContainerDivider: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 20,
        left:"25%",
        width:"50%",
        top:40
    },
    LoginContainerDividerLine: {
        flex: 1,                 
        height: 1.5,             
    },
    LoginContainerDividerText: {
        marginHorizontal: 10,
        color: COLORS.TEXT_DESCRIPTION,
        fontSize: 20,
    },
    LoginContainerSocialProviderIcons: {
        flexDirection: "row",
        justifyContent: "space-around", 
        alignItems: "center",
        width: "100%", 
        marginTop: 50,
        paddingHorizontal: 20,
    },
    LoginContainerSocialProviderIconCircle: {
        width: 50,
        height: 50,
        borderRadius: 30,
        backgroundColor: COLORS.SOCIAL_ICON_BACKGROUND,
        justifyContent: "center",
        alignItems: "center",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    SignupContainer:{
        position:"absolute",
        width:"100%",
    },
    SignUpHeader:{

    },
    otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    paddingHorizontal: 30,
  },
  otpBox: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: COLORS.INPUT_FIELD_BACKGROUND || "#F5F5F5",
    textAlign: "center",
    fontSize: 20,
    color: COLORS.BLACK,
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap:200,
    marginTop: 40,
  },
  resendContainerText:{
    color: COLORS.TEXT_DESCRIPTION,
  },
  resendText: {
    color: COLORS.TEXT_DESCRIPTION,
    fontWeight: "bold",
  },
});

export default LoginStyle;
