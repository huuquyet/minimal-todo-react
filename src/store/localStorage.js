import MinimalTodos from '../lib/MinimalTodos';

export function saveToLocalStorage(minimalTodos) {
    try {
        if (window.localStorage && minimalTodos) {
            let jsonTodos = Object.assign(new MinimalTodos(), minimalTodos).serialize();
            localStorage.setItem('minimalTodos', JSON.stringify(jsonTodos));
        }
    } catch (e) {
        console.log(e);
    }
}

export function loadFromLocalStorage() {
    try {
        if (window.localStorage) {
            let jsonTodos = localStorage.getItem('minimalTodos');
            if (jsonTodos) {
                let minimalTodos = JSON.parse(jsonTodos);
                if (minimalTodos === null) return undefined;
                return MinimalTodos.deserialize(minimalTodos);
            }
        }
    } catch (e) {
        console.log(e);
    }
}
