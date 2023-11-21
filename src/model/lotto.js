
const ticketPrice = 500;

class Lotto {
    constructor(gameId, ticketsSold = 0, gm = 17, prize = 10000) {
        this.gameId = gameId;
        this.prize = prize;
        this.ticketPrice = ticketPrice;
        this.ticketsSold = ticketsSold;
        this.gm = gm; // this is the adminId basically.
        this.winningNumbers = [];
    };

    async buyTicket(userData) {
        const userBalance = userData.balance; 
        if (userBalance < this.ticketPrice) {
            return {message: 'Instufficient balance'}
        };
        let newUserBalance = userBalance - this.ticketPrice;
        //has to handle the admin balance change too: 
        this.ticketsSold++
        return newUserBalance; 
    };
};

export default Lotto;