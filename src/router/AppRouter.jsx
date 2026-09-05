import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import StartPage from '../pages/StartPage';
import GamePage from '../pages/GamePage';
import ResultsPage from '../pages/ResultsPage';
import SessionsPage from '../pages/SessionsPage';
import PrivacyPage from '../pages/PrivacyPage';
import NotFoundPage from '../pages/NotFoundPage';
import Navigation from '../components/common/Navigation';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/start" element={<StartPage />} />
                <Route path="/game/:sessionId" element={<GamePage />} />
                <Route path="/results/:sessionId" element={<ResultsPage />} />
                <Route path="/sessions" element={<SessionsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/404" element={<NotFoundPage />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;