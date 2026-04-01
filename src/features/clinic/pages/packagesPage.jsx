import React, { useState } from 'react';
import { usePackages }     from '../hooks/usePackages';
import { PACKAGE_INCLUDES } from '../types';

// ── Teal accent shared across clinic pages ───────────────────────────────────
const ACCENT = '#0bc5cf';

// ── Mock packages displayed when the backend returns no data ─────────────────
const mockPackages = [
  { _id: '1', name: 'Full Body Checkup',    price: 2000, offerPrice: 1499, includes: ['Blood Test','Thyroid Test','Vitamin Test','Urine Test','Lipid Profile'], isActive: true,  bookings: 48 },
  { _id: '2', name: 'Diabetes Panel',       price: 800,  offerPrice: 599,  includes: ['Blood Test','HbA1c','Kidney Function'],                                isActive: true,  bookings: 32 },
  { _id: '3', name: 'Thyroid Profile',      price: 600,  offerPrice: 449,  includes: ['Thyroid Test','Vitamin B12','Iron Studies'],                           isActive: true,  bookings: 27 },
  { _id: '4', name: 'Heart Health Package', price: 2500, offerPrice: 1999, includes: ['Cardiac Markers','Lipid Profile','CBC','ESR'],                         isActive: false, bookings: 15 },
  { _id: '5', name: 'Vitamin & Nutrition',  price: 1200, offerPrice: 899,  includes: ['Vitamin D','Vitamin B12','Iron Studies','CBC'],                        isActive: true,  bookings: 41 },
  { _id: '6', name: 'Women Wellness',       price: 3000, offerPrice: 2299, includes: ['Hormone Test','Thyroid Test','Vitamin D','CBC','Iron Studies'],         isActive: true,  bookings: 19 },
];

// ── Empty state for the create/edit form ─────────────────────────────────────
const emptyForm = { name: '', price: '', offerPrice: '', includes: [] };

// ── Calculates the discount percentage off the original price ────────────────
const getDiscount = (pkg) =>
  pkg.price > 0 ? Math.round(((pkg.price - pkg.offerPrice) / pkg.price) * 100) : 0;

