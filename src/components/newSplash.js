import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion'; 
import { useNavigate } from 'react-router-dom';


const TextPanel = () => (
    <Box sx={{ height: "100%" }} display="flex" justifyContent="center" flexDirection="column" >

            <div style={{ width: '100%', display: "grid", placeContent: "start" }}>
                <Typography variant="h2" align="center">
                The
                </Typography>
            </div>
            <Typography variant="h1" align="center" gutterBottom>
                lottokeeper.
            </Typography>
    </Box>
);

const ButtonComponent = ({ onClick, style }) => {
    return (
        <div
            style={{
                width: '100%',
            }}
        >
            <Button
                onClick={onClick}
                style={{
                    ...style,
                }}
                variant='outlined'
                fullWidth
            >
                S T A R T
            </Button>
        </div>
    )
};

const SplashPageTwo = () => {
    const navigate = useNavigate();
    const [animationKey, setAnimationKey] = useState("center");

    const variants = {
        offscreenRight: {
            x: 1000,
            opacity: 0,
            transition: { duration: 0.5 },
        },
        center: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.5 },
        },
        offscreenLeft: {
            x: -1000,
            opacity: 0,
            transition: { duration: 0 },
        },
    };

    const handleClick = () => {
        setAnimationKey("offscreenRight");
        setTimeout(() => {
            setAnimationKey("offscreenLeft");

            navigate('/role')

            setTimeout(() => {
                setAnimationKey("center");
            }, 70); // text comes in from the left side by default
        }, 500); // This should match the duration of the exit animation
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
        >
            <div style={{ display: "grid", placeContent: "center", height: '100vh', gap: '0.2rem', overflow: 'hidden' }}>
                <>
                    <TextPanel />
                </>
                <br />
                <motion.div
                    initial="center"
                    animate={animationKey}
                    variants={variants}
                >
                    <ButtonComponent onClick={handleClick} />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default SplashPageTwo;




















/*

            <motion.div
                initial={{
                    rotate: '0deg',
                }}
                animate={{
                    rotate: "180deg",
                }}
                transition={{
                    duration: 1,
                    ease: 'backInOut'
                }}
                style={{ width: 150, height: 150, background: 'white' }}
            >
                
                </motion.div>

*/