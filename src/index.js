import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import TodoApp from "./components/TodoApp";
import "./api/server";
import store from "./store/initializeStore";
import { fetchTodos } from "./features/todosSlice";

store.dispatch(fetchTodos());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <TodoApp />
    </Provider>
  </React.StrictMode>,
  document.getElementById("app")
);
