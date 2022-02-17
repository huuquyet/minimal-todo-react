import React from 'react';
import {Checkbox, IconButton, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default class SingleTodo extends React.Component {
    render() {

        return (
            <ListItem secondaryAction={
                <IconButton edge="end" aria-label="Delete" color="error"
                            onClick={() => this.props.removeTodo(this.props.todoId)}>
                    <DeleteIcon/>
                </IconButton>
            }>
                <ListItemIcon>
                    <Checkbox edge="start"
                              checked={this.props.isDone}
                              onChange={() => this.props.completeTodo(this.props.todoId)}/>
                </ListItemIcon>
                <ListItemText id={this.props.todoId} primary={this.props.text}/>
            </ListItem>
        );
    }
}
