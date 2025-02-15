import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Alert, View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import TabNavigator from "./tab";
import { Functions } from "../utils/functions";
import { useTheme, ThemedText } from "../component/layout";

const MyDrawer = createDrawerNavigator();

const CustomDrawerContent = (props: any) => {
  const { isDarkMode } = useTheme();
  return (
    <DrawerContentScrollView
      {...props}
      style={[styles.container, isDarkMode && styles.darkContainer]}
    >
      <DrawerItemList {...props} />
      <View style={{ marginTop: 10 }}>
        <DrawerItem
          label={() => (
            <ThemedText style={styles.drawerLabel}>Logout</ThemedText>
          )}
          icon={({ size }) => (
            <MaterialIcons
              name="logout"
              size={size}
              color={isDarkMode ? "#fff" : "#000"}
            />
          )}
          onPress={() => {
            Alert.alert("Logout", "Are you sure you want to logout?", [
              { text: "Cancel", style: "cancel" },
              {
                text: "OK",
                onPress: () => {
                  Functions.clearStorage();
                  props?.navigation?.closeDrawer();
                },
              },
            ]);
          }}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  const { isDarkMode } = useTheme();

  return (
    <MyDrawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: { color: isDarkMode ? "#fff" : "#000" },
        drawerActiveTintColor: "#007AFF",
        drawerInactiveTintColor: isDarkMode ? "#aaa" : "#555",
      }}
    >
      <MyDrawer.Screen
        name="TabNavigator"
        options={{
          drawerLabel: "Home",
          drawerIcon: ({ size, color }) => (
            <MaterialIcons
              name="home"
              size={size}
              color={isDarkMode ? "#fff" : "#000"}
            />
          ),
        }}
        component={TabNavigator}
      />
    </MyDrawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  darkContainer: {
    backgroundColor: "#333",
  },
  drawerLabel: {
    fontSize: 16,
  },
});

export default DrawerNavigator;
