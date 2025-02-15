import "react-native-gesture-handler";
import { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ThemedView, ThemeProvider } from "./app/component/layout";
import { Functions } from "./app/utils/functions";
import * as SplashScreen from "expo-splash-screen";
import AppNavigator from "./app/navigation";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const [ScreentoNav, setScreentoNav] = useState("Login");

  useEffect(() => {
    userCheck();
  }, []);

  const userCheck = async () => {
    const token = await Functions._getToken();
    if (token) {
      setScreentoNav("Drawer");
    } else {
      setScreentoNav("Login");
    }

    setLoading(false);
    setAppIsReady(true);
  };

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  const LoadMainApp = () => {
    return (
      <ThemeProvider>
        <ThemedView style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <StatusBar style="auto" />
          <SafeAreaView style={{ flex: 1 }}>
            <AppNavigator toScreen={ScreentoNav} />
          </SafeAreaView>
        </ThemedView>
      </ThemeProvider>
    );
  };

  const LoadApp = () => {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Image
          source={require("./assets/splash-icon.png")}
          style={{ resizeMode: "contain", height: 400, width: 400 }}
        />
      </View>
    );
  };

  if (isLoading || !appIsReady) {
    return LoadApp();
  } else {
    return LoadMainApp();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
