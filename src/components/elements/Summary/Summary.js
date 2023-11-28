import { Card, CardContent, Typography, Table, TableBody, TableRow, TableCell, Paper, TableContainer } from "@mui/material";
import { useContext } from "react";
import Context from "../../context/userContext";
import { calculateUserPrize } from "../../../utils/handlers/listHandlers";

const SummaryElement = () => {
    const { winData, isAdmin, userData } = useContext(Context);

    /* access the winData (data contianing winning data), deconstruct it: */
    const { winningUserIds, prize, ticketsSold, winningNumbers, previousGameId, prizes } = winData;
    const ticketPrice = 500;
    const totalRevenue = ticketsSold * ticketPrice;
    const totalPrizePayout = prize;
    const operatorProfit = totalRevenue - totalPrizePayout; 

    let userPrize;
    if (winData && userData) {
        userPrize = calculateUserPrize(userData.id, winningUserIds, prizes )
    };

    return (
        <Card style={{ backgroundColor: 'transparent' }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>Game Summary</Typography>
                <TableContainer component={Paper} style={{ width: '100%', backgroundColor: 'transparent' }}>
                    <Table size="small">
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ borderBottom: 'none' }} > {`Game No.${previousGameId} Winning Numbers:`} </TableCell>
                                <TableCell align="right" style={{ borderBottom: 'none' }}>{winningNumbers.join('  ')}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ borderBottom: 'none' }} > Five Hit Tickets: </TableCell>
                                <TableCell align="right" style={{ borderBottom: 'none' }}>{winningUserIds.fiveHit.length}  /  Payout: {prizes.fiveHit.toFixed(2)} /</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ borderBottom: 'none' }}> Four Hit Tickets: </TableCell>
                                <TableCell align="right" style={{ borderBottom: 'none' }}>{winningUserIds.fourHit.length} / Payout: {prizes.fourHit.toFixed(2)} /</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ borderBottom: 'none' }}> Three Hit Tickets: </TableCell>
                                <TableCell align="right" style={{ borderBottom: 'none' }}>{winningUserIds.threeHit.length} / Payout: {prizes.threeHit.toFixed(2)} /</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ borderBottom: 'none' }}> Two Hit Tickets:</TableCell>
                                <TableCell align="right" style={{ borderBottom: 'none' }}>{winningUserIds.twoHit.length} / Payout: {prizes.twoHit.toFixed(2)} /</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ borderBottom: 'none' }}> Zero Hit Tickets:</TableCell>
                                <TableCell align="right" style={{ borderBottom: 'none' }}>{winningUserIds.noHit.length}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell component="th" scope="row" style={{ borderBottom: 'none' }}>Total Prize Payout: </TableCell>
                                <TableCell align="right" style={{ borderBottom: 'none' }}> {totalPrizePayout.toFixed(2)} </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row" style={{ borderBottom: 'none' }}>Total Tickets Sold: </TableCell>
                                <TableCell align="right" style={{ borderBottom: 'none' }}>{ticketsSold}</TableCell>
                            </TableRow>
                            {isAdmin &&
                                <>
                                    <TableRow>
                                        <TableCell component="th" scope="row" style={{ borderBottom: 'none' }}>Total Revenue: </TableCell>
                                        <TableCell align="right" style={{ borderBottom: 'none' }}>{totalRevenue}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row" style={{ borderBottom: 'none' }}> <strong> Operator's total Profit: </strong></TableCell>
                                        <TableCell align="right" style={{ borderBottom: 'none' }}> <strong> {operatorProfit.toFixed(2)} </strong>  </TableCell>
                                    </TableRow>
                                </>
                            }
                            {!isAdmin &&
                                <>
                                    <TableRow>
                                        <TableCell component="th" scope="row" style={{ borderBottom: 'none' }}> <strong> Total win amount: </strong> </TableCell>
                                        <TableCell align="right" style={{ borderBottom: 'none' }}><strong> {userPrize} </strong></TableCell>
                                    </TableRow>
                                </>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
};

export default SummaryElement;