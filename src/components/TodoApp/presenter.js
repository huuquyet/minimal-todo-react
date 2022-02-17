import React from 'react';

import {createTheme, ThemeProvider} from '@mui/material/styles';
import {
    Box,
    Button,
    Container,
    CssBaseline,
    FormControl,
    FormControlLabel,
    Input,
    InputAdornment,
    InputLabel
} from '@mui/material';
import {AddCircle as AddCircleIcon} from '@mui/icons-material';

import VisibleTodoList from '../VisibleTodoList';
import {themeModes, visibilityFilters} from '../../constants/constants';
import Todo from '../../lib/Todo';
import MaterialUISwitch from "../../customize/MaterialUISwitch";

function visibleTodos(todos, visibilityFilter) {
    switch (visibilityFilter) {
        case visibilityFilters.ALL_TODOS:
            return todos;
        case visibilityFilters.ACTIVE_TODOS:
            return todos.filter(todo => todo.isDone === false);
        case visibilityFilters.COMPLETED_TODOS:
            return todos.filter(todo => todo.isDone === true);
        default:
            return todos;
    }
}

export default class TodoApp extends React.Component {
    render() {
        const {
            todos,
            visibilityFilter,
            themeMode,
            addTodo,
            removeTodo,
            completeTodo,
            changeVisibilityFilter,
            toggleMode,
        } = this.props;

        let visibleTodosArray = visibleTodos(todos, visibilityFilter);

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

                    <h2> Down and Dirty TodoApp built with React and Redux </h2>
                    <FormControl fullWidth variant="standard">
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
                    <VisibleTodoList visibleTodos={visibleTodosArray}
                                     visibilityFilter={visibilityFilter}
                                     completeTodo={completeTodo}
                                     removeTodo={removeTodo}/>
                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        SHOW:
                        {
                            Object.keys(visibilityFilters).map(visibilityFilter =>
                                <Button variant="text" color="primary" key={visibilityFilter}
                                        onClick={() => changeVisibilityFilter(visibilityFilter)}>
                                    {visibilityFilter.replace("_", " ")}
                                </Button>
                            )
                        }
                    </Box>
                </div>
            </Container>
        </ThemeProvider>
    }
}
