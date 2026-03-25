import React from 'react';
import { useAvailability } from '../hooks/useAvailability';
import { SLOT_DURATIONS } from '../types';

const AvailabilityPage = () => {
  const { availability, loading, saving, error, success, toggleDay, updateDayField, saveAvailability } = useAvailability();

  const getSlotCount = (item) => {
    if (!item.isAvailable) return 0;
    const [sh, sm] = item.startTime.split(':').map(Number);
    const [eh, em] = item.endTime.split(':').map(Number);
    const total = (eh * 60 + em) - (sh * 60 + sm);
    return total > 0 ? Math.floor(total / item.slotDuration) : 0;
  };

  const enabledCount = availability.filter((d) => d.isAvailable).length;
  const totalSlots = availability.reduce((s, d) => s + getSlotCount(d), 0);

  return (
    <div className="pb-10">

      {/* Header */}
      <div className="mb-6 md:mb-10 w-full bg-white rounded-xl p-4 md:p-8 shadow-sm border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-40 md:w-64 h-40 md:h-64 bg-violet-50 rounded-full blur-3xl -mr-10 md:-mr-20 -mt-10 md:-mt-20 opacity-50 pointer-events-none" />
        <div className="relative z-10">
          <h2 className="text-xl md:text-3xl font-extrabold text-slate-800 tracking-tight">Availability Setup</h2>
        </div>
        <button
          onClick={saveAvailability}
          disabled={saving || enabledCount === 0}
          className="relative z-10 flex-shrink-0 flex items-center justify-center gap-2 px-5 md:px-8 py-3 md:py-3.5 text-sm font-bold text-white rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-200 self-start sm:self-auto"
        >
          {saving ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Saving...
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Save Availability
            </>
          )}
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-8">
        {[
          {
            label: 'Working Days', value: <>{enabledCount}<span className="text-sm font-bold text-slate-400 ml-1">/ 7</span></>,
            icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
            iconBg: 'bg-blue-50 text-blue-500',
          },
          {
            label: 'Weekly Slots', value: totalSlots,
            icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
            iconBg: 'bg-violet-50 text-violet-500',
          },
          {
            label: 'Est. Weekly Revenue', value: `₹${(totalSlots * 450).toLocaleString('en-IN')}`,
            icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
            iconBg: 'bg-emerald-50 text-emerald-500',
          },
        ].map((card) => (
          <div key={card.label} className="bg-white border border-slate-200 rounded-xl p-4 md:p-6 shadow-sm flex items-center justify-between group hover:shadow-md transition">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">{card.label}</p>
              <p className="text-2xl md:text-4xl font-black text-slate-800">{card.value}</p>
            </div>
            <div className={`w-11 h-11 md:w-14 md:h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${card.iconBg}`}>
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Success */}
      {success && (
        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 shadow-sm rounded-xl px-4 md:px-6 py-3 md:py-4 mb-5 md:mb-6 text-emerald-700 text-sm font-bold">
          <div className="w-7 h-7 md:w-8 md:h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-sm flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          Availability saved successfully!
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-4">
          {error}
        </div>
      )}

      {/* Info banner */}
      <div className="flex items-start gap-3 md:gap-4 bg-blue-50/50 border border-blue-200 rounded-xl px-4 md:px-6 py-4 md:py-5 mb-6 md:mb-8 shadow-sm">
        <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-bold text-slate-800 mb-1">Quick Setup Guide</p>
          <p className="text-xs md:text-[13px] text-slate-500 leading-relaxed font-medium">
            Toggle a day <strong className="text-slate-700">ON</strong>, set your start and end times, and pick a slot duration.
            Slots are auto-generated. <strong className="text-blue-600">Example:</strong> Mon 9AM–1PM with 15 min = 16 slots.
          </p>
        </div>
      </div>

      {/* Schedule table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-6 md:mb-8 shadow-sm">
        {/* Desktop header */}
        <div className="hidden md:grid gap-4 px-6 lg:px-8 py-4 md:py-5 bg-slate-50/80 border-b border-slate-200" style={{ gridTemplateColumns: '80px 1fr 1fr 1fr 140px 100px' }}>
          {['Status', 'Day', 'Start Time', 'End Time', 'Slot Duration', 'Slots'].map((h) => (
            <p key={h} className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</p>
          ))}
        </div>

        {loading ? (
          <div className="p-4 md:p-8 space-y-3 md:space-y-4">
            {[1, 2, 3, 4, 5, 6, 7].map((n) => (
              <div key={n} className="h-12 md:h-16 bg-slate-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {availability.map((item) => (
              <div key={item.day} className={`transition-colors ${item.isAvailable ? 'bg-white hover:bg-slate-50/50' : 'bg-slate-50/30'}`}>
                {/* Desktop row */}
                <div
                  className="hidden md:grid gap-4 items-center px-6 lg:px-8 py-4 md:py-5"
                  style={{ gridTemplateColumns: '80px 1fr 1fr 1fr 140px 100px' }}
                >
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => toggleDay(item.day)}
                      className="relative w-12 h-7 rounded-full transition-all duration-300 focus:outline-none shadow-inner"
                      style={{ backgroundColor: item.isAvailable ? '#3b82f6' : '#e2e8f0' }}
                    >
                      <span className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-all duration-300 ${item.isAvailable ? 'left-[22px]' : 'left-0.5'}`} />
                    </button>
                  </div>
                  <p className={`text-sm font-extrabold ${item.isAvailable ? 'text-slate-800' : 'text-slate-400'}`}>{item.day}</p>
                  <input
                    type="time" value={item.startTime} disabled={!item.isAvailable}
                    onChange={(e) => updateDayField(item.day, 'startTime', e.target.value)}
                    className={`w-full text-sm font-bold border rounded-xl px-3 py-2.5 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all ${!item.isAvailable ? 'bg-slate-50 border-slate-100 text-slate-400 cursor-not-allowed' : 'border-slate-200 text-slate-700'}`}
                  />
                  <input
                    type="time" value={item.endTime} disabled={!item.isAvailable}
                    onChange={(e) => updateDayField(item.day, 'endTime', e.target.value)}
                    className={`w-full text-sm font-bold border rounded-xl px-3 py-2.5 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all ${!item.isAvailable ? 'bg-slate-50 border-slate-100 text-slate-400 cursor-not-allowed' : 'border-slate-200 text-slate-700'}`}
                  />
                  <select
                    value={item.slotDuration} disabled={!item.isAvailable}
                    onChange={(e) => updateDayField(item.day, 'slotDuration', Number(e.target.value))}
                    className={`w-full text-sm font-bold border rounded-xl px-3 py-2.5 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all appearance-none ${!item.isAvailable ? 'bg-slate-50 border-slate-100 text-slate-400 cursor-not-allowed' : 'border-slate-200 text-slate-700'}`}
                  >
                    {SLOT_DURATIONS.map((d) => <option key={d} value={d}>{d} min</option>)}
                  </select>
                  <div className={`px-3 py-2.5 rounded-xl flex items-center justify-center ${item.isAvailable && getSlotCount(item) > 0 ? 'bg-blue-50 border border-blue-200' : 'bg-slate-50 border border-slate-200'}`}>
                    <p className={`text-sm font-black ${item.isAvailable && getSlotCount(item) > 0 ? 'text-blue-600' : 'text-slate-400'}`}>
                      {item.isAvailable ? getSlotCount(item) : '—'}
                    </p>
                  </div>
                </div>

                {/* Mobile row */}
                <div className="md:hidden px-4 py-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => toggleDay(item.day)}
                        className="relative w-12 h-7 rounded-full transition-all duration-300 focus:outline-none shadow-inner flex-shrink-0"
                        style={{ backgroundColor: item.isAvailable ? '#3b82f6' : '#e2e8f0' }}
                      >
                        <span className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-all duration-300 ${item.isAvailable ? 'left-[22px]' : 'left-0.5'}`} />
                      </button>
                      <span className={`text-sm font-extrabold ${item.isAvailable ? 'text-slate-800' : 'text-slate-400'}`}>{item.day}</span>
                    </div>
                    {item.isAvailable && getSlotCount(item) > 0 && (
                      <span className="text-xs font-black text-blue-600 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg">
                        {getSlotCount(item)} slots
                      </span>
                    )}
                  </div>
                  {item.isAvailable && (
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Start</p>
                        <input
                          type="time" value={item.startTime}
                          onChange={(e) => updateDayField(item.day, 'startTime', e.target.value)}
                          className="w-full text-xs font-bold border border-slate-200 rounded-xl px-2 py-2 bg-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">End</p>
                        <input
                          type="time" value={item.endTime}
                          onChange={(e) => updateDayField(item.day, 'endTime', e.target.value)}
                          className="w-full text-xs font-bold border border-slate-200 rounded-xl px-2 py-2 bg-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Duration</p>
                        <select
                          value={item.slotDuration}
                          onChange={(e) => updateDayField(item.day, 'slotDuration', Number(e.target.value))}
                          className="w-full text-xs font-bold border border-slate-200 rounded-xl px-2 py-2 bg-white focus:outline-none focus:border-blue-500 appearance-none"
                        >
                          {SLOT_DURATIONS.map((d) => <option key={d} value={d}>{d}m</option>)}
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Slot preview */}
      {availability.some((d) => d.isAvailable) && (
        <div className="bg-white border border-slate-200 rounded-xl p-4 md:p-8 shadow-sm">
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4 md:mb-5">Weekly Schedule Preview</p>
          <div className="flex flex-wrap gap-3 md:gap-4">
            {availability.filter((d) => d.isAvailable).map((d) => (
              <div key={d.day} className="flex items-center gap-3 bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors rounded-xl p-3 md:p-4 shadow-sm w-full sm:w-auto">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-blue-600 shadow-sm flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-black uppercase">{d.day.slice(0, 3)}</span>
                </div>
                <div>
                  <p className="text-sm font-extrabold text-slate-800">{d.startTime} <span className="text-slate-400 mx-1 font-medium">to</span> {d.endTime}</p>
                  <p className="text-[11px] font-bold text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-lg mt-1 uppercase tracking-widest inline-block">
                    {getSlotCount(d)} slots · {d.slotDuration} min
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailabilityPage;
