import { useCallback, useEffect, useReducer } from "react";
import { UserApi } from "../api";

const initialState = {
  list: [],
  loading: false,
  error: { error: false },
  page: 1,
  hasMoreData: true,
  footerLoading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FetchStart":
      return {
        ...state,
        loading: action.payload === 1, // Show main loader only for first page
        footerLoading: action.payload !== 1, // Show footer loader for pagination
        error: { error: false },
      };
    case "FetchSuccess":
      return {
        ...state,
        loading: false,
        footerLoading: false,
        error: { error: false },
        list:
          action.payload.page === 1
            ? action.payload.data // Replace list for first page
            : [...state.list, ...action.payload.data], // Append new data for pagination
        page: action.payload.page,
        hasMoreData: action.payload.data.length > 0, // Check if more data is available
      };
    case "FetchFailed":
      return {
        ...state,
        loading: false,
        footerLoading: false,
        error: {
          error: true,
          message:
            typeof action.payload?.message === "string"
              ? action.payload.message
              : "Failed to fetch the details",
        },
        list: state.list, // Preserve old data on failure
      };
    default:
      return state;
  }
};

const useUserViewModel = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { list, loading, error, page, hasMoreData, footerLoading } = state;

  const fetchData = useCallback(async (insidePage = 1) => {
    try {
      dispatch({ type: "FetchStart", payload: Number(insidePage) });
      let res = await UserApi(insidePage);
      dispatch({
        type: "FetchSuccess",
        payload: {
          page: Number(insidePage),
          data: res,
        },
      });
    } catch (error) {
      dispatch({
        type: "FetchFailed",
        payload: {
          error: true,
          message:
            typeof error?.message === "string"
              ? error.message
              : "An unexpected error occurred",
        },
      });
    }
  }, []);

  useEffect(() => {
    fetchData(); // Always start from page 1
  }, []);

  const loadMore = useCallback(() => {
    if (!loading && hasMoreData) {
      fetchData(page + 1);
    }
  }, [loading, hasMoreData, page, fetchData]);

  return {
    loadMore,
    fetchData,
    ...state,
  };
};

export default useUserViewModel;
