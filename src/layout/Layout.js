import React from 'react';
import {Routes, Route } from 'react-router-dom';
import SplashPage from '../components/Splash';
import UserPanel from '../components/User';
import SplashPageTwo from '../components/newSplash';

const MainRoutes = () => {
    return (
        <Routes>
            <Route path='' element={<SplashPageTwo />}/>
            <Route path='/role' element={<SplashPage />} />
            <Route path='/user' element={<UserPanel />} />
        </Routes>
    );
};

export default MainRoutes;