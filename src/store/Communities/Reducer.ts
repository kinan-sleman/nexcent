import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import communitiesData from "./Communities.json";

interface CommunityItem {
  icon: string;
  title: string;
  description: string;
}

interface CommunitiesState {
  title: string;
  description: string;
  communities: CommunityItem[];
}

const initialState: CommunitiesState = {
  title: "",
  description: "",
  communities: []
};

const communitiesSlice = createSlice({
  name: "communities",
  initialState,
  reducers: {
    setCommunities(state, action: PayloadAction<CommunitiesState>) {
      return action.payload; 
    },
  },
});

export const { setCommunities } = communitiesSlice.actions;

export const loadCommunities = () => (dispatch: any) => {
  dispatch(setCommunities(communitiesData));
};

export default communitiesSlice.reducer;
