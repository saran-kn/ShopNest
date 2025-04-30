import { combineReducers } from "@reduxjs/toolkit";
import reducer from "./Reducer";

const rootReducer = combineReducers({
  products: reducer,
});

export default rootReducer;
