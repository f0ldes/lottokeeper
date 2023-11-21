import React, { createContext, useEffect, useState } from "react";
import { getUserData } from "../../utils/fetch/fetchUser";
import useRequest from "../../utils/hook/useRequest";
import Lotto from "../../model/lotto";
import { updateName } from "../../utils/fetch/updateUserName";
import { getTicketsData } from "../../utils/fetch/fetchTickets";
import { getGamaData } from "../../utils/fetch/fetchGame";
import { updateUserBalance } from '../../utils/fetch/updateBalance';

const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [currentGame, setCurrentGame] = useState(null);
    const {executeRequest:getUser, data:userData } = useRequest(getUserData);
    const {executeRequest:getTickets, data:ticketsData } = useRequest(getTicketsData);
    const {executeRequest:getGame, data:gameData } = useRequest(getGamaData);

    /* fetching the user data on a high level, on start: */
    useEffect(() => {
        getUser(isAdmin)
    }, [isAdmin]);

    /* fetching the game fata, and creating the game instance: */
    useEffect(() => {
        // This effect is for fetching game data only once on component mount
        getGame();
    }, []);
    
    useEffect(() => {
        // This effect is for creating the Lotto instance whenever gameData changes
        if (gameData) {
            const newGame = new Lotto(gameData.gameId, gameData.ticketsSold, gameData.gm, gameData.prize);
            setCurrentGame(newGame);
        }
    }, [gameData]);

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

    const updateUserBalance = async() => {
        if (currentGame) {
            try {
                if (userData){
                    const newBalance = await currentGame.buyTicket(userData);
                    await updateUserBalance(userData, newBalance);
                    await getUser(isAdmin) 
                }
            } catch (error) {
                console.log('error updating balance:', error?.response?.data?.message);
            }
        }
    };

    return (
        <Context.Provider value={{ 
            isAdmin, 
            setIsAdmin, 
            userData, 
            updateUsername, 
            updateTicketList, 
            ticketsData, 
            updateUserBalance 
        }}>
            {children}
        </Context.Provider>
    )
};

export default Context;