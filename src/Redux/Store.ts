import { Tuple, configureStore } from "@reduxjs/toolkit";
import { userAPI } from "../Redux/Api/User";
import { userReducer } from "../Redux/Reducer/User";
import { productAPI } from "../Redux/Api/Product";
import { cartReducer } from "./Reducer/Cart";
import { orderApi } from "./Api/Order";
import { dashboardApi } from "./Api/Dashboard";

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [productAPI.reducerPath]: productAPI.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [userReducer.name]: userReducer.reducer,
    [cartReducer.name]: cartReducer.reducer,
  },
  middleware: (mid) =>
    new Tuple(
      ...mid(),
      userAPI.middleware,
      productAPI.middleware,
      orderApi.middleware,
      dashboardApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
