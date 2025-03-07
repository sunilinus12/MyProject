import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserListing } from "../redux/actions/UserAction";

const useUserViewModel = () => {
  const dispatch = useDispatch();

  // ✅ Fetch Redux state using useSelector
  const state = useSelector(
    (state) => state.userList // Make sure it matches the store key in store.js
  );
  const { list, loading, error, page, hasMoreData, footerLoading } = state;

  const fetchData = useCallback(async (insidePage = 1) => {
    dispatch(getUserListing(insidePage)); // ✅ Dispatch Redux action
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const loadMore = useCallback(() => {
    if (!loading && !footerLoading && hasMoreData) {
      fetchData(page + 1);
    }
  }, [loading, hasMoreData, page, fetchData, footerLoading]);

  return {
    loadMore,
    fetchData,
    list, // ✅ Ensure these values exist
    loading,
    error,
    hasMoreData,
    footerLoading,
  };
};

export default useUserViewModel;
