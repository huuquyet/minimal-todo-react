import { AddCircle as AddCircleIcon } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { saveNewTodo } from "../features/todosSlice";

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

  const isLoading = status === "loading";
  const placeholder = isLoading ? "" : "What needs to be done?";

  return (
    <Box>
      <Paper elevation={3} sx={inputContainer}>
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
                  <IconButton onClick={handleButton}>
                    <AddCircleIcon />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            }
          />
        </FormControl>
      </Paper>
      {isLoading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : null}
    </Box>
  );
};

export default InputTodo;

const inputContainer = { p: 1, mb: 1, mt: 9 };
