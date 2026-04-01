import React, { useState, useRef } from 'react';
import { useBookings }   from '../hooks/useBookings';
import { BOOKING_STEPS } from '../types';

// ── Teal accent consistent with the rest of the clinic UI ────────────────────
const ACCENT = '#0bc5cf';

// ── Mock bookings shown when no backend data is available ────────────────────
const mockBookings = [
  { _id: '1', user: { name: 'Rahul Sharma', phone: '9876543210' }, testName: 'Full Body Checkup', status: 'pending',          date: 'Mar 19, 2026', amount: 1499, address: 'Sector 15, Noida'          },
  { _id: '2', user: { name: 'Priya Singh',  phone: '9123456780' }, testName: 'Thyroid Profile',   status: 'assigned',         date: 'Mar 19, 2026', amount: 449,  address: 'Indirapuram, Ghaziabad', technician: 'Rajesh Kumar'   },
  { _id: '3', user: { name: 'Amit Verma',   phone: '9988776655' }, testName: 'Diabetes Panel',    status: 'sample_collected', date: 'Mar 18, 2026', amount: 599,  address: 'Vasundhara, Ghaziabad', technician: 'Suresh Yadav'   },
  { _id: '4', user: { name: 'Neha Gupta',   phone: '9001122334' }, testName: 'CBC Test',          status: 'in_analysis',      date: 'Mar 18, 2026', amount: 299,  address: 'Raj Nagar, Ghaziabad',  technician: 'Ajay Sharma'    },
  { _id: '5', user: { name: 'Sanjay Patel', phone: '9771234560' }, testName: 'Lipid Profile',     status: 'report_ready',     date: 'Mar 17, 2026', amount: 349,  address: 'Kaushambi, Ghaziabad',  technician: 'Pradeep Mishra' },
  { _id: '6', user: { name: 'Anjali Mehta', phone: '9660011223' }, testName: 'Vitamin D',         status: 'completed',        date: 'Mar 16, 2026', amount: 499,  address: 'Vaishali, Ghaziabad',   technician: 'Rajesh Kumar'   },
];

const mockTechnicians = [
  { _id: 't1', name: 'Rajesh Kumar'   },
  { _id: 't2', name: 'Suresh Yadav'  },
  { _id: 't3', name: 'Ajay Sharma'   },
  { _id: 't4', name: 'Pradeep Mishra'},
];

