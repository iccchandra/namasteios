import { createStore, applyMiddleware } from "redux";
import apiMiddleware from "../middleware/api";
import AppReducer from "../reducers";
import thunk from 'redux-thunk';

export default store = createStore(AppReducer, applyMiddleware(apiMiddleware, thunk));

