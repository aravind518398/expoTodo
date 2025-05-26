import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";

export default function BlurLayer() {
  return (
    <BlurView
      tint="dark" 
      intensity={100}
      style={StyleSheet.absoluteFill}
    />
  );
}
