import React from 'react';
import {Checkbox, IconButton, ListItem, ListItemText} from "@mui/material";
import {Delete as DeleteIcon} from "@mui/icons-material";

export default class SingleTodo extends React.Component {
    render() {

        return (
            <ListItem alignItems="flex-start">
                <Checkbox edge="start"
                          checked={this.props.isDone}
                          onChange={() => this.props.completeTodo(this.props.todoId)}/>
                <ListItemText id={this.props.todoId} primary={this.props.text}
                              sx={{textDecoration: this.props.isDone ? "line-through" : "none"}}/>
                <IconButton edge="end" aria-label="Delete" color="error"
                            onClick={() => this.props.removeTodo(this.props.todoId)}>
                    <DeleteIcon/>
                </IconButton>
            </ListItem>
        );
    }
}
