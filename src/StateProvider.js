import React,{createContext,useContext,useReducer} from 'react';

//Prepare the datalayer
export const StateContext = createContext();

//wrap our app and procvide the data layer
export const StateProvider = ({reducer,initialState,children})=>(
    <StateContext.Provider value={useReducer(reducer,initialState)}>
        {children}
    </StateContext.Provider>
);

//pull information from the data layer
export const useStateValue = () => useContext(StateContext)