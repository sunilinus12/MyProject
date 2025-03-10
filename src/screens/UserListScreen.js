import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useCallback, useState } from "react";
import { useUsers } from "../hooks";

export default function UserListScreen() {
  const { fetchApi, list, loading, footerLoading, hasMoreData, loadMore } =
    useUsers();
  const [input, setInput] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const keyExtractor = useCallback((item, index) => index.toString(), []);

  const renderItem = useCallback(({ item }) => {
    return (
      <View style={styles.cardContainer}>
        <Text numberOfLines={1}>{item?.title}</Text>
        <Text>{item?.primary_details?.Salary}</Text>
        <Text>{item?.whatsapp_no}</Text>
        <Text numberOfLines={1}>{item?.primary_details?.Place}</Text>
      </View>
    );
  }, []);
  const handleInput = (e) => {
    setInput(e);
    if (e.trim("")) {
      let resp = [...list];
      let sorted = resp.filter((item, index) => {
        if (item?.title?.toLowerCase().includes(e.toLowerCase())) {
          return true;
        }
        return false;
      });
      setFilteredList(sorted);
    } else {
      setFilteredList([]);
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        value={input}
        onChangeText={handleInput}
        style={styles.input}
      />

      <FlatList
        data={filteredList.length > 0 ? filteredList : list}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        // onEndReached={}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    width: "100%",
    height: 100,
    backgroundColor: "lightgreen",
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});
