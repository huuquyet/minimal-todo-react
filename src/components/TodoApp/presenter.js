import React from 'react';

import {createTheme, ThemeProvider} from '@mui/material/styles';
import {
    Button,
    Container,
    CssBaseline,
    FormControl,
    FormControlLabel,
    Input,
    InputAdornment,
    InputLabel
} from '@mui/material';
import {AddCircle as AddCircleIcon, FilterList as FilterListIcon} from '@mui/icons-material';

import VisibleTodoList from '../VisibleTodoList';
import {filterTitles, themeModes} from '../../constants/constants';
import Todo from '../../lib/Todo';
import MaterialUISwitch from "../../customize/MaterialUISwitch";

export default class TodoApp extends React.Component {
    render() {
        const {
            todos,
            themeMode,
            hideCompleted,
            addTodo,
            removeTodo,
            completeTodo,
            toggleMode,
            toggleCompleted,
        } = this.props;

        const pendingTodos = todos.filter(todo => !todo.isDone);

        const todoList = function (todos, hideCompleted) {
            return hideCompleted ? pendingTodos : todos;
        }

        const pendingTodosTitle = `${pendingTodos.length > 0 ? ` (${pendingTodos.length})` : ''}`;

        const theme = createTheme({palette: {mode: themeMode}});

        return <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container maxWidth="sm">
                <div>
                    <div style={{textAlign: 'right'}}>
                        <FormControlLabel onClick={() => toggleMode(themeMode)}
                                          control={<MaterialUISwitch checked={themeMode === themeModes.DARK}/>}
                                          aria-label="Switch mode" label=""/>
                    </div>

                    <h1> 📝️ To Do List {pendingTodosTitle} </h1>
                    <FormControl fullWidth variant="standard" margin="normal">
                        <InputLabel htmlFor="todo-input">Task</InputLabel>
                        <Input id="todo-input" type='text' placeholder="What do you want to do?"
                               inputRef={(c => this._todoInputField = c)} endAdornment={
                            <InputAdornment position="end">
                                <Button variant="text" startIcon={<AddCircleIcon/>}
                                        onClick={() => addTodo(new Todo(this._todoInputField.value))}>
                                    ADD
                                </Button>
                            </InputAdornment>
                        }/>
                    </FormControl>

                    <div style={{textAlign: 'center'}}>
                        <Button variant="outlined" startIcon={<FilterListIcon/>}
                                onClick={() => toggleCompleted(hideCompleted)}>
                            {hideCompleted ? filterTitles.SHOW_ALL : filterTitles.HIDE_COMPLETED}
                        </Button>
                    </div>

                    <VisibleTodoList todoList={todoList(todos, hideCompleted)}
                                     completeTodo={completeTodo}
                                     removeTodo={removeTodo}/>
                </div>
            </Container>
        </ThemeProvider>
    }
}
