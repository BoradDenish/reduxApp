import { applyMiddleware, legacy_createStore as createStore } from "redux";
import reducers from "./reducers";
import { thunk } from "redux-thunk";

// Create Redux Store
export const store = createStore(reducers, {}, applyMiddleware(thunk))