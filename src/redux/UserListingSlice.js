import { createSlice } from "@reduxjs/toolkit";
import { getUserListing } from "./actions/UserAction";

const initialState = {
  list: [],
  loading: false,
  error: { error: false },
  page: 1,
  hasMoreData: true,
  footerLoading: false,
};
const UserListingSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserListing.pending, (state, action) => {
        state.loading = action.meta.page == 1;
        state.footerLoading = action.meta.page !== 1;
        state.error = { error: false };
      })
      .addCase(getUserListing.fulfilled, (state, action) => {
        state.loading = false;
        state.footerLoading = false;
        state.error = { error: false };
        state.list =
          action.payload.page == 1
            ? action.payload.data
            : [...state.list, ...action.payload.data];
        state.page = action.payload.page;
        state.hasMoreData = action.payload.data.length > 0;
      })
      .addCase(getUserListing.rejected, (state, action) => {
        state.loading = false;
        state.footerLoading = false;
        state.error = {
          error: true,
          message:
            typeof action.payload?.message === "string"
              ? action.payload.message
              : "Failed to fetch the details",
        };
        state.list = state.list; // Preserve old data on failure
      });
  },
});

export default UserListingSlice.reducer;
