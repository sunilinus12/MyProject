import { UserDetailApi } from "../api";
import {
  fetchUserStart,
  fetchUserSuccess,
  fetchUserError,
} from "../redux/UserSlice";

export default function useUserDetailViewModel(dispatch) {
  const fetchData = async (postId) => {
    try {
      dispatch(fetchUserStart()); // Start loading state
      let resp = await UserDetailApi(postId);

      dispatch(fetchUserSuccess(resp)); // Store the response in Redux state
    } catch (err) {
      dispatch(fetchUserError("Failed to fetch user")); // Handle error
    }
  };

  return { fetchData };
}
