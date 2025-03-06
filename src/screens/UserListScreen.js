import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useMemo } from "react";
import { useUserViewModel } from "../hooks";
import { ListFooterLoading, LoadingOverAll, UserItemCard } from "../components";

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

  const onPressCard = useCallback(
    (id) => {
      navigation.navigate("userDetail", { id });
    },
    [memoizedList]
  );
  const keyExtractor = useCallback((item, index) => index.toString());
  const onPageCard = useCallback(
    ({ item }) => <UserItemCard item={item} onPress={onPressCard} />,
    [, onPressCard]
  );
  const memoizedList = useMemo(() => list, [list]);

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
      data={memoizedList}
      keyExtractor={keyExtractor}
      renderItem={onPageCard}
      onEndReached={hasMoreData ? loadMore : null}
      onEndReachedThreshold={1}
      ListFooterComponent={footerLoading ? ListFooterLoading : null}
      // getItemLayout={(data, index) => ({
      //   length: 100,
      //   offset: 100 * index,
      //   index,
      // })}
      initialNumToRender={20} // Start with 10 items
      windowSize={10} // Render only a few offscreen items
    />
  );
}

const styles = StyleSheet.create({});
