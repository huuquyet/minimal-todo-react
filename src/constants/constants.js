const actionTypes = {
    ADD_TODO: 'ADD_TODO',
    REMOVE_TODO: 'REMOVE_TODO',
    COMPLETE_TODO: 'COMPLETE_TODO',
    TOGGLE_MODE: 'TOGGLE_MODE',
    TOGGLE_COMPLETED: 'TOGGLE_COMPLETED',
}

Object.freeze(actionTypes);

export {actionTypes};

const themeModes = {
    DARK: "dark",
    LIGHT: "light",
};

Object.freeze(themeModes);

export {themeModes};

const filterTitles = {
    HIDE_COMPLETED: "HIDE COMPLETED",
    SHOW_ALL: "SHOW ALL",
}

Object.freeze(filterTitles);

export {filterTitles};
