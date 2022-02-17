import {createStore} from 'redux';
import throttle from 'lodash/throttle';

import {loadFromLocalStorage, saveToLocalStorage} from './localStorage';
import rootReducer from '../reducers/index';
import {themeModes, visibilityFilters} from "../constants/constants";

const initialState = loadFromLocalStorage() || {
    todos: [],
    visibilityFilter: visibilityFilters.ALL_TODOS,
    themeMode: themeModes.DARK,
};

const store = createStore(rootReducer, initialState);

store.subscribe(throttle(() => {
    saveToLocalStorage(store.getState());
}, 1000));

export default store;
