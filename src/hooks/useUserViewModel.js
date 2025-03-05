import { useCallback, useEffect, useState } from "react";

const useUserViewModel = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ error: false });
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [footerLoading, setFooterLoading] = useState(false);

  const fetchData = async (insidePage = "1") => {
    try {
      if (insidePage == 1) {
        setLoading(true);
      } else {
        setFooterLoading(true);
      }
      let resp = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=10&_page=" +
          insidePage
      );
      //   if (resp.status == "201") {
      let res = await resp.json();
      if (res.length > 0) {
        setList((e) => [...e, ...res]);
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
      setError({ error: true, message: error });
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
