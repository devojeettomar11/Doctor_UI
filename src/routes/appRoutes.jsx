import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Main Layout
import MainLayout from '@/layouts/mainLayout';

// Auth Pages
import DashboardPage from '@/features/auth/pages/dashboardPage';
import LoginPage from '@/features/auth/pages/loginPage';

// Doctor List
import DoctorListPage from '@/features/doctor/pages/doctorListPage';

// Doctor Feature Pages
import DoctorLayout from '@/features/doctor/pages/doctorLayout';
import DoctorDashboardPage from '@/features/doctor/pages/doctorDashboardPage';
import AppointmentsPage from '@/features/doctor/pages/appointmentsPage';
import AvailabilityPage from '@/features/doctor/pages/availabilityPage';
import EarningsPage from '@/features/doctor/pages/earningsPage';
import PatientsPage from '@/features/doctor/pages/patientsPage';
import OnboardingPage from '@/features/doctor/pages/onboardingPage';

const AppRoutes = () => {
  return (
    <Routes>

      {/* 🌐 Main Website Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="doctors" element={<DoctorListPage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>

      {/* 🏥 Doctor Portal Routes */}
      <Route path="/doctor" element={<DoctorLayout />}>

        {/* 🔥 DEFAULT → Redirect to dashboard */}
        <Route index element={<Navigate to="dashboard" replace />} />

        <Route path="dashboard" element={<DoctorDashboardPage />} />
        <Route path="appointments" element={<AppointmentsPage />} />
        <Route path="availability" element={<AvailabilityPage />} />
        <Route path="earnings" element={<EarningsPage />} />
        <Route path="patients" element={<PatientsPage />} />
        <Route path="onboarding" element={<OnboardingPage />} />

      </Route>

      {/* ❌ Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
};

export default AppRoutes;