import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as actions from '../../actions';
import TodoApp from './presenter';

function mapStateToProps(state) {
    const {todos, themeMode, hideCompleted} = state;
    return {
        todos,
        themeMode,
        hideCompleted,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addTodo: bindActionCreators(actions.addTodo, dispatch),
        removeTodo: bindActionCreators(actions.removeTodo, dispatch),
        completeTodo: bindActionCreators(actions.completeTodo, dispatch),
        toggleMode: bindActionCreators(actions.toggleMode, dispatch),
        toggleComplete: bindActionCreators(actions.toggleComplete, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);
