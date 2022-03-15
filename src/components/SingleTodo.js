import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Checkbox,
  FormControl,
  IconButton,
  InputLabel,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

import { availableColors, capitalize } from "../constants/constants";
import {
  todoColorSelected,
  todoDeleted,
  todoToggled,
  selectTodoById,
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
    <ListItem
      disablePadding
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <ListItemButton
        role={undefined}
        onClick={handleCompletedChanged}
        selected={completed}
        dense
      >
        <Checkbox
          edge="start"
          checked={completed}
          inputProps={{ "aria-labelledby": todo.id }}
        />
        <ListItemText
          primary={text}
          sx={{
            textDecoration: completed ? "line-through" : "none",
          }}
        />
      </ListItemButton>
      <FormControl variant="standard" size="small" sx={{ width: 100 }}>
        <InputLabel id="select-color-label">Color</InputLabel>
        <Select
          id="select-color"
          labelId="select-color-label"
          label="Color"
          value={color}
          sx={{ color }}
          onChange={handleColorChanged}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {availableColors.map((c) => (
            <MenuItem key={c} value={c}>
              {capitalize(c)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Tooltip title="Clear">
        <IconButton
          edge="end"
          aria-label="Delete"
          color="error"
          onClick={onDelete}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </ListItem>
  );
};

export default SingleTodo;
