import React, { useEffect, useState } from "react";
import {
  DimensionValue,
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  Easing,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

type SkeletonProps = {
  width?: DimensionValue;
  height: number;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
};

const SHIMMER_WIDTH_RATIO = 0.35;
const SHIMMER_MIN_WIDTH = 72;
const SHIMMER_HEIGHT_MULTIPLIER = 2.4;
const SHIMMER_TOP_OFFSET_MULTIPLIER = 0.7;

export function Skeleton({
  width = null,
  height,
  borderRadius = 12,
  style,
}: SkeletonProps) {
  const progress = useSharedValue(0);
  const [containerLayout, setContainerLayout] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (containerLayout.width === 0) return;

    progress.value = withRepeat(
      withTiming(1, {
        duration: 1300,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
  }, [progress, containerLayout.width]);

  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setContainerLayout({ width, height });
  };

  const { shimmerWidth, shimmerHeight } = getShimmerDimensions(containerLayout);

  const shimmerTranslateXAnimStyle = useShimmerTranslateXAnimStyle(
    progress,
    containerLayout.width,
    shimmerWidth,
  );

  return (
    <View
      onLayout={onLayout}
      style={[
        styles.container,
        {
          width,
          height,
          borderRadius,
        },
        style,
      ]}
    >
      {containerLayout.width > 0 && (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.shimmerWrapper,
            {
              top: -containerLayout.height * SHIMMER_TOP_OFFSET_MULTIPLIER,
              left: -shimmerWidth / 2,
            },
            shimmerTranslateXAnimStyle,
          ]}
        >
          <View
            style={[
              styles.shimmer,
              {
                width: shimmerWidth,
                height: shimmerHeight,
              },
            ]}
          />
        </Animated.View>
      )}
    </View>
  );
}

function getShimmerDimensions(container: { width: number; height: number }) {
  const shimmerWidth = Math.max(
    container.width * SHIMMER_WIDTH_RATIO,
    SHIMMER_MIN_WIDTH,
  );
  const shimmerHeight = container.height * SHIMMER_HEIGHT_MULTIPLIER;

  return {
    shimmerWidth,
    shimmerHeight,
  };
}

function useShimmerTranslateXAnimStyle(
  progress: SharedValue<number>,
  containerWidth: number,
  shimmerWidth: number,
) {
  const startX = -containerWidth - shimmerWidth;
  const endX = containerWidth + shimmerWidth;

  return useAnimatedStyle(() => {
    const transX = interpolate(progress.value, [0, 1], [startX, endX]);

    return {
      transform: [{ translateX: transX }],
    };
  });
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    backgroundColor: "#E5E7EB",
  },
  shimmerWrapper: {
    position: "absolute",
  },
  shimmer: {
    backgroundColor: "rgba(255,255,255,0.28)",
    transform: [{ rotate: "18deg" }],
  },
});
