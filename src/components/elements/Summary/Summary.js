import { Card, CardContent, Typography, Grid, useTheme } from "@mui/material";
import { useContext } from "react";
import Context from "../../context/userContext";

const SummaryElement = () => {
    const theme = useTheme(); //the theme is not autamitcally getting applied to MUI elements.
    const { winData } = useContext(Context);

    /* access the winData (data contianing winning data), deconstruct it: */
    const { winningUserIds, prize, ticketsSold } = winData;
    const ticketPrice = 500;
    const totalRevenue = ticketsSold * ticketPrice;
    const totalPrizePayout = prize;
    const operatorProfit = totalRevenue - totalPrizePayout;

    return (
        <Card style={{ backgroundColor: theme.palette.background.default }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>Game Summary</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography>5 Hits: {winningUserIds.fiveHit.length} tickets</Typography>
                        <Typography>4 Hits: {winningUserIds.fourHit.length} tickets</Typography>
                        <Typography>3 Hits: {winningUserIds.threeHit.length} tickets</Typography>
                        <Typography>2 Hits: {winningUserIds.twoHit.length} tickets</Typography>
                        <Typography>No Hits: {winningUserIds.noHit.length} tickets</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography>Total Prize Payout: {totalPrizePayout}</Typography>
                        <Typography>Total Tickets Sold: {ticketsSold}</Typography>
                        <Typography>Total Revenue: {totalRevenue}</Typography>
                        <Typography>Operator's Profit: {operatorProfit}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default SummaryElement;