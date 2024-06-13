import {
  DoneAll as DoneAllIcon,
  FilterList as FilterListIcon,
  RemoveDone as RemoveDoneIcon,
} from "@mui/icons-material";
import { Box, Button, Checkbox, FormControlLabel, FormGroup, Paper, Tooltip } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { availableColors, capitalize, statusFilters } from "../common/constants";
import { colorFilterChanged, statusFilterChanged } from "../features/filtersSlice";
import { allTodosCompleted, completedTodosCleared } from "../features/todosSlice";

const StatusFilter = ({ value: status, onChange }) => {
  const renderedFilters = Object.keys(statusFilters).map((key) => {
    const value = statusFilters[key];
    const handleClick = () => onChange(value);
    const selected = value === status ? "secondary" : "primary";

    return (
      <Button
        key={value}
        variant="outlined"
        onClick={handleClick}
        color={selected}
        startIcon={<FilterListIcon />}
        sx={{ mx: 1 }}
      >
        {key}
      </Button>
    );
  });

  return <Box sx={formContainer}>{renderedFilters}</Box>;
};

const ColorFilters = ({ value: colors, onChange }) => {
  const renderedColors = availableColors.map((color) => {
    const checked = colors.includes(color);
    const handleChange = () => {
      const changeType = checked ? "removed" : "added";
      onChange(color, changeType);
    };

    return (
      <FormControlLabel
        key={color}
        sx={{ color }}
        label={capitalize(color)}
        control={
          <Checkbox
            name={color}
            checked={checked}
            onChange={handleChange}
            sx={{ color, "&.Mui-checked": { color } }}
          />
        }
      />
    );
  });

  return <FormGroup sx={formContainer}>{renderedColors}</FormGroup>;
};

const FilterTodo = () => {
  const dispatch = useDispatch();

  const { status, colors } = useSelector((state) => state.filters);

  const onMarkCompletedClicked = () => dispatch(allTodosCompleted());

  const onClearCompletedClicked = () => dispatch(completedTodosCleared());

  const onColorChange = (color, changeType) => dispatch(colorFilterChanged(color, changeType));

  const onStatusChange = (status) => dispatch(statusFilterChanged(status));

  return (
    <Paper elevation={3} sx={paperContainer}>
      <Box sx={boxContainer}>
        <Box display="flex" justifyContent="space-between" m={1}>
          <Tooltip title="Mark All Completed">
            <Button
              variant="text"
              color="success"
              onClick={onMarkCompletedClicked}
              startIcon={<DoneAllIcon />}
            >
              Mark All Completed
            </Button>
          </Tooltip>
          <Tooltip title="Clear Completed">
            <Button
              variant="text"
              color="error"
              onClick={onClearCompletedClicked}
              startIcon={<RemoveDoneIcon />}
            >
              CLEAR COMPLETED
            </Button>
          </Tooltip>
        </Box>

        <StatusFilter value={status} onChange={onStatusChange} />
        <ColorFilters value={colors} onChange={onColorChange} />
      </Box>
    </Paper>
  );
};

export default FilterTodo;

const paperContainer = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 1,
};

const boxContainer = { maxWidth: "sm", mx: "auto", px: 3 };

const formContainer = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  my: 1,
};
