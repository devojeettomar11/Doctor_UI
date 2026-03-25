import React, { useState, useEffect } from 'react';
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setCollapsed(false);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Close mobile drawer on route change
  const handleNavClick = () => {
    if (isMobile) setMobileOpen(false);
  };

  const SidebarContent = () => (
    <>
      {/* LOGO */}
      <div className="h-16 flex items-center justify-between px-5 border-b border-slate-200 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold shadow text-sm">
            M
          </div>
          {(!collapsed || isMobile) && (
            <span className="font-bold text-lg">
              Medi<span className="text-blue-600">Ghar</span>
            </span>
          )}
        </div>
        {isMobile && (
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* NAV */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={handleNavClick}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-blue-50 text-blue-600 shadow-sm'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            <span className="text-lg flex-shrink-0">{item.icon}</span>
            {(!collapsed || isMobile) && (
              <span className="truncate">{item.label}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* PROFILE */}
      <div className="p-4 border-t border-slate-200 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold flex-shrink-0 text-sm">
            Dr
          </div>
          {(!collapsed || isMobile) && (
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">Dr. Profile</p>
              <p className="text-xs text-gray-500">Verified</p>
            </div>
          )}
        </div>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-gray-100 overflow-hidden">

      {/* MOBILE OVERLAY */}
      {isMobile && mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* DESKTOP SIDEBAR */}
      {!isMobile && (
        <aside
          className={`${collapsed ? 'w-20' : 'w-64'} transition-all duration-300 bg-white/80 backdrop-blur-xl border-r border-slate-200 shadow-sm flex flex-col flex-shrink-0 h-full`}
        >
          <SidebarContent />
        </aside>
      )}

      {/* MOBILE DRAWER */}
      {isMobile && (
        <aside
          className={`fixed top-0 left-0 h-full w-72 bg-white z-40 flex flex-col shadow-2xl transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <SidebarContent />
        </aside>
      )}

      {/* MAIN */}
      <div className="flex-1 flex flex-col min-w-0 h-full">

        {/* HEADER */}
        <header className="h-14 md:h-16 flex items-center justify-between px-4 md:px-6 bg-white/70 backdrop-blur border-b border-slate-200 flex-shrink-0">
          <button
            onClick={() => isMobile ? setMobileOpen(true) : setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 text-slate-600"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex items-center gap-3">
            <div className="relative cursor-pointer p-2 rounded-lg hover:bg-gray-100">
              <span className="text-lg">🔔</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full"></span>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DoctorLayout;
