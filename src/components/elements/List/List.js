import { useContext, useEffect, useState } from "react";
import { Box, TableContainer, Table, TableBody, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';
import { UpdateTicketListHandler } from "../../../utils/handlers/contextHandlers";
import Context from "../../context/userContext";
import { findTheWinningNumbersForTheTicket, sortData,  sortTicketsByReal} from "../../../utils/handlers/listHandlers";


const columns = [
    { id: '#', label: '#' },
    { id: 'numbers', label: 'Numbers' },
    { id: 'Real?', label: 'Real?', isForAdmin: true },
    { id: 'winningNumbers', label: 'Winning Numbers', isForWinData: true },
    { id: 'prizeAmount', label: 'Prize Amount', isForWinData: true },
];

const ListElement = () => {
    const [sortCriteria, setSortCriteria] = useState('created'); //separate state for filter input
    const [order, setOrder] = useState('asc');
    const [displayData, setDisplayData] = useState([]);    
    const { isAdmin,  userData, gameData, getTickets, allTicketsData, ticketsData, getAllTicketsData, allTicketFlag, winData, gameLoading, resetFlag, setResetFlag } = useContext(Context);

    useEffect(() => {
        if (!gameLoading && gameData) {
            if (isAdmin) {
                getAllTicketsData(null, gameData.id);
            } else if (userData) {
                UpdateTicketListHandler(userData, gameData, getTickets);
            }
        } /* this triggers the update of the ticket list. allTickets used to track
            the fake ticket creation, in its element. */
    }, [userData, gameData, allTicketFlag])


    useEffect(() => {
        let dataToSort;
    
        if (!winData) {
            localStorage.removeItem('enhancedDisplayData');
            if (isAdmin && Array.isArray(allTicketsData)) {
                console.log("here2:" , allTicketsData)
                dataToSort = sortTicketsByReal(allTicketsData);
            } else if (Array.isArray(ticketsData)) {
                dataToSort = ticketsData;
            }
        } else {
            const storedData = localStorage.getItem('lastDisplayedList');
            if (storedData) {
                dataToSort = JSON.parse(storedData);
            } else {
                dataToSort = isAdmin ? allTicketsData : ticketsData;
                if (Array.isArray(dataToSort)) {
                    dataToSort = findTheWinningNumbersForTheTicket(dataToSort, winData);
                    localStorage.setItem('lastDisplayedList', JSON.stringify(dataToSort));
                }
            }
        }
    
        if (Array.isArray(dataToSort)) {
            let sortedData = sortData(dataToSort, sortCriteria, order);
            console.log('here:',sortedData)
            if (resetFlag) {
                setDisplayData([])
            } else {
                setDisplayData(sortedData)
            }
        } else {
            setDisplayData([]); // or set to a default state
        }
    }, [sortCriteria, order, allTicketsData, ticketsData, isAdmin, winData, gameData, gameLoading]);

    const handleSort = (property) => {
        const isAsc = sortCriteria === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setSortCriteria(property);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <TableContainer  mt={1} sx={{ backgroundColor: 'transparent', width: '100%', maxHeight: '400px', overflowY: 'auto' }}>
                <Table aria-label="simple table" size="large" sx={{backgroundColor: '#0B090A'}}>
                    {winData &&
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    (!column.isForAdmin || isAdmin) && (!column.isForWinData || winData) && (
                                        <TableCell key={column.id} sx={{ padding: '5px', borderBottom: 'none' }}>
                                            <TableSortLabel
                                                active={sortCriteria === column.id}
                                                direction={sortCriteria === column.id ? order : 'asc'}
                                                onClick={() => handleSort(column.id)}
                                            >
                                                {column.label}
                                            </TableSortLabel>
                                        </TableCell>
                                    )
                                ))}
                            </TableRow>
                        </TableHead>
                    }
                    <TableBody>
                        {Array.isArray(displayData) && displayData.map((ticket, index) => (
                            <TableRow key={ticket.id}>
                                <TableCell align="center" sx={{borderBottom: 'none',}}>
                                {sortCriteria === '#' && order === 'desc' ? displayData.length - index : index + 1}
                                </TableCell>
                                <TableCell sx={{fontSize: 10, borderBottom: 'none'}}>{JSON.parse(ticket.numbers).join(' ')}</TableCell>
                                {isAdmin && (
                                    <TableCell sx={{borderBottom: 'none'}}>
                                        <span style={{
                                            color: ticket.is_real === 0 ? 'yellow' : 'green',
                                            textShadow: ticket.is_real === 0 ? '0 0 8px yellow' : '0 0 8px green'
                                        }}>
                                            {ticket.is_real === 0 ? 'Fake' : 'Real'}
                                        </span>
                                    </TableCell>
                                )}
                                {winData && (
                                    <>
                                        <TableCell align="center" sx={{borderBottom: 'none'}}>
                                            {ticket.winningNumbersInTicket ? ticket.winningNumbersInTicket.length : 'None'}
                                        </TableCell>
                                        <TableCell align="center" sx={{borderBottom: 'none'}}>
                                            {ticket.prizeAmount}
                                        </TableCell>
                                    </>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ListElement;