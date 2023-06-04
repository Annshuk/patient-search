import { createContext, useContext, useMemo, useReducer } from "react";

const initialState = {
    records: [], formPayload: { selectedRow: {} }
}


export const context = createContext(initialState)
export const { Provider } = context;

export const usePatientContext = () => useContext(context);



const reducers = (state = initialState, action) => {
    const { type, payload } = action;

    return {
        records: () => ({ ...state, records: payload }),
        formPayload: () => ({ ...state, formPayload: payload })
    }[type]()
}

export const PatientProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducers, initialState);

    const dipatchAction = ({ type, payload }) => dispatch({ type, payload })
    const stateValue = useMemo(() => state, [state])

    return <Provider value={ { state: stateValue, dispatch: dipatchAction } } >{ children }</Provider>
}