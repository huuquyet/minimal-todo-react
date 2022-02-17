import React from 'react';
import {List, ListItem} from "@mui/material";

import SingleTodo from './SingleTodo'

export default class VisibleTodoList extends React.Component {
    render() {
        return (
            <div>
            <h3 style={{textAlign: 'center'}}>{this.props.visibilityFilter.replace("_", " ")}</h3>
            {this.props.visibleTodos.length > 0 ?
                (
                    <List>
                        {this.props.visibleTodos.map(
                            (todo) =>
                                <SingleTodo
                                    key={todo.id}
                                    todoId={todo.id}
                                    text={todo.descriptionText}
                                    isDone={todo.isDone}
                                    completeTodo={this.props.completeTodo}
                                    removeTodo={this.props.removeTodo}
                                />
                        )}
                    </List>
                ):
                (
                    <List>
                        <ListItem>Nothing here 🙈🐘</ListItem>
                    </List>
                )
            }
            </div>
        );
    }
}
