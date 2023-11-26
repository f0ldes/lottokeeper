import { Typography } from "@mui/material";
import { useContext } from "react";
import Context from "../../context/userContext";


const Balance = () => {
    const { userData } = useContext(Context);
    return (
        <Typography sx={{ border: 1, borderColor: 'secondary.main' }} >
            Your balance: <strong> {userData ? userData?.balance : 'no balance is avaiable.'} </strong>
        </Typography>
    )
};

export default Balance;