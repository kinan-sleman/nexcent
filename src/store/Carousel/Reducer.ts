import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Carousel from './Carousel.json';

interface Carousel {
  image: string;
  title: string;
  description: string;
  button: string;
}

interface CarouselState {
  carousel: Carousel[];
}

const initialState: CarouselState = {
  carousel: [],
};

const CarouselSlice = createSlice({
  name: 'Carousel',
  initialState,
  reducers: {
    setCarousel(state, action: PayloadAction<Carousel[]>) {
      state.carousel = action.payload;
    },
  },
});

export const { setCarousel } = CarouselSlice.actions;

export const loadCarousel = () => (dispatch: any) => {
  dispatch(setCarousel(Carousel));
};

export default CarouselSlice.reducer;
