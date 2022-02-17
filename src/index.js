import React from 'react';
import ReactDOM from 'react-dom';

import store from './store/initializeStore';
import TodoApp from './components/TodoApp/';

ReactDOM.render(<TodoApp store={store}/>, document.getElementById('app'));
