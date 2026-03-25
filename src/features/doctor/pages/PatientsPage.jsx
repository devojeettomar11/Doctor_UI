import React from 'react';
import { usePatients } from '../hooks/usePatients';

const mockPatients = [
  { _id: '1', name: 'Rahul Sharma', phone: '9876543210', appointmentCount: 4, lastVisit: 'Mar 19, 2026', condition: 'Hypertension' },
  { _id: '2', name: 'Priya Singh', phone: '9123456780', appointmentCount: 2, lastVisit: 'Mar 18, 2026', condition: 'Diabetes' },
  { _id: '3', name: 'Amit Verma', phone: '9988776655', appointmentCount: 7, lastVisit: 'Mar 17, 2026', condition: 'Asthma' },
  { _id: '4', name: 'Neha Gupta', phone: '9001122334', appointmentCount: 1, lastVisit: 'Mar 15, 2026', condition: 'Routine checkup' },
  { _id: '5', name: 'Sanjay Patel', phone: '9771234560', appointmentCount: 3, lastVisit: 'Mar 12, 2026', condition: 'Back pain' },
  { _id: '6', name: 'Anjali Mehta', phone: '9660011223', appointmentCount: 5, lastVisit: 'Mar 10, 2026', condition: 'Migraine' },
  { _id: '7', name: 'Vikram Nair', phone: '9550033221', appointmentCount: 2, lastVisit: 'Mar 8, 2026', condition: 'Thyroid' },
  { _id: '8', name: 'Sunita Das', phone: '9440011298', appointmentCount: 6, lastVisit: 'Mar 5, 2026', condition: 'Arthritis' },
];

const mockHistory = [
  { _id: 'h1', date: 'Mar 19, 2026', status: 'completed', notes: 'Fever and cold. Prescribed paracetamol 500mg twice daily.' },
  { _id: 'h2', date: 'Mar 5, 2026', status: 'completed', notes: 'Follow-up for blood pressure. BP improved. Continue medication.' },
  { _id: 'h3', date: 'Feb 20, 2026', status: 'completed', notes: 'Routine checkup. All vitals normal. No issues found.' },
];

const avatarColors = [
  { bg: 'bg-indigo-100', text: 'text-indigo-700', ring: 'ring-indigo-200' },
  { bg: 'bg-rose-100', text: 'text-rose-700', ring: 'ring-rose-200' },
  { bg: 'bg-emerald-100', text: 'text-emerald-700', ring: 'ring-emerald-200' },
  { bg: 'bg-amber-100', text: 'text-amber-700', ring: 'ring-amber-200' },
  { bg: 'bg-cyan-100', text: 'text-cyan-700', ring: 'ring-cyan-200' },
  { bg: 'bg-fuchsia-100', text: 'text-fuchsia-700', ring: 'ring-fuchsia-200' },
];

