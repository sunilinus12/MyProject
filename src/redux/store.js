import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import userListReducer from "./UserListingSlice";
// Custom Middleware
const customMiddleware = (store) => (next) => (action) => {
  // console.log("Custom Middleware: Dispatching", action);
  let result = next(action); // Pass action to next middleware/reducer
  // console.log("Custom Middleware: Next State", store.getState());
  return result;
};
const store = configureStore({
  reducer: {
    user: userReducer,
    userList: userListReducer, // ✅ Ensure it matches `useSelector`
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(customMiddleware),
});

export default store;
