import React, { useState } from 'react';
import { useAppointments } from '../hooks/useAppointments';
import { APPOINTMENT_STATUS } from '../types';

const mockAppointments = [
  { _id: '1', patient: { name: 'Rahul Sharma', phone: '9876543210' }, time: '10:00 AM', date: 'Today', status: 'today', consultationFee: 500 },
  { _id: '2', patient: { name: 'Priya Singh', phone: '9123456780' }, time: '11:30 AM', date: 'Today', status: 'today', consultationFee: 500 },
  { _id: '3', patient: { name: 'Amit Verma', phone: '9988776655' }, time: '2:00 PM', date: 'Mar 20', status: 'upcoming', consultationFee: 500 },
  { _id: '4', patient: { name: 'Neha Gupta', phone: '9001122334' }, time: '4:30 PM', date: 'Mar 21', status: 'upcoming', consultationFee: 500 },
  { _id: '5', patient: { name: 'Sanjay Patel', phone: '9771234560' }, time: '9:00 AM', date: 'Mar 18', status: 'completed', consultationFee: 500 },
  { _id: '6', patient: { name: 'Anjali Mehta', phone: '9660011223' }, time: '3:00 PM', date: 'Mar 17', status: 'cancelled', consultationFee: 500 },
];

const TODAY = APPOINTMENT_STATUS?.TODAY || 'today';
const UPCOMING = APPOINTMENT_STATUS?.UPCOMING || 'upcoming';
const COMPLETED = APPOINTMENT_STATUS?.COMPLETED || 'completed';
const CANCELLED = APPOINTMENT_STATUS?.CANCELLED || 'cancelled';

const statusConfig = {
  [TODAY]: { label: 'Today', pill: 'bg-amber-100 text-amber-700 border border-amber-200', avatar: 'bg-gradient-to-br from-amber-400 to-amber-500 text-white' },
  [UPCOMING]: { label: 'Upcoming', pill: 'bg-blue-100 text-blue-700 border border-blue-200', avatar: 'bg-gradient-to-br from-blue-500 to-blue-600 text-white' },
  [COMPLETED]: { label: 'Completed', pill: 'bg-emerald-100 text-emerald-700 border border-emerald-200', avatar: 'bg-gradient-to-br from-emerald-400 to-emerald-500 text-white' },
  [CANCELLED]: { label: 'Cancelled', pill: 'bg-red-100 text-red-700 border border-red-200', avatar: 'bg-gradient-to-br from-red-400 to-red-500 text-white' },
};

const tabs = [
  { label: 'All', value: '' },
  { label: 'Today', value: TODAY },
  { label: 'Upcoming', value: UPCOMING },
  { label: 'Completed', value: COMPLETED },
  { label: 'Cancelled', value: CANCELLED },
];

