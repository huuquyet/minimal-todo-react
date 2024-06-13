export function saveToLocalStorage(state) {
  try {
    if (window.localStorage && state) {
      localStorage.setItem("minimalTodos", JSON.stringify(state));
    }
  } catch (e) {
    console.log(e);
  }
}

export function loadFromLocalStorage() {
  try {
    if (window.localStorage) {
      const jsonTodos = localStorage.getItem("minimalTodos");
      if (jsonTodos) {
        const state = JSON.parse(jsonTodos);
        if (state === null) return undefined;
        return state;
      }
    }
  } catch (e) {
    console.log(e);
  }
}
