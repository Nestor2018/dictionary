import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

import themeReducer from "./slices/themeSlice";
import dictionaryReducer from "./slices/dictionarySlice";
import fontReducer from "./slices/fontSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [],
  whitelist: ["theme", "font", "dictionary"], // Persistimos los datos
};

const rootReducer = combineReducers({
  theme: themeReducer,
  dictionary: dictionaryReducer,
  font: fontReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
