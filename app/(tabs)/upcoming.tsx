import { StyleSheet, Text, View } from "react-native";

export default function Upcoming() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
justifyContent:"center",
    alignItems: "center",
    backgroundColor: "#050505",
  },text:{
    color: "#fff"
  }
});
