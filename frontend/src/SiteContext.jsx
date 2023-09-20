import { createContext, useReducer } from "react";

export const SiteContext = createContext();

const initialState = {
  "isLoading": false,
  "role" : "nonMember" // Can be member, nonMember, or admin. Goal is to have diff pricing and stuff
}

const reducer = (state, action) => {
  switch (action.type) {
    case "setIsLoading":
      return { ...state, isLoading: action.value }
    case "setRole":
      return { ...state, role: action.value }
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

