

/* Here we have all the functions that manipulate the "list" in the list componenet: */

/* sort the ticket list by fake/real */
const sortTicketsByReal = (listData) => {
    /* this function manipulates the listdata by Real / Not Real */
    return listData.sort((a, b) => {
        if (a.is_real === 1 && b.is_real !== 1) {
            return -1;
        } else if (a.is_real !== 1 && b.is_real === 1) {
            return 1;
        }
        return 0;
    });
};

/* this takes the winData and returns a new list with extra properties based on winData: */
const findTheWinningNumbersForTheTicket = (tickets, winData) => {
    return tickets.map(ticket => {
        const ticketNumbers = JSON.parse(ticket.numbers);
        const winningNumbers = winData.winningNumbers;
        const winningNumbersInTicket = ticketNumbers.filter(num => winningNumbers.includes(parseInt(num)));

        // Determine the prize based on the number of hits
        let prizeAmount = 0;
        switch(winningNumbersInTicket.length) {
            case 2:
                prizeAmount = winData.prizes.twoHit;
                break;
            case 3:
                prizeAmount = winData.prizes.threeHit;
                break;
            case 4:
                prizeAmount = winData.prizes.fourHit;
                break;
            case 5:
                prizeAmount = winData.prizes.fiveHit;
                break;
            default:
                prizeAmount = 0;
        }

        return {
            ...ticket,
            winningNumbersInTicket,
            prizeAmount
        };
    });
};


/* sort the tikcets by user imput: */
const sortTicketsByInput = (tickets, criteria) => {
    return [...tickets].sort((a, b) => {
        switch (criteria) {
            case 'winningNumbers':
                return b.winningNumbersInTicket.length - a.winningNumbersInTicket.length;
            case 'prize':
                return b.prizeAmount - a.prizeAmount;
            case 'created':
            default:
                return a.id - b.id;
        }
    });
};

/* Check if numbers are valid (its for ticket validation): */
const areNumbersValid = (numbers) => {
    if (!Array.isArray(numbers)) {
        return false; // Not an array, therefore invalid
    }
    const filteredNumbers = numbers.filter(n => n !== '');
    const uniqueNumbers = new Set(filteredNumbers);
    return filteredNumbers.length === 5 && uniqueNumbers.size === 5;
};

/* calculate user prize: */
const calculateUserPrize = (userId, winnerIds, prizes) => {
    if (winnerIds.fiveHit.includes(userId)) {
        return prizes.fiveHit;
    } else if (winnerIds.fourHit.includes(userId)) {
        return prizes.fourHit;
    } else if (winnerIds.threeHit.includes(userId)) {
        return prizes.threeHit;
    } else if (winnerIds.twoHit.includes(userId)) {
        return prizes.twoHit;
    } else if (winnerIds.noHit.includes(userId)) {
        return prizes.noHit;
    }
    return 0;
};

export {
    sortTicketsByReal,
    findTheWinningNumbersForTheTicket, 
    sortTicketsByInput, 
    areNumbersValid,
    calculateUserPrize
};