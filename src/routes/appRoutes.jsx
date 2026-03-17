import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/mainLayout';
import DashboardPage from '@/features/auth/pages/dashboardPage';
import DoctorListPage from '@/features/doctor/pages/doctorListPage';
import LoginPage from '@/features/auth/pages/loginPage';

const appRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="doctors" element={<DoctorListPage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
};

export default appRoutes;
