import React from "react";
import { useSelector } from "react-redux";
import { Box, CircularProgress, List, Paper } from "@mui/material";

import SingleTodo from "./SingleTodo";
import { selectFilteredTodoIds } from "../features/todosSlice";

const VisibleTodoList = () => {
  const todoIds = useSelector(selectFilteredTodoIds);
  const loadingStatus = useSelector((state) => state.todos.status);

  if (loadingStatus === "loading") {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper elevation={3} sx={paperContainer}>
      {todoIds.length > 0 ? (
        <List>
          {todoIds.map((todoId) => (
            <SingleTodo key={todoId} id={todoId} />
          ))}
        </List>
      ) : (
        <Box textAlign="center" p={2}>
          Nothing here 🙈🐘
        </Box>
      )}
    </Paper>
  );
};

export default VisibleTodoList;

const paperContainer = { p: 1, mt: 1, mb: 20 };
