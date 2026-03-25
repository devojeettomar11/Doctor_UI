import React from 'react';
import { Outlet, Link } from 'react-router-dom';

import { useAuth } from '@/features/auth/hooks/useAuth';
import useAuthStore from '@/features/auth/store/authStore';

const mainLayout = () => {
  const { isAuthenticated, user } = useAuthStore();
  const { logout } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/images/logo.jpg" alt="Logo" className="h-8 w-auto rounded-lg shadow-sm" />
          <span className="text-lg font-bold text-teal-600">MediGhar</span>
        </Link>
        <nav className="flex gap-6 items-center">
          <Link to="/doctors" className="hover:text-teal-600 font-medium">Doctors</Link>
          <Link to="/appointments" className="hover:text-teal-600 font-medium">Appointments</Link>
          
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600">Hello, <span className="font-bold text-slate-900">{user?.name || 'User'}</span></span>
              <button 
                onClick={logout}
                className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="px-5 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all shadow-md font-medium">
              Sign In
            </Link>
          )}
        </nav>
      </header>

      <main className="flex-1 p-6">
        <Outlet />
      </main>

      <footer className="bg-gray-100 border-t p-6 text-center text-gray-500">
        &copy; {new Date().getFullYear()} MediGhar. All rights reserved.
      </footer>
    </div>
  );
};

export default mainLayout;
