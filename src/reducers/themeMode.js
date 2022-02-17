import {actionTypes, themeModes} from "../constants/constants";

const initialState = themeModes.DARK;

export default function themeMode(state = initialState, action) {
    switch (action.type) {
        case actionTypes.TOGGLE_MODE:
            return action.themeMode === themeModes.DARK ? themeModes.LIGHT : themeModes.DARK;
        default:
            return state;
    }
}
