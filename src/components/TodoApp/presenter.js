import React from 'react';

import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Button, Container, CssBaseline, Grid, IconButton, TextField} from '@mui/material';
import {Add as AddIcon, FilterList as FilterListIcon, Brightness7 as Brightness7Icon, DarkMode as DarkModeIcon} from '@mui/icons-material';

import VisibleTodoList from '../VisibleTodoList';
import {visibilityFilters, themeModes} from '../../constants/constants';
import Todo from '../../lib/Todo';

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
                        <IconButton onClick={() => toggleMode(themeMode)} color="inherit"
                        aria-label={themeMode === themeModes.DARK ? themeModes.LIGHT : themeModes.DARK}>
                            {themeMode === themeModes.DARK ? <Brightness7Icon/> : <DarkModeIcon/>}
                        </IconButton>
                    </div>

                    <h2> Down and Dirty TodoApp built with React and Redux </h2>
                    <Grid container spacing={2}>
                        <Grid item xs={9}>
                            <TextField fullWidth variant="standard" label="Task" placeholder="What do you want to do?"
                                       inputRef={(c => this._todoInputField = c)}/>
                        </Grid>
                        <Grid item xs={3}>
                            <Button variant="contained" startIcon={<AddIcon/>} size="large"
                                    onClick={() => addTodo(new Todo(this._todoInputField.value))}>
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                    <VisibleTodoList
                        visibleTodos={visibleTodosArray}
                        visibilityFilter={visibilityFilter}
                        completeTodo={completeTodo}
                        removeTodo={removeTodo}/>
                    <div>
                        SHOW:
                        {
                            Object.keys(visibilityFilters).map(
                                visibilityFilter =>
                                    <Button variant="outlined" color="primary" startIcon={<FilterListIcon/>}
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
