import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigationRef } from "../navigation";
import { CommonActions } from "@react-navigation/native";

export const Functions = {
  async _setToken(data: any) {
    try {
      await AsyncStorage.setItem("token", data);
    } catch (error) {}
  },
  async _getToken() {
    try {
      const token = await AsyncStorage.getItem("token");
      return token;
    } catch (error) {
      return null;
    }
  },
  async _setRefreshToken(data: any) {
    try {
      await AsyncStorage.setItem("reftoken", data);
    } catch (error) {}
  },
  async _getRefreshToken() {
    try {
      const token = await AsyncStorage.getItem("reftoken");
      return token;
    } catch (error) {
      return null;
    }
  },
  async clearStorage() {
    try {
      await AsyncStorage.setItem("token", "");
      await AsyncStorage.setItem("reftoken", "");
      await AsyncStorage.clear();
    } catch (error) {
    } finally {
      navigationRef.current?.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login", params: {} }],
        })
      );
    }
  },
};
