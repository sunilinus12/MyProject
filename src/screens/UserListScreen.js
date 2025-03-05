import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useUserViewModel } from "../hooks";

export default function UserListScreen() {
  const { loadMore, fetchData, list, hasMoreData, error, loading } =
    useUserViewModel();
    console.log("listlist",list);
    
  return (
    <View>
      <Text>UserListScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
