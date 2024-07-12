import { configureStore, combineReducers, ThunkAction, Action } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import headerReducer from "./Header/Reducer";
import carouselReducer from "./Carousel/Reducer";
import clientsReducer from "./Clients/Reducer";
import communitiesReducer from "./Communities/Reducer";
import UnlockReducer from "./Unlock/Reducer";
import CustomerReducer from "./Customer/Reducer";
import CommunityUpdateReducer from "./CommunityUpdate/Reducer";
import FooterReducer from './Footer/Reducer';
import AchievementReducer from './Achievement/Reducer';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  header: headerReducer,
  carousel: carouselReducer,
  clients: clientsReducer,
  communities: communitiesReducer,
  unlock: UnlockReducer,
  customer: CustomerReducer,
  communityUpdate: CommunityUpdateReducer,
  footer: FooterReducer,
  achievement: AchievementReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
