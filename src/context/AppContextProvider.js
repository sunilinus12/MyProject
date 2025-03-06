import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useState } from "react";

export const AppContext = createContext();
export default function AppContextProvider({ children }) {
  const [data, setData] = useState(null);
  return (
    <AppContext.Provider value={{ data, setData }}>
      {children}
    </AppContext.Provider>
  );
}
