import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AchievementsData from "./Achievement.json";

interface statisticsItem {
    label: string;
    value: number;
}

interface AchievementItem {
  type: string;
  title: string;
  description: string;
  statistics: statisticsItem[];
}

interface Achievement {
  achievement: AchievementItem[];
}

interface AchievementState {
  Achievements: Achievement | null;
}

const initialState: AchievementState = {
  Achievements: null,
};

const AchievementSlice = createSlice({
  name: "achievement",
  initialState,
  reducers: {
    setAchievements(state, action: PayloadAction<Achievement>) {
      state.Achievements = action.payload;
    },
  },
});

export const { setAchievements } = AchievementSlice.actions;

export const loadAchievements = () => (dispatch: any) => {
  dispatch(setAchievements(AchievementsData));
};

export default AchievementSlice.reducer;