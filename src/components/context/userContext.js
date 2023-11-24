import React, { createContext, useEffect, useState } from "react";
import { getUserData } from "../../utils/fetch/fetchUser";
import useRequest from "../../utils/hook/useRequest";
import Lotto from "../../model/lotto";
import { updateName } from "../../utils/fetch/updateUserName";
import { getTicketsData } from "../../utils/fetch/fetchTickets";
import { getGamaData } from "../../utils/fetch/fetchGame";
import { updateUserBalance } from '../../utils/fetch/updateBalance';
import { updateGameData } from "../../utils/fetch/updateGameData";
import { updateWinners } from "../../utils/fetch/updateWinners";

const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(() => {
        const savedIsAdmin = localStorage.getItem("isAdmin");
        return savedIsAdmin !== null ? JSON.parse(savedIsAdmin) : false;
    });
    const [currentGame, setCurrentGame] = useState(null);
    // talan ide lehetne rakni egy statet a huzas eredmenyenek 
    const {executeRequest:getUser, data:userData } = useRequest(getUserData);
    const {executeRequest:getTickets, data:ticketsData } = useRequest(getTicketsData);
    const {executeRequest:getAllTicketsData, data:allTicketsData} = useRequest(getTicketsData); // maybe this should be done differently.
    const {executeRequest:getGame, data:gameData } = useRequest(getGamaData);


    /* update data in local sotrage: */
    useEffect(() => {
        localStorage.setItem("isAdmin", JSON.stringify(isAdmin));
    }, [isAdmin]);

    /* fetching the user data on a high level, on start: */
    useEffect(() => {
        getUser(isAdmin)
    }, [isAdmin]);

    /* fetching the game fata, and creating the game instance: */
    useEffect(() => {
        // This effect is for fetching game data only once on component mount
        getGame();
    }, []); //isAdmin?
    
    /* Changes the current game data: */
    useEffect(() => {
        // This effect is for creating the Lotto instance whenever gameData changes
        if (gameData) {
            const newGame = new Lotto(gameData.id, gameData.tickets_sold, gameData.gm, gameData.prize, gameData.is_active);
            setCurrentGame(newGame);
            // maybe we can add here a method to update the database too.
        }
    }, [gameData]);


    /* triggered by the draw handler: */
    useEffect(() => {
        if (allTicketsData) {
            const draw = async () => {
                const { winners, prizes, winningNumbers } = await currentGame.draw(allTicketsData);
                //await updateGameData(currentGame);
                console.log(currentGame)
                await updateWinners(winners, prizes, currentGame.prize);
                console.log('these are the draw data: ',winners, prizes, winningNumbers);
                console.log('currentGame:',currentGame, 'gameData:', currentGame);
            };
    
            draw();
        }
    }, [allTicketsData]);

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
                await getTickets(userData.id, gameData.id);
            } catch (error) {
                console.log(error.response?.data?.message)
            }
        };
    };

    const handleUserBalance = async() => {
        if (currentGame) {
            try {
                if (userData) {

                    const newBalance = await currentGame.buyTicket(userData);
                    await updateUserBalance(userData, newBalance);
                    await getUser(isAdmin)

                }
                /* Whenever we change the balance, we can update the game table too: */
                await currentGame.calculatePrize();
                await updateGameData(currentGame);
            } catch (error) {
                console.log('error updating balance:', error?.response?.data?.message);
            }
        }
    };

    const handleDraw = async () => {
        await getAllTicketsData(null, gameData.id);
    };

    return (
        <Context.Provider value={{ 
            isAdmin, 
            setIsAdmin, 
            userData, 
            updateUsername, 
            updateTicketList, 
            ticketsData, 
            handleUserBalance, 
            gameData,
            handleDraw
        }}>
            {children}
        </Context.Provider>
    )
};

export default Context;