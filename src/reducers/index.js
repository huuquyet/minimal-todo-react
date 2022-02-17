import { combineReducers } from 'redux';

import todos from './todos';
import visibilityFilter from './visibilityFilter';
import themeMode from './themeMode';

export default combineReducers({
    todos,
    visibilityFilter,
    themeMode,
});
