import React, { createContext,  useReducer, } from "react";
import { reducer , initialstate } from "./reducer";

export const Amazoncontext = createContext();


const Amazoncontextprovider =(props)=>{

    const [state,dispatch] = useReducer(reducer, initialstate);

    const contextvalue ={dispatch:dispatch,user:state.user,basket:state.basket}
    return(
        
        <Amazoncontext.Provider value={contextvalue}>
            { props.children}

        </Amazoncontext.Provider>

    )

}

export default Amazoncontextprovider;