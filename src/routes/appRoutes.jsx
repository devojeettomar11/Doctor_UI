import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Doctor Layout + Pages
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

      {/* 🔥 MAIN CHANGE */}
      <Route path="/" element={<Navigate to="/doctor" replace />} />

      {/* Doctor Portal */}
      <Route path="/doctor" element={<DoctorLayout />}>

        {/* default */}
        <Route index element={<Navigate to="dashboard" replace />} />

        <Route path="dashboard" element={<DoctorDashboardPage />} />
        <Route path="appointments" element={<AppointmentsPage />} />
        <Route path="availability" element={<AvailabilityPage />} />
        <Route path="earnings" element={<EarningsPage />} />
        <Route path="patients" element={<PatientsPage />} />
        <Route path="onboarding" element={<OnboardingPage />} />
      </Route>

    </Routes>
  );
};

export default AppRoutes;