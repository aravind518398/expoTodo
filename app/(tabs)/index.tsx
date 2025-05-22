import AddTodo from "@/components/AddTodo";
import CircleButton from "@/components/CircleButton";
import CheckBox from "@/components/CheckBox";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from "react-native";

export default function Index() {
  const date = new Date().getDate();
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [text, setText] = useState("");

  const checkboxData = [
    { id: 1, label: "React Native" },
    { id: 2, label: "Expo" },
    { id: 3, label: "JavaScript" },
    { id: 4, label: "TypeScript" },
    { id: 5, label: "MongoDB" },
    { id: 6, label: "Node.js" },
    { id: 7, label: "Express.js" },
  ];

  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({});

  const handleCheckChange = (id: number, checked: boolean) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  useEffect(() => {
    const monthIndex = new Date().getMonth();
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    setMonth(months[monthIndex]);

    const dayIndex = new Date().getDay();
    const days = [
      "Sunday", "Monday", "Tuesday", "Wednesday",
      "Thursday", "Friday", "Saturday",
    ];
    setDay(days[dayIndex]);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>
        {date} {month} • {day}
      </Text>

      <View style={styles.hr} />

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {checkboxData.map((item) => (
          <CheckBox
            key={item.id}
            label={item.label}
            checked={!!checkedItems[item.id]}
            onChange={(checked) => handleCheckChange(item.id, checked)}
          />
        ))}
      </ScrollView>

    
      

      <View style={styles.circleBtn}>
        <CircleButton onPress={() => setModalVisible(true)} />
      </View>

      <AddTodo
        isVisible={modalVisible}
        onPress={() => setModalVisible(false)}
        setText={(value) => setText(value)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050505",
  },
  text: {
    color: "#a0a0a0",
    fontWeight: "700",
    paddingTop: 50,
    paddingLeft: 10,
    paddingBottom: 10,
  },
  hr: {
    borderBottomColor: "rgba(245,245,245,0.2)",
    borderBottomWidth: 0.2,
  },
  circleBtn: {
    position: "absolute",
    bottom: 100,
    right: 10,
  },
});
