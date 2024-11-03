import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  restaurantId: null, 
  totalAmount: 0,     
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      if (state.restaurantId && state.restaurantId !== item.restaurantId) {
        return; // Prevent adding items from a different restaurant
      }

      const existingItem = state.items.find(i => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
        state.restaurantId = item.restaurantId;
      }

      // Update total amount
      state.totalAmount += item.price;
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      const itemIndex = state.items.findIndex(i => i.id === itemId);

      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        if (item.quantity > 1) {
          item.quantity -= 1;
          state.totalAmount -= item.price;
        } else {
          state.totalAmount -= item.price * item.quantity;
          state.items.splice(itemIndex, 1); // Remove item from cart
        }

        if (state.items.length === 0) {
          state.restaurantId = null; // Clear restaurantId if cart is empty
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.restaurantId = null; // Clear restaurantId
      state.totalAmount = 0;     // Reset total amount
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
