import { combineReducers } from "redux";
import amountReducer from "./amountReducer";

// call here redux function
const reducers = combineReducers({
    amount: amountReducer
})

export default reducers;