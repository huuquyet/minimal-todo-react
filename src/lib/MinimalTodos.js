import {themeModes} from "../constants/constants";
import Todo from "./Todo";

export default class MinimalTodos {

    constructor(todos, themeMode, hideCompleted) {
        this.todos = todos || [];
        this.themeMode = themeMode || themeModes.DARK;
        this.hideCompleted = hideCompleted || false;
    }

    serialize() {
        return {
            todos: Array.from(this.todos).map(todo => Object.assign(new Todo(), todo).serialize()),
            themeMode: this.themeMode,
            hideCompleted: this.hideCompleted,
        }
    }

    static deserialize(json: Object) {
        return {
            todos: Array.from(json.todos).map(todo => Todo.deserialize(todo)) || [],
            themeMode: json.themeMode || themeModes.DARK,
            hideCompleted: json.hideCompleted || false,
        };
    }
}
