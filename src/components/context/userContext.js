import React, { createContext, useEffect, useState } from "react";
import { getUserData } from "../../functions/fetch/fetchUser";
import useRequest from "../../functions/hook/useRequest";

const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const {executeRequest:getUser, loading, data:userData, error } = useRequest(getUserData);

    /* fetching the user data on a high level: */
    useEffect(() => {
        getUser(isAdmin)
    }, [isAdmin]);

    return (
        <Context.Provider value={{ isAdmin, setIsAdmin, userData, loading, error }}>
            {children}
        </Context.Provider>
    )
};

export default Context;