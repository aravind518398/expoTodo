import { MaterialIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { useEffect, useRef } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  isVisible: boolean;
  onPress: () => void;
  setText: (value: string) => void;
  onClick:()=> void;
};

export default function AddTodo({ isVisible, onPress, setText, onClick }: Props) {

    const soundRef = useRef<Audio.Sound | null>(null);
  
   useEffect(() => {
  const loadSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("@/assets/sendweb.mp3")
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
  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.text}>Today's task</Text>
            <TouchableOpacity onPress={onPress}>
              <MaterialIcons name="close" color={"#d0d0d0"} size={23} />
            </TouchableOpacity>
          </View>
          <View>
            <TextInput
              onSubmitEditing={onPress}
              keyboardType="twitter"
              keyboardAppearance="dark"
              returnKeyType="next"
              onChangeText={(value) => setText(value)}
              selectionColor="#009075"
              autoFocus
              style={styles.textField}
            ></TextInput>
            <View  style={styles.upArrow}>
              <TouchableOpacity onPress={onClick} onPressIn={async () => {
    if (soundRef.current) {
      try {
        await soundRef.current.replayAsync();
      } catch (error) {
        console.error("Sound play error:", error);
      }
    }
  }}   >
<MaterialIcons  name="send" color="#fff" size={24} />
              </TouchableOpacity>
              
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "57%",
    width: "100%",
    backgroundColor: "#151515",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    bottom: 0,
  },
  titleContainer: {
    height: "8%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    backgroundColor: "#009075",
  },
  text: {
    color: "#d0d0d0",
    fontWeight: 700,
    fontSize: 16,
  },
  textField: {
    fontSize: 24,
    color: "#d5d5d5",
    paddingTop: 20,
    paddingLeft: 10,
  },
  upArrow: {
    position: "absolute",
    right: 10,
    bottom: 0,
    backgroundColor: "#009075",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
  