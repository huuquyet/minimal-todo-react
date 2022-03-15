import React from "react";
import { useSelector } from "react-redux";
import { List, ListItem, Skeleton } from "@mui/material";

import SingleTodo from "./SingleTodo";
import { selectFilteredTodoIds } from "../features/todosSlice";

const VisibleTodoList = () => {
  const todoIds = useSelector(selectFilteredTodoIds);
  const loadingStatus = useSelector((state) => state.todos.status);

  if (loadingStatus === "loading") {
    return <Skeleton variant="rectangular" width={210} height={118} />;
  }

  return (
    <div>
      {todoIds.length > 0 ? (
        <List>
          {todoIds.map((todoId) => (
            <SingleTodo key={todoId} id={todoId} />
          ))}
        </List>
      ) : (
        <List>
          <ListItem>Nothing here 🙈🐘</ListItem>
        </List>
      )}
    </div>
  );
};

export default VisibleTodoList;
