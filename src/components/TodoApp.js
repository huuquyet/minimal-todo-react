import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  AppBar,
  Container,
  CssBaseline,
  FormControlLabel,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import InputTodo from "./InputTodo.js";
import VisibleTodoList from "./VisibleTodoList.js";
import FilterTodo from "./FilterTodo.js";
import MaterialUISwitch from "../customize/MaterialUISwitch";
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
        <Paper elevation={3} sx={{ flexGrow: 1 }}>
          <AppBar position="fixed">
            <Toolbar>
              <Typography variant="h5" component="div" flexGrow={1}>
                📝️ To Do List {todosRemaining}
              </Typography>
              <Tooltip
                title={`Switch ${
                  scheme === modes.DARK ? modes.LIGHT : modes.DARK
                } mode`}
              >
                <FormControlLabel
                  onClick={toggleMode}
                  control={<MaterialUISwitch checked={scheme === modes.DARK} />}
                  aria-label="Switch mode"
                  label=""
                />
              </Tooltip>
            </Toolbar>
          </AppBar>
        </Paper>

        <InputTodo />
        <VisibleTodoList />
        <FilterTodo />
      </Container>
    </ThemeProvider>
  );
};

export default TodoApp;
