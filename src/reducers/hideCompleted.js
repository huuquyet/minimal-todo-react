import {actionTypes} from "../constants/constants";

const initialState = false;

export default function themeMode(state = initialState, action) {
    switch (action.type) {
        case actionTypes.TOGGLE_COMPLETE:
            return !action.hideCompleted;
        default:
            return state;
    }
}
