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

interface Unlock {
  unlock: UnlockItem[];
}

interface UnlockState {
  Unlocks: Unlock | null;
}

const initialState: UnlockState = {
  Unlocks: null,
};

const UnlockSlice = createSlice({
  name: "unlock",
  initialState,
  reducers: {
    setUnlocks(state, action: PayloadAction<Unlock>) {
      state.Unlocks = action.payload;
    },
  },
});

export const { setUnlocks } = UnlockSlice.actions;

export const loadUnlocks = () => (dispatch: any) => {
  dispatch(setUnlocks(UnlocksData));
};

export default UnlockSlice.reducer;