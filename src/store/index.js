import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import playersReducer from "./playerSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    players: playersReducer,
  },
});
