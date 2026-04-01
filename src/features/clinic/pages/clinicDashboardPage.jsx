import React from 'react';
import { Link } from 'react-router-dom';
import { usePackages }  from '../hooks/usePackages';
import { useLabTests }  from '../hooks/useLabTests';
import { useBookings }  from '../hooks/useBookings';
import { useRevenue }   from '../hooks/useRevenue';

// ── Teal accent colour shared across all clinic pages ────────────────────────
const ACCENT   = '#0bc5cf';
const CARD_BG  = 'linear-gradient(135deg, #0bc5cf 0%, #0891b2 100%)';

// ── Mock data shown when the backend has no data yet ─────────────────────────
const mockBookings = [
  { _id: '1', user: { name: 'Rahul Sharma' }, testName: 'Full Body Checkup', status: 'pending',      date: 'Mar 19', amount: 1499 },
  { _id: '2', user: { name: 'Priya Singh'  }, testName: 'Thyroid Profile',   status: 'in_analysis',  date: 'Mar 19', amount: 449  },
  { _id: '3', user: { name: 'Amit Verma'   }, testName: 'Diabetes Panel',    status: 'report_ready', date: 'Mar 18', amount: 599  },
  { _id: '4', user: { name: 'Neha Gupta'   }, testName: 'CBC Test',          status: 'completed',    date: 'Mar 17', amount: 299  },
];

// ── Badge styles for every possible booking status ───────────────────────────
const statusCfg = {
  pending:          { label: 'Pending',         color: '#d97706', bg: '#fef9c3', border: '#fde68a' },
  assigned:         { label: 'Assigned',         color: ACCENT,    bg: `${ACCENT}12`, border: `${ACCENT}30` },
  sample_collected: { label: 'Sample Collected', color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe' },
  in_analysis:      { label: 'In Analysis',      color: '#ea580c', bg: '#fff7ed', border: '#fed7aa' },
  report_ready:     { label: 'Report Ready',     color: '#0891b2', bg: '#e0f7fa', border: '#b2ebf2' },
  completed:        { label: 'Completed',        color: '#059669', bg: '#ecfdf5', border: '#a7f3d0' },
  cancelled:        { label: 'Cancelled',        color: '#dc2626', bg: '#fef2f2', border: '#fecaca' },
};

// ── Teal gradient stat card linking to a section ─────────────────────────────
const StatCard = ({ icon, value, label, sub, to }) => (
  <Link
    to={to}
    className="rounded-2xl p-5 sm:p-6 relative overflow-hidden block hover:opacity-95 transition-opacity"
    style={{ background: CARD_BG }}
  >
    {/* Icon box */}
    <div
      className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-xl sm:text-2xl mb-3 sm:mb-4"
      style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
    >
      {icon}
    </div>

    {/* Big number */}
    <p className="text-3xl sm:text-4xl font-bold text-white mb-1">{value}</p>

    {/* Label */}
    <p className="text-xs font-bold text-white/70 uppercase tracking-widest mb-0.5">{label}</p>
    <p className="text-xs text-white/55">{sub}</p>

    {/* Decorative circles */}
    <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }} />
    <div className="absolute -bottom-10 -right-10 w-36 h-36 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }} />
  </Link>
);

