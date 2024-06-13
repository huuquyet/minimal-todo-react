import React from "react";
import { useDispatch, useSelector } from "react-redux";
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

import InputTodo from "./InputTodo";
import VisibleTodoList from "./VisibleTodoList";
import FilterTodo from "./FilterTodo";
import { selectTodos } from "../features/todosSlice";
import { modesChanged } from "../features/modesSlice";
import { modes } from "../common/constants";
import MaterialUISwitch from "../common/MaterialUISwitch";

const TodoApp = () => {
  const scheme = useSelector((state) => state.modes.scheme);

  const theme = createTheme({ palette: { mode: scheme } });

  const dispatch = useDispatch();

  const onModesChanged = () => dispatch(modesChanged());

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
                  onClick={onModesChanged}
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
