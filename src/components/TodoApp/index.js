import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import TodoApp from './presenter';

function mapStateToProps(state) {
    const { todos, visibilityFilter, themeMode } = state;
    return {
        todos,
        visibilityFilter,
        themeMode,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addTodo: bindActionCreators(actions.addTodo, dispatch),
        removeTodo: bindActionCreators(actions.removeTodo, dispatch),
        completeTodo: bindActionCreators(actions.completeTodo, dispatch),
        changeVisibilityFilter: bindActionCreators(actions.changeVisibilityFilter, dispatch),
        toggleMode: bindActionCreators(actions.toggleMode, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);
