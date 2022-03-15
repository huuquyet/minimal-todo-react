import React from "react";

const modes = {
  DARK: "dark",
  LIGHT: "light",
};
Object.freeze(modes);
export { modes };

const statusFilters = {
  ALL: "ALL",
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED",
};
Object.freeze(statusFilters);
export { statusFilters };

export const availableColors = ["green", "blue", "orange", "purple", "red"];

export const capitalize = (s) => s[0].toUpperCase() + s.slice(1);
