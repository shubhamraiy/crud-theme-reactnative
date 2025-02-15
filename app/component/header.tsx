import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedText, ThemedView, useTheme } from "../component/layout";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Header(props: any) {
  const { navigation, title, goBack, style } = props;
  const { isDarkMode } = useTheme();
  return (
    <ThemedView style={[styles.container, style]}>
      {goBack ? (
        <MaterialCommunityIcons
          onPress={() => navigation.goBack()}
          name={"arrow-left"}
          size={30}
          color={isDarkMode ? "white" : "black"}
        />
      ) : (
        <MaterialCommunityIcons
          onPress={() => navigation.openDrawer()}
          name={"menu"}
          size={30}
          color={isDarkMode ? "white" : "black"}
        />
      )}
      <ThemedText style={styles.title}>{title}</ThemedText>
      <ThemedText></ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
