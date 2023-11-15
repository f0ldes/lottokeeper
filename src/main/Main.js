import React from 'react';
import {Routes, Route } from 'react-router-dom';
import SplashPage from '../components/splash/Splash';

const MainRoutes = () => {
    return (
        <Routes>
            <Route path='' element={<SplashPage />}/>
        </Routes>
    );
};

export default MainRoutes;