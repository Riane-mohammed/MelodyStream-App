import { createContext, useContext, useReducer, useEffect } from "react";

export const StateContext = createContext();

export const StateProvider = ({ initialState, reducer, children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        const storedState = JSON.parse(localStorage.getItem("reduxState"));
        if (storedState) {
            dispatch({ type: "LOAD_STATE", payload: storedState });
        }
    }, []);
    useEffect(() => {
        localStorage.setItem("reduxState", JSON.stringify(state));
    }, [state]);

    return (
        <StateContext.Provider value={{ state, dispatch }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateProvider = () => useContext(StateContext);
