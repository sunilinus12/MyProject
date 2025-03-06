import { useDispatch, useSelector } from "react-redux";
import UserDetailApi from "../api/UserDetailApi";
import {
  fetchUserStart,
  fetchUserSuccess,
  fetchUserError,
} from "../redux/UserSlice";

export default function useUserDetailViewModel() {
  const dispatch = useDispatch(); // Use Redux dispatch
  const { user, loading, error } = useSelector((state) => state.user); // Get state from Redux store

  const fetchData = async (postId) => {
    try {
      dispatch(fetchUserStart()); // Start loading state
      let resp = await UserDetailApi(postId);
      dispatch(fetchUserSuccess(resp)); // Store the response in Redux state
    } catch (err) {
      dispatch(fetchUserError("Failed to fetch user")); // Handle error
    }
  };

  return { fetchData, data: user, loading, error };
}
