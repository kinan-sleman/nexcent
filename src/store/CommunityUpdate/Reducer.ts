import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CommunityUpdatesData from "./CommunityUpdate.json";

interface UpdateItem {
  image: string;
  title: string;
  link: string;
}

interface CommunityUpdateItem {
  title: string;
  description: string;
  updates: UpdateItem[];
}

interface CommunityUpdateState {
  communityUpdates: CommunityUpdateItem | null;
}

const initialState: CommunityUpdateState = {
  communityUpdates: null,
};

const communityUpdateSlice = createSlice({
  name: "communityUpdate",
  initialState,
  reducers: {
    setCommunityUpdates(state, action: PayloadAction<CommunityUpdateItem>) {
      state.communityUpdates = action.payload;
    },
  },
});

export const { setCommunityUpdates } = communityUpdateSlice.actions;

export const loadCommunityUpdates = () => (dispatch: any) => {
  dispatch(setCommunityUpdates(CommunityUpdatesData));
};

export default communityUpdateSlice.reducer;
