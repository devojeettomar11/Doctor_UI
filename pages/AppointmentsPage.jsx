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

const statusConfig = {
  [APPOINTMENT_STATUS?.TODAY || 'today']: { label: 'Today', pill: 'bg-amber-100 text-amber-700 border border-amber-200', avatar: 'bg-gradient-to-br from-amber-400 to-amber-500 text-white' },
  [APPOINTMENT_STATUS?.UPCOMING || 'upcoming']: { label: 'Upcoming', pill: 'bg-blue-100 text-blue-700 border border-blue-200', avatar: 'bg-gradient-to-br from-blue-500 to-blue-600 text-white' },
  [APPOINTMENT_STATUS?.COMPLETED || 'completed']: { label: 'Completed', pill: 'bg-emerald-100 text-emerald-700 border border-emerald-200', avatar: 'bg-gradient-to-br from-emerald-400 to-emerald-500 text-white' },
  [APPOINTMENT_STATUS?.CANCELLED || 'cancelled']: { label: 'Cancelled', pill: 'bg-red-100 text-red-700 border border-red-200', avatar: 'bg-gradient-to-br from-red-400 to-red-500 text-white' },
};

const tabs = [
  { label: 'All', value: '' },
  { label: 'Today', value: APPOINTMENT_STATUS?.TODAY || 'today' },
  { label: 'Upcoming', value: APPOINTMENT_STATUS?.UPCOMING || 'upcoming' },
  { label: 'Completed', value: APPOINTMENT_STATUS?.COMPLETED || 'completed' },
  { label: 'Cancelled', value: APPOINTMENT_STATUS?.CANCELLED || 'cancelled' },
];

