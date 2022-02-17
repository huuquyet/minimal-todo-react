import {combineReducers} from 'redux';

import todos from './todos';
import themeMode from './themeMode';
import hideCompleted from './hideCompleted';

export default combineReducers({
    todos,
    themeMode,
    hideCompleted,
});
