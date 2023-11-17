import { Typography } from "@mui/material";
import { useState } from "react";


const Balance = () => {
    const [balance, setBalance] = useState('6000 Ache')
    return (
        <Typography>
            This is the balance: {balance}
        </Typography>
    )
};

export default Balance;