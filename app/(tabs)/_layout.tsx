import BlurLayer from "@/components/ui/BlurLayer";
import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function RootLayout() {
  const today = new Date().getDate();
  return (
    <>
      <Tabs
        screenOptions={{
          
          headerTintColor: "#f1f1f1",
          headerTransparent: true,
          headerBackground: () => <BlurLayer />,
          headerShadowVisible: false,
          tabBarBackground: () => <BlurLayer />,
          tabBarStyle: {
            backgroundColor: "transparent",
            position: "absolute",
            borderTopWidth: 0,
          },
          tabBarActiveTintColor: "#009075",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerTitle:"Today",
            tabBarLabel: "Today",
            tabBarIcon: ({ color, size }) => (
              <View style={{ width: size, height: size }}>
                <MaterialIcons
                  name="calendar-today"
                  size={size}
                  color={color}
                />
                <Text style={[styles.dateOverlay, { color }]}>{today}</Text>
              </View>
            ),
          }}
        />

        <Tabs.Screen
          name="upcoming"
          options={{
            headerTitle:"Upcoming",
            tabBarLabel: "Upcoming",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="date-range" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  dateOverlay: {
    position: "absolute",
    top: 8,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 11,
    fontWeight: "bold",
  },
});