const PatientsPage = () => {
  const { patients, selectedPatient, patientHistory, loading, historyLoading, search, setSearch, selectPatient, clearSelectedPatient } = usePatients();

  const hasReal = !loading && patients && patients.length > 0;
  const allPatients = hasReal ? patients : mockPatients;
  const displayPatients = allPatients.filter((p) =>
    p.name?.toLowerCase().includes((search || '').toLowerCase()) || p.phone?.includes(search || '')
  );
  const displayHistory = patientHistory && patientHistory.length > 0 ? patientHistory : mockHistory;

  const totalVisits = allPatients.reduce((s, p) => s + (p.appointmentCount || 0), 0);
  const avgVisits = allPatients.length ? Math.round(totalVisits / allPatients.length) : 0;

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Header */}
      <div className="mb-10 w-full bg-white rounded-sm p-8 shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-50 pointer-events-none"></div>
        <div className="relative z-10 w-full">
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Patients Data</h2>
          
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-slate-200 rounded-sm p-6 shadow-sm flex items-center justify-between group hover:shadow-md transition">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Total Patients</p>
            <p className="text-4xl font-black text-slate-800">{allPatients.length}</p>
          </div>
          <div className="w-14 h-14 rounded-sm bg-blue-50 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-sm p-6 shadow-sm flex items-center justify-between group hover:shadow-md transition">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Total Consultations</p>
            <p className="text-4xl font-black text-slate-800">{totalVisits}</p>
          </div>
          <div className="w-14 h-14 rounded-sm bg-violet-50 text-violet-500 flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-sm p-6 shadow-sm flex items-center justify-between group hover:shadow-md transition">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Avg Visits / Patient</p>
            <p className="text-4xl font-black text-slate-800">{avgVisits}</p>
          </div>
          <div className="w-14 h-14 rounded-sm bg-emerald-50 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">

        {/* LEFT — Patient cards list */}
        <div className="flex-1 min-w-0 flex flex-col h-[calc(100vh-280px)]">

          {/* Search Bar */}
          <div className="relative mb-6 flex-shrink-0">
            <svg className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></svg>
            <input
              type="text" value={search || ''} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or phone..."
              className="w-full pl-14 pr-6 py-4 text-sm font-bold text-slate-700 bg-white border border-slate-200 rounded-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:font-semibold placeholder:text-slate-400 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)]"
            />
          </div>

          <div className="flex-1 overflow-y-auto pr-2 pb-4 space-y-4 custom-scrollbar">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((n) => <div key={n} className="h-40 bg-slate-100 rounded-sm animate-pulse" />)}
              </div>
            ) : displayPatients.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full bg-white rounded-sm border border-slate-200 shadow-sm p-10">
                <div className="w-20 h-20 bg-slate-50 rounded-sm flex items-center justify-center mb-4">
                  <span className="text-3xl">👥</span>
                </div>
                <p className="text-lg font-extrabold text-slate-800">No patients found</p>
                <p className="text-slate-500 text-sm mt-1 font-medium">Try adjusting your search terms</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayPatients.map((patient, i) => {
                  const color = avatarColors[i % avatarColors.length];
                  const isSelected = selectedPatient?._id === patient._id;
                  return (
                    <button
                      key={patient._id}
                      onClick={() => selectPatient(patient)}
                      className={`w-full text-left bg-white rounded-sm border p-5 transition-all duration-300 relative overflow-hidden group ${isSelected
                          ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-[0_8px_30px_-4px_rgba(29,78,216,0.15)] bg-blue-50/10'
                          : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
                        }`}
                    >
                      {/* Accent border on hover */}
                      <div className={`absolute left-0 top-0 w-1.5 h-full transition-colors ${isSelected ? 'bg-blue-500' : 'bg-transparent group-hover:bg-slate-200'}`}></div>

                      <div className="flex items-center gap-4 mb-4 pl-2">
                        <div className={`w-14 h-14 rounded-sm flex items-center justify-center font-extrabold text-xl flex-shrink-0 shadow-sm ${color.bg} ${color.text}`}>
                          {patient.name?.charAt(0)?.toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-base font-extrabold text-slate-800 truncate">{patient.name}</p>
                          <p className="text-sm font-semibold text-slate-500 mt-0.5">{patient.phone}</p>
                        </div>
                        {isSelected && (
                          <div className="w-6 h-6 rounded-sm bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm text-white">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                          </div>
                        )}
                      </div>

                      <div className="pl-2 border-t border-slate-100 pt-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Visits</span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last Visit</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 font-bold text-slate-700 bg-slate-50 px-2.5 py-1 rounded-sm border border-slate-200">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-400"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>
                            {patient.appointmentCount || 0}
                          </div>
                          <p className="text-xs font-bold text-slate-600">{patient.lastVisit || '—'}</p>
                        </div>
                        {patient.condition && (
                          <div className="mt-3">
                            <span className="inline-block text-[10px] font-bold uppercase tracking-widest bg-blue-50 text-blue-600 border border-blue-200 px-3 py-1.5 rounded-sm">
                              {patient.condition}
                            </span>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT — Patient History panel */}
        <div className="w-full lg:w-[400px] flex-shrink-0 lg:h-[calc(100vh-280px)] flex flex-col mt-6 lg:mt-0">
          {selectedPatient ? (
            <div className="bg-white rounded-sm border border-slate-200 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] flex flex-col h-full overflow-hidden relative">

              {/* Profile Card Header */}
              <div className="p-8 pb-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-b border-slate-800 relative overflow-hidden flex-shrink-0">
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500 rounded-full blur-[80px] opacity-20 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500 rounded-full blur-[80px] opacity-20 pointer-events-none"></div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Patient File</p>
                    <button onClick={clearSelectedPatient} className="w-8 h-8 rounded-sm bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all backdrop-blur-sm focus:outline-none">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    </button>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-sm bg-gradient-to-tr from-blue-500 to-blue-600 flex items-center justify-center font-black text-4xl text-white border-4 border-slate-800 shadow-xl mb-4">
                      {selectedPatient.name?.charAt(0)?.toUpperCase()}
                    </div>
                    <h3 className="text-xl font-extrabold text-white text-center mb-1">{selectedPatient.name}</h3>
                    <p className="text-sm font-semibold text-slate-400 text-center mb-4 flex items-center gap-1.5"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>{selectedPatient.phone}</p>

                    {selectedPatient.condition && (
                      <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-widest bg-white/10 text-white px-3 py-1.5 rounded-sm border border-white/10 backdrop-blur-sm shadow-sm">
                        {selectedPatient.condition}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Patient Stats overlap */}
              <div className="px-6 -mt-8 relative z-20 flex-shrink-0">
                <div className="bg-white rounded-sm shadow-lg border border-slate-200 p-4 grid grid-cols-2 gap-4">
                  <div className="text-center border-r border-slate-100">
                    <p className="text-2xl font-black text-slate-800">{selectedPatient.appointmentCount || 0}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Total Visits</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-black text-slate-800">₹{((selectedPatient.appointmentCount || 0) * 450).toLocaleString('en-IN')}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Total Paid</p>
                  </div>
                </div>
              </div>

              {/* History scrollable area */}
              <div className="flex-1 overflow-y-auto p-6 pt-8 bg-slate-50/50 block">
                <div className="flex items-center justify-between mb-5">
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Visit History</p>
                  <div className="px-2 py-1 bg-slate-200 text-slate-500 text-[10px] font-bold rounded-sm uppercase tracking-wider">{displayHistory.length} Records</div>
                </div>

                {historyLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((n) => <div key={n} className="h-24 bg-slate-100 rounded-sm animate-pulse" />)}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {displayHistory.map((visit, i) => (
                      <div key={visit._id || i} className="bg-white border border-slate-200 rounded-sm p-5 shadow-sm hover:shadow-md transition-shadow relative">
                        {/* Timeline line visual */}
                        <div className="absolute left-0 top-6 bottom-[-20px] w-0.5 bg-slate-100 hidden last:hidden"></div>

                        <div className="flex justify-between items-start mb-3">
                          <p className="text-xs font-bold text-slate-800 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-sm bg-blue-500"></span>
                            {visit.date}
                          </p>
                          <span className={`text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded-sm ${visit.status === 'completed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-slate-50 text-slate-500 border border-slate-300'
                            }`}>
                            {visit.status}
                          </span>
                        </div>
                        <div className="bg-slate-50 rounded-sm p-3 border border-slate-200 mt-3">
                          <p className="text-sm text-slate-600 font-medium leading-relaxed">{visit.notes || 'No notes recorded for this visit.'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-slate-50/80 border-2 border-dashed border-slate-300 rounded-sm p-10 flex flex-col items-center justify-center text-center h-full">
              <div className="w-20 h-20 rounded-sm bg-white shadow-sm flex items-center justify-center mb-6 border border-slate-200">
                <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4-8 4 8m-4-8v8" /></svg>
              </div>
              <p className="text-xl font-extrabold text-slate-700">Select a patient</p>
              <p className="text-sm font-semibold text-slate-400 mt-2 max-w-[200px]">Click any patient card to instantly view their medical records and history</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientsPage;
