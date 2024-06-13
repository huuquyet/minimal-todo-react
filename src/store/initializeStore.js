import { configureStore } from "@reduxjs/toolkit";
import throttle from "lodash/throttle";
import filtersReducer from "../features/filtersSlice";
import modesReducer from "../features/modesSlice";
import todosReducer, { fetchTodos } from "../features/todosSlice";
import { loadFromLocalStorage, saveToLocalStorage } from "./localStorage";

const preloadedState = loadFromLocalStorage();

const store = configureStore({
  reducer: {
    // Define a top-level state field named `todos`, handled by `todosReducer`
    todos: todosReducer,
    filters: filtersReducer,
    modes: modesReducer,
  },
  preloadedState,
});

if (!preloadedState) {
  store.dispatch(fetchTodos());
}

store.subscribe(
  throttle(() => {
    saveToLocalStorage(store.getState());
  }, 1000),
);

export default store;
