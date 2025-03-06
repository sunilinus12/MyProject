import { createSlice } from "@reduxjs/toolkit";
import { getUserDetail } from "./actions/UserAction";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState, // ✅ Fixed typo here
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { fetchUserStart, fetchUserSuccess, fetchUserError } =
  userSlice.actions;

export default userSlice.reducer;
