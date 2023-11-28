
const ticketPrice = 500;
const ticketData = '';

class Lotto {
    constructor(gameId, ticketsSold = 0, gm = 17, prize = 1, isActive = 1) {
        this.gameId = gameId;
        this.prize = prize;
        this.ticketPrice = ticketPrice;
        this.ticketsSold = ticketsSold;
        this.gm = gm; // . comisson 0.40 * this.ticketsSold * this.ticketPrice!!!
        this.winningNumbers = [];
        this.isActive = isActive;
    };

    draw(ticketData) {
        this.winningNumbers = this.generateWinningNumbers();
        const winners = this.findWinners(ticketData, this.winningNumbers);
        const prizes = this.distributePrize(winners);
        this.isActive = 0;
        
        return { winners, prizes, winningNumbers: this.winningNumbers};
    };

    buyTicket(userData) {
        const userBalance = userData.balance; 
        if (userBalance < this.ticketPrice) {
            return {message: 'Instufficient balance'}
        };
        let newUserBalance = userBalance - this.ticketPrice;
        //has to handle the admin balance change too: 
        this.ticketsSold++
        return newUserBalance; 
    };

    calculatePrize() {
        const prizePercentage = 0.60;
        this.prize = prizePercentage * this.ticketsSold * this.ticketPrice;
        return prizePercentage * this.ticketsSold * this.ticketPrice;
    };
    
    distributePrize() {
        let prizePool = this.calculatePrize();
        let winners = this.findWinners(ticketData, this.generateWinningNumbers());
        let prizes = {
            fiveHit: winners.fiveHit.length > 0 ? prizePool * 0.60 / winners.fiveHit.length : prizePool * 0.60,
            fourHit: winners.fourHit.length > 0 ? prizePool * 0.25 / winners.fourHit.length : prizePool * 0.25,
            threeHit: winners.threeHit.length > 0 ? prizePool * 0.10 / winners.threeHit.length : prizePool * 0.10,
            twoHit: winners.twoHit.length > 0 ? prizePool * 0.05 / winners.twoHit.length : prizePool * 0.05
        };

        return prizes
    };

    generateWinningNumbers(){
        const shuffleArray = (array) => {
            /* Fisher - Yates shuffle: */
            for (let i = array.length - 1; i > 0;  i--){
                let j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]]
            }
        };

        let winningNumbersCount = 5;
        const winningNumbers = (count) => {
            let numbers = Array.from({ length: 39 }, (_, i) => i + 1);
            shuffleArray(numbers);
            return numbers.slice(0, count);
        };

        return winningNumbers(winningNumbersCount);
    };

    //this sould receive only the ticket data for the given game. 
    findWinners(ticketData, winningNumbers) {
        /* creating a new dictionary for the game, with all the relating tickets: */
        let ticketMap = {};
        /* fill up the map, with all the numbers, sorted, turend into an array */
        for (let i = 0; i < ticketData.length; i++) {
            let ticketNumbers = JSON.parse(ticketData[i].numbers);
            ticketNumbers = ticketNumbers.map(Number);
            ticketMap[ticketData[i].id] = ticketNumbers.sort((a, b) => a - b)
        };

        /* the winners map, storing the ticket id of the winner tickets: */
        let winners = {
            fiveHit: [],
            fourHit: [],
            threeHit: [],
            twoHit: [],
            noHit: []
        };

        /* sort the winning numbers so we can sort the winners: */
        winningNumbers.sort((a , b) => a - b);
        for (const [ticketId, numbers] of Object.entries(ticketMap)) {
            let matchCount = 0;
            let i = 0, j = 0;

            /* checking the numbers, sorting, two pointer  */
            while (i < numbers.length && j < winningNumbers.length) {
                if (numbers[i] === winningNumbers[j]) {
                    matchCount++
                    i++
                    j++
                } else if (numbers[i] < winningNumbers[j]){
                    i++
                } else {
                    j++
                }
            };

            /* pushing the ticketId's to the map: */
            switch (matchCount) {
                case 5:
                    winners.fiveHit.push(ticketId);
                    break;
                case 4:
                    winners.fourHit.push(ticketId);
                    break;
                case 3: 
                    winners.threeHit.push(ticketId);
                    break;
                case 2:
                    winners.twoHit.push(ticketId);
                    break;
                default:
                    winners.noHit.push(ticketId);
                    break;
            };
        }

        return winners;
    };

    incrementTicketsSold(amount){
        /* handler to increment sold ticket amount */
        this.ticketsSold = this.ticketsSold + parseInt(amount);
    };
};

export default Lotto;