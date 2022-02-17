import {actionTypes} from '../constants/constants';

export function addTodo(todo) {
    return {
        type: actionTypes.ADD_TODO,
        todo,
    }
}

export function removeTodo(todoId) {
    return {
        type: actionTypes.REMOVE_TODO,
        todoId,
    }
}

export function completeTodo(todoId) {
    return {
        type: actionTypes.COMPLETE_TODO,
        todoId,
    }
}

export function toggleMode(themeMode) {
    return {
        type: actionTypes.TOGGLE_MODE,
        themeMode,
    }
}

export function toggleComplete(hideCompleted) {
    return {
        type: actionTypes.TOGGLE_COMPLETE,
        hideCompleted,
    }
}
