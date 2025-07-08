import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('category')
  ? JSON.parse(localStorage.getItem('category'))
  : { categoryItems: [] };

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategory: (state, action) => {
        // Save all the categories in the local storage
      state.categoryItems = action.payload;
      localStorage.setItem('category', JSON.stringify(state)); 
    },
    deleteCategory: (state, action) => {
        // Remove the selected category from the local storage
        const catId = action.payload;
        // console.log("id", catId)
      state.categoryItems = state.categoryItems.filter((x) => x._id !== catId);
      localStorage.setItem('category', JSON.stringify(state));
    },
    clearCategories: (state) => {
       // NOTE: here we need to also remove the category from storage so the next
      // logged in seller doesn't inherit the previous sellers category
      localStorage.removeItem('category');
      state.categoryItems = [];
      return state;
      
    }
  }
});

export const { setCategory, deleteCategory, clearCategories } = categorySlice.actions;
export default categorySlice.reducer;
