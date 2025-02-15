import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AddUpdatePost, Login } from "../screen";
import DrawerNavigator from "./drawer";
import {
  createNavigationContainerRef,
  NavigationContainer,
} from "@react-navigation/native";

const Stack = createNativeStackNavigator();
export const navigationRef: any = createNavigationContainerRef();

const AppNavigator = (props: any) => {
  const { toScreen } = props;
  const [initial, setInitial] = React.useState(toScreen || "Login");
  const name = navigationRef.current?.getCurrentRoute()?.name || "";

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={() => setInitial(name)}
      onReady={() => setInitial(name)}
    >
      <Stack.Navigator
        initialRouteName={initial}
        screenOptions={{ headerShown: false, animation: "none" }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Drawer" component={DrawerNavigator} />
        <Stack.Screen name="AddUpdate" component={AddUpdatePost} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