// ── Badge colours for every booking status ───────────────────────────────────
const statusCfg = {
  pending:          { label: 'Pending',         color: '#d97706', bg: '#fef9c3', border: '#fde68a', barColor: '#f59e0b', step: 1 },
  assigned:         { label: 'Assigned',         color: ACCENT,    bg: `${ACCENT}12`, border: `${ACCENT}30`, barColor: ACCENT, step: 2 },
  sample_collected: { label: 'Sample Collected', color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe', barColor: '#8b5cf6', step: 3 },
  in_analysis:      { label: 'In Analysis',      color: '#ea580c', bg: '#fff7ed', border: '#fed7aa', barColor: '#f97316', step: 4 },
  report_ready:     { label: 'Report Ready',     color: '#0891b2', bg: '#e0f7fa', border: '#b2ebf2', barColor: '#06b6d4', step: 5 },
  completed:        { label: 'Completed',        color: '#059669', bg: '#ecfdf5', border: '#a7f3d0', barColor: '#10b981', step: 6 },
  cancelled:        { label: 'Cancelled',        color: '#dc2626', bg: '#fef2f2', border: '#fecaca', barColor: '#ef4444', step: 0 },
};

// ── What action button to show for each non-terminal status ──────────────────
const nextAction = {
  pending:          { label: 'Assign Technician',     next: 'assigned'         },
  assigned:         { label: 'Mark Sample Collected', next: 'sample_collected' },
  sample_collected: { label: 'Start Lab Analysis',    next: 'in_analysis'      },
  in_analysis:      { label: 'Upload Report',         next: 'report_ready'     },
  report_ready:     { label: 'Mark Completed',        next: 'completed'        },
};

// ── Tab filter options matching booking statuses ──────────────────────────────
const tabs = [
  { label: 'All',              value: ''                },
  { label: 'Pending',          value: 'pending'         },
  { label: 'Assigned',         value: 'assigned'        },
  { label: 'Sample Collected', value: 'sample_collected'},
  { label: 'In Analysis',      value: 'in_analysis'     },
  { label: 'Report Ready',     value: 'report_ready'    },
  { label: 'Completed',        value: 'completed'       },
];

const bookingsPage = () => {
  const {
    bookings, technicians, loading, actionLoading, success,
    filterByStatus, handleAssignTechnician, handleStatusUpdate,
    handleUploadReport, handleCancel,
  } = useBookings();

  const [activeTab,    setActiveTab]    = useState('');
  const [assignModal,  setAssignModal]  = useState(null); // booking object to assign tech to
  const [selectedTech, setSelectedTech] = useState('');
  const [uploadModal,  setUploadModal]  = useState(null); // booking object to upload report for
  const fileRef = useRef();

  // Prefer real data; fall back to mock
  const hasReal    = !loading && bookings.length > 0;
  const source     = hasReal ? bookings : mockBookings;
  const displayTech = technicians.length > 0 ? technicians : mockTechnicians;

  // Filter by active tab
  const filtered = activeTab
    ? source.filter((b) => b.status === activeTab)
    : source;

  // ── Tab change updates local state + backend filter ───────────────────────
  const handleTab = (val) => {
    setActiveTab(val);
    filterByStatus(val);
  };

  // ── Determine what action to take based on current status ─────────────────
  const handleAction = async (booking) => {
    if (booking.status === 'pending')     { setAssignModal(booking); return; }
    if (booking.status === 'in_analysis') { setUploadModal(booking); return; }
    // All other states just advance to the next step
    await handleStatusUpdate(booking._id, nextAction[booking.status]?.next);
  };

  // ── Confirm technician assignment ─────────────────────────────────────────
  const confirmAssign = async () => {
    if (!selectedTech) return;
    await handleAssignTechnician(assignModal._id, selectedTech);
    setAssignModal(null);
    setSelectedTech('');
  };

  // ── Handle report file upload ─────────────────────────────────────────────
  const confirmUpload = async (file) => {
    if (!file) return;
    await handleUploadReport(uploadModal._id, file);
    setUploadModal(null);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ── Page header ───────────────────────────────────────────────────── */}
      <div className="mb-5 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Lab Test Bookings</h2>
        <p className="text-gray-400 mt-1 text-sm">Manage the full 7-step lab test workflow</p>
      </div>

      {/* ── Workflow step tracker (horizontally scrollable) ───────────────── */}
      <div
        className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 mb-5 sm:mb-6 overflow-x-auto"
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
      >
        <div className="flex items-center min-w-max gap-1">
          {BOOKING_STEPS.map((step, i) => {
            const count    = source.filter((b) => b.status === step.key).length;
            const isActive = count > 0;
            return (
              <React.Fragment key={step.key}>
                <button
                  onClick={() => handleTab(step.key)}
                  className={`flex flex-col items-center px-2 sm:px-3 py-2 rounded-xl transition-all ${
                    activeTab === step.key
                      ? 'border'
                      : 'hover:bg-gray-50'
                  }`}
                  style={
                    activeTab === step.key
                      ? { backgroundColor: `${ACCENT}10`, borderColor: `${ACCENT}30` }
                      : {}
                  }
                >
                  {/* Step number bubble */}
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold mb-1.5"
                    style={
                      isActive
                        ? { backgroundColor: `${ACCENT}18`, color: ACCENT }
                        : { backgroundColor: '#f3f4f6', color: '#9ca3af' }
                    }
                  >
                    {step.step}
                  </div>
                  {/* Step label */}
                  <p
                    className="text-xs font-semibold text-center leading-tight w-16 sm:w-20"
                    style={{ color: isActive ? '#374151' : '#9ca3af' }}
                  >
                    {step.label}
                  </p>
                  {/* Count badge */}
                  {isActive && (
                    <span className="mt-1 text-xs font-bold" style={{ color: ACCENT }}>
                      {count}
                    </span>
                  )}
                </button>
                {i < BOOKING_STEPS.length - 1 && (
                  <svg width="16" height="12" viewBox="0 0 20 14" fill="none" className="flex-shrink-0 mb-4">
                    <path d="M1 7h16m0 0l-5-5m5 5l-5 5" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* ── Status filter tabs (scrollable on mobile) ─────────────────────── */}
      <div className="flex gap-2 mb-5 sm:mb-6 overflow-x-auto pb-1 -mx-1 px-1">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => handleTab(tab.value)}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all border flex-shrink-0"
            style={
              activeTab === tab.value
                ? { backgroundColor: ACCENT, color: '#fff', borderColor: ACCENT, boxShadow: `0 4px 12px ${ACCENT}40` }
                : { backgroundColor: '#fff', color: '#6b7280', borderColor: '#e5e7eb' }
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Success feedback ──────────────────────────────────────────────── */}
      {success && (
        <div
          className="flex items-center gap-3 rounded-xl px-5 py-3 mb-4 text-sm font-semibold border"
          style={{ backgroundColor: `${ACCENT}10`, borderColor: `${ACCENT}30`, color: ACCENT }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          {success}
        </div>
      )}

      {/* ── Booking cards — 1 col → 2 col → 3 col ────────────────────────── */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {[1,2,3,4,5,6].map((n) => (
            <div key={n} className="h-56 bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center py-20 bg-white rounded-2xl border border-gray-100">
          <p className="text-5xl mb-4">📋</p>
          <p className="text-base font-bold text-gray-400">No bookings found</p>
          <p className="text-sm text-gray-300 mt-1">Try a different filter tab</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {filtered.map((booking) => {
            const cfg       = statusCfg[booking.status] || statusCfg.pending;
            const isLoading = actionLoading === booking._id;
            const action    = nextAction[booking.status];
            return (
              <div
                key={booking._id}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
              >
                {/* Coloured top progress bar */}
                <div className="h-1.5 w-full" style={{ backgroundColor: cfg.barColor }} />

                <div className="p-4 sm:p-5">
                  {/* Patient info + status badge */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center font-bold text-sm sm:text-base flex-shrink-0"
                        style={{ backgroundColor: `${ACCENT}15`, color: ACCENT }}
                      >
                        {(booking.user?.name || 'U').charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-gray-800 truncate">{booking.user?.name}</p>
                        <p className="text-xs text-gray-400 truncate">{booking.user?.phone}</p>
                      </div>
                    </div>
                    <span
                      className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border flex-shrink-0"
                      style={{ backgroundColor: cfg.bg, color: cfg.color, borderColor: cfg.border }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: cfg.barColor }} />
                      {cfg.label}
                    </span>
                  </div>

                  {/* Booking details */}
                  <div className="rounded-xl p-3 mb-3 space-y-1.5" style={{ backgroundColor: '#f8fafc' }}>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <span>🧪</span>
                      <span className="font-semibold truncate">{booking.testName || booking.test}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
                      <span>📅 {booking.date}</span>
                      <span className="font-bold text-gray-700">₹{booking.amount}</span>
                    </div>
                    {booking.address && (
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>📍</span><span className="truncate">{booking.address}</span>
                      </div>
                    )}
                    {/* Assigned technician (shown once assigned) */}
                    {booking.technician && (
                      <div className="flex items-center gap-2 text-xs font-medium" style={{ color: ACCENT }}>
                        <span>🧑‍🔬</span><span className="truncate">{booking.technician}</span>
                      </div>
                    )}
                  </div>

                  {/* Progress bar — 6 segments, filled up to current step */}
                  <div className="flex gap-1 mb-3">
                    {[1,2,3,4,5,6].map((s) => (
                      <div
                        key={s}
                        className="flex-1 h-1 rounded-full"
                        style={{
                          backgroundColor: s <= cfg.step ? ACCENT : '#e5e7eb',
                        }}
                      />
                    ))}
                  </div>

                  {/* Primary action + optional cancel */}
                  <div className="flex gap-2">
                    {action && (
                      <button
                        onClick={() => handleAction(booking)}
                        disabled={isLoading}
                        className="flex-1 py-2.5 text-xs font-bold text-white rounded-xl disabled:opacity-50 transition-all hover:opacity-90 active:scale-95"
                        style={{ backgroundColor: ACCENT }}
                      >
                        {isLoading ? 'Wait...' : action.label}
                      </button>
                    )}
                    {booking.status !== 'completed' && booking.status !== 'cancelled' && (
                      <button
                        onClick={() => handleCancel(booking._id)}
                        disabled={isLoading}
                        className="px-3 py-2.5 text-xs font-bold text-red-500 border border-red-200 bg-red-50 rounded-xl hover:bg-red-100 transition-all"
                        aria-label="Cancel booking"
                      >
                        ✕
                      </button>
                    )}
                    {booking.status === 'completed' && (
                      <div
                        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl"
                        style={{ backgroundColor: `${ACCENT}10` }}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        <span className="text-xs font-bold" style={{ color: ACCENT }}>Completed</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Assign Technician Modal ───────────────────────────────────────── */}
      {assignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-sm"
            style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}
          >
            <h3 className="text-base font-bold text-gray-800 mb-1">Assign Technician</h3>
            <p className="text-xs text-gray-400 mb-5">
              For: <strong className="text-gray-600">{assignModal.testName}</strong> · {assignModal.user?.name}
            </p>

            <div className="space-y-2 mb-5">
              {displayTech.map((tech) => (
                <button
                  key={tech._id}
                  onClick={() => setSelectedTech(tech._id)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all"
                  style={
                    selectedTech === tech._id
                      ? { borderColor: ACCENT, backgroundColor: `${ACCENT}10` }
                      : { borderColor: '#e5e7eb', backgroundColor: '#fff' }
                  }
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0"
                    style={{ backgroundColor: `${ACCENT}15`, color: ACCENT }}
                  >
                    {tech.name.charAt(0)}
                  </div>
                  <p className="text-sm font-semibold text-gray-700 flex-1">{tech.name}</p>
                  {selectedTech === tech._id && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => { setAssignModal(null); setSelectedTech(''); }}
                className="flex-1 py-2.5 text-sm font-semibold border border-gray-200 rounded-xl hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmAssign}
                disabled={!selectedTech}
                className="flex-1 py-2.5 text-sm font-bold text-white rounded-xl disabled:opacity-40 hover:opacity-90"
                style={{ backgroundColor: ACCENT }}
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Upload Report Modal ───────────────────────────────────────────── */}
      {uploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-sm"
            style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}
          >
            <h3 className="text-base font-bold text-gray-800 mb-1">Upload Lab Report</h3>
            <p className="text-xs text-gray-400 mb-5">
              For: <strong className="text-gray-600">{uploadModal.testName}</strong> · {uploadModal.user?.name}
            </p>

            {/* Hidden file input triggered by the drop zone click */}
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={(e) => confirmUpload(e.target.files[0])}
            />

            <button
              onClick={() => fileRef.current?.click()}
              className="w-full flex flex-col items-center justify-center py-10 border-2 border-dashed rounded-2xl hover:border-opacity-70 transition-all cursor-pointer mb-4"
              style={{ borderColor: `${ACCENT}40`, backgroundColor: `${ACCENT}05` }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" className="mb-3">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              <p className="text-sm font-semibold text-gray-500">Click to select report</p>
              <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG accepted</p>
            </button>

            <button
              onClick={() => setUploadModal(null)}
              className="w-full py-2.5 text-sm font-semibold border border-gray-200 rounded-xl hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default bookingsPage;
