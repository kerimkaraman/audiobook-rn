import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  withRepeat,
} from "react-native-reanimated";

const LoadingScreen = () => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(withSpring(1), -1);
  }, []);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: progress.value }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.loader, animatedStyles]} />
      <Text style={styles.loadingText}>Yükleniyor</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    width: 100,
    height: 100,
    backgroundColor: "#523EAC",
    borderRadius: 50,
    margin: 10,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 32,
    fontWeight: "bold",
  },
});

export default LoadingScreen;
