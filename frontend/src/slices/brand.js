import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('brand')
  ? JSON.parse(localStorage.getItem('brand'))
  : { brandItems: [] };

const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    setBrand: (state, action) => {
        // Save all the brands in the local storage
      state.brandItems = action.payload;
      localStorage.setItem('brand', JSON.stringify(state)); 
    },
    updateBrand:(state, action) => {
        const newBrand = action.payload;
        // add the new brand to the existing brands
        state.brandItems.push(newBrand);
        localStorage.setItem('brand', JSON.stringify(state));
    },
    deleteBrand: (state, action) => {
        // Filter out the brand to be deleted from the brandItems array
      state.brandItems = state.brandItems.filter((brand) => brand._id!== action.payload);
      localStorage.setItem('brand', JSON.stringify(state));
    },
    clearBrand: (state) => {
       // NOTE: here we need to also remove the brand from storage so the next
      // logged in seller doesn't inherit the previous sellers brand
      localStorage.removeItem('brand');
      state.brandItems = [];
      return state;
    }
  }
});

export const { setBrand, deleteBrand, updateBrand, clearBrand } = brandSlice.actions;
export default brandSlice.reducer;
