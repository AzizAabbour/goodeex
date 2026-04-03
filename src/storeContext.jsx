import React, { createContext, useContext, useMemo, useReducer } from "react";
import reducerGlobal from "./config/reducerGlobal.js";

const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  // Pass undefined to let reducer use its own initial state default.
  const [state, dispatch] = useReducer(reducerGlobal, undefined);
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useDispatch = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error("useDispatch must be used inside StoreProvider");
  }
  return ctx.dispatch;
};

export const useSelector = (selector) => {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error("useSelector must be used inside StoreProvider");
  }
  return selector(ctx.state);
};
