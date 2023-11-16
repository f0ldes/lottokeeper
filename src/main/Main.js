import React from 'react';
import {Routes, Route } from 'react-router-dom';
import SplashPage from '../components/Splash';
import PlayerPanel from '../components/Player';

const MainRoutes = () => {
    return (
        <Routes>
            <Route path='' element={<SplashPage />}/>
            <Route path='/player' element={<PlayerPanel />} />
        </Routes>
    );
};

export default MainRoutes;