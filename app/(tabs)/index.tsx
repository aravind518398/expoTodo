import AddTodo from "@/components/AddTodo";
import CheckBox from "@/components/CheckBox";
import CircleButton from "@/components/CircleButton";
import BackgroundImage from "@/components/ui/BackgroundImage";
import Undo from "@/components/Undo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
export default function Index() {


  useEffect(() => {
  return () => {
    
    Object.values(deleteTimeouts.current).forEach(clearTimeout);
  };
}, []);

  type TodoItem = {
    id: number;
    task: string;
  };
  const date = new Date().getDate();
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [task, setTask] = useState<string>("");
  const [document, setDocument] = useState<TodoItem[]>([]);
const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const [lastDeleted, setLastDeleted] = useState<TodoItem | null>(null);

const deleteTimeouts = useRef<{ [key: number]: number }>({});

  // Save task
  const saveTask = async () => {
    const trimmedTask = task.trim();
    if (!trimmedTask) return;

    try {
      const existing = await AsyncStorage.getItem("tasks");
      let tasks = existing ? JSON.parse(existing) : [];
      const newTask = { id: Date.now(), task: trimmedTask };
      const updatedTasks = [...tasks, newTask];
      await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setDocument(updatedTasks);
      setTask("");
      setModalVisible(false);
    } catch (e) {
      console.log("Saving error", e);
    }
  };

  // Load task
  const loadTasks = async () => {
    try {
      const stored = await AsyncStorage.getItem("tasks");
      if (stored) {
        const tasks = JSON.parse(stored);
        setDocument(tasks);
      }
    } catch (e) {
      console.log("Loading error", e);
    }
  };
  // Delete  task
  const deleteTask = async (id: number) => {
  try {
    const stored = await AsyncStorage.getItem("tasks");
    const tasks: TodoItem[] = stored ? JSON.parse(stored) : [];
    const taskToDelete = tasks.find((t) => t.id === id);

    const updatedTasks = tasks.filter((t) => t.id !== id);
    await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setDocument(updatedTasks);

    if (taskToDelete) {
      setLastDeleted(taskToDelete);
    }
  } catch (e) {
    console.log("Delete error", e);
  }
};

  const handleUndo = async () => {
    if (lastDeleted) {
      const updated = [lastDeleted, ...document];

      await AsyncStorage.setItem("tasks", JSON.stringify(updated));
      setDocument(updated);

      setCheckedItems((prev) => ({
        ...prev,
        [lastDeleted.id]: false, 
      }));

      
      setTimeout(() => {
        setCheckedItems((prev) => {
          const updatedChecked = { ...prev };
          delete updatedChecked[lastDeleted.id];
          return updatedChecked;
        });
      }, 3000);

      setLastDeleted(null);
    }
  };

  const handleCheckChange = async (id: number, checked: boolean) => {
    if (checked) {
      setCheckedItems((prev) => ({
        ...prev,
        [id]: true,
      }));

      const timeoutId = setTimeout(() => {
        deleteTask(id);
        setCheckedItems((prev) => {
          const updated = { ...prev };
          delete updated[id];
          return updated;
        });
      }, 2000);

      deleteTimeouts.current[id] = timeoutId;
    } else {
      
      if (deleteTimeouts.current[id]) {
        clearTimeout(deleteTimeouts.current[id]);
        delete deleteTimeouts.current[id];
      }

      setCheckedItems((prev) => ({
        ...prev,
        [id]: false,
      }));
    }
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

    loadTasks();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.hr}>
        <Text style={styles.text}>
          {date} {month} • {day}
        </Text>
      </View>

      {Array.isArray(document) && document.length > 0 ? (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          {document.map((item) => (
            <CheckBox
              key={item.id.toString()}
              label={item.task}
              checked={!!checkedItems[item.id]}
              onChange={(checked) => handleCheckChange(item.id, checked)}
            />
          ))}
        </ScrollView>
      ) : (
        <BackgroundImage />
      )}
      <View style={styles.circleBtn}>
        <CircleButton onPress={() => setModalVisible(true)} />
      </View>

      <AddTodo
        isVisible={modalVisible}
        onPress={() => {
          return setModalVisible(false);
        }}
        setText={(value) => setTask(value)}
        onClick={() => saveTask()}
      />
      {lastDeleted && <Undo onPress={handleUndo} />}
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
