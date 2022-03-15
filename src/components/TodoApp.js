import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, CssBaseline, FormControlLabel } from "@mui/material";

import InputTodo from "./InputTodo.js";
import VisibleTodoList from "./VisibleTodoList.js";
import FilterTodo from "./FilterTodo.js";
import MaterialUISwitch from "../customize/MaterialUISwitch";
import { useSelector } from "react-redux";
import { selectTodos } from "../features/todosSlice";
import { modes } from "../constants/constants";

const TodoApp = () => {
  const [scheme, setScheme] = useState(modes.DARK);

  const toggleMode = () => {
    return setScheme(scheme === modes.DARK ? modes.LIGHT : modes.DARK);
  };

  const theme = createTheme({ palette: { mode: scheme } });

  const todosRemaining = useSelector((state) => {
    const uncompletedTodos = selectTodos(state).filter(
      (todo) => !todo.completed
    );
    return `${
      uncompletedTodos.length > 0 ? ` (${uncompletedTodos.length})` : ""
    }`;
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <div>
          <div style={{ textAlign: "right" }}>
            <FormControlLabel
              onClick={toggleMode}
              control={<MaterialUISwitch checked={scheme === modes.DARK} />}
              aria-label="Switch mode"
              label=""
            />
          </div>
          <h1> 📝️ To Do List {todosRemaining}</h1>

          <InputTodo />
          <VisibleTodoList />
          <FilterTodo />
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default TodoApp;
