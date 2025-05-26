import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";


type Props = {
  onPress: () => void;
};

export default function CircleButton({ onPress }: Props) {
  return (
    <View>
   
      <TouchableOpacity onPress={onPress}>
        <View style={styles.button}>
          <Ionicons name="add-sharp" color="#fff" size={24} />
        </View>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderColor: "#009075",
    borderWidth: 3,
    borderRadius: 30,
    backgroundColor: "#009075",
    justifyContent: "center",
    alignItems: "center",
  },
});
