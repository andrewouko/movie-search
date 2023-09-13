"use client";

import { configureStore } from "@reduxjs/toolkit";
import { ApiSlice } from "@lib/redux/slices/ApiSlice";

const store = configureStore({
  reducer: {
    [ApiSlice.reducerPath]: ApiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ApiSlice.middleware),
  devTools: true,
});

export default store;
