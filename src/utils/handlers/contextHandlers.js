/* Outsourced handlers logic from the context: */

/* handling user balance change: */
const UserBalanceHandler = async (userData, currentGame, isAdmin, getUser, updateGameData, updateUserBalance) => {
    if (currentGame) {
        try {
            if (userData) {
                const newBalance = await currentGame.buyTicket(userData); /* this lotto method returns the updated user balance */
                await updateUserBalance(userData, newBalance); /* update the db with the new balance */
                await getUser(isAdmin); /* update the state witht the new userData */
                await currentGame.calculatePrize(); /* update the prize */
                await updateGameData(currentGame); /* update the tables with the new game data */
            }
        } catch (error) {
            console.log('error updating balance:', error?.response?.data?.message);
        };
    };
};

/* handling ticketList updates: */
const UpdateTicketListHandler = async (userData, gameData, getTickets) => {
    if (userData && gameData) {
        try {
            await getTickets(userData.id, gameData.id); /* wait for the fetch function to get the new tickets from db. userId/gameId */
        } catch (error) {
            console.log(error.response?.data?.message);
        };
    };
};

const UpdateUserName = async (newName, updateName, getUser, isAdmin, userData) => {
    try {
        await updateName(newName, userData);
        await getUser(isAdmin);
    } catch (error) {
        console.log(error.response?.data?.message);
    };
};

export {
    UserBalanceHandler, 
    UpdateTicketListHandler, 
    UpdateUserName
};