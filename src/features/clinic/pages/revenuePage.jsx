import React from 'react';
import { useRevenue } from '../hooks/useRevenue';

// ── Teal accent consistent across all clinic pages ───────────────────────────
const ACCENT   = '#0bc5cf';
const CARD_BG  = 'linear-gradient(135deg, #0bc5cf 0%, #0891b2 100%)';

// ── Mock transactions used when no backend data is available ─────────────────
const mockTransactions = [
  { _id: '1', user: { name: 'Rahul Sharma' }, test: 'Full Body Checkup',   date: 'Mar 19, 2026', amount: 1499, type: 'package' },
  { _id: '2', user: { name: 'Priya Singh'  }, test: 'Thyroid Profile',     date: 'Mar 19, 2026', amount: 449,  type: 'package' },
  { _id: '3', user: { name: 'Amit Verma'   }, test: 'Diabetes Panel',      date: 'Mar 18, 2026', amount: 599,  type: 'package' },
  { _id: '4', user: { name: 'Neha Gupta'   }, test: 'CBC Test',            date: 'Mar 18, 2026', amount: 299,  type: 'test'    },
  { _id: '5', user: { name: 'Sanjay Patel' }, test: 'Lipid Profile',       date: 'Mar 17, 2026', amount: 349,  type: 'test'    },
  { _id: '6', user: { name: 'Anjali Mehta' }, test: 'Vitamin D',           date: 'Mar 16, 2026', amount: 499,  type: 'test'    },
  { _id: '7', user: { name: 'Vikram Nair'  }, test: 'Kidney Function',     date: 'Mar 15, 2026', amount: 399,  type: 'test'    },
  { _id: '8', user: { name: 'Sunita Das'   }, test: 'Heart Health Package',date: 'Mar 14, 2026', amount: 1999, type: 'package' },
];

// ── Avatar colours cycling through for transaction rows ──────────────────────
const avatarColors = [
  `${ACCENT}15`, '#f5f3ff', '#ecfdf5', '#fef9c3',
  '#fdf4ff',     '#e0f7fa', '#f0fdf4', '#fff7ed',
];
const avatarText = [
  ACCENT,    '#7c3aed', '#059669', '#d97706',
  '#db2777', '#0891b2', '#16a34a', '#ea580c',
];

const periods = ['daily', 'weekly', 'monthly'];

// ── Teal gradient stat card ──────────────────────────────────────────────────
const StatCard = ({ icon, value, label, sub }) => (
  <div className="rounded-2xl p-4 sm:p-5 relative overflow-hidden" style={{ background: CARD_BG }}>
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3"
      style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
    >
      {icon}
    </div>
    <p className="text-xl sm:text-2xl font-bold text-white mb-0.5">{value}</p>
    <p className="text-xs font-bold text-white/70 uppercase tracking-widest">{label}</p>
    <p className="text-xs text-white/50 mt-0.5">{sub}</p>
    <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }} />
  </div>
);

