import AddTodo from "@/components/AddTodo";
import CheckBox from "@/components/CheckBox";
import CircleButton from "@/components/CircleButton";
import axios from "axios";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {

  type TodoDocument = {
  _id: string;
  task: string;
};
  const date = new Date().getDate();
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [document, setDocument] = useState<TodoDocument[]>([])
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );

 const handleSubmit = async() => {
  setModalVisible(false);
  
     try{
      await axios.post('http://192.168.1.46:3000/data', {
        
        task:text
      }).then((res)=> {
        console.log(res.data) 
        handleDocument();
      })

     }catch(error) {
          console.log("Posing Error:", error)
     }
 }

const handleDocument = async() => {
  console.log("Document Details:")
  try { 
    await axios.get<TodoDocument[]>('http://192.168.1.46:3000/data').then((res) => {
      console.log(res.data);
      setDocument(res.data);
    })
  } catch(error) {
    console.log("Document Fetching Error:" ,error)
  }
}
useEffect(()=> {
handleDocument();
},[])


  

  const handleCheckChange = async (_id: string, checked: boolean) => {
    setCheckedItems((prev) => ({
      ...prev,
      [_id]: checked,
    }));
  };

  useEffect(() => {
    const monthIndex = new Date().getMonth();
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    setMonth(months[monthIndex]);

    const dayIndex = new Date().getDay();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    setDay(days[dayIndex]);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.hr}>
        <Text style={styles.text}>
          {date} {month} • {day}
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {document?.map((item) => (
          <CheckBox
            key={item._id}
            label={item.task}
            checked={!!checkedItems[item._id]}
            onChange={(checked) => handleCheckChange(item._id, checked)}
          />
        ))}
      </ScrollView>

      <View style={styles.circleBtn}>
        <CircleButton onPress={() => setModalVisible(true)} />
      </View>

      <AddTodo
        isVisible={modalVisible}
        onPress={() => {
          return setModalVisible(false);
        }}
        setText={(value) => setText(value)}
        onClick = {()=> handleSubmit()}
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
