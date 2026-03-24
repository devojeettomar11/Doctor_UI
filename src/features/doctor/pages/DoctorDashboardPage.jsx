import React from 'react';
import { useAppointments } from '../hooks/useAppointments';
import { useEarnings } from '../hooks/useEarnings';
import { APPOINTMENT_STATUS } from '../types';
import { Link } from 'react-router-dom';

const mockAppointments = [
  { _id: '1', patient: { name: 'Rahul Sharma', phone: '9876543210' }, time: '10:00 AM', date: 'Today', status: 'today' },
  { _id: '2', patient: { name: 'Priya Singh', phone: '9123456780' }, time: '11:30 AM', date: 'Today', status: 'today' },
  { _id: '3', patient: { name: 'Amit Verma', phone: '9988776655' }, time: '2:00 PM', date: 'Tomorrow', status: 'upcoming' },
  { _id: '4', patient: { name: 'Neha Gupta', phone: '9001122334' }, time: '4:30 PM', date: 'Mar 21', status: 'upcoming' },
];

const avatarBg = ['bg-indigo-100 text-indigo-700', 'bg-rose-100 text-rose-700', 'bg-emerald-100 text-emerald-700', 'bg-amber-100 text-amber-700', 'bg-sky-100 text-sky-700'];

const StatCard = ({ label, value, icon, gradient, sub, shadow }) => (
  <div className={`rounded-sm p-6 ${gradient} ${shadow} relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300`}>
    <div className="flex items-start justify-between mb-4 z-10 relative">
      <div className="w-14 h-14 rounded-sm bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl border border-white/30 shadow-sm group-hover:scale-110 transition-transform">
        {icon}
      </div>
    </div>
    <div className="z-10 relative">
      <p className="text-4xl font-black text-white mb-1 tracking-tight">{value}</p>
      <p className="text-[11px] text-white/90 font-bold uppercase tracking-widest">{label}</p>
      {sub && <p className="text-xs text-white/70 mt-1 font-medium">{sub}</p>}
    </div>
    <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-white/10 blur-2xl group-hover:scale-150 transition-transform duration-500" />
    <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/5 blur-xl" />
  </div>
);

