const actionTypes = {
    ADD_TODO: 'ADD_TODO',
    REMOVE_TODO: 'REMOVE_TODO',
    COMPLETE_TODO: 'COMPLETE_TODO',
    CHANGE_VISIBILITY_FILTER: 'CHANGE_VISIBILITY_FILTER',
    TOGGLE_MODE: 'TOGGLE_MODE',
}

Object.freeze(actionTypes);

export {actionTypes};

const visibilityFilters = {
    ALL_TODOS: "ALL_TODOS",
    ACTIVE_TODOS: "ACTIVE_TODOS",
    COMPLETED_TODOS: "COMPLETED_TODOS"
};

Object.freeze(visibilityFilters);

export {visibilityFilters};

const themeModes = {
    DARK: "dark",
    LIGHT: "light",
};

Object.freeze(themeModes);

export {themeModes};
