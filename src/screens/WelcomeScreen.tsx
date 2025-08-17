import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  StatusBar,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolation,
  interpolateColor,
  useDerivedValue,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 
import { IMAGES } from '../constants/images'
import {COLORS} from '../constants/colors'
import styles from '../styles/WelcomeScreenStyle' 

const onboardingScreens = [
  {
    title: 'Go together',
    description:
      'From families to tourist crews - book one ride for your whole group. Fewer cars, more fun. Just tap Go!',
    image:IMAGES.WELCOMESCREEN_IMAGE1,
    backgroundColor: COLORS.SECONDARY,
    alignment: 'center',
  },
  {
    title: 'Go with a guide',
    description:
      'Hire local pros, plan your trip, or explore hidden gems. Add a guide to make your ride even more memorable.',
    image: IMAGES.WELCOMESCREEN_IMAGE1,
    backgroundColor: COLORS.SECONDARY,
    alignment: 'center',
  },
  {
    title: 'Go on your time',
    description:
      'Need a ride right now? Or planning one for later? Pick what works best - we’ll be ready when you are.',
    image: IMAGES.WELCOMESCREEN_IMAGE2,
    backgroundColor: COLORS.BACKGROUND,
    alignment: 'center',
    imageStyle: { width: 500, height: 500 },
  },
] as const;

const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function WalkThrough() {
  const router = useRouter()
  const { width: screenWidth } = useWindowDimensions();
  const [currentPage, setCurrentPage] = useState(0);

  const animationProgress = useSharedValue(0);

  const handleNext = () => {
    if (currentPage < onboardingScreens.length - 1) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      animationProgress.value = withTiming(nextPage, { duration: 450 });
    } else {
      router.replace("/routes/auth");
    }
  };

  const handleBack = () => {
    const prevPage = currentPage - 1;
    if (prevPage >= 0) {
      setCurrentPage(prevPage);
      animationProgress.value = withTiming(prevPage, { duration: 450 });
    }
  };

  const HandleSkip = () => {
    router.replace("/routes/auth")
  }

  const animatedGlobeStyle = useAnimatedStyle(() => {
    const rotation = interpolate(
      animationProgress.value,
      [0, 1, 2],
      [0, 50, 100],
      Extrapolation.CLAMP
    );
    const translateX = interpolate(
      animationProgress.value,
      [0, 1],
      [0, -screenWidth / 2],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      animationProgress.value,
      [1, 1.5, 1.5],
      [1, 0, 0],
      Extrapolation.CLAMP
    );

    return {
      opacity,
      transform: [{ translateX }, { rotate: `${rotation}deg` }],
    };
  });

  const animatedLogoStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animationProgress.value,
      [1, 1.5, 2],
      [0, 1, 1],
      Extrapolation.CLAMP
    );
    const scale = interpolate(
        animationProgress.value,
        [1, 1.75, 2],
        [0.5, 1, 1],
        Extrapolation.CLAMP
    )

    return {
      opacity,
      transform: [{scale}]
    };
  });

  
  const backButtonOpacity = useDerivedValue(() => {
    return currentPage === 0 ? 0 : 1;
  });


  const animatedBackButtonStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(1),
    };
  });


  const animatedNextButtonStyle = useAnimatedStyle(() => {
    return {
        opacity: withTiming(1),
    };
  });


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden= {false} barStyle='dark-content' />
      {currentPage < onboardingScreens.length - 1 && (
        <TouchableOpacity style={styles.skipButton} onPress={HandleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}

      <Animated.View style={[styles.imageContainer, {backgroundColor: onboardingScreens[currentPage].backgroundColor}]}>
        <AnimatedImage
          source={onboardingScreens[0].image}
          style={[styles.image, animatedGlobeStyle]}
          resizeMode="contain"
        />
        <AnimatedImage
          source={onboardingScreens[2].image}
          style={[
            styles.image,
            styles.logo,
            onboardingScreens[2].imageStyle, 
            animatedLogoStyle
          ]}
          resizeMode="contain"
        />
      </Animated.View>

      <View style={styles.contentContainer}>
        <View style={[styles.textSlider, { width: screenWidth }]}>
          {onboardingScreens.map((screen, index) => {
            const animatedTextStyle = useAnimatedStyle(() => {
              const translateX = interpolate(
                animationProgress.value,
                [index - 1, index, index + 1],
                [screenWidth, 0, -screenWidth],
                Extrapolation.CLAMP
              );
              const opacity = interpolate(
                animationProgress.value,
                [index - 0.5, index, index + 0.5],
                [0, 1, 0],
                Extrapolation.CLAMP
              );
              return {
                transform: [{ translateX }],
                opacity,
              };
            });

            const textAlign = {
              textAlign: screen.alignment,
            };

            return (
              <Animated.View
                key={index}
                style={[styles.textPage, animatedTextStyle]}>
                <Text style={[styles.title, textAlign]}>{screen.title}</Text>
                <Text style={[styles.description, textAlign]}>
                  {screen.description}
                </Text>
              </Animated.View>
            );
          })}
        </View>

        <View style={styles.navigationContainer}>
          {currentPage > 0 ? (
          <AnimatedTouchable
            style={[styles.navButton, styles.backButton, animatedBackButtonStyle]}
            onPress={handleBack}>
            <Ionicons name="arrow-back" size={28} color={COLORS.PRIMARY} />
          </AnimatedTouchable>
          ) : (<View style={styles.navButtonPlaceholder} />)}

          <View style={styles.paginationContainer}>
            {onboardingScreens.map((_, index) => {
              const animatedDotStyle = useAnimatedStyle(() => {
                const width = interpolate(
                  animationProgress.value,
                  [index - 1, index, index + 1],
                  [8, 30, 8],
                  Extrapolation.CLAMP
                );
                const backgroundColor = interpolateColor(
                  animationProgress.value,
                  [...Array(onboardingScreens.length).keys()],
                  onboardingScreens.map((__, i) => i === index ? COLORS.PRIMARY: COLORS.GREY)
                );
                return { width, backgroundColor };
              });
              return <Animated.View key={index} style={[styles.dot, animatedDotStyle]} />;
            })}
          </View>

          <AnimatedTouchable style={[styles.navButton, animatedNextButtonStyle]} onPress={handleNext}>
            <Ionicons name="arrow-forward" size={28} color={COLORS.WHITE} />
          </AnimatedTouchable>
        </View>
      </View>
    </SafeAreaView>
  );
}
