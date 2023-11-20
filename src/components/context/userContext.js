import React, { createContext, useEffect, useState } from "react";
import { getUserData } from "../../functions/fetch/fetchUser";
import useRequest from "../../functions/hook/useRequest";
import { updateName } from "../../functions/fetch/updateUserName";
import { getTicketsData } from "../../functions/fetch/fetchTickets";

const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const {executeRequest:getUser, data:userData } = useRequest(getUserData);
    const {executeRequest:getTickets, data:ticketsData } = useRequest(getTicketsData);

    /* fetching the user data on a high level: */
    useEffect(() => {
        getUser(isAdmin)
    }, [isAdmin]);

    /* should I have an other useffect here? */
    const updateUsername = async (newName) => {
        try {
           await updateName(newName);
           await getUser(isAdmin);
        } catch (error) {
            console.log(error.response?.data?.message);
        };
    };

    //trigger this when create ticket. 
    const updateTicketList = async() => {
        if (userData) {
            try {
                let userId = userData.id;
                await getTickets(userId);
            } catch (error) {
                console.log(error.response?.data?.message)
            }
        };
    };

    return (
        <Context.Provider value={{ isAdmin, setIsAdmin, userData, updateUsername, updateTicketList, ticketsData }}>
            {children}
        </Context.Provider>
    )
};

export default Context;