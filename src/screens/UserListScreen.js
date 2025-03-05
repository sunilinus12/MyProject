import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback } from "react";
import { useUserViewModel } from "../hooks";
import { ListFooterLoading, LoadingOverAll, UserItemCard } from "../components";

export default function UserListScreen() {
  const {
    loadMore,
    fetchData,
    list,
    hasMoreData,
    error,
    loading,
    footerLoading,
  } = useUserViewModel();

  const keyExtractor = useCallback((item, index) => index.toString());
  const onPageCard = useCallback(({ item }) => <UserItemCard item={item} />);
  return loading ? (
    <LoadingOverAll />
  ) : (
    <FlatList
      data={list}
      keyExtractor={keyExtractor}
      renderItem={onPageCard}
      onEndReached={() => {
        hasMoreData && loadMore();
      }}
      onEndReachedThreshold={0.8}
      ListFooterComponent={() => {
        return footerLoading && <ListFooterLoading />;
      }}
    />
  );
}

const styles = StyleSheet.create({});