const DoctorDashboardPage = () => {
  const { appointments, loading: apptLoading } = useAppointments();
  const { summary, loading: earningsLoading } = useEarnings();

  const hasReal = !apptLoading && appointments && appointments.length > 0;
  const displayAppts = hasReal ? appointments : mockAppointments;
  const todayAppts = displayAppts.filter((a) => a.status === (APPOINTMENT_STATUS?.TODAY || 'today'));
  const upcomingAppts = displayAppts.filter((a) => a.status === (APPOINTMENT_STATUS?.UPCOMING || 'upcoming'));

  return (
    <div className="p-8 pb-20 w-full min-h-full">

      {/* Welcome */}
      <div className="mb-10 w-full bg-white rounded-sm p-8 shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-60 pointer-events-none"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Welcome back, Doctor 👋</h2>
         
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-40">
        <StatCard label="Today's Appts" value={apptLoading ? '—' : todayAppts.length} icon="📅" gradient="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700" shadow="shadow-[0_8px_20px_-4px_rgba(38,198,218,0.3)]" sub="Scheduled for today" />
        <StatCard label="Upcoming" value={apptLoading ? '—' : upcomingAppts.length} icon="🗓️" gradient="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700" shadow="shadow-[0_8px_20px_-4px_rgba(139,92,246,0.3)]" sub="Next 7 days" />
        <StatCard label="Total Patients" value={earningsLoading ? '—' : (summary?.totalPatients || 48)} icon="👥" gradient="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700" shadow="shadow-[0_8px_20px_-4px_rgba(16,185,129,0.3)]" sub="All time records" />
        <StatCard label="Monthly Earnings" value={`₹${(summary?.monthly || 18450).toLocaleString('en-IN')}`} icon="💰" gradient="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700"  sub="This month" />
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

        {/* Today's appointments */}
        <div className="bg-white rounded-sm border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-8 py-6 border-b border-slate-200 bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full text-blue-600 shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
              <h3 className="text-base font-extrabold text-slate-800 tracking-tight">Today's Appointments</h3>
            </div>
            <span className="bg-text-blue-600 text-blue-600 text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-sm border border-amber-200 shadow-sm">
              {todayAppts.length} scheduled
            </span>
          </div>
          <div className="divide-y divide-slate-100 flex-1">
            {todayAppts.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-12 text-slate-400 h-full min-h-[300px]">
                <span className="text-5xl mb-4">📭</span>
                <p className="text-base font-bold text-slate-700">No appointments today</p>
                <p className="text-sm mt-1 font-medium">Take a break or review patient files.</p>
              </div>
            ) : (
              todayAppts.map((appt, i) => (
                <div key={appt._id} className="flex items-center gap-5 px-8 py-5 hover:bg-slate-50 transition-colors group cursor-pointer">
                  <div className={`w-12 h-12 rounded-sm flex items-center justify-center font-extrabold text-lg flex-shrink-0 shadow-sm ${avatarBg[i % avatarBg.length]}`}>
                    {appt.patient?.name?.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-extrabold text-slate-800 truncate transition-colors">{appt.patient?.name}</p>
                    <p className="text-xs font-semibold text-slate-400 mt-1 flex items-center gap-1.5"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>{appt.time}</p>
                  </div>
                  
                </div>
              ))
            )}
          </div>
          {todayAppts.length > 0 && (
            <div className="p-4 bg-slate-50/50 border-t border-slate-100 text-center">
              <Link to="/doctor/appointments" className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center justify-center gap-1">View Schedule <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg></Link>
            </div>
          )}
        </div>

        {/* Upcoming */}
        <div className="bg-white rounded-sm border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-8 py-6 border-b border-slate-200 bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full[0_0_10px_rgba(139,92,246,0.5)]" />
              <h3 className="text-base font-extrabold text-slate-800 tracking-tight">Upcoming Appointments</h3>
            </div>
            <span className="text-violet-700 text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-sm border border-violet-200 shadow-sm">
              {upcomingAppts.length} total
            </span>
          </div>
          <div className="divide-y divide-slate-100 flex-1">
            {upcomingAppts.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-12 text-slate-400 h-full min-h-[300px]">
                <span className="text-5xl mb-4">🗓️</span>
                <p className="text-base font-bold text-slate-700">No upcoming appointments</p>
                <p className="text-sm mt-1 font-medium">Your schedule is clear for now.</p>
              </div>
            ) : (
              upcomingAppts.slice(0, 4).map((appt, i) => (
                <div key={appt._id} className="flex items-center gap-5 px-8 py-5 hover:bg-slate-50 transition-colors group cursor-pointer">
                  <div className={`w-12 h-12 rounded-sm flex items-center justify-center font-extrabold text-lg flex-shrink-0 shadow-sm ${avatarBg[(i + 2) % avatarBg.length]}`}>
                    {appt.patient?.name?.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-extrabold text-slate-800 truncate group-hover:text-blue-600 transition-colors">{appt.patient?.name}</p>
                    <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-wider flex items-center gap-1.5"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>{appt.date} · {appt.time}</p>
                  </div>
                  <span className="bg-blue-50 text-blue-600 border border-blue-200 text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-sm flex-shrink-0">Upcoming</span>
                </div>
              ))
            )}
          </div>
          {upcomingAppts.length > 0 && (
            <div className="p-4 bg-slate-50/50 border-t border-slate-100 text-center">
              <Link to="/doctor/appointments" className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center justify-center gap-1">View Schedule <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg></Link>
            </div>
          )}
        </div>
      </div>

      {/* Earnings overview */}
      <div className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-200 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full text-blue-600 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
            <h3 className="text-base font-extrabold text-slate-800 tracking-tight">Earnings Overview</h3>
          </div>
          <Link to="/doctor/earnings" className="text-[10px] font-bold uppercase tracking-widest text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 bg-white border border-blue-100 px-3 py-1.5 rounded-sm shadow-sm">View Details <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg></Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          {[
            { label: 'Daily Revenue', sub: 'Today', value: '₹1,350', icon: '📅', color: 'text-blue-600', bg: 'bg-blue-50 text-blue-500' },
            { label: 'Weekly Revenue', sub: 'This week', value: '₹6,750', icon: '📆', color: 'text-violet-600', bg: 'bg-violet-50 text-violet-500' },
            { label: 'Monthly Revenue', sub: 'This month', value: '₹18,450', icon: '💰', color: 'text-emerald-600', bg: 'bg-emerald-50 text-emerald-500' },
          ].map((e) => (
            <div key={e.label} className="p-8 group hover:bg-slate-50/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-sm flex items-center justify-center text-xl shadow-sm border border-white ${e.bg}`}>
                  {e.icon}
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{e.label}</p>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">{e.sub}</p>
                </div>
              </div>
              <p className={`text-4xl font-black ${e.color} tracking-tight group-hover:scale-[1.02] transform transition-transform origin-left`}>{e.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboardPage;
