import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { StackNavigation } from "../src/navigation";
import AppContextProvider from "../src/context/AppContextProvider";

export default function index() {
  return (
    <AppContextProvider>
      <StackNavigation />
    </AppContextProvider>
  );
}