const revenuePage = () => {
  const { transactions, summary, loading, period, setPeriod } = useRevenue();

  // Use real data when available, otherwise show mock
  const hasReal = !loading && transactions.length > 0;
  const display = hasReal ? transactions : mockTransactions;

  // Derived totals for breakdown widget
  const total          = display.reduce((s, t) => s + (t.amount || 0), 0);
  const packageRevenue = display.filter((t) => t.type === 'package').reduce((s, t) => s + t.amount, 0);
  const testRevenue    = display.filter((t) => t.type === 'test').reduce((s, t) => s + t.amount, 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ── Page header ───────────────────────────────────────────────────── */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Revenue</h2>
        <p className="text-gray-400 mt-1 text-sm">Track clinic earnings from packages and lab tests</p>
      </div>

      {/* ── Stat cards — 2 col on mobile, 4 col on xl ─────────────────────── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 mb-5 sm:mb-6">
        <StatCard icon="📅" value={`₹${(summary?.daily   || 3496).toLocaleString('en-IN')}`}   label="Daily Revenue"   sub="Today"       />
        <StatCard icon="📆" value={`₹${(summary?.weekly  || 22490).toLocaleString('en-IN')}`}  label="Weekly Revenue"  sub="This week"   />
        <StatCard icon="💰" value={`₹${(summary?.monthly || 48500).toLocaleString('en-IN')}`}  label="Monthly Revenue" sub="This month"  />
        <StatCard icon="🏦" value={`₹${(summary?.total   || 284000).toLocaleString('en-IN')}`} label="Total Revenue"   sub="All time"    />
      </div>

      {/* ── Revenue breakdown + quick stats — stack on mobile ─────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 mb-5 sm:mb-6">

        {/* Breakdown bar chart (packages vs tests) */}
        <div
          className="bg-white border border-gray-200 rounded-2xl p-5"
          style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
        >
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Revenue Breakdown</p>
          <div className="space-y-4">
            {/* Packages */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span style={{ color: ACCENT }}>📦 Packages</span>
                <span className="text-gray-700">₹{packageRevenue.toLocaleString('en-IN')}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: `${total > 0 ? (packageRevenue / total) * 100 : 0}%`,
                    backgroundColor: ACCENT,
                  }}
                />
              </div>
            </div>
            {/* Lab Tests */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-blue-600">🧪 Lab Tests</span>
                <span className="text-gray-700">₹{testRevenue.toLocaleString('en-IN')}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all"
                  style={{ width: `${total > 0 ? (testRevenue / total) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
          {/* Grand total */}
          <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between">
            <p className="text-xs font-bold text-gray-400">Total ({display.length} transactions)</p>
            <p className="text-sm font-bold text-gray-800">₹{total.toLocaleString('en-IN')}</p>
          </div>
        </div>

        {/* Quick stats: average, package bookings, test bookings */}
        <div
          className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-5"
          style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
        >
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Quick Stats</p>
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {[
              { label: 'Avg per Booking',  value: `₹${Math.round(total / (display.length || 1)).toLocaleString('en-IN')}`, color: ACCENT    },
              { label: 'Package Bookings', value: display.filter((t) => t.type === 'package').length,                       color: '#7c3aed' },
              { label: 'Test Bookings',    value: display.filter((t) => t.type === 'test').length,                          color: '#0891b2' },
            ].map((s) => (
              <div key={s.label} className="bg-gray-50 rounded-xl p-3 sm:p-4 border border-gray-100 text-center">
                <p className="text-xl sm:text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
                <p className="text-xs text-gray-400 mt-1 font-medium leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Transaction history table ──────────────────────────────────────── */}
      <div
        className="bg-white border border-gray-200 rounded-2xl overflow-hidden"
        style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
      >
        {/* Table header row */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: ACCENT }} />
            <h3 className="text-sm font-bold text-gray-800">Transaction History</h3>
          </div>
          {/* Period selector */}
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
            {periods.map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 sm:px-4 py-1.5 text-xs font-bold rounded-lg capitalize transition-all ${
                  period === p ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable table wrapper to avoid overflow on small screens */}
        <div className="overflow-x-auto">
          {/* Column headers */}
          <div
            className="grid px-5 sm:px-6 py-3 bg-gray-50 border-b border-gray-100 min-w-[480px]"
            style={{ gridTemplateColumns: '2fr 1.5fr 1fr 70px 90px' }}
          >
            {['Patient', 'Test / Package', 'Date', 'Type', 'Amount'].map((h) => (
              <p key={h} className="text-xs font-bold text-gray-400 uppercase tracking-wider">{h}</p>
            ))}
          </div>

          {loading ? (
            <div className="p-6 space-y-3 min-w-[480px]">
              {[1,2,3,4].map((n) => (
                <div key={n} className="h-14 bg-gray-100 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              <div className="divide-y divide-gray-50 min-w-[480px]">
                {display.map((tx, i) => (
                  <div
                    key={tx._id || i}
                    className="grid items-center px-5 sm:px-6 py-4 hover:bg-gray-50 transition-colors"
                    style={{ gridTemplateColumns: '2fr 1.5fr 1fr 70px 90px' }}
                  >
                    {/* Patient avatar + name */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0"
                        style={{ backgroundColor: avatarColors[i % avatarColors.length], color: avatarText[i % avatarText.length] }}
                      >
                        {(tx.user?.name || 'U').charAt(0)}
                      </div>
                      <p className="text-sm font-semibold text-gray-800 truncate">{tx.user?.name}</p>
                    </div>

                    {/* Test or package name */}
                    <p className="text-sm text-gray-500 truncate">{tx.test}</p>

                    {/* Transaction date */}
                    <p className="text-xs text-gray-400 font-medium">{tx.date}</p>

                    {/* Type badge: Pkg or Test */}
                    <span
                      className="text-xs font-bold px-2 py-1 rounded-full w-fit border"
                      style={
                        tx.type === 'package'
                          ? { backgroundColor: `${ACCENT}12`, color: ACCENT, borderColor: `${ACCENT}30` }
                          : { backgroundColor: '#eff6ff', color: '#2563eb', borderColor: '#bfdbfe' }
                      }
                    >
                      {tx.type === 'package' ? 'Pkg' : 'Test'}
                    </span>

                    {/* Amount */}
                    <p
                      className="text-sm font-bold"
                      style={{ color: ACCENT }}
                    >
                      ₹{(tx.amount || 0).toLocaleString('en-IN')}
                    </p>
                  </div>
                ))}
              </div>

              {/* Footer total row */}
              <div className="flex items-center justify-between px-5 sm:px-6 py-4 bg-gray-50 border-t border-gray-100 min-w-[480px]">
                <p className="text-sm font-bold text-gray-400">
                  Total ({display.length} transactions)
                </p>
                <p className="text-base font-bold" style={{ color: ACCENT }}>
                  ₹{total.toLocaleString('en-IN')}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default revenuePage;
