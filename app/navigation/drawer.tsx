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
import { useTheme, ThemedView, ThemedText } from "../component/layout";

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
          label={() => <ThemedText>Logout</ThemedText>}
          icon={({ color, size }) => (
            <MaterialIcons name="logout" size={size} color={color} />
          )}
          onPress={() => {
            Alert.alert("Logout", "Are you sure you want to logout?", [
              {
                text: "Cancel",
                style: "cancel",
              },
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

const DrawerNavigator = () => (
  <MyDrawer.Navigator
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    screenOptions={{ headerShown: false }}
  >
    <MyDrawer.Screen
      name="TabNavigator"
      options={{ drawerLabel: "Home" }}
      component={TabNavigator}
    />
  </MyDrawer.Navigator>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  darkContainer: {
    backgroundColor: "#333",
  },
});

export default DrawerNavigator;
