import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState, // ✅ Fixed typo here
  reducers: {
    fetchUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    fetchUserError: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchUserStart, fetchUserSuccess, fetchUserError } =
  userSlice.actions;

export default userSlice.reducer;
