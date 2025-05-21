import { StyleSheet, Text, View } from "react-native";

import { useEffect, useState } from "react";

export default function Index() {
  const date = new Date().getDate()
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string>("");

  useEffect(() => {
    const monthIndex = new Date().getMonth();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
                    "Aug", "Sep", "Oct", "Nov", "Dec"];
    setMonth(months[monthIndex]);

    const dayIndex = new Date().getDay();
   const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
   setDay(days[dayIndex])
      
  }, []);
  



  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {date} {month} • {day}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#050505",
  },
  text: {
    color: "#fdfdfd",
    fontWeight:700,
    
  },
});
