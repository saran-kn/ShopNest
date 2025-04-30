import { applyMiddleware, legacy_createStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { thunk } from "redux-thunk";

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export default store;
