import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserApi, UserDetailApi } from "../../api";

export const getUserDetail = createAsyncThunk(
  "user/detail",
  async (postId, thunkAPI) => {
    try {
      let resp = await UserDetailApi(postId);
      return resp;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to get details");
    }
  }
);

export const getUserListing = createAsyncThunk(
  "userList/fetch",
  async (page, thunkAPI) => {
    try {
      const response = await UserApi(page); // Ensure API function exists
      return { data: response, page };
    } catch (error) {
      console.error("API Error:", error.message);
      return thunkAPI.rejectWithValue(error.message || "Failed to get details");
    }
  }
);
