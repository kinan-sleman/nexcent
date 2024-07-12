import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UnlocksData from "./Unlock.json";

interface btnItem {
  title: string;
  link: string;
}

interface UnlockItem {
  type: string;
  title: string;
  description: string;
  image: string;
  btn: btnItem;
}

interface UnlockState {
  unlocks: UnlockItem[];
}

const initialState: UnlockState = {
  unlocks: [],
};

const unlockSlice = createSlice({
  name: "unlock",
  initialState,
  reducers: {
    setUnlocks(state, action: PayloadAction<UnlockItem[]>) {
      state.unlocks = action.payload;
    },
  },
});

export const { setUnlocks } = unlockSlice.actions;

export const loadUnlocks = () => (dispatch: any) => {
  dispatch(setUnlocks(UnlocksData)); // استخدام UnlocksData.unlock بدلاً من UnlocksData
};

export default unlockSlice.reducer;
