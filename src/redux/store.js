import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
// import logger from "redux-logger"; // Import logger middleware

// Custom Middleware
const customMiddleware = (store) => (next) => (action) => {
  console.log("Custom Middleware: Dispatching", action);
  let result = next(action); // Pass action to next middleware/reducer
  console.log("Custom Middleware: Next State", store.getState());
  return result;
};
const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(customMiddleware), // No logger, only custom middleware
});


export default store;
