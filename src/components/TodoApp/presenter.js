import React from 'react';

import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Box, Button, Container, CssBaseline, FormControlLabel, TextField} from '@mui/material';
import {Add as AddIcon, FilterList as FilterListIcon} from '@mui/icons-material';

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

        const theme = createTheme({palette: {mode: themeMode},});

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
                    <Box sx={{display: 'flex'}}>
                        <TextField sx={{flexGlow: 1}} fullWidth variant="standard" label="Task"
                                   placeholder="What do you want to do?"
                                   inputRef={(c => this._todoInputField = c)}/>
                        <Button variant="contained" startIcon={<AddIcon/>} size="large"
                                onClick={() => addTodo(new Todo(this._todoInputField.value))}>
                            Add
                        </Button>
                    </Box>
                    <VisibleTodoList
                        visibleTodos={visibleTodosArray}
                        visibilityFilter={visibilityFilter}
                        completeTodo={completeTodo}
                        removeTodo={removeTodo}/>
                    <div style={{textAlign: 'center'}}>
                        SHOW:
                        {
                            Object.keys(visibilityFilters).map(
                                visibilityFilter =>
                                    <Button variant="text" color="primary" startIcon={<FilterListIcon/>}
                                            key={visibilityFilter}
                                            onClick={() => changeVisibilityFilter(visibilityFilter)}>
                                        {visibilityFilter.replace("_", " ")}
                                    </Button>
                            )
                        }
                    </div>
                </div>
            </Container>
        </ThemeProvider>
    }
}
