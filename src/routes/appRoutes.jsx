import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/mainLayout';
import DashboardPage from '@/features/auth/pages/dashboardPage';
import DoctorListPage from '@/features/doctor/pages/doctorListPage';
import LoginPage from '@/features/auth/pages/loginPage';

// Doctor feature
import DoctorLayout from '@/features/doctor/pages/doctorLayout';
import DoctorDashboardPage from '@/features/doctor/pages/doctorDashboardPage';
import AppointmentsPage from '@/features/doctor/pages/appointmentsPage';
import AvailabilityPage from '@/features/doctor/pages/availabilityPage';
import EarningsPage from '@/features/doctor/pages/earningsPage';
import PatientsPage from '@/features/doctor/pages/patientsPage';
import OnboardingPage from '@/features/doctor/pages/onboardingPage';

// Clinic feature
import ClinicLayout from '@/features/clinic/pages/clinicLayout';
import ClinicDashboardPage from '@/features/clinic/pages/clinicDashboardPage';
import PackagesPage from '@/features/clinic/pages/packagesPage';
import LabTestsPage from '@/features/clinic/pages/labTestsPage';
import BookingsPage from '@/features/clinic/pages/bookingsPage';
import RevenuePage from '@/features/clinic/pages/revenuePage';

const appRoutes = () => {
  return (
    <Routes>
      {/* Main layout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="doctors" element={<DoctorListPage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>

      {/* Doctor Portal */}
      <Route path="/doctor" element={<DoctorLayout />}>
        <Route path="dashboard" element={<DoctorDashboardPage />} />
        <Route path="appointments" element={<AppointmentsPage />} />
        <Route path="availability" element={<AvailabilityPage />} />
        <Route path="earnings" element={<EarningsPage />} />
        <Route path="patients" element={<PatientsPage />} />
        <Route path="onboarding" element={<OnboardingPage />} />
      </Route>

      {/* Clinic Admin Portal */}
      <Route path="/clinic" element={<ClinicLayout />}>
        <Route path="dashboard" element={<ClinicDashboardPage />} />
        <Route path="packages" element={<PackagesPage />} />
        <Route path="lab-tests" element={<LabTestsPage />} />
        <Route path="bookings" element={<BookingsPage />} />
        <Route path="revenue" element={<RevenuePage />} />
      </Route>
    </Routes>
  );
};

export default appRoutes;
