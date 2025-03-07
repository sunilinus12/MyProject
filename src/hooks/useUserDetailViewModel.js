import { useDispatch, useSelector } from "react-redux";
import { getUserDetail } from "../redux/actions/UserAction";
import { useEffect, useCallback } from "react";
import { clearUserDetail } from "../redux/UserSlice";

export default function useUserDetailViewModel(userId) {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);

  // ✅ Memoized fetchData function to avoid re-creating it on each render
  const fetchData = useCallback((postId) => {
    dispatch(getUserDetail(postId));
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(clearUserDetail()); // ✅ Clear old data once, before fetching new data
      fetchData(userId);
    }

    return () => {
      dispatch(clearUserDetail()); // ✅ Clears data only when unmounting
      dispatch(getUserDetail.rejected())
    };
  }, [userId, fetchData, dispatch]); // ✅ Corrected dependencies

  return { fetchData, data: user, loading, error };
}
