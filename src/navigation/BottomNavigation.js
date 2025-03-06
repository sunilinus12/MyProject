import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { UserListScreen } from "../screens";

const Tab = createBottomTabNavigator();
//  name: "UserList",
//     component: UserListScreen,
//   },
//   {
//     name: "userDetail",
//     component: UserDetailScreen,
export default function BottomNavigation() {
  return (
    <Tab.Navigator screenOptions={{headerShown:false}}>
      <Tab.Screen name="UserList" component={UserListScreen} />
      <Tab.Screen name="UserList 2" component={UserListScreen} />
    </Tab.Navigator>
  );
}
