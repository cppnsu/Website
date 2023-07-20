import { createContext, useReducer } from "react";

export const SiteContext = createContext();

const initialState = {
  "isLoading": false,
  "isMobile": false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case "setIsLoading":
      return { ...state, isLoading: action.value }
    case "setIsMobile":
      return { ...state, isMobile: action.value }
    default:
      return state
  }
};

//<SiteContext.Provider value={{ state, dispatch }}>
export const SiteContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <SiteContext.Provider value={{ state, dispatch }}>
      {props.children}
    </SiteContext.Provider>
  )
};

