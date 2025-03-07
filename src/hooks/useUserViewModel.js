import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserListing } from "../redux/actions/UserAction";

const useUserViewModel = () => {
  const dispatch = useDispatch();

  // ✅ Fetch Redux state using useSelector
  const state = useSelector(
    (state) => state.userList // Make sure it matches the store key in store.js
  );
  const { list, loading, error, page, hasMoreData, footerLoading } = state;
  const apiRef = useRef(null);
  const fetchData = useCallback(async (insidePage = 1) => {
    if (apiRef.current) {
      apiRef.current.abort(); // Abort the previous request if it exists
    }

    apiRef.current = new AbortController(); // ✅ Correct assignment
    const signal = apiRef.current.signal;

    dispatch(getUserListing({ page: insidePage, signal })).finally(() => {
      apiRef.current = null;
    }); // ✅ Pass as an object
  }, []);

  useEffect(() => {
    fetchData();
    return () => {
      if (apiRef.current) {
        apiRef.current.abort(); // Abort the previous request if it exists
      }
    };
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
