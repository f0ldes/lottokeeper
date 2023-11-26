import React, { createContext, useEffect, useState } from "react";
import useRequest from "../../utils/hook/useRequest";
import Lotto from "../../model/lotto";
import { UpdateTicketListHandler, UpdateUserName, UserBalanceHandler } from "../../utils/handlers/contextHandlers";
import { getUserData } from "../../utils/fetch/fetchUser";
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
    }); // ezeket egy sorrossa 
    const [winData, setWinData] = useState(() => {
        const savedWinData = localStorage.getItem("winData");
        return savedWinData !== null ? JSON.parse(savedWinData) : null;
    }); // ezeket egysorossa
    const [currentGame, setCurrentGame] = useState(null);
    const {executeRequest:getUser, data:userData } = useRequest(getUserData);
    const {executeRequest:getTickets, data:ticketsData } = useRequest(getTicketsData);

    /* this is only a state for tracking when a draw should happen.  */
    const [timeToDraw, setTimeToDraw] = useState(false);
    const [allTicketFlag, setAllTicketFlag] = useState(null); /* this should indicate when we should fetch the data in the list component. */
    const {executeRequest:getAllTicketsData, data:allTicketsData} = useRequest(getTicketsData); // maybe this should be done differently.

    
    const {executeRequest:getGame, data:gameData } = useRequest(getGamaData);
    console.log('this is ticketsData in the console:', ticketsData);
    console.log('this is all tickets data in the console:', allTicketsData)

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

    /* fetching the game data, and creating the game instance: */
    useEffect(() => {
        /* check the local storage for win data aka. handle the case when game is drawn
           but no new game is initialized yet */
        const savedWinData = localStorage.getItem('winData');
        const isGameAlradyDrawn = savedWinData ? JSON.parse(savedWinData) : null; //<---- no need to check for current game data, and refressh the current game if we have a drawn game alrady. this way the current game data will only reset once the admin hit the reset button. 
        if (!isGameAlradyDrawn) {
            getGame(); /* has to be check, becasue the getGame automatically creates a new game in the database. We don't want that until the admin doesnt start a new one. */
        };
    }, []);
    
    /* Changes the current game data: */
    useEffect(() => {
        /* update the current game instance, if the useEffect changes. */
        if (gameData) {
            const newGame = new Lotto(gameData.id, gameData.tickets_sold, gameData.gm, gameData.prize, gameData.is_active);
            setCurrentGame(newGame);
        };
    }, [gameData]);

    /* triggered by the draw handler: (nem biztos h a legjobb ha a allTicketsData triggeleri) */
    useEffect(() => {
        if (allTicketsData && currentGame && timeToDraw) { /* make sure necessary data is present */
            const draw = async () => {
                try {
                    const { winners, prizes, winningNumbers } = await currentGame.draw(allTicketsData); /* call the lotto draw method */
                    let winningUserIds = await updateWinners(winners, prizes, currentGame.prize); /* update the winners data, distribute the prize */
                    setWinData({
                        /* has to update to save the userId: ticketId and not just the userId? */
                        winningUserIds: winningUserIds.data.data, 
                        winningNumbers: winningNumbers,
                        previousGameId: currentGame.gameId,
                        ticketsSold: currentGame.ticketsSold, 
                        prize: currentGame.prize,
                        prizes: prizes
                    }); /* set the winData. It's also used for summary. */
                    setTimeToDraw(false); /* extra chaeck for flagging the draw mechanism */
                } catch (error) {
                    console.error('this is the error:', error);
                }
            };
            draw();
        }; 
    }, [allTicketsData, currentGame]);

    /* update userName handler */
    const updateUsername = async (newName) => {
        UpdateUserName(newName, updateName, getUser, isAdmin);
    };

    /* update ticket list handler */
    const updateTicketList = async () => {
        UpdateTicketListHandler(userData, gameData, getTickets);
    };

    /* update admin and player balance handler  */
    const handleUserBalance = async () => {
        UserBalanceHandler(userData, currentGame, isAdmin, getUser, updateGameData, updateUserBalance);
    };

    /* handle draw: */
    const handleDraw = async () => {
        await getAllTicketsData(null, gameData.id);
        setTimeToDraw(true)
    };

    return (
        <Context.Provider value={{ 
            isAdmin, 
            setIsAdmin, 
            userData, 
            updateUsername, 
            updateTicketList,
            getTickets,
            getAllTicketsData,
            allTicketsData,
            ticketsData, 
            handleUserBalance, 
            gameData,
            handleDraw,
            winData,
            setWinData,
            currentGame,
            allTicketFlag,
            setAllTicketFlag
        }}>
            {children}
        </Context.Provider>
    )
};

export default Context;