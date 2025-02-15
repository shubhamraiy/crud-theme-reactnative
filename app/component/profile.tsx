import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "../component/layout";

const ProfileItem = ({ label, value }: { label: string; value: string }) => {
  if (!value) return null;
  return (
    <>
      <View style={styles.row}>
        <ThemedText style={styles.label}>{label}:</ThemedText>
        <ThemedText style={{ maxWidth: "60%", textAlign: "right" }}>
          {value}
        </ThemedText>
      </View>
      <View style={styles.separator} />
    </>
  );
};

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
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 5,
  },
});

export default ProfileItem;
