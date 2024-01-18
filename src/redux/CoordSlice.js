import { createSlice } from "@reduxjs/toolkit";

const coordSlice = createSlice({
  name: "coord",
  initialState: {
    latitude: "28.4484308",
    longitude: "77.0706586",
    City:"Gurugram",
  },
  reducers: {
    setCoordinates: (state, action) => {
      const { latitude, longitude,City } = action.payload;
      state.latitude = latitude;
      state.longitude = longitude;
      state.City=City;
    },
  },
});

export const { setCoordinates } = coordSlice.actions;
export default coordSlice.reducer;
