import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import TodoApp from "./components/TodoApp";
import "./api/server";
import store from "./store/initializeStore";

const root = createRoot(document.getElementById("app"));
root.render(
  <StrictMode>
    <Provider store={store}>
      <TodoApp />
    </Provider>
  </StrictMode>,
);
