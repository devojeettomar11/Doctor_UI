import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';

const DashboardPage = () => {
  const { user } = useAuthStore();

  if (user?.role === 'store_admin') {
    return <Navigate to="/store" replace />;
  }

  return (
    <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
      <h1 className="text-3xl font-bold mb-4 text-slate-900">User Dashboard</h1>
      <p className="text-slate-600 mb-8">Welcome back, <span className="font-bold text-teal-600">{user?.name}</span>. This is your personal healthcare portal.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-2">Upcoming Appointments</h3>
          <p className="text-sm text-slate-500 italic">No appointments scheduled.</p>
        </div>
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-2">Recent Prescriptions</h3>
          <p className="text-sm text-slate-500 italic">No prescriptions found.</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
