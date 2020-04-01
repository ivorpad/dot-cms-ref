import React, { useState, useContext } from "react";

class ContextFactory {

  constructor(stateContext, dispatchContext) {
    this.StateContext = stateContext;
    this.DispatchContext = dispatchContext;
  }

  Provider = ({ children }) => {
    const [state, dispatch] = useState([]);
    return (
      <this.StateContext.Provider value={state}>
        <this.DispatchContext.Provider value={dispatch}>
          {children}
        </this.DispatchContext.Provider>
      </this.StateContext.Provider>
    );
  }

  useContextState = () => {
    const context = useContext(this.StateContext);
    if (context === undefined) {
      throw new Error("useContextState must be used within a Provider");
    }
    return context;
  }

  useContextDispatch = () => {
    const context = useContext(this.DispatchContext);
      if (context === undefined) {
        throw new Error("useContextDispatch must be used within a Provider"
      );
    }
    return context;
  }
}

export default ContextFactory;