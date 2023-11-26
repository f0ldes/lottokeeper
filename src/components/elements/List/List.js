import { useContext } from "react";
import { List, ListItem , ListItemText } from '@mui/material';
import Context from "../../context/userContext";

const listStyle = {
    maxHeight: '200px',
    overflow: 'auto'
};

const ListElement = () => {
    const { ticketsData } = useContext(Context);
    console.log(ticketsData);
    return (
        <List dense={true} style={listStyle}>
            {ticketsData && ticketsData.map(ticket => (
                <ListItem key={ticket.id}>
                    <ListItemText primary={ticket.numbers} />
                </ListItem>
            ))}
        </List>
    )
};

export default ListElement