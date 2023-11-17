import React from 'react';
import {Routes, Route } from 'react-router-dom';
import SplashPage from '../components/Splash';
import UserPanel from '../components/User';

const MainRoutes = () => {
    return (
        <Routes>
            <Route path='' element={<SplashPage />}/>
            <Route path='/user' element={<UserPanel />} />
        </Routes>
    );
};

export default MainRoutes;