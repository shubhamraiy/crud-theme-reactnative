import { StyleSheet, Switch, View } from "react-native";
import React from "react";
import { ThemedText, useTheme } from "../component/layout";

export default function ChangeTheme() {
  const { isDarkMode, setIsDarkMode } = useTheme();

  return (
    <View style={styles.row}>
      <ThemedText style={styles.label}>Dark Mode:</ThemedText>
      <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
