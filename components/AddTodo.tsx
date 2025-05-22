import { MaterialIcons } from "@expo/vector-icons";

import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";


type Props = {
  isVisible: boolean;
  onPress: () => void;
   setText: (value: string) => void;
};
 

export default function AddTodo({ isVisible, onPress, setText}: Props) {
    
 
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
            <TextInput keyboardType="twitter"  onChangeText={(value)=>setText(value)}   selectionColor="#009075" autoFocus style={styles.textField}></TextInput>
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
  },textField:{
    
    fontSize:24,
    color:"#d5d5d5",
    paddingTop:20,
    paddingLeft:10,
  }
});

