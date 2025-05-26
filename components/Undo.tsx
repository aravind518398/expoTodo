import { Ionicons } from "@expo/vector-icons";
import { Modal, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import * as Animatable from "react-native-animatable";
import { useEffect, useRef, useState } from "react";

type Props = {
    onPress:()=>void
}




export default function Undo({onPress}:Props) {
    const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
  const loadSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("@/assets/shik.mp3")
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




  const viewRef = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      if (viewRef.current) {
        (viewRef.current as any)
          .slideOutLeft(300)
          .then(() => setVisible(false));
      }
    }, 2000);
    return () => clearTimeout(timer);
  });

  if (!visible) return null;

  return (
     
        
    <Modal transparent={true} animationType="none">
   
      <Animatable.View
        ref={viewRef}
        animation="slideInLeft"
        duration={300}
        style={styles.container}
      >
        <Ionicons
          style={styles.icon}
          name="arrow-undo"
          color="#009075"
          size={24}
        />
        <TouchableOpacity   onPress={onPress}   onPressIn={async () => {
    if (soundRef.current) {
      try {
        await soundRef.current.replayAsync();
      } catch (error) {
        console.error("Sound play error:", error);
      }
    }
  }}  >
<Text style={styles.bold}>Undo</Text>
        <Text style={styles.text}>Completed</Text>
        </TouchableOpacity>
        
      </Animatable.View>
     
    </Modal>
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    backgroundColor: "#151515",
    width: 290,
    height: 60,
    justifyContent: "center",
    borderColor: "rgba(245,245,245,0.2)",
    position: "absolute",
    left: 10,
    bottom: 100,
    borderRadius: 10,
  },
  text: {
    color: "#fff",
    paddingLeft: 30,
  },
  bold: {
    color: "#009075",
    fontWeight: "900",
    paddingLeft: 30,
    paddingBottom: 3,
  },
  icon: {
    position: "absolute",
    left: 3,
  },
});
