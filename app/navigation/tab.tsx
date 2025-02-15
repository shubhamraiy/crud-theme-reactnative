import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Profile } from "../screen";
import { useTheme } from "../component/layout";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { isDarkMode } = useTheme();
  const iconColor = isDarkMode ? "#fff" : "#000";
  const labelColor = isDarkMode ? "#fff" : "#000";

  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? "#000" : "#fff" }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: isDarkMode ? "#222" : "#fff",
            borderTopColor: isDarkMode ? "#444" : "#ddd",
          },
          tabBarLabelStyle: { color: labelColor },
          tabBarIcon: ({ size, focused }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home-sharp" : "home-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            }
            return (
              <Ionicons name={iconName as any} size={size} color={iconColor} />
            );
          },
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: isDarkMode ? "#aaa" : "#555",
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </View>
  );
};

export default TabNavigator;
