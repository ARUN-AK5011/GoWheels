import { StyleSheet } from "react-native";
import { FONTS } from "../constants/fonts";
import { COLORS } from "../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  goWheelsContainer: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY
  },
  goWheelsText: {
    textAlign: 'center',
    fontSize: 48,
    fontFamily: FONTS.INTER_REGULAR,
    color: COLORS.BACKGROUND,
    paddingTop: '90%',
  },
  skipButton: {   
    position: 'absolute',
    top: 55,
    right: 20,
    zIndex: 10,
  },
  skipText: {
    fontSize: 18,
    fontFamily: FONTS.INTER_BOLD,
    color: COLORS.GREY,
  },
  imageContainer: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    marginTop: 110,
    marginLeft: 10,
    marginRight: 10,
    overflow: 'hidden',
  },
  image: {
    width: '90%',
    height: '90%',
    position: 'absolute', 
  },
  logo: {
    width: '50%',
    height: '50%',
  },
  contentContainer: {
    flex: 0.45,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 0,
  },
  textSlider: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  textPage: {
    position: 'absolute',
    width: '100%',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 26,
    fontFamily: FONTS.INTER_BOLD,
    color: COLORS.TEXT_TITLE,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    fontFamily: FONTS.INTER_REGULAR,
    color: COLORS.TEXT_DESCRIPTION,
    lineHeight: 20,
    paddingBottom: 10,
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingBottom: 30,
    width: '100%',
  },
  navButton: {
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: COLORS.SECONDARY,
  },
  navButtonPlaceholder: {
    width: 60,
    height: 60,
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default styles