import {
  configureStore,
  combineReducers,
  type ReducersMapObject,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import storage from "redux-persist/lib/storage";
// import reduxThunk from "redux-thunk";
import reduxPromise from "redux-promise";

// 导入所有Reducer
const moduleReducers = require.context("./modules/", false, /\.ts$/);
const reducerObj: ReducersMapObject = {};
moduleReducers.keys().forEach((key) => {
  const _key: string = key.match(/(?<=.\/).*?(?=.ts)/)![0];
  reducerObj[_key] = moduleReducers(key).default;
});
// create reducer
const reducer = combineReducers(reducerObj);
// redux 持久化配置
const persistConfig = {
  key: "redux-state",
  storage,
};
const persistReducerConfig = persistReducer(persistConfig, reducer);

// redux middleWares
// const middleWares = [reduxThunk, reduxPromise];
const middleWares = [reduxPromise];

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
