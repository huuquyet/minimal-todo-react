import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { allTodosCompleted, saveNewTodo } from "../features/todosSlice";
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Tooltip,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  AddCircle as AddCircleIcon,
  DoneAll as DoneAllIcon,
} from "@mui/icons-material";

const InputTodo = () => {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("idle");
  const dispatch = useDispatch();

  const handleChange = (e) => setText(e.target.value);

  const handleKeyDown = async (e) => {
    // If the user pressed the Enter key:
    if (e.which === 13) {
      await handleButton();
    }
  };

  const handleButton = async () => {
    const trimmedText = text.trim();
    if (trimmedText) {
      // Create and dispatch the thunk function itself
      setStatus("loading");
      await dispatch(saveNewTodo(trimmedText));
      // And clear out the text input
      setText("");
      setStatus("idle");
    }
  };

  const onMarkCompletedClicked = () => dispatch(allTodosCompleted());

  let isLoading = status === "loading";
  let placeholder = isLoading ? "" : "What needs to be done?";
  // let loader = isLoading ? <Skeleton variant="text" /> : null;

  return (
    <div>
      <FormControl fullWidth variant="standard" margin="normal">
        <InputLabel htmlFor="todo-input">Task</InputLabel>
        <Input
          id="todo-input"
          type="text"
          placeholder={placeholder}
          disabled={isLoading}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={text}
          autoFocus
          endAdornment={
            <InputAdornment position="end">
              <Tooltip title="Add New Todo">
                <LoadingButton
                  variant="text"
                  onClick={handleButton}
                  loading={isLoading}
                >
                  <AddCircleIcon />
                  ADD
                </LoadingButton>
              </Tooltip>
            </InputAdornment>
          }
        />

        {/*{loader}*/}
      </FormControl>
      <Tooltip title="Mark All Completed">
        <IconButton onClick={onMarkCompletedClicked}>
          <DoneAllIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default InputTodo;
