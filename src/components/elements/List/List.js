import { useState } from "react";
import { List, ListItem , ListItemText } from '@mui/material';

const ListElement = () => {
    const [listElemenets, setListElements] = useState(['first', 'second', 'third', 'fourth'])
    return (
        <List dense={true}>
            {listElemenets.map((element, index) => (
                <ListItem key={index}>
                    <ListItemText primary={element} />
                </ListItem>
            ))}
        </List>
    )
};

export default ListElement