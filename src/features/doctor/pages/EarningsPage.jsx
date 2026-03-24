import React from 'react';
import { useEarnings } from '../hooks/useEarnings';

const mockEarnings = [
  { _id: '1', patient: { name: 'Rahul Sharma' }, date: 'Mar 19, 2026', consultationFee: 500, doctorEarning: 450 },
  { _id: '2', patient: { name: 'Priya Singh' }, date: 'Mar 19, 2026', consultationFee: 500, doctorEarning: 450 },
  { _id: '3', patient: { name: 'Amit Verma' }, date: 'Mar 18, 2026', consultationFee: 500, doctorEarning: 450 },
  { _id: '4', patient: { name: 'Neha Gupta' }, date: 'Mar 17, 2026', consultationFee: 500, doctorEarning: 450 },
  { _id: '5', patient: { name: 'Sanjay Patel' }, date: 'Mar 16, 2026', consultationFee: 500, doctorEarning: 450 },
  { _id: '6', patient: { name: 'Anjali Mehta' }, date: 'Mar 15, 2026', consultationFee: 500, doctorEarning: 450 },
];

const periods = ['daily', 'weekly', 'monthly'];
const avatarColors = ['bg-blue-100 text-blue-700','bg-violet-100 text-violet-700','bg-emerald-100 text-emerald-700','bg-amber-100 text-amber-700','bg-pink-100 text-pink-700','bg-teal-100 text-teal-700'];

const EarningsPage = () => {
  const { earnings, summary, loading, period, changePeriod } = useEarnings();
  const hasReal = !loading && earnings.length > 0;
  const displayEarnings = hasReal ? earnings : mockEarnings;

  return (
    <div className="pb-20" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Earnings</h2>
       
      </div>

      {/* Summary stat cards */}
      <div className="grid grid-cols-4 gap-5 mb-6">
        {[
          { label: 'Daily Earnings', value: '₹1,350', sub: '3 consultations today', icon: '📅', g: 'from-blue-500 to-blue-700' },
          { label: 'Weekly Earnings', value: '₹6,750', sub: '15 consultations this week', icon: '📆', g:'from-blue-500 to-blue-700' },
          { label: 'Monthly Earnings', value: '₹18,450', sub: '41 consultations this month', icon: '💰', g: 'from-blue-500 to-blue-700' },
          { label: 'Total Earnings', value: '₹1,24,200', sub: '276 consultations all time', icon: '🏦', g: 'from-blue-500 to-blue-700' },
        ].map((card) => (
          <div key={card.label} className={`bg-gradient-to-br ${card.g} rounded-sm p-5 relative overflow-hidden`}>
            <div className="w-10 h-10 rounded-sm bg-white/20 flex items-center justify-center text-xl mb-3">{card.icon}</div>
            <p className="text-xl font-bold text-white mb-0.5">{card.value}</p>
            <p className="text-xs font-semibold text-white/80">{card.label}</p>
            <p className="text-xs text-white/55 mt-0.5">{card.sub}</p>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-sm bg-white/10" />
          </div>
        ))}
      </div>

      {/* Fee breakdown */}
      <div className="bg-white border border-slate-200 rounded-sm p-6 mb-6" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <p className="text-sm font-bold text-slate-800 mb-4">Fee Breakdown <span className="text-slate-400 font-normal text-xs ml-1">per appointment</span></p>
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-blue-50 border border-blue-100 rounded-sm p-4 text-center">
            <p className="text-xs font-semibold text-blue-400 mb-1">Consultation Fee</p>
            <p className="text-2xl font-bold text-blue-700">₹500</p>
            <p className="text-xs text-blue-400 mt-0.5">Charged to patient</p>
          </div>
          <div className="text-2xl text-slate-300 font-light">−</div>
          <div className="flex-1 bg-red-50 border border-red-100 rounded-sm p-4 text-center">
            <p className="text-xs font-semibold text-red-400 mb-1">Platform Fee</p>
            <p className="text-2xl font-bold text-red-500">₹50</p>
            <p className="text-xs text-red-400 mt-0.5">Medighar commission</p>
          </div>
          <div className="text-2xl text-slate-300 font-light">=</div>
          <div className="flex-1 bg-emerald-50 border border-emerald-200 rounded-sm p-4 text-center">
            <p className="text-xs font-semibold text-emerald-500 mb-1">Your Earnings</p>
            <p className="text-2xl font-bold text-emerald-700">₹450</p>
            <p className="text-xs text-emerald-500 mt-0.5">Per consultation</p>
          </div>
        </div>
      </div>

      {/* Transaction history */}
      <div className="bg-white border border-slate-200 rounded-sm overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <h3 className="text-sm font-bold text-slate-800">Transaction History</h3>
          </div>
          <div className="flex gap-1 bg-slate-100 rounded-sm p-1">
            {periods.map((p) => (
              <button
                key={p} onClick={() => changePeriod(p)}
                className={`px-4 py-1.5 text-xs font-bold rounded-sm capitalize transition-all ${
                  period === p ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Table header */}
        <div className="grid grid-cols-4 gap-4 px-6 py-3 bg-slate-50 border-b border-slate-100">
          {['Patient', 'Date', 'Consultation Fee', 'Your Earnings'].map((h) => (
            <p key={h} className="text-xs font-bold text-slate-400 uppercase tracking-wider">{h}</p>
          ))}
        </div>

        {loading ? (
          <div className="p-6 space-y-3">
            {[1,2,3].map((n) => <div key={n} className="h-14 bg-slate-100 rounded-sm animate-pulse" />)}
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {displayEarnings.map((item, index) => (
              <div key={item._id || index} className="grid grid-cols-4 gap-4 items-center px-6 py-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-sm flex items-center justify-center font-bold text-sm flex-shrink-0 ${avatarColors[index % avatarColors.length]}`}>
                    {item.patient?.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <p className="text-sm font-semibold text-slate-800 truncate">{item.patient?.name}</p>
                </div>
                <p className="text-sm text-slate-500">{item.date || '—'}</p>
                <p className="text-sm text-slate-600 font-medium">₹{(item.consultationFee || 500).toLocaleString('en-IN')}</p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
                  <p className="text-sm font-bold text-emerald-600">+₹{(item.doctorEarning || 450).toLocaleString('en-IN')}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer total */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-t border-slate-100">
          <p className="text-sm font-bold text-slate-500">Total ({displayEarnings.length} transactions)</p>
          <p className="text-base font-bold text-emerald-600">
            +₹{displayEarnings.reduce((s, e) => s + (e.doctorEarning || 450), 0).toLocaleString('en-IN')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EarningsPage;
