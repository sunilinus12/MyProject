import { useCallback, useEffect, useReducer, useState } from "react";
import UserListApi from "../api/UserListApi";

const useUsers = () => {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [footerLoading, setFooterLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(false);
  const fetchApi = async (insidePage = 1) => {
    try {
      if (insidePage == 1) {
        setLoading(true);
      } else {
        setFooterLoading(true);
      }
      let resp = await UserListApi(insidePage);
      let res = [...resp.results];
      if (res.length > 0) {
        setList((e) => (insidePage == 1 ? res : [...e, ...res]));
        setPage(insidePage);
      }
      setLoading(false);
      setFooterLoading(false);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);
  const loadMore = useCallback(() => {
    if (!footerLoading) {
      fetchApi(page + 1);
    }
  }, [footerLoading, page]);

  return { fetchApi, list, loading, footerLoading, hasMoreData, loadMore };
};

export default useUsers;
