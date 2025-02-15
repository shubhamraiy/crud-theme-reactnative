import React, { createContext, useContext, useState } from "react";
import { View, Text, TextProps, ViewProps } from "react-native";

const ThemeContext: any = createContext(null);

export const ThemeProvider = ({ children }: any) => {
  const [isDarkMode, setIsDarkMode] = useState<any>(false);
  const [user, setUser] = useState<any>({});

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode, user, setUser }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme: any = () => useContext(ThemeContext);

export const ThemedView = ({ style, ...props }: ViewProps) => {
  const { isDarkMode } = useTheme();
  return (
    <View
      style={[{ backgroundColor: isDarkMode ? "#333" : "#fff" }, style]}
      {...props}
    />
  );
};

export const ThemedText = ({ style, ...props }: TextProps) => {
  const { isDarkMode } = useTheme();
  return (
    <Text style={[{ color: isDarkMode ? "#fff" : "#000" }, style]} {...props} />
  );
};
