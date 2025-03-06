import { act, useReducer, useState } from "react";
import UserDetailApi from "../api/UserDetailApi"; // Ensure correct import

const initalState = {
  data: null,
  loading: false,
  error: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: false };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, data: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};
export default function useUserDetailViewModel() {
  const [state, dispatch] = useReducer(reducer, initalState);
  const fetchData = async (postId) => {
    try {
      dispatch({ type: "FETCH_START" });
      let resp = await UserDetailApi(postId);
      dispatch({ type: "FETCH_SUCCESS", payload: resp });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR" });
    }
  };

  return { fetchData, ...state };
}
