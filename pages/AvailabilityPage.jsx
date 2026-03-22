import React from 'react';
import { useAvailability } from '../hooks/useAvailability';
import AvailabilityForm from '../components/availabilityForm';
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
    <div className="pb-10" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* Header */}
      <div className="mb-10 w-full bg-white rounded-sm p-8 shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-50 pointer-events-none"></div>
        <div className="relative z-10 w-full flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Availability Setup</h2>
              
            </div>
            <button
              onClick={saveAvailability}
              disabled={saving || enabledCount === 0}
              className="flex-shrink-0 flex items-center justify-center gap-2.5 px-8 py-3.5 text-sm font-bold text-white rounded-sm transition-all group active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-200"
            >
              {saving ? (
                <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>Saving...</>
              ) : (
                <><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>Save Availability</>
              )}
            </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-slate-200 rounded-sm p-6 shadow-sm flex items-center justify-between group hover:shadow-md transition">
          <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Working Days</p>
              <p className="text-4xl font-black text-slate-800">{enabledCount}<span className="text-sm font-bold text-slate-400 ml-1">/ 7</span></p>
          </div>
          <div className="w-14 h-14 rounded-sm bg-blue-50 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-sm p-6 shadow-sm flex items-center justify-between group hover:shadow-md transition">
          <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Weekly Slots</p>
              <p className="text-4xl font-black text-slate-800">{totalSlots}</p>
          </div>
          <div className="w-14 h-14 rounded-sm bg-violet-50 text-violet-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-sm p-6 shadow-sm flex items-center justify-between group hover:shadow-md transition">
          <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Est. Weekly Revenue</p>
              <p className="text-4xl font-black text-slate-800">₹{(totalSlots * 450).toLocaleString('en-IN')}</p>
          </div>
          <div className="w-14 h-14 rounded-sm bg-emerald-50 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
        </div>
      </div>

      {/* Success */}
      {success && (
        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 shadow-sm rounded-sm px-6 py-4 mb-6 text-emerald-700 text-sm font-bold transform animate-fade-in-down">
          <div className="w-8 h-8 rounded-sm bg-emerald-500 text-white flex items-center justify-center shadow-sm">
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          Availability saved successfully! Your patients can now book according to the new schedule.
        </div>
      )}

      {/* Info */}
      <div className="flex items-start gap-4 bg-blue-50/50 border border-blue-200 rounded-sm px-6 py-5 mb-8 shadow-sm">
        <div className="w-10 h-10 rounded-sm bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <div>
           <p className="text-sm font-bold text-slate-800 mb-1">Quick Setup Guide</p>
           <p className="text-[13px] text-slate-500 leading-relaxed font-medium">
             Toggle a day <strong className="text-slate-700">ON</strong>, set your start and end times, and pick a slot duration.
             Slots generate automatically based on those settings. <br/>
             <strong className="text-blue-600">Example:</strong> Mon 9AM–1PM with 15 min slots = 16 available slots.
           </p>
        </div>
      </div>

      {/* Schedule Form */}
      <div className="bg-white rounded-sm border border-slate-200 overflow-hidden mb-8 shadow-sm">
        {/* Header */}
        <div className="hidden md:grid gap-4 px-8 py-5 bg-slate-50/80 border-b border-slate-200" style={{ gridTemplateColumns: '80px 1fr 1fr 1fr 140px 100px' }}>
          {['Status', 'Day', 'Start Time', 'End Time', 'Slot Duration', 'Slots Generated'].map((h) => (
            <p key={h} className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</p>
          ))}
        </div>

        {loading ? (
          <div className="p-8 space-y-4">
            {[1,2,3,4,5,6,7].map((n) => <div key={n} className="h-16 bg-slate-100 rounded-sm animate-pulse" />)}
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
             {availability.map((item) => (
                <div
                  key={item.day}
                  className={`grid grid-cols-1 md:grid-cols-none gap-4 items-center px-8 py-5 transition-colors ${item.isAvailable ? 'bg-white hover:bg-slate-50/50' : 'bg-slate-50/30'}`}
                  style={{ gridTemplateColumns: '80px 1fr 1fr 1fr 140px 100px' }}
                >
                  {/* Toggle */}
                  <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() => toggleDay(item.day)}
                        className={`relative w-14 h-8 rounded-full transition-all duration-300 focus:outline-none shadow-inner flex-shrink-0`}
                        style={{ backgroundColor: item.isAvailable ? '#26c6da' : '#e2e8f0' }}
                      >
                        <span className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.2)] transition-all duration-300 ${item.isAvailable ? 'left-7' : 'left-1'}`} />
                      </button>
                      <span className="md:hidden ml-3 text-sm font-extrabold text-slate-800">{item.day}</span>
                  </div>

                  {/* Day */}
                  <div className="hidden md:block">
                    <p className={`text-sm font-extrabold ${item.isAvailable ? 'text-slate-800' : 'text-slate-400'}`}>{item.day}</p>
                  </div>

                  {/* Start */}
                  <div className="w-full">
                      <p className="md:hidden text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Start Time</p>
                      <input
                        type="time" value={item.startTime} disabled={!item.isAvailable}
                        onChange={(e) => updateDayField(item.day, 'startTime', e.target.value)}
                        className={`w-full text-sm font-bold border rounded-sm px-4 py-3 bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all ${!item.isAvailable ? 'bg-slate-50 border-slate-100 text-slate-400 cursor-not-allowed shadow-none' : 'border-slate-200 text-slate-700 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)]'}`}
                      />
                  </div>

                  {/* End */}
                  <div className="w-full">
                      <p className="md:hidden text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">End Time</p>
                      <input
                        type="time" value={item.endTime} disabled={!item.isAvailable}
                        onChange={(e) => updateDayField(item.day, 'endTime', e.target.value)}
                        className={`w-full text-sm font-bold border rounded-sm px-4 py-3 bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all ${!item.isAvailable ? 'bg-slate-50 border-slate-100 text-slate-400 cursor-not-allowed shadow-none' : 'border-slate-200 text-slate-700 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)]'}`}
                      />
                  </div>

                  {/* Slot duration */}
                  <div className="w-full">
                      <p className="md:hidden text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Slot Duration</p>
                      <select
                        value={item.slotDuration} disabled={!item.isAvailable}
                        onChange={(e) => updateDayField(item.day, 'slotDuration', Number(e.target.value))}
                        className={`w-full text-sm font-bold border rounded-sm px-4 py-3 bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none ${!item.isAvailable ? 'bg-slate-50 border-slate-100 text-slate-400 cursor-not-allowed shadow-none' : 'border-slate-200 text-slate-700 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)]'}`}
                      >
                        {SLOT_DURATIONS.map((d) => <option key={d} value={d}>{d} min / session</option>)}
                      </select>
                  </div>

                  {/* Slot count */}
                  <div className="w-full">
                      <p className="md:hidden text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Slots</p>
                      <div className={`px-4 py-3 rounded-sm flex items-center justify-center ${item.isAvailable && getSlotCount(item) > 0 ? 'bg-blue-50 border border-blue-200 shadow-sm' : 'bg-slate-50 border border-slate-200'}`}>
                        <p className={`text-sm font-black ${item.isAvailable && getSlotCount(item) > 0 ? 'text-blue-600' : 'text-slate-400'}`}>
                          {item.isAvailable ? getSlotCount(item) : '—'}
                        </p>
                      </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Slot preview */}
      {availability.some((d) => d.isAvailable) && (
        <div className="bg-white border border-slate-200 rounded-sm p-8 shadow-sm">
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-5">Generated Weekly Schedule Preview</p>
          <div className="flex flex-wrap gap-4">
            {availability.filter((d) => d.isAvailable).map((d) => (
              <div key={d.day} className="flex items-center gap-4 bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors rounded-sm p-4 shadow-sm w-full md:w-auto">
                <div className="w-10 h-10 rounded-sm bg-blue-600 shadow-sm flex items-center justify-center">
                  <span className="text-white text-xs font-black uppercase">{d.day.slice(0, 3)}</span>
                </div>
                <div>
                  <p className="text-sm font-extrabold text-slate-800">{d.startTime} <span className="text-slate-400 mx-1 font-medium">to</span> {d.endTime}</p>
                  <p className="text-[11px] font-bold text-blue-600 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-sm mt-1.5 uppercase tracking-widest inline-block">{getSlotCount(d)} slots <span className="text-slate-300 mx-1">|</span> {d.slotDuration} min</p>
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
