import { useContext, useEffect, useState } from "react";
import { List, ListItem , Box, Typography, Grid, Button, ButtonGroup } from '@mui/material';
import { UpdateTicketListHandler } from "../../../utils/handlers/contextHandlers";
import Context from "../../context/userContext";
import { findTheWinningNumbersForTheTicket, sortTicketsByReal, sortTicketsByInput } from "../../../utils/handlers/listHandlers";

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



    return (
        <Box>
            {winData &&
                <ButtonGroup>
                    <Button onClick={() => setSortCriteria('created')}>Sort by Created</Button>
                    <Button onClick={() => setSortCriteria('winningNumbers')}>Sort by Winning Numbers</Button>
                    <Button onClick={() => setSortCriteria('prize')}>Sort by Prize</Button>
                </ButtonGroup>}
            <Typography sx={{ padding: 1 }}>Tickets List:</Typography>
            <List dense={true}>
                {Array.isArray(displayData) && displayData.map((ticket, index) => (
                    <ListItem key={ticket.id}>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Grid item>
                                <Typography>{index + 1}. {JSON.parse(ticket.numbers).join(' ')}</Typography>
                            </Grid>
                            {winData && (
                                <Grid item>
                                    <Typography>Winning Numbers: {ticket.winningNumbersInTicket ? ticket.winningNumbersInTicket.join(', ') : 0 } Prize for the ticket: {ticket.prizeAmount}</Typography>
                                </Grid>
                            )}
                        </Grid>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
};

export default ListElement;