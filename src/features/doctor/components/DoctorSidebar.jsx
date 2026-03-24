import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', path: '/doctor/dashboard', icon: '⊞' },
  { label: 'Appointments', path: '/doctor/appointments', icon: '📅' },
  { label: 'Availability', path: '/doctor/availability', icon: '🕐' },
  { label: 'Patients', path: '/doctor/patients', icon: '👥' },
  { label: 'Earnings', path: '/doctor/earnings', icon: '₹' },
  { label: 'Onboarding', path: '/doctor/onboarding', icon: '✓' },
];

const DoctorSidebar = () => {
  return (
    <aside className="w-56 min-h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-base font-semibold text-gray-900">MediGhar</h2>
        <p className="text-xs text-gray-500 mt-0.5">Doctor Portal</p>
      </div>

      <nav className="flex-1 py-2">
        <p className="px-5 pt-3 pb-1 text-[10px] uppercase tracking-widest text-gray-400 font-medium">
          Main
        </p>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 text-sm border-l-[3px] transition-colors ${
                isActive
                  ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium'
                  : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <span className="text-base leading-none">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-medium">
            Dr
          </div>
          <div>
            <p className="text-xs font-medium text-gray-900">Doctor</p>
            <p className="text-[10px] text-gray-500">Verified</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DoctorSidebar;
