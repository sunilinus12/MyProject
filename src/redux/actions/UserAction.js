import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserDetailApi } from "../../api";

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