const clinicDashboardPage = () => {
  // ── Fetch real data from hooks (falls back to mock if empty) ───────────────
  const { packages, loading: pkgLoading }  = usePackages();
  const { labTests,  loading: ltLoading  } = useLabTests();
  const { bookings,  loading: bkLoading  } = useBookings();
  const { summary }                        = useRevenue();

  const hasReal        = !bkLoading && bookings.length > 0;
  const displayBookings = hasReal ? bookings : mockBookings;
  const pendingCount   = displayBookings.filter((b) => b.status === 'pending').length;

  return (
    <div className="p-4 sm:p-6 lg:p-8" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ── Welcome banner ────────────────────────────────────────────────── */}
      <div
        className="rounded-2xl p-5 sm:p-6 mb-6 sm:mb-8 bg-white border border-gray-100"
        style={{ boxShadow: `0 2px 12px ${ACCENT}15` }}
      >
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Clinic Admin Dashboard 🏥</h2>
        <p className="text-gray-400 text-sm mt-1">
          Manage packages, lab tests, bookings and track revenue.
        </p>
      </div>

      {/* ── Stat cards — 1 col → 2 col → 4 col ───────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 mb-6 sm:mb-8">
        <StatCard
          icon="📦"
          value={pkgLoading ? '—' : (packages.length || 6)}
          label="Health Packages"
          sub="Active packages"
          to="/clinic/packages"
        />
        <StatCard
          icon="🧪"
          value={ltLoading ? '—' : (labTests.length || 14)}
          label="Lab Tests"
          sub="Available tests"
          to="/clinic/lab-tests"
        />
        <StatCard
          icon="📋"
          value={bkLoading ? '—' : (bookings.length || 23)}
          label="Total Bookings"
          sub={`${pendingCount} pending`}
          to="/clinic/bookings"
        />
        <StatCard
          icon="💰"
          value={`₹${(summary?.monthly || 48500).toLocaleString('en-IN')}`}
          label="Monthly Revenue"
          sub="This month"
          to="/clinic/revenue"
        />
      </div>

      {/* ── Booking workflow visual ────────────────────────────────────────── */}
      <div
        className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 mb-5 sm:mb-6"
        style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}
      >
        <div className="flex items-center justify-between mb-4 sm:mb-5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: ACCENT }} />
            <h3 className="text-sm font-bold text-gray-800">Lab Test Booking Workflow</h3>
          </div>
          <Link to="/clinic/bookings" className="text-xs font-bold hover:underline flex-shrink-0" style={{ color: ACCENT }}>
            Manage →
          </Link>
        </div>

        {/* Horizontally scrollable on very small screens */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-2 -mx-1 px-1">
          {[
            { n: 1, label: 'User Books',    icon: '👤' },
            { n: 2, label: 'Notified',      icon: '🔔' },
            { n: 3, label: 'Assign Tech',   icon: '🧑‍🔬' },
            { n: 4, label: 'Collect Sample',icon: '🧫' },
            { n: 5, label: 'Analysis',      icon: '🔬' },
            { n: 6, label: 'Upload Report', icon: '📄' },
            { n: 7, label: 'User Downloads',icon: '✅' },
          ].map((step, i) => (
            <React.Fragment key={step.n}>
              {/* Step node */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-lg sm:text-xl"
                  style={{ backgroundColor: `${ACCENT}15` }}
                >
                  {step.icon}
                </div>
                <p className="text-xs font-semibold text-gray-500 mt-1.5 text-center w-14 sm:w-16 leading-tight">
                  {step.label}
                </p>
              </div>
              {/* Arrow between steps */}
              {i < 6 && (
                <svg width="16" height="12" viewBox="0 0 20 14" fill="none" className="flex-shrink-0 mb-5">
                  <path
                    d="M1 7h16m0 0l-5-5m5 5l-5 5"
                    stroke="#d1d5db"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── Bottom two panels — stack on mobile, side by side on lg ──────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">

        {/* Recent bookings list */}
        <div
          className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
          style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}
        >
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-gray-50">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: ACCENT }} />
              <h3 className="text-sm font-bold text-gray-800">Recent Bookings</h3>
            </div>
            <Link to="/clinic/bookings" className="text-xs font-bold hover:underline" style={{ color: ACCENT }}>
              View all →
            </Link>
          </div>

          <div className="divide-y divide-gray-50">
            {displayBookings.slice(0, 4).map((booking) => {
              const cfg = statusCfg[booking.status] || statusCfg.pending;
              return (
                <div
                  key={booking._id}
                  className="flex items-center gap-3 sm:gap-4 px-5 sm:px-6 py-3.5 hover:bg-gray-50 transition-colors"
                >
                  {/* Avatar */}
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0"
                    style={{ backgroundColor: `${ACCENT}15`, color: ACCENT }}
                  >
                    {(booking.user?.name || 'U').charAt(0)}
                  </div>

                  {/* Name + test */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{booking.user?.name}</p>
                    <p className="text-xs text-gray-400 truncate">{booking.testName}</p>
                  </div>

                  {/* Status badge */}
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full border flex-shrink-0"
                    style={{ backgroundColor: cfg.bg, color: cfg.color, borderColor: cfg.border }}
                  >
                    {cfg.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick actions + today's revenue */}
        <div
          className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6"
          style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}
        >
          <div className="flex items-center gap-2 mb-4 sm:mb-5">
            <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
            <h3 className="text-sm font-bold text-gray-800">Quick Actions</h3>
          </div>

          {/* Action buttons — 2×2 grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { label: 'Create Package', icon: '📦', to: '/clinic/packages',   color: ACCENT    },
              { label: 'Add Lab Test',   icon: '🧪', to: '/clinic/lab-tests',  color: '#7c3aed' },
              { label: 'View Bookings',  icon: '📋', to: '/clinic/bookings',   color: '#d97706' },
              { label: 'Revenue Report', icon: '💰', to: '/clinic/revenue',    color: '#059669' },
            ].map((action) => (
              <Link
                key={action.label}
                to={action.to}
                className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl border font-semibold text-xs sm:text-sm transition-all hover:shadow-sm"
                style={{
                  backgroundColor: `${action.color}10`,
                  borderColor:     `${action.color}25`,
                  color:            action.color,
                }}
              >
                <span className="text-lg sm:text-xl flex-shrink-0">{action.icon}</span>
                <span className="leading-tight">{action.label}</span>
              </Link>
            ))}
          </div>

          {/* Today's revenue mini card */}
          <div
            className="rounded-xl p-4"
            style={{ background: CARD_BG }}
          >
            <p className="text-xs font-bold text-white/70 mb-1">Today's Revenue</p>
            <p className="text-2xl font-bold text-white">₹3,496</p>
            <p className="text-xs text-white/55 mt-0.5">8 bookings completed today</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default clinicDashboardPage;
