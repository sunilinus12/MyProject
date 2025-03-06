import { useCallback, useEffect, useState } from "react";
import { UserApi } from "../api";

const useUserViewModel = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ error: false });
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [footerLoading, setFooterLoading] = useState(false);

  const fetchData = async (insidePage = "1") => {
    try {
      setError({
        error: false,
      });
      if (insidePage == 1) {
        setLoading(true);
      } else {
        setFooterLoading(true);
      }
      let res = await UserApi(insidePage);
      if (res.length > 0) {
        setList((e) => (insidePage == 1 ? res : [...e, ...res]));
        setPage(insidePage);
      } else {
        setHasMoreData(false);
      }
      if (insidePage == 1) {
        setLoading(false);
      } else {
        setFooterLoading(false);
      }
    } catch (error) {
      setError({
        error: true,
        message:
          typeof error?.message === "string"
            ? String(error.message)
            : String(error) || "An unexpected error occurred",
      });
    }
  };

  useEffect(() => {
    fetchData(page);
  }, []);

  const loadMore = useCallback(() => {
    if (!loading) {
      fetchData(page + 1);
    }
  }, [loading, page, footerLoading]);

  return {
    loadMore,
    fetchData,
    list,
    hasMoreData,
    error,
    loading,
    footerLoading,
  };
};
export default useUserViewModel;
