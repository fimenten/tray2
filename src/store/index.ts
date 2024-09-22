import { configureStore } from '@reduxjs/toolkit';
import trayReducer from './tray';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

export const createPersistedStore = (key: string) => {
  const persistConfig = {
    key: key, // 動的にキーを設定
    storage,
  };

  const persistedReducer = persistReducer(persistConfig, trayReducer);

  const store = configureStore({
    reducer: { trays: persistedReducer },
  });

  const persistor = persistStore(store);

  return { store, persistor };
};

// URLのパラメータを取得し、キーとして使用
const urlParams = new URLSearchParams(window.location.search);
const key = urlParams.toString() || 'defaultKey'; // パラメータがない場合は'defaultKey'を使用

// ストアとパーシスターを作成
const { store, persistor } = createPersistedStore(key);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store, persistor };
