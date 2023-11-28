import { useContext, useEffect, useState } from "react";
import { Box, ButtonGroup, Button, TableContainer, Table, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import { UpdateTicketListHandler } from "../../../utils/handlers/contextHandlers";
import Context from "../../context/userContext";
import { findTheWinningNumbersForTheTicket, sortTicketsByReal, sortTicketsByInput, calculateUserPrize } from "../../../utils/handlers/listHandlers";

const listStyle = {
    maxHeight: '200px',
    overflow: 'auto'
};

const ListElement = () => {
    const [sortCriteria, setSortCriteria] = useState('created'); //separate state for filter input
    const { isAdmin,  userData, gameData, getTickets, allTicketsData, ticketsData, getAllTicketsData, allTicketFlag, winData } = useContext(Context);


    useEffect(() => {
        if (isAdmin && gameData) {
            getAllTicketsData(null, gameData.id)
        } else if (userData && gameData) {
            UpdateTicketListHandler(userData, gameData, getTickets);
        } /* this triggers the update of the ticket list. allTickets used to track
            the fake ticket creation, in its element. */
    }, [userData, gameData, allTicketFlag])

    let displayData = isAdmin ? allTicketsData : ticketsData;
    displayData = Array.isArray(displayData) ? sortTicketsByReal([...displayData]) : displayData;

    if (!winData) {
        localStorage.removeItem('enhancedDisplayData'); //clear the saved list.
    };

    if (winData) {
        const storedData = localStorage.getItem('lastDisplayedList'); //saving the last games list after draw to the local storage 
        if (storedData) {
            displayData = JSON.parse(storedData); //until winData is avaiable, it tries to retrive the last saved ticket list
        } else {
            displayData = Array.isArray(displayData) ? findTheWinningNumbersForTheTicket(displayData, winData) : displayData;
            displayData = Array.isArray(displayData) ? sortTicketsByInput(displayData, sortCriteria) : displayData;
            localStorage.setItem('lastDisplayedList', JSON.stringify(displayData));
        }
    } else {
        displayData = Array.isArray(displayData) ? sortTicketsByReal([...displayData]) : displayData;
    };

    useEffect(() => {
        function sortData() {
            let sortedData;
            if (Array.isArray(displayData)) {
                console.log('displaydata', displayData)
                sortedData = sortTicketsByInput([...displayData], sortCriteria);
            }
            return sortedData;
        }
    
        if (winData) {
            const sortedData = sortData();
            localStorage.setItem('lastDisplayedList', JSON.stringify(sortedData));
        } else {
            sortData();
        }
    }, [sortCriteria, winData, displayData]);

    return (
        <Box sx={{ width: '100%' }}>
            {winData &&
                <ButtonGroup>
                    <Button onClick={() => setSortCriteria('winningNumbers')}>Sort by Created</Button>
                    <Button onClick={() => setSortCriteria('created')}>Sort by Winning Numbers</Button>
                    <Button onClick={() => setSortCriteria('prize')}>Sort by Prize</Button>
                </ButtonGroup>}
            <TableContainer component={Paper} mt={2} sx={{ backgroundColor: 'transparent', width: '100%' }}>
                <Table aria-label="simple table" size="large">
                    <TableBody>
                        {Array.isArray(displayData) && displayData.map((ticket, index) => (
                            <TableRow key={ticket.id}>
                                <TableCell component="th" scope="row" style={{ borderBottom: 'none' }}>
                                    {index + 1}
                                </TableCell>
                                <TableCell style={{ borderBottom: 'none' }}>
                                    {JSON.parse(ticket.numbers).join(' ')}
                                </TableCell>
                                {isAdmin &&
                                    <TableCell style={{ borderBottom: 'none' }}>
                                        <span style={{
                                            color: ticket.is_real === 0 ? 'yellow' : 'green',
                                            textShadow: ticket.is_real === 0 ? '0 0 8px yellow' : '0 0 8px green'
                                        }}>
                                            {ticket.is_real === 0 ? 'Fake' : 'Real'}
                                        </span>
                                    </TableCell>
                                }
                                {winData && (
                                    <TableCell style={{ borderBottom: 'none' }} align="right">
                                        Winning Numbers: {ticket.winningNumbersInTicket ? ticket.winningNumbersInTicket.length : 'None'}<br />
                                        Prize for the ticket: {ticket.prizeAmount}
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
};

export default ListElement;