const packagesPage = () => {
  const {
    packages, loading, saving, error, success,
    handleCreate, handleUpdate, handleDelete, handleToggle,
  } = usePackages();

  // Modal & form state
  const [showModal,     setShowModal]     = useState(false);
  const [editItem,      setEditItem]      = useState(null);
  const [form,          setForm]          = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState(null); // holds the _id to confirm deletion

  // Use real data when available, otherwise show mock cards
  const hasReal        = !loading && packages.length > 0;
  const displayPackages = hasReal ? packages : mockPackages;

  // ── Modal helpers ──────────────────────────────────────────────────────────
  const openCreate = () => { setForm(emptyForm); setEditItem(null); setShowModal(true); };
  const openEdit   = (pkg) => {
    setForm({ name: pkg.name, price: pkg.price, offerPrice: pkg.offerPrice, includes: pkg.includes || [] });
    setEditItem(pkg);
    setShowModal(true);
  };
  const closeModal = () => { setShowModal(false); setEditItem(null); setForm(emptyForm); };

  // Toggle a test's inclusion in the package form
  const toggleInclude = (item) =>
    setForm((prev) => ({
      ...prev,
      includes: prev.includes.includes(item)
        ? prev.includes.filter((i) => i !== item)
        : [...prev.includes, item],
    }));

  // Submit create or update depending on whether editItem is set
  const handleSubmit = async () => {
    const data = { ...form, price: Number(form.price), offerPrice: Number(form.offerPrice) };
    const ok   = editItem
      ? await handleUpdate(editItem._id, data)
      : await handleCreate(data);
    if (ok) closeModal();
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ── Page header ───────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Health Packages</h2>
          <p className="text-gray-400 mt-1 text-sm">Create and manage diagnostic health packages</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-5 py-3 text-sm font-bold text-white rounded-xl transition-all hover:opacity-90 active:scale-95 self-start sm:self-auto flex-shrink-0"
          style={{ backgroundColor: ACCENT, boxShadow: `0 4px 12px ${ACCENT}50` }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Create Package
        </button>
      </div>

      {/* ── Success toast ─────────────────────────────────────────────────── */}
      {success && (
        <div
          className="flex items-center gap-3 rounded-xl px-5 py-3.5 mb-5 text-sm font-semibold border"
          style={{ backgroundColor: `${ACCENT}10`, borderColor: `${ACCENT}30`, color: ACCENT }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          {success}
        </div>
      )}

      {/* ── Package cards — 1 col → 2 col → 3 col ─────────────────────────── */}
      {loading ? (
        // Loading skeleton
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {[1,2,3,4,5,6].map((n) => (
            <div key={n} className="h-64 bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {displayPackages.map((pkg) => (
            <div
              key={pkg._id}
              className={`bg-white rounded-2xl border overflow-hidden transition-all hover:shadow-lg ${
                pkg.isActive ? 'border-gray-200' : 'border-gray-200 opacity-60'
              }`}
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
            >
              {/* Coloured top bar — teal when active, gray when inactive */}
              <div
                className="h-1.5 w-full"
                style={{ backgroundColor: pkg.isActive ? ACCENT : '#d1d5db' }}
              />

              <div className="p-4 sm:p-5">
                {/* Package name + active/inactive toggle */}
                <div className="flex items-start justify-between mb-3 gap-2">
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-gray-800 truncate">{pkg.name}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{pkg.bookings || 0} bookings</p>
                  </div>
                  <button
                    onClick={() => handleToggle(pkg._id)}
                    className="text-xs font-bold px-2.5 py-1 rounded-full border transition-all flex-shrink-0"
                    style={
                      pkg.isActive
                        ? { backgroundColor: `${ACCENT}12`, color: ACCENT, borderColor: `${ACCENT}30` }
                        : { backgroundColor: '#f3f4f6', color: '#9ca3af', borderColor: '#e5e7eb' }
                    }
                  >
                    {pkg.isActive ? 'Active' : 'Inactive'}
                  </button>
                </div>

                {/* Pricing row: offer price + strikethrough + discount badge */}
                <div className="flex items-baseline gap-2 mb-3 flex-wrap">
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{pkg.offerPrice?.toLocaleString('en-IN')}
                  </p>
                  <p className="text-sm text-gray-400 line-through">
                    ₹{pkg.price?.toLocaleString('en-IN')}
                  </p>
                  <span className="text-xs font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                    {getDiscount(pkg)}% off
                  </span>
                </div>

                {/* Included tests pills */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-400 mb-2">Includes:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {(pkg.includes || []).slice(0, 4).map((item) => (
                      <span
                        key={item}
                        className="text-xs font-medium px-2 py-0.5 rounded-full border"
                        style={{
                          backgroundColor: `${ACCENT}10`,
                          color: ACCENT,
                          borderColor: `${ACCENT}25`,
                        }}
                      >
                        {item}
                      </span>
                    ))}
                    {(pkg.includes || []).length > 4 && (
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium">
                        +{pkg.includes.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Edit / Delete actions */}
                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => openEdit(pkg)}
                    className="flex-1 py-2 text-xs font-bold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(pkg._id)}
                    className="flex-1 py-2 text-xs font-bold text-red-500 border border-red-200 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Delete confirmation dialog ─────────────────────────────────────── */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-sm text-center"
            style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}
          >
            <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
              </svg>
            </div>
            <h3 className="text-base font-bold text-gray-800 mb-1">Delete Package?</h3>
            <p className="text-sm text-gray-500 mb-5">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 text-sm font-semibold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => { handleDelete(deleteConfirm); setDeleteConfirm(null); }}
                className="flex-1 py-2.5 text-sm font-bold text-white bg-red-500 rounded-xl hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Create / Edit modal ────────────────────────────────────────────── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div
            className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
              <h3 className="text-base font-bold text-gray-800">
                {editItem ? 'Edit Package' : 'Create Health Package'}
              </h3>
              <button
                onClick={closeModal}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Modal body */}
            <div className="p-6 space-y-4">
              {/* Package name */}
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">
                  Package Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  placeholder="e.g. Full Body Checkup"
                  className="w-full text-sm border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 transition-all"
                  style={{ '--tw-ring-color': ACCENT }}
                />
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">
                    Original Price (₹) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
                    placeholder="2000"
                    className="w-full text-sm border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">
                    Offer Price (₹) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    value={form.offerPrice}
                    onChange={(e) => setForm((p) => ({ ...p, offerPrice: e.target.value }))}
                    placeholder="1499"
                    className="w-full text-sm border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 transition-all"
                  />
                </div>
              </div>

              {/* Live discount preview */}
              {form.price && form.offerPrice && Number(form.price) > 0 && (
                <div
                  className="flex flex-wrap items-center gap-3 rounded-xl px-4 py-3 border"
                  style={{ backgroundColor: `${ACCENT}08`, borderColor: `${ACCENT}25` }}
                >
                  <span className="text-xs font-bold" style={{ color: ACCENT }}>
                    Customer saves ₹{(Number(form.price) - Number(form.offerPrice)).toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded-full">
                    {Math.round(((Number(form.price) - Number(form.offerPrice)) / Number(form.price)) * 100)}% off
                  </span>
                </div>
              )}

              {/* Included tests selector */}
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-2">
                  Included Tests <span className="text-red-400">*</span>
                </label>
                <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-1">
                  {PACKAGE_INCLUDES.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleInclude(item)}
                      className="text-xs font-semibold px-3 py-1.5 rounded-full border transition-all"
                      style={
                        form.includes.includes(item)
                          ? { backgroundColor: ACCENT, color: '#fff', borderColor: ACCENT }
                          : { backgroundColor: '#fff', color: '#6b7280', borderColor: '#e5e7eb' }
                      }
                    >
                      {form.includes.includes(item) ? '✓ ' : ''}{item}
                    </button>
                  ))}
                </div>
                {form.includes.length > 0 && (
                  <p className="text-xs font-semibold mt-2" style={{ color: ACCENT }}>
                    {form.includes.length} tests selected
                  </p>
                )}
              </div>

              {/* API error */}
              {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
            </div>

            {/* Modal footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl sticky bottom-0">
              <button
                onClick={closeModal}
                className="px-5 py-2.5 text-sm font-semibold text-gray-500 border border-gray-200 rounded-xl hover:bg-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={saving || !form.name || !form.price || !form.offerPrice || form.includes.length === 0}
                className="px-6 py-2.5 text-sm font-bold text-white rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:opacity-90"
                style={{ backgroundColor: ACCENT, boxShadow: `0 4px 12px ${ACCENT}40` }}
              >
                {saving ? 'Saving...' : editItem ? 'Update Package' : 'Create Package'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default packagesPage;
