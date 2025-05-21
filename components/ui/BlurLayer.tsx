import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";

export default function BlurLayer() {
  return (
    <BlurView
      tint="dark" // You can also try "light" or "default"
      intensity={100}
      style={StyleSheet.absoluteFill}
    />
  );
}
