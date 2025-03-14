import { createSlice } from "@reduxjs/toolkit";

const contactSlice = createSlice({
  name: "contacts",
  initialState: [],
  reducers: {
    addContact: (state, action) => {
      state.push(action.payload);
    },
    editContact: (state, action) => {
      const index = state.findIndex(contact => contact.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteContact: (state, action) => {
      return state.filter(contact => contact.id !== action.payload);
    }
  }
});

export const { addContact, editContact, deleteContact } = contactSlice.actions;
export default contactSlice.reducer;
