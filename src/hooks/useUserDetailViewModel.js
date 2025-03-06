import { useState } from "react";
import UserDetailApi from "../api/UserDetailApi"; // Ensure correct import

export default function useUserDetailViewModel() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (postId) => {
    try {
      setLoading(true);
      let resp = await UserDetailApi(postId);
      setData(resp);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { fetchData, data, loading, error };
}
