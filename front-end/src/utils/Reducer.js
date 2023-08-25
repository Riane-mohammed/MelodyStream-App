import { reducerCases } from "./constants";

export const initialState = {
    userid: 0,
    songid: 0, 
};

const reducer = (state, action) => {
    switch (action.type) {
        case "LOAD_STATE":
            return { ...state, ...action.payload };
        case reducerCases.SET_MUSIC_ID:
            return {
                ...state,
                songid: action.payload,
            };
        case reducerCases.SET_ID:
            return {
                ...state,
                id: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
