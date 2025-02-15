import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { ThemedText, ThemedView } from "../component/layout";
import { loginAPI } from "../api/login";
import ChangeTheme from "../component/themechange";
import { navigationRef } from "../navigation";
import { CommonActions } from "@react-navigation/native";

export default function HomeScreen(props: any) {
  const [loading, setLoading] = React.useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    console.log("Form Data:", data);
    try {
      setLoading(true);
      await loginAPI(data);
      navigationRef.current?.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Drawer", params: {} }],
        })
      );
    } catch (error) {
      Alert.alert("Login Failed", "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>This is Login Screen</ThemedText>
      <ThemedText style={{ marginBottom: 50 }}>
        Username:'emilys', Password:'emilyspass'
      </ThemedText>

      <View style={{ width: "50%", marginBottom: 40 }}>
        <ChangeTheme />
      </View>

      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="email-address"
          />
        )}
        name="username"
      />
      {errors.email && (
        <Text style={styles.errorText}>Username is required</Text>
      )}

      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="password"
      />
      {errors.password && (
        <Text style={styles.errorText}>Password is required</Text>
      )}

      <TouchableOpacity
        disabled={loading}
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
      >
        {loading ? (
          <ActivityIndicator color={"white"} />
        ) : (
          <Text style={styles.buttonText}>Submit</Text>
        )}
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    alignSelf: "flex-start",
    marginBottom: 10,
  },
});
