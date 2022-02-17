import {themeModes, visibilityFilters} from "../constants/constants";
import Todo from "./Todo";

export default class MinimalTodos {

    constructor(todos, visibilityFilter, themeMode) {
        this.todos = todos || [];
        this.visibilityFilter = visibilityFilter || visibilityFilters.ALL_TODOS;
        this.themeMode = themeMode || themeModes.DARK;
    }

    serialize() {
        return {
            todos: Array.from(this.todos).map(todo => Object.assign(new Todo(), todo).serialize()),
            visibilityFilter: this.visibilityFilter,
            themeMode: this.themeMode,
        }
    }

    static deserialize(json: Object) {
        return {
            todos: Array.from(json.todos).map(todo => Todo.deserialize(todo)) || [],
            visibilityFilter: json.visibilityFilter || visibilityFilters.ALL_TODOS,
            themeMode: json.themeMode || themeModes.DARK,
        };
    }
}
