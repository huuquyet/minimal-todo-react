import React from 'react';
import {Checkbox, IconButton, ListItem, ListItemButton, ListItemText} from "@mui/material";
import {Delete as DeleteIcon} from "@mui/icons-material";

export default class SingleTodo extends React.Component {
    render() {

        return (
            <ListItem key={this.props.todoId} disablePadding secondaryAction={
                <IconButton edge="end" aria-label="Delete" color="error"
                            onClick={() => this.props.removeTodo(this.props.todoId)}>
                    <DeleteIcon/>
                </IconButton>
            }>
                <ListItemButton role={undefined} onClick={() => this.props.completeTodo(this.props.todoId)}
                                selected={this.props.isDone} dense>
                    <Checkbox edge="start" checked={this.props.isDone}
                              inputProps={{'aria-labelledby': this.props.todoId}}/>
                    <ListItemText id={this.props.todoId} primary={this.props.text}
                                  sx={{textDecoration: this.props.isDone ? "line-through" : "none"}}/>
                </ListItemButton>
            </ListItem>
        );
    }
}
