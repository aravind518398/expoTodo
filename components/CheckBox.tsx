import { MaterialIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";  
import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, Vibration, View } from "react-native";

type Props = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export default function CheckBox({ label, checked, onChange }: Props) {
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require("@/assets/pop.mp3")
      );
      soundRef.current = sound;
    };

    loadSound();

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    if (checked && soundRef.current) {
      soundRef.current.replayAsync();
      // setTimeout(() => {
      //   Vibration.vibrate(10);
      // });
    }
  }, [checked]);

  return (
    <View style={styles.hr}>
      <TouchableOpacity style={styles.container} onPress={() => onChange(!checked)}>
        <View style={[styles.box, checked && styles.checkedBox]}>
          {checked && <MaterialIcons name="check" size={16} color="#fff" />}
        </View>
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  box: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderColor: "#009075",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#151515",
  },
  checkedBox: {
    backgroundColor: "#009075",
    borderColor: "#009075",
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
    color: "#e0e0e0",
  },
  hr: {
    borderBottomColor: "rgba(245,245,245,0.2)",
    borderBottomWidth: 0.2,
    paddingVertical: 10,
  },
});
