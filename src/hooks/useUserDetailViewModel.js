import { useDispatch, useSelector } from "react-redux";
import { getUserDetail } from "../redux/actions/UserAction";

export default function useUserDetailViewModel() {
  const dispatch = useDispatch(); // Use Redux dispatch
  const { user, loading, error } = useSelector((state) => state.user); // Get state from Redux store
  const fetchData = async (postId) => {
    dispatch(getUserDetail(postId));
  };

  return { fetchData, data: user, loading, error };
}
