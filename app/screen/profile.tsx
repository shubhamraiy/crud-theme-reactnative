import { StyleSheet, Switch, ScrollView, Image, View } from "react-native";
import React, { useEffect } from "react";
import { ThemedText, ThemedView, useTheme } from "../component/layout";
import { getProfileAPI } from "../api/profile";
import Header from "../component/header";
import ProfileItem from "../component/profile";
import ChangeTheme from "../component/themechange";

export default function ProfileScreen(props: any) {
  const { isDarkMode, setIsDarkMode, user: profile, setUser } = useTheme();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response: any = await getProfileAPI();
      if (response?.data) {
        setUser(response?.data);
      }
    } catch (error) {}
  };

  if (!profile) {
    return <ThemedText>Loading...</ThemedText>;
  }

  const profileData = [
    { label: "Name", value: `${profile?.firstName} ${profile?.lastName}` },
    { label: "Email", value: profile?.email },
    { label: "Phone", value: profile?.phone },
    { label: "Age", value: profile?.age },
    { label: "Gender", value: profile?.gender },
    { label: "Birth Date", value: profile?.birthDate },
    { label: "Blood Group", value: profile?.bloodGroup },
    {
      label: "Address",
      value: `${profile?.address?.address}, ${profile?.address?.city}, ${profile?.address?.state}, ${profile?.address?.country} - ${profile?.address?.postalCode}`,
    },
    { label: "University", value: profile?.university },
    {
      label: "Company",
      value: `${profile?.company?.name} (${profile?.company?.department})`,
    },
    { label: "Title", value: profile?.company?.title },
    {
      label: "Crypto Wallet",
      value: `${profile?.crypto?.wallet} (${profile?.crypto?.coin})`,
    },
    {
      label: "Bank",
      value: `${profile?.bank?.cardType} - ${profile?.bank?.cardNumber} (Exp: ${profile?.bank?.cardExpire})`,
    },
    { label: "Username", value: profile?.username },
    { label: "IP Address", value: profile?.ip },
    { label: "MAC Address", value: profile?.macAddress },
    { label: "SSN", value: profile?.ssn },
  ];

  return (
    <ThemedView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Header title="My Profile" {...props} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 20 }}
      >
        <Image source={{ uri: profile?.image }} style={styles.profileImage} />
        <ChangeTheme />
        <View style={styles.separator} />

        {profileData.map((item, index) => (
          <ProfileItem key={index} label={item.label} value={item.value} />
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  darkContainer: {
    backgroundColor: "#333",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 10,
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
