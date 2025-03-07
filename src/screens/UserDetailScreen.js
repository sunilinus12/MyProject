import { Button, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useUserDetailUpdateViewModel, useUserDetailViewModel } from "../hooks";
import { useRoute } from "@react-navigation/native";
import { LoadingOverAll, UserEditModal } from "../components";
import { AppContext } from "../context/AppContextProvider";
import { useDispatch, useSelector } from "react-redux";

export default function UserDetailScreen() {
  const route = useRoute(); // ✅ Call useRoute()
  const { id } = route.params || {}; // ✅ Extract id safely
  const { fetchData, data, loading, error } = useUserDetailViewModel(id);
  const [isVisible, setIsVisible] = useState(false);

  const {
    updateUserDetail,
    loading: updateLoading,
    error: updateError,
    data: updateResp,
  } = useUserDetailUpdateViewModel();

  const openModal = () => {
    setIsVisible(true);
  };
  const closeModal = () => {
    setIsVisible(false);
  };
  const onSaveData = useCallback((data) => {
    updateUserDetail({ ...data });
    closeModal();
    // }
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
