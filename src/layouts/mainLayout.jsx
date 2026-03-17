import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const mainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-blue-600">MediGhar</Link>
        <nav className="flex gap-6">
          <Link to="/doctors" className="hover:text-blue-600">Doctors</Link>
          <Link to="/appointments" className="hover:text-blue-600">Appointments</Link>
          <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded-md">Login</Link>
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
