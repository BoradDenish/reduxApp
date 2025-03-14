// import { applyMiddleware, legacy_createStore as createStore } from "redux";
// import reducers from "./reducers";
// import { thunk } from "redux-thunk";

// Create Redux Store
// export const store = createStore(reducers, {}, applyMiddleware(thunk))


import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './counterSlice';
import todoReducer from './todoSlice';
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import themeReducer from "./themeSlice";
import contactReducer from "./contactSlice";

export const store = configureStore({
    reducer: {
      counter: counterReducer,
      todos: todoReducer,
      auth: authReducer,
      cart: cartReducer,
      theme: themeReducer,
      contacts: contactReducer
    }
  });


