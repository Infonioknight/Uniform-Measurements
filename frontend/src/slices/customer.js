import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('customer')
  ? JSON.parse(localStorage.getItem('customer'))
  : { customerItems: [] };

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    addCustomers: (state, action) => {
        // Save all the customers in the local storage
      state.customerItems = action.payload;
      localStorage.setItem('customer', JSON.stringify(state)); 
    },
    updateCustomer:(state, action) => {
        const newCustomer = action.payload;
        // add the new customer to the existing customers
        state.customerItems.push(newCustomer);
        localStorage.setItem('customer', JSON.stringify(state));
    },
    editCustomer: (state, action) => {
        const updatedCustomer = action.payload;
      
        // Edit the customer in the existing customers
        state.customerItems = state.customerItems.map((customer) =>
          customer._id === updatedCustomer._id ? updatedCustomer : customer
        );
        localStorage.setItem('customer', JSON.stringify(state));
      },
    deleteCustomer: (state, action) => {
        // Filter out the customer to be deleted from the customerItems array
      state.customerItems = state.customerItems.filter((customer) => customer._id!== action.payload);
      localStorage.setItem('customer', JSON.stringify(state));
    },
    clearCustomer: (state) => {
       // NOTE: here we need to also remove the customer from storage so the next
      // logged in seller doesn't inherit the previous sellers customer
      localStorage.removeItem('customer');
      state.customerItems = [];
      return state;
    }
  }
});

export const { addCustomers, deleteCustomer, updateCustomer, clearCustomer, editCustomer  } = customerSlice.actions;
export default customerSlice.reducer;
