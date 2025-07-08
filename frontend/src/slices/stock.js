import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('stock')
  ? JSON.parse(localStorage.getItem('stock'))
  : { stockItems: [], productItems: [] };

const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
   
    addStocks: (state, action) => {
      try{
          // Save all the stocks in the local storage
      state.stockItems = action.payload;
      const str = JSON.stringify(state.stockItems);
    // Returns the size in bytes
      // console.log('stock size', new Blob([str]).size);
      localStorage.setItem('stock', JSON.stringify(state)); 
      }catch(err){
        console.log(err.message);
      }
      
    },
    updateStock:(state, action) => {
        const newStock = action.payload;
        // add the new stock to the existing stocks
        state.stockItems.push(newStock);
        localStorage.setItem('stock', JSON.stringify(state));
    },
    editStock: (state, action) => {
        const updatedStock = action.payload;
      
        // Edit the stock in the existing stocks
        state.stockItems = state.stockItems.map((stock) =>
          stock._id === updatedStock._id ? updatedStock : stock
        );
        localStorage.setItem('stock', JSON.stringify(state));
      },
    deleteStock: (state, action) => {
        // Filter out the stock to be deleted from the stockItems array
      state.stockItems = state.stockItems.filter((stock) => stock._id !== action.payload);
      localStorage.setItem('stock', JSON.stringify(state));
    },
    getBrandProduct: (state, action) => {
      const brandList = action.payload;
      // Filter stock items based on the brand sizes and seller ID
      state.productItems = brandList.flatMap((brand) =>
        state.stockItems.filter(
          (item) =>
            item.Size.toLowerCase() === brand.brand_Size.toLowerCase() &&
            item.Brand.toLowerCase() === brand.brand_Name.toLowerCase()
        )
      );
      localStorage.setItem('stock', JSON.stringify(state));
    },
    resetProductItems: (state, action) => {
      state.productItems = [];
      localStorage.setItem('stock', JSON.stringify(state));
    },
    clearStock: (state) => {
       // NOTE: here we need to also remove the stock from storage so the next
      // logged in seller doesn't inherit the previous sellers stock
      localStorage.removeItem('stock');
      state.stockItems = [];
      return state;
    }
  }
});

export const { addStocks, deleteStock, updateStock, clearStock, editStock, getBrandProduct, resetProductItems  } = stockSlice.actions;
export default stockSlice.reducer;
