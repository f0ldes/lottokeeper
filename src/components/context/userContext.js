import React, { createContext, useState } from "react";
import { getUserData } from "../../functions/fetch/fetchUser";
import useRequest from "../../functions/hook/useRequest";

const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const {executeRequest, loading, data:userData, error } = useRequest(getUserData);
    /* put the useEffect here: */


    return (
        <Context.Provider value={{ setIsAdmin }}>
            {children}
        </Context.Provider>
    )
};

export default Context;