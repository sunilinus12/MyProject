import { createStackNavigator } from "@react-navigation/stack";
import { UserListScreen } from "../screens"; // Ensure correct path
import React from "react";

const Stack = createStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserList" component={UserListScreen} />
    </Stack.Navigator>
  );
}
