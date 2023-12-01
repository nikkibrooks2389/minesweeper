// components/AppRoutes.js
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import GameSettingsPage from '../pages/GameSettingsPage';
import Board from '../pages/Board';

export const AppRoutes = ({ theme }) => (
    <Routes>
        <Route path="/" element={<Navigate replace to="/settings" />} />
        <Route path="/settings" element={<GameSettingsPage />} />
        <Route path="/board" element={<Board theme={theme} />} />
    </Routes>
);