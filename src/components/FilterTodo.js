import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  FilterList as FilterListIcon,
  RemoveDone as RemoveDoneIcon,
} from "@mui/icons-material";

import {
  availableColors,
  capitalize,
  statusFilters,
} from "../constants/constants";
import {
  colorFilterChanged,
  statusFilterChanged,
} from "../features/filtersSlice";
import {
  completedTodosCleared,
  allTodosCompleted,
  selectTodos,
} from "../features/todosSlice";

const RemainingTodos = ({ count }) => {
  const suffix = count === 1 ? "" : "s";

  return (
    <div className="todo-count">
      <h5>Remaining Todos</h5>
      <strong>{count}</strong> item{suffix} left
    </div>
  );
};

const StatusFilter = ({ value: status, onChange }) => {
  const renderedFilters = Object.keys(statusFilters).map((key) => {
    const value = statusFilters[key];
    const handleClick = () => onChange(value);
    const selected = value === status ? "secondary" : "primary";

    return (
      <IconButton
        key={value}
        variant="outline"
        onClick={handleClick}
        size="small"
        color={selected}
      >
        <FilterListIcon />
        {key}
      </IconButton>
    );
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      {renderedFilters}
    </div>
  );
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
            sx={{ color }}
          />
        }
      />
    );
  });

  return (
    <div>
      <FormGroup
        sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
      >
        {renderedColors}
      </FormGroup>
    </div>
  );
};

const FilterTodo = () => {
  const dispatch = useDispatch();

  const { status, colors } = useSelector((state) => state.filters);

  const onClearCompletedClicked = () => dispatch(completedTodosCleared());

  const onColorChange = (color, changeType) =>
    dispatch(colorFilterChanged(color, changeType));

  const onStatusChange = (status) => dispatch(statusFilterChanged(status));

  return (
    <footer className="footer">
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Tooltip title="Clear Completed">
          <IconButton
            variant="text"
            onClick={onClearCompletedClicked}
            color="error"
          >
            <RemoveDoneIcon />
            {/*Clear Completed*/}
          </IconButton>
        </Tooltip>
      </div>

      {/*<RemainingTodos count={todosRemaining} />*/}
      <StatusFilter value={status} onChange={onStatusChange} />
      <ColorFilters value={colors} onChange={onColorChange} />
    </footer>
  );
};

export default FilterTodo;
