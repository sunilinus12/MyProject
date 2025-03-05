import { createStackNavigator } from "@react-navigation/stack";
import { UserDetailScreen, UserListScreen } from "../screens"; // Ensure correct path
import React from "react";

const StackList = [
  {
    name: "UserList",
    component: UserListScreen,
  },
  {
    name: "userDetail",
    component: UserDetailScreen,
  },
];
const Stack = createStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {StackList.map((item, index) => (
        <Stack.Screen key={index} name={item.name} component={item.component} />
      ))}
    </Stack.Navigator>
  );
}
