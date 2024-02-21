import { useContext, useState } from "react";
import { Typography, Box, Button, TextField, Grid } from "@mui/material";
import Context from "../../context/userContext";

const UserName = () => {
    const { isAdmin, userData, updateUsername } = useContext(Context);
    const [username, setUsername] = useState('');

    //edit button states:
    const [isHovering, setIsHovering] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(userData?.name || '');

    const handleMouseEnter = () => {
        if (!isAdmin && userData?.name && userData?.name !== 'unkown') {
            setIsHovering(true);
        }
    };

    const handleMouseLeave = () => {
        //console.log('ishoverinhg', isHovering)
        //console.log('isEditing:' , isEditing)
        setIsHovering(false);
    };

    const handleEditClick = (event) => {
        event.stopPropagation();
        console.log('this is the edit name:', editName)
        updateUsername(editName)
        setIsEditing(false);
    };
    console.log(editName)

    const handleBlur = () => {
        setTimeout(() => {
            setIsEditing(false);
            setIsHovering(false);
        }, 100);
    }


    //reigstration handlers:
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const registerNewName = () => {
        updateUsername(username);
    };

    /* Conditionally render the username / welcome message for admin: */
    if (isAdmin) {
        return (
            <Box sx={{ width: '100%', textAlign: 'left', padding: 2 }}>
                <Typography varian="h5"> Welcome,  Operator! </Typography>
            </Box>
        );
    };

    /* The default name of all non admin type users is 'unknown' */
    if (!isAdmin && userData?.name && userData?.name !== 'unknown') {
        return (
            <Box sx={{ borderColor: 'default', padding: 2 }} flexDirection="column" display='flex' justifyContent='center' alignItems='flex-start'>
                <Grid container alignItems="center" display="flex" justifyContent="space-between" flex="row" >
                    <Grid item onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <Typography component="div" variant="body1" onClick={() => setIsEditing(true)} sx={{margin: 1}} >
                            Hey, {
                                isEditing ? (
                                    <TextField
                                        //defaultValue={userData.name}
                                        value={editName}
                                        variant="standard"
                                        onChange={(e) => setEditName(e.target.value)}
                                        onBlur={handleBlur}
                                        autoFocus
                                        InputProps={{ // Use Material-UI's InputProps to apply styles directly to the input element
                                            disableUnderline: true, // Remove the underline to reduce space usage
                                            style: {
                                                height: '22px', // Adjust based on your specific needs
                                                fontSize: 'inherit', // Match font size of surrounding text
                                                lineHeight: 'normal', // Adjust line height as needed
                                                padding: '0px', // Minimize padding to prevent height increase
                                                margin: '0px', // Adjust margin as necessary
                                                boxSizing: 'border-box', // Include padding and borders in the height calculation
                                                paddingBottom: 1
                                            },
                                        }}
                                        style={{
                                            verticalAlign: 'middle',
                                            margin: 0,
                                            padding: 0,
                                        }}
                                    />
                                ) : (
                                    <>
                                        {userData.name}
                                    </>
                                )
                            }
                        </Typography>
                    </Grid>
                    <Grid item>
                        {(isHovering || isEditing) && (
                            <Button onClick={(e) => handleEditClick(e)} variant="text" size="small"> Edit </Button>
                        )}
                    </Grid>
                </Grid>
            </Box>
        );
    };

    return (
        <Box sx={{ borderColor: 'default', padding: 2 }} flexDirection="column" display='flex' justifyContent='space-between' alignItems='center'>
            <Box sx={{ width: '100%', textAlign: 'left' }}>
                <Typography varian="h6"> Hi there! </Typography>
            </Box>

            <Grid container display="flex" justifyContent="space-between" flex="row" spacing={2} >
                <Grid item sx={{ width: '100%' }} xs={7}>
                    <TextField
                        variant='standard'
                        label=""
                        placeholder="Enter your new username here."
                        value={username}
                        onChange={handleUsernameChange}
                        sx={{ width: '100%' }}
                    />
                </Grid>
                <Grid item xs={2.5}>
                    <Button fullWidth onClick={registerNewName} variant="text"> Save </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default UserName;
