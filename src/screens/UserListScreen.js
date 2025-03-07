import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useContext } from "react";
import { useUserViewModel } from "../hooks";
import { ListFooterLoading, LoadingOverAll, UserItemCard } from "../components";
import { AppContext } from "../context/AppContextProvider";

export default function UserListScreen({ navigation }) {
  const {
    loadMore,
    fetchData,
    list,
    hasMoreData,
    error,
    loading,
    footerLoading,
  } = useUserViewModel();
  const { setData } = useContext(AppContext);

  const onPressCard = useCallback(
    (id) => {
      setData({ id });
      navigation.navigate("userDetail", { id });
    },
    [] // ✅ No unnecessary dependencies
  );

  const keyExtractor = useCallback((item, index) => index.toString(), []); // ✅ Stable function

  const onPageCard = useCallback(
    ({ item }) => <UserItemCard item={item} onPress={onPressCard} />,
    [] // ✅ Correct dependency
  );

  if (error?.error) {
    return (
      <View>
        <Text>{error.message || "Something went wrong"}</Text>
      </View>
    );
  }

  return loading ? (
    <LoadingOverAll />
  ) : (
    <FlatList
      data={list} // ✅ No need for memoizedList
      keyExtractor={keyExtractor}
      renderItem={onPageCard}
      onEndReached={hasMoreData ? loadMore : null}
      onEndReachedThreshold={1}
      ListFooterComponent={footerLoading ? ListFooterLoading : null}
      initialNumToRender={20}
      windowSize={10}
    />
  );
}
