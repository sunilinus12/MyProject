import { Button, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useUserDetailUpdateViewModel, useUserDetailViewModel } from "../hooks";
import { useRoute } from "@react-navigation/native";
import { LoadingOverAll, UserEditModal } from "../components";

export default function UserDetailScreen() {
  const { fetchData, data, loading, error } = useUserDetailViewModel();
  const route = useRoute(); // ✅ Call useRoute()
  const {
    updateUserDetail,
    loading: updateLoading,
    error: updateError,
    data: updateResp,
  } = useUserDetailUpdateViewModel();
  const { id } = route.params || {}; // ✅ Extract id safely
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);
  const openModal = () => {
    setIsVisible(true);
  };
  const closeModal = () => {
    setIsVisible(false);
  };
  const onSaveData = useCallback((data) => {
    updateUserDetail({ ...data });
    console.log("updateResp", updateResp);

    if (updateResp) {
      closeModal();
    }
  }, []);

  return (
    <View style={styles.container}>
      {loading && <LoadingOverAll />}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {data && !loading && (
        <View>
          <Text style={styles.title}>{data?.id + ". " + data?.title}</Text>
          <Text style={styles.body}>{data?.body}</Text>
          <Button title="Edit" onPress={openModal} />
        </View>
      )}
      {updateLoading ? (
        <LoadingOverAll withBackdrop={true} />
      ) : (
        <UserEditModal
          isVisible={isVisible}
          userData={data}
          onClose={closeModal}
          onSave={onSaveData}
        />
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
    textTransform: "capitalize",
  },
  body: {
    fontSize: 16,
    textTransform: "capitalize",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});
