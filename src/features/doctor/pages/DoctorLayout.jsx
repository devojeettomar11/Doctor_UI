import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', path: '/doctor/dashboard', icon: '🏠' },
  { label: 'Appointments', path: '/doctor/appointments', icon: '📅' },
  { label: 'Availability', path: '/doctor/availability', icon: '⏰' },
  { label: 'Patients', path: '/doctor/patients', icon: '👥' },
  { label: 'Earnings', path: '/doctor/earnings', icon: '💰' },
  { label: 'Onboarding', path: '/doctor/onboarding', icon: '✅' },
];

const DoctorLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-gray-100">

      {/* SIDEBAR */}
      <aside className={`${collapsed ? 'w-20' : 'w-64'} transition-all duration-300 bg-white/80 backdrop-blur-xl border-r shadow-sm flex flex-col`}>

        {/* LOGO */}
        <div className="h-16 flex items-center px-5 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold shadow">
              M
            </div>
            {!collapsed && (
              <span className="font-bold text-lg">
                Medi<span className="text-blue-600">Ghar</span>
              </span>
            )}
          </div>
        </div>

        {/* NAV */}
        <nav className="flex-1 px-3 py-6 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 shadow-sm'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {!collapsed && item.label}
            </NavLink>
          ))}
        </nav>

        {/* PROFILE */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold">
              Dr
            </div>
            {!collapsed && (
              <div>
                <p className="text-sm font-semibold">Dr. Profile</p>
                <p className="text-xs text-gray-500">Verified</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <header className="h-16 flex items-center justify-between px-6 bg-white/70 backdrop-blur border-b">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            ☰
          </button>

          <div className="relative">
            🔔
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-600 rounded-full"></span>
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default DoctorLayout;