const AppointmentsPage = () => {
  const { appointments, loading, actionLoading, handleConfirm, handleComplete, handleCancel } = useAppointments();
  const [activeTab, setActiveTab] = useState('');

  const hasReal = !loading && appointments && appointments.length > 0;
  const source = hasReal ? appointments : mockAppointments;
  const filtered = activeTab ? source.filter((a) => a.status === activeTab) : source;

  const getStatusString = (s) => s || '';

  const counts = {
    '': source.length,
    [getStatusString(APPOINTMENT_STATUS?.TODAY || 'today')]: source.filter((a) => a.status === (APPOINTMENT_STATUS?.TODAY || 'today')).length,
    [getStatusString(APPOINTMENT_STATUS?.UPCOMING || 'upcoming')]: source.filter((a) => a.status === (APPOINTMENT_STATUS?.UPCOMING || 'upcoming')).length,
    [getStatusString(APPOINTMENT_STATUS?.COMPLETED || 'completed')]: source.filter((a) => a.status === (APPOINTMENT_STATUS?.COMPLETED || 'completed')).length,
    [getStatusString(APPOINTMENT_STATUS?.CANCELLED || 'cancelled')]: source.filter((a) => a.status === (APPOINTMENT_STATUS?.CANCELLED || 'cancelled')).length,
  };

  return (
    <div className="pb-8">

      {/* Header section with gradient flair */}
      <div className="relative mb-8 bg-white rounded-sm p-6 shadow-sm border border-slate-200 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-50 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Appointments</h2>
            <p className="text-slate-500 mt-2 text-sm max-w-lg leading-relaxed">
              Manage and track all your patient appointments efficiently. Verify details, update statuses, and keep your schedule organized.
            </p>
          </div>
          <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-sm p-4 shadow-sm">
            <div className="text-center px-3">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total</p>
              <p className="text-3xl font-black text-blue-600 leading-none">{source.length}</p>
            </div>
            <div className="w-px h-10 bg-slate-200"></div>
            <div className="text-center px-3">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Today</p>
              <p className="text-3xl font-black text-amber-500 leading-none">{counts[getStatusString(APPOINTMENT_STATUS?.TODAY || 'today')]}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stylish Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`flex items-center gap-2 px-4 py-2 rounded-sm text-sm font-semibold transition-all duration-300 ${activeTab === tab.value
                ? 'bg-blue-600 text-white shadow-md shadow-blue-200/50 transform scale-[1.02]'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 hover:border-slate-300'
              }`}
          >
            {tab.label}
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${activeTab === tab.value ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
              {counts[getStatusString(tab.value)]}
            </span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

        {filtered.map((appt) => {
          const cfg = statusConfig[appt.status] || statusConfig['upcoming'];
          const isLoading = actionLoading === appt._id;

          return (
            <div
              key={appt._id}
              className="group bg-white rounded-sm p-5 border border-slate-200 shadow-sm hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-72 relative overflow-hidden"
            >
              {/* Subtle top border accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>

              {/* Card Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col">
                  <div className="flex items-center gap-3 mb-1">
                    <div className={`w-10 h-10 rounded-sm flex items-center justify-center font-bold text-lg shadow-sm ${cfg.avatar}`}>
                      {appt.patient?.name?.charAt(0) || 'P'}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-800 text-base leading-tight">
                        {appt.patient?.name}
                      </h3>
                      <p className="text-xs font-semibold text-slate-500 mt-0.5 flex items-center gap-1.5">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        {appt.patient?.phone}
                      </p>
                    </div>
                  </div>
                </div>

                <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-widest ${cfg.pill}`}>
                  {cfg.label}
                </span>
              </div>

              {/* Consultation Details */}
              <div className="bg-slate-50/70 rounded-sm p-3 text-sm border border-slate-200 flex-grow flex flex-col justify-center">
                <div className="grid grid-cols-2 gap-y-2 gap-x-2">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Date</p>
                    <p className="font-bold text-slate-700">{appt.date}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Time</p>
                    <p className="font-bold text-slate-700">{appt.time}</p>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-slate-200/80">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fee</p>
                      <p className="font-black text-slate-800">₹{appt.consultationFee}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 h-9 shrink-0">
                {(appt.status === (APPOINTMENT_STATUS?.UPCOMING || 'upcoming')) && (
                  <div className="flex gap-3 h-full">
                    <button
                      onClick={() => handleConfirm && handleConfirm(appt._id)}
                      disabled={isLoading}
                      className="flex-1 rounded-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200/50 transition-all active:scale-95 disabled:opacity-50 h-full"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => handleCancel && handleCancel(appt._id)}
                      disabled={isLoading}
                      className="flex-1 rounded-sm text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all active:scale-95 disabled:opacity-50 h-full"
                    >
                      Cancel
                    </button>
                  </div>
                )}

                {(appt.status === (APPOINTMENT_STATUS?.TODAY || 'today')) && (
                  <div className="flex gap-3 h-full">
                    <button
                      onClick={() => handleComplete && handleComplete(appt._id)}
                      disabled={isLoading}
                      className="flex-1 rounded-sm text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-200/50 transition-all active:scale-95 disabled:opacity-50 h-full"
                    >
                      Complete
                    </button>
                    <button
                      onClick={() => handleCancel && handleCancel(appt._id)}
                      disabled={isLoading}
                      className="flex-1 rounded-sm text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all active:scale-95 disabled:opacity-50 h-full"
                    >
                      Cancel
                    </button>
                  </div>
                )}

                {(appt.status === (APPOINTMENT_STATUS?.COMPLETED || 'completed')) && (
                  <div className="w-full h-full bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-sm text-center font-bold flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                    Completed
                  </div>
                )}

                {(appt.status === (APPOINTMENT_STATUS?.CANCELLED || 'cancelled')) && (
                  <div className="w-full h-full bg-red-50 text-red-500 border border-red-200 rounded-sm text-center font-bold flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                    Cancelled
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-12 flex flex-col items-center justify-center bg-white rounded-sm border border-slate-200 shadow-sm mt-6">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
          <p className="text-lg font-bold text-slate-700">No appointments found</p>
          <p className="text-slate-400 mt-1 text-sm font-medium">There are no appointments matching the current filter.</p>
        </div>
      )}

    </div>
  );
};

export default AppointmentsPage;