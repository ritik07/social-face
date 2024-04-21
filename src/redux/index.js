import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { userData } from "./reducers/userData";

const reducer = combineReducers({
  userData,
});

export const store = createStore(reducer, applyMiddleware(thunk));
