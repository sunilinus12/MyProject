import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { StackNavigation } from "../src/navigation";
import AppContextProvider from "../src/context/AppContextProvider";
import { Provider } from "react-redux";
import store from "../src/redux/store";

export default function index() {
  return (
    <Provider store={store}>
      <AppContextProvider>
        <StackNavigation />
      </AppContextProvider>
    </Provider>
  );
}
