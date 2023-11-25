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
    const [winData, setWinData] = useState(() => {
        const savedWinData = localStorage.getItem("winData");
        return savedWinData !== null ? JSON.parse(savedWinData) : null;
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

    useEffect(() => {
        localStorage.setItem("winData", JSON.stringify(winData));
    }, [winData]);

    /* fetching the user data on a high level, on start: */
    useEffect(() => {
        getUser(isAdmin)
    }, [isAdmin]);

    /* fetching the game fata, and creating the game instance: */
    useEffect(() => {
        // This effect is for fetching game data only once on component mount
        const savedWinData = localStorage.getItem('winData');  // check if theres a game drawn alrady in the localStorage. 
        const isGameAlradyDrawn = savedWinData ? JSON.parse(savedWinData) : null; //<---- no need to check for current game data, and refressh the current game if we have a drawn game alrady. this way the current game data will only reset once the admin hit the reset button. 
        if (!isGameAlradyDrawn) {
            getGame();
        };
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

    /* triggered by the draw handler: (nem biztos h a legjobb ha a allTicketsData triggeleri) */
    useEffect(() => {
        if (allTicketsData && currentGame) {
            const draw = async () => {
                try {
                    const { winners, prizes, winningNumbers } = await currentGame.draw(allTicketsData);
                    let winningUserIds = await updateWinners(winners, prizes, currentGame.prize);
                    setWinData({
                        winningUserIds: winningUserIds.data.data, 
                        winningNumbers: winningNumbers,
                        previousGameId: currentGame.gameId
                    });
                } catch (error) {
                    console.error('this is the error:', error);
                }
            };
            draw();
        };
    }, [allTicketsData, currentGame]);

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
    const updateTicketList = async () => {
        if (userData && gameData) {
            try {
                await getTickets(userData.id, gameData.id);
            } catch (error) {
                console.log(error.response?.data?.message)
            }
        };
    };

    const handleUserBalance = async () => {
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

    console.log('currentGame:', currentGame);
    console.log('gameData:', gameData);
    console.log('win data:', winData);
    console.log('current game:', currentGame);

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
            handleDraw,
            winData,
            setWinData
        }}>
            {children}
        </Context.Provider>
    )
};

export default Context;