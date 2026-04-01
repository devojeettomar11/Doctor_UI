import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';

// ── Theme constant used across all clinic pages ──────────────────────────────
const ACCENT = '#0bc5cf';

// ── Navigation items for the sidebar ────────────────────────────────────────
const navItems = [
  { label: 'Dashboard',       path: '/clinic/dashboard',  icon: '🏠' },
  { label: 'Health Packages', path: '/clinic/packages',   icon: '📦' },
  { label: 'Lab Tests',       path: '/clinic/lab-tests',  icon: '🧪' },
  { label: 'Bookings',        path: '/clinic/bookings',   icon: '📋' },
  { label: 'Revenue',         path: '/clinic/revenue',    icon: '💰' },
];

// ── Page title map used in the top header ────────────────────────────────────
const pageTitles = {
  '/clinic/dashboard':  'Dashboard',
  '/clinic/packages':   'Health Packages',
  '/clinic/lab-tests':  'Lab Tests',
  '/clinic/bookings':   'Bookings',
  '/clinic/revenue':    'Revenue',
};

const clinicLayout = () => {
  // Desktop: collapsed = icon-only sidebar | Mobile: mobileOpen = slide-in drawer
  const [collapsed, setCollapsed]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const location  = useLocation();
  const pageTitle = pageTitles[location.pathname] || 'Clinic Admin';
  const today     = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  // Close mobile drawer whenever the route changes (user tapped a nav link)
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Hamburger toggles mobile drawer on small screens, collapses sidebar on desktop
  const handleToggle = () => {
    if (window.innerWidth < 768) {
      setMobileOpen((prev) => !prev);
    } else {
      setCollapsed((prev) => !prev);
    }
  };

  // ── Shared nav link renderer used by both desktop & mobile sidebars ────────
  const NavLinks = ({ onClose }) => (
    <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          title={item.label}
          onClick={onClose}
          className={({ isActive }) =>
            `flex items-center gap-3 mx-2 px-3 py-2.5 rounded-xl text-sm transition-all duration-150 mb-0.5 ${
              isActive
                ? 'font-semibold'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
            }`
          }
          style={({ isActive }) =>
            isActive
              ? { backgroundColor: `${ACCENT}18`, color: ACCENT }
              : {}
          }
        >
          {/* Icon always visible */}
          <span className="flex-shrink-0 text-xl leading-none">{item.icon}</span>
          {/* Label hidden when desktop sidebar is collapsed */}
          {(!collapsed || onClose) && (
            <span className="whitespace-nowrap text-sm leading-none">{item.label}</span>
          )}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ backgroundColor: '#f8fafc', fontFamily: "'Inter', system-ui, sans-serif" }}
    >

      {/* ── MOBILE BACKDROP (tapping outside closes the drawer) ────────────── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── DESKTOP SIDEBAR (hidden on mobile) ─────────────────────────────── */}
      <aside
        className="hidden md:flex flex-col flex-shrink-0 bg-white border-r border-gray-100 transition-all duration-300 ease-in-out"
        style={{
          width: collapsed ? '72px' : '240px',
          boxShadow: '2px 0 16px rgba(0,0,0,0.06)',
        }}
      >
        {/* Brand logo */}
        <div
          className="flex items-center gap-3 px-4 border-b border-gray-100 flex-shrink-0"
          style={{ height: '72px' }}
        >
          <div
            className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg"
            style={{ background: `linear-gradient(135deg, ${ACCENT}, #0891b2)` }}
          >
            M
          </div>
          {/* Brand name hidden when collapsed */}
          {!collapsed && (
            <div className="overflow-hidden">
              <div className="flex items-baseline">
                <span className="font-bold text-gray-900 text-lg leading-none">Medi</span>
                <span className="font-bold text-lg leading-none" style={{ color: ACCENT }}>Ghar</span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5 leading-none whitespace-nowrap">Clinic Admin</p>
            </div>
          )}
        </div>

        {/* Navigation links */}
        <NavLinks onClose={null} />

        {/* Admin profile strip at bottom */}
        <div className="px-3 py-4 border-t border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div
              className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ background: `linear-gradient(135deg, ${ACCENT}, #0891b2)` }}
            >
              CA
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <p className="text-sm font-semibold text-gray-800 whitespace-nowrap">Clinic Admin</p>
                <p className="text-xs text-gray-400">Administrator</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* ── MOBILE DRAWER (slides in from left on small screens) ───────────── */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 flex flex-col bg-white border-r border-gray-100
          transform transition-transform duration-300 ease-in-out md:hidden
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{ boxShadow: '4px 0 24px rgba(0,0,0,0.12)' }}
      >
        {/* Drawer header with close button */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-sm"
              style={{ background: `linear-gradient(135deg, ${ACCENT}, #0891b2)` }}
            >
              M
            </div>
            <div>
              <div className="flex items-baseline">
                <span className="font-bold text-gray-900 text-sm">Medi</span>
                <span className="font-bold text-sm" style={{ color: ACCENT }}>Ghar</span>
              </div>
              <p className="text-xs text-gray-400 leading-none">Clinic Admin</p>
            </div>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Drawer nav links (pass onClose to auto-close on tap) */}
        <NavLinks onClose={() => setMobileOpen(false)} />

        {/* Admin profile strip */}
        <div className="px-4 py-4 border-t border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${ACCENT}, #0891b2)` }}
            >
              CA
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">Clinic Admin</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT AREA ───────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top header bar */}
        <header
          className="flex-shrink-0 bg-white flex items-center justify-between px-4 sm:px-6 border-b border-gray-100"
          style={{ height: '72px', boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}
        >
          {/* Left: hamburger + page title */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleToggle}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-all flex-shrink-0"
              aria-label="Toggle sidebar"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
            {/* Page title — hidden on very small screens to save space */}
            <div className="hidden sm:block">
              <h1 className="text-base font-bold text-gray-800 leading-none">{pageTitle}</h1>
              <p className="text-xs text-gray-400 mt-0.5">{today}</p>
            </div>
          </div>

          {/* Right: notification bell */}
          <div className="flex items-center gap-2">
            <button
              className="relative w-10 h-10 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-all"
              aria-label="Notifications"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              {/* Unread notification dot */}
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
          </div>
        </header>

        {/* Scrollable page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default clinicLayout;
