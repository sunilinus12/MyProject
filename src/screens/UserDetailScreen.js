import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useUserDetailViewModel } from "../hooks";
import { useRoute } from "@react-navigation/native";
import { LoadingOverAll } from "../components";

export default function UserDetailScreen() {
  const { fetchData, data, loading, error } = useUserDetailViewModel();
  const route = useRoute(); // ✅ Call useRoute()
  const { id } = route.params || {}; // ✅ Extract id safely

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);
  return (
    <View style={styles.container}>
      {loading && <LoadingOverAll />}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {data && !loading && (
        <View>
          <Text style={styles.title}>{data?.id + ". " + data?.title}</Text>
          <Text style={styles.body}>{data?.body}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textTransform:"capitalize"
  },
  body: {
    fontSize: 16,
    textTransform:"capitalize"
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});
