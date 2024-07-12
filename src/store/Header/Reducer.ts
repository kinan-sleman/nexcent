import { createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Action } from "redux";
import navigationLinksData from "./Header.json";

interface NavigationLinkItem {
  id: number;
  title: string;
  url: string;
  icon: string;
}

interface BtnItem {
  title: string;
  link: string;
}

interface NavigationLink {
  title: string;
  icon: string;
  btn: BtnItem;
  links: NavigationLinkItem[];
}

interface HeaderState {
  isOpen: boolean;
  navigationLinks: NavigationLink | null;
}

const initialState: HeaderState = {
  isOpen: false,
  navigationLinks: null,
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    toggleMenu(state) {
      state.isOpen = !state.isOpen;
    },
    setNavigationLinks(state, action: PayloadAction<NavigationLink>) {
      state.navigationLinks = action.payload;
    },
  },
});

export const { toggleMenu, setNavigationLinks } = headerSlice.actions;

type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export const loadNavigationLinks = (): AppThunk => (dispatch) => {
  dispatch(setNavigationLinks(navigationLinksData));
};

export default headerSlice.reducer;