const AppointmentsPage = () => {
  const { appointments, loading, actionLoading, handleConfirm, handleComplete, handleCancel } = useAppointments();
  const [activeTab, setActiveTab] = useState('');

  const hasReal = !loading && appointments && appointments.length > 0;
  const source = hasReal ? appointments : mockAppointments;
  const filtered = activeTab ? source.filter((a) => a.status === activeTab) : source;

  const counts = {
    '': source.length,
    [TODAY]: source.filter((a) => a.status === TODAY).length,
    [UPCOMING]: source.filter((a) => a.status === UPCOMING).length,
    [COMPLETED]: source.filter((a) => a.status === COMPLETED).length,
    [CANCELLED]: source.filter((a) => a.status === CANCELLED).length,
  };

  return (
    <div className="pb-8">

      {/* Header */}
      <div className="relative mb-6 md:mb-8 bg-white rounded-xl p-4 md:p-6 shadow-sm border border-slate-200 overflow-hidden">
        <div className="absolute top-0 right-0 w-40 md:w-64 h-40 md:h-64 bg-blue-50 rounded-full blur-3xl -mr-10 md:-mr-20 -mt-10 md:-mt-20 opacity-50 pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-3xl font-extrabold text-slate-800 tracking-tight">Appointments</h2>
            <p className="text-slate-500 mt-1 text-xs md:text-sm max-w-lg leading-relaxed hidden sm:block">
              Manage and track all your patient appointments efficiently.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3 md:p-4 shadow-sm self-start sm:self-auto">
            <div className="text-center px-2 md:px-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Total</p>
              <p className="text-2xl md:text-3xl font-black text-blue-600 leading-none">{source.length}</p>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div className="text-center px-2 md:px-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Today</p>
              <p className="text-2xl md:text-3xl font-black text-amber-500 leading-none">{counts[TODAY]}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs — scrollable on mobile */}
      <div className="flex gap-2 mb-4 md:mb-6 overflow-x-auto pb-1 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`flex items-center gap-1.5 px-3 md:px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
              activeTab === tab.value
                ? 'bg-blue-600 text-white shadow-md shadow-blue-200/50'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            {tab.label}
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
              activeTab === tab.value ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
            }`}>
              {counts[tab.value] ?? 0}
            </span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
        {filtered.map((appt) => {
          const cfg = statusConfig[appt.status] || statusConfig[UPCOMING];
          const isLoading = actionLoading === appt._id;

          return (
            <div
              key={appt._id}
              className="group bg-white rounded-xl p-4 md:p-5 border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden"
            >
              {/* Top accent */}
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Card Header */}
              <div className="flex justify-between items-start mb-3 md:mb-4">
                <div className="flex items-center gap-2 md:gap-3 min-w-0">
                  <div className={`w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center font-bold text-base md:text-lg shadow-sm flex-shrink-0 ${cfg.avatar}`}>
                    {appt.patient?.name?.charAt(0) || 'P'}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-extrabold text-slate-800 text-sm md:text-base leading-tight truncate">
                      {appt.patient?.name}
                    </h3>
                    <p className="text-[11px] font-semibold text-slate-500 mt-0.5 flex items-center gap-1 truncate">
                      <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="truncate">{appt.patient?.phone}</span>
                    </p>
                  </div>
                </div>
                <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-widest flex-shrink-0 ml-2 ${cfg.pill}`}>
                  {cfg.label}
                </span>
              </div>

              {/* Details */}
              <div className="bg-slate-50/70 rounded-xl p-3 text-sm border border-slate-200 flex-grow mb-3 md:mb-4">
                <div className="grid grid-cols-2 gap-y-2 gap-x-2">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Date</p>
                    <p className="font-bold text-slate-700 text-xs md:text-sm">{appt.date}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Time</p>
                    <p className="font-bold text-slate-700 text-xs md:text-sm">{appt.time}</p>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-slate-200/80">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fee</p>
                      <p className="font-black text-slate-800 text-xs md:text-sm">₹{appt.consultationFee}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="h-9 shrink-0">
                {appt.status === UPCOMING && (
                  <div className="flex gap-2 h-full">
                    <button
                      onClick={() => handleConfirm && handleConfirm(appt._id)}
                      disabled={isLoading}
                      className="flex-1 rounded-xl text-xs md:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50 h-full"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => handleCancel && handleCancel(appt._id)}
                      disabled={isLoading}
                      className="flex-1 rounded-xl text-xs md:text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all active:scale-95 disabled:opacity-50 h-full"
                    >
                      Cancel
                    </button>
                  </div>
                )}
                {appt.status === TODAY && (
                  <div className="flex gap-2 h-full">
                    <button
                      onClick={() => handleComplete && handleComplete(appt._id)}
                      disabled={isLoading}
                      className="flex-1 rounded-xl text-xs md:text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 transition-all active:scale-95 disabled:opacity-50 h-full"
                    >
                      Complete
                    </button>
                    <button
                      onClick={() => handleCancel && handleCancel(appt._id)}
                      disabled={isLoading}
                      className="flex-1 rounded-xl text-xs md:text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all active:scale-95 disabled:opacity-50 h-full"
                    >
                      Cancel
                    </button>
                  </div>
                )}
                {appt.status === COMPLETED && (
                  <div className="w-full h-full bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-xl text-center font-bold flex items-center justify-center gap-1.5 text-xs md:text-sm">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                    Completed
                  </div>
                )}
                {appt.status === CANCELLED && (
                  <div className="w-full h-full bg-red-50 text-red-500 border border-red-200 rounded-xl text-center font-bold flex items-center justify-center gap-1.5 text-xs md:text-sm">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Cancelled
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-12 flex flex-col items-center justify-center bg-white rounded-xl border border-slate-200 shadow-sm mt-4">
          <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center mb-4">
            <svg className="w-7 h-7 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-base font-bold text-slate-700">No appointments found</p>
          <p className="text-slate-400 mt-1 text-sm font-medium text-center px-4">There are no appointments matching the current filter.</p>
        </div>
      )}
    </div>
  );
};

export default AppointmentsPage;
