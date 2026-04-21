import { ReactNode, useEffect, useState } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function VerticalSlideAnimated({
  children,
  visible,
}: {
  children: ReactNode;
  visible: boolean;
}) {
  const progress = useSharedValue(visible ? 1 : 0);
  const [isMounted, setIsMounted] = useState(visible);

  const repliesStyle = useAnimatedStyle<ViewStyle>(() => {
    const translateYTransform: ViewStyle["transform"] = [
      {
        translateY: interpolate(progress.value, [0, 1], [16, 0]),
      },
      {
        scale: interpolate(progress.value, [0, 1], [0.96, 1]),
      },
    ];

    return {
      opacity: progress.value,
      transform: translateYTransform,
    };
  });

  useEffect(() => {
    const animationDuration = 260;

    if (visible) {
      setIsMounted(true);
    }

    progress.value = withTiming(visible ? 1 : 0, {
      duration: animationDuration,
      easing: Easing.out(Easing.cubic),
    });

    if (!visible) {
      const timeout = setTimeout(() => {
        setIsMounted(false);
      }, animationDuration);

      return () => clearTimeout(timeout);
    }
  }, [visible, progress]);

  if (!isMounted) {
    return null;
  }

  return (
    <Animated.View style={[styles.childrenRepliesContainer, repliesStyle]}>
      <Animated.View style={[StyleSheet.absoluteFill]} />
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  childrenRepliesContainer: {
    marginTop: 6,
    paddingTop: 6,
    paddingBottom: 10,
    backgroundColor: "rgba(255,255,255,0.94)",
    overflow: "hidden",
    position: "relative",
    alignSelf: "stretch",
  },
});
