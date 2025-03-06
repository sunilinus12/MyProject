import { useState } from "react";
import { UserDetailUpdateApi } from "../api";

export default function useUserDetailUpdateViewModel() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const updateUserDetail = async (data) => {
    try {
      setError(false);
      setLoading(true);
      let resp = await UserDetailUpdateApi(data);
      setData(resp);
      setLoading(false);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { updateUserDetail, loading, error, data };
}
