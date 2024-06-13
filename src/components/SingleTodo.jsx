import { Delete as DeleteIcon } from "@mui/icons-material";
import {
  Checkbox,
  FormControl,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { availableColors, capitalize } from "../common/constants";
import {
  selectTodoById,
  todoColorSelected,
  todoDeleted,
  todoToggled,
} from "../features/todosSlice";

const SingleTodo = ({ id }) => {
  // Call our `selectTodoById` with the state _and_ the ID value
  const todo = useSelector((state) => selectTodoById(state, id));
  const { text, completed, color } = todo;

  const dispatch = useDispatch();

  const handleCompletedChanged = () => {
    dispatch(todoToggled(todo.id));
  };

  const handleColorChanged = (e) => {
    const color = e.target.value;
    dispatch(todoColorSelected(todo.id, color));
  };

  const onDelete = () => {
    dispatch(todoDeleted(todo.id));
  };

  return (
    <ListItem disablePadding sx={itemContainer}>
      <ListItemButton selected={completed} dense>
        <Checkbox
          edge="start"
          checked={completed}
          inputProps={{ "aria-labelledby": todo.id }}
          onClick={handleCompletedChanged}
        />
        <ListItemText
          primary={text}
          onClick={handleCompletedChanged}
          sx={{
            textDecoration: completed ? "line-through" : "none",
          }}
        />
        <FormControl variant="standard" size="small" sx={{ minWidth: 60 }}>
          <Select
            displayEmpty
            autoWidth
            label="Color"
            value={color}
            sx={{ color }}
            onChange={handleColorChanged}
          >
            <MenuItem value="">
              <em>Color</em>
            </MenuItem>
            {availableColors.map((c) => (
              <MenuItem key={c} value={c} sx={{ backgroundColor: c }}>
                {capitalize(c)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Tooltip title="Clear">
          <IconButton edge="end" aria-label="Delete" color="error" onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </ListItemButton>
    </ListItem>
  );
};

export default SingleTodo;

const itemContainer = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
};
