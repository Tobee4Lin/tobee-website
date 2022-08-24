import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import storage from "redux-persist/lib/storage";
import reduxThunk from "redux-thunk";
import reduxPromise from "redux-promise";
import blog from "./modules/blog";

// 导入所有state
const moduleReducers = require.context("./modules/", false, /\.ts$/);
const reducerObj: any = {};
moduleReducers.keys().forEach((key) => {
  const _key: string = key.match(/(?<=.\/).*?(?=.ts)/)![0];
  reducerObj[_key] = moduleReducers(key).default;
});
// create reducer
const reducer = combineReducers({
  blog,
});
// const reducer = combineReducers(reducerObj);
// redux 持久化配置
const persistConfig = {
  key: "redux-state",
  storage,
};
const persistReducerConfig = persistReducer(persistConfig, reducer);

// redux middleWares
const middleWares = [reduxThunk, reduxPromise];

// store
export const store = configureStore({
  reducer: persistReducerConfig,
  middleware: middleWares,
  devTools: true,
});

// create persist store
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useDispatch = () => useReduxDispatch<AppDispatch>();
