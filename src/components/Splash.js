import { useEffect, useState } from "react"; 
import { Box, Button, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { motion } from "framer-motion"; 
import { getGamaData } from "../utils/fetch/fetchGame";
import { formatDate } from "../utils/fetch/dateFormatter";
import Context from "./context/userContext";
import NotesElement from "./elements/Notes/Notes";
import useRequest from "../utils/hook/useRequest";


const TextPanel = () => {
    const { executeRequest:getCurrentGame, data:gameData } = useRequest(getGamaData);

    useEffect(() => {
        getCurrentGame()
    }, [])

    return (
        <Box sx={{ width: '100%', padding: 2 }} display="flex" justifyContent="center" flexDirection="column">
            <Box display="flex" justifyContent="space-between">
                <div>
                    <Typography variant="h5">
                        current game:
                    </Typography>
                </div>
                <div style={{ display: 'grid', placeContent: 'center', flexDirection: 'column' }}>
                    <Typography variant='body2'>
                        game id: {gameData?.id}
                    </Typography>
                    <Typography variant='body2'>
                        created at: {formatDate(gameData?.createdAt)}
                    </Typography>
                </div>
            </Box>
        </Box>
    )
};

const ButtonPanel = ({setModalOpen}) => {
    const { setIsAdmin } = useContext(Context);
    const navigate = useNavigate();


    const handleAdminRole = () => {
        setModalOpen(true)
        //setIsAdmin(true);
        //navigate('/user');
   };

    const handleUserRole = () => {
        setIsAdmin(false);
        navigate('/user');
    };


    return (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{padding: 1, width: '100%'}}>
            <Grid container justify="center" alignItems="center" flexDirection="column" sx={{width: '100%'}}>
                <Grid item sx={{width: '100%', padding: 1}} display="flex" alignItems="center" justifyContent="center" >
                    <Button onClick={handleUserRole} variant="contained" sx={{width: '100%'}} > Play game </Button>
                </Grid>
                <Grid item sx={{width: '100%', padding: 1}} >
                    <Button onClick={handleAdminRole} variant="outlined" sx={{width: '100%'}}> I'm the Operator </Button>
                </Grid>
            </Grid>
        </Box>
    )
};

const SplashPageCopy = () => {
    return (
        <Box display="flex" justifyContent="center" justifyItems="center" alignItems="center" minHeight="100%" flexDirection="column" >
            <Box display="flex" justifyContent="center" sx={{marginY: '15%', height: '100%', width: '100%'}} >
                <Grid container display="flex" justifyItems="center" flexDirection='column' sx={{ width: '40%', padding: 1, height: '100%' }} >
                    <Grid item sx={{ paddingBottom: 3 }} >
                        <TextPanel />
                    </Grid>
                    <Grid item >
                        <ButtonPanel />
                    </Grid>
                    <Grid item >
                        <NotesElement />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

const NewModal = ({ setModalOpen, setIsAdmin, navigate }) => {

    const handleYes = () => {
        setIsAdmin(true)
        navigate('/user')
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <Box sx={{ width: '500px', height: '120vh' }} display="flex" justifyContent="center" flexDirection="column" alignItems="center" >
                <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center" sx={{margin: 5, width: '100%'}}>
                    <Typography variant='h4'>
                        Are you really a operator? 🤔
                    </Typography>
                </Box>
                <Grid container sx={{ width: '100%', padding: 1 }} justifyContent="center" spacing={2}> 
                    <Grid item xs>
                        <Button onClick={() => handleYes()} sx={{ width: '100%' }} variant="outlined"> Yes I am </Button>
                    </Grid>
                    <Grid item xs>
                        <Button onClick={() => setModalOpen(false)} sx={{ width: '100%' }} variant="contained"> Actually I'm not </Button> 
                    </Grid>
                </Grid>
            </Box>
        </motion.div>
    )
};

const SplashPage = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const { setIsAdmin } = useContext(Context);
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
        
        >
            <Box sx={{ height: '100vh', width: '100%' }} display="flex" justifyContent="center" flexDirection="column" alignItems="center">
                <Box sx={{ width: '500px', marginTop: '160px' }} >
                    {!modalOpen && (
                        <>
                            <Box sx={{ width: '100%', marginBottom: '20px' }} >
                                <TextPanel />
                            </Box>
                            <motion.div
                                initial={{ x: -1000, opacity: 0, transition: { duration: 0 } }}
                                animate={{ x: 0, opacity: 1, transition: { duration: 0.5 } }}

                            >
                                <Box sx={{ width: '100%' }} >
                                    <ButtonPanel setModalOpen={setModalOpen} />
                                </Box>
                            </motion.div>
                        </>
                    )}
                    {modalOpen && (
                        <>
                            <NewModal 
                                setModalOpen={setModalOpen} 
                                setIsAdmin={setIsAdmin} 
                                navigate={navigate}
                            />
                        </>
                    )}
                </Box>
            </Box>
        </motion.div>
    )
};

export default SplashPage;