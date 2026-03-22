import React, { useState } from 'react';
import { registerDoctor, uploadDoctorDocuments } from '../api/doctorApi';

const steps = [
  { id: 1, label: 'Register', desc: 'Basic details' },
  { id: 2, label: 'Documents', desc: 'Upload files' },
  { id: 3, label: 'Verification', desc: 'Admin review' },
  { id: 4, label: 'Approved', desc: 'Start working' },
];

const specializations = ['Cardiologist', 'Dermatologist', 'Neurologist', 'Orthopedic', 'Pediatrician', 'Psychiatrist', 'General Physician', 'ENT Specialist', 'Gynecologist', 'Oncologist'];

const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ name: '', specialization: '', phone: '', consultationFee: '', experience: '', bio: '' });
  const [docs, setDocs] = useState({ medicalLicense: null, degree: null, idProof: null });

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const handleFile = (e) => setDocs((p) => ({ ...p, [e.target.name]: e.target.files[0] }));

  const handleRegister = async () => {
    setLoading(true); setError(null);
    try { await registerDoctor(form); setCurrentStep(2); }
    catch (err) { setError(err.response?.data?.message || 'Registration failed. Please try again.'); }
    finally { setLoading(false); }
  };

  const handleDocuments = async () => {
    setLoading(true); setError(null);
    try {
      const fd = new FormData();
      Object.entries(docs).forEach(([k, v]) => { if (v) fd.append(k, v); });
      await uploadDoctorDocuments(fd);
      setCurrentStep(3);
    }
    catch (err) { setError(err.response?.data?.message || 'Upload failed. Please try again.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="pb-10" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Doctor Onboarding</h2>
       
      </div>

      {/* Step indicator */}
      <div className="bg-white border border-slate-200 rounded-sm p-5 mb-6" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <div className="flex items-center">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 rounded-sm flex items-center justify-center text-sm font-bold transition-all ${
                  step.id < currentStep ? 'bg-emerald-500 text-white'
                  : step.id === currentStep ? 'text-white shadow-lg'
                  : 'bg-slate-100 text-slate-400'
                }`}
                style={step.id === currentStep ? { backgroundColor: '#26c6da', boxShadow: '0 4px 12px rgba(38,198,218,0.35)' } : {}}>
                  {step.id < currentStep ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  ) : step.id}
                </div>
                <p className={`text-xs font-bold mt-2 ${step.id === currentStep ? 'text-blue-600' : step.id < currentStep ? 'text-emerald-600' : 'text-slate-400'}`}>{step.label}</p>
                <p className="text-xs text-slate-300">{step.desc}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-3 mb-7 transition-all ${step.id < currentStep ? 'bg-emerald-400' : 'bg-slate-200'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-sm px-5 py-3.5 mb-5 text-red-700 text-sm font-medium">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          {error}
        </div>
      )}

      {/* Step 1 */}
      {currentStep === 1 && (
        <div className="bg-white border border-slate-200 rounded-sm overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
            <h3 className="text-sm font-bold text-slate-800">Step 1 — Basic Information</h3>
            <p className="text-xs text-slate-400 mt-0.5">Fill in your professional details</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Full Name <span className="text-red-400">*</span></label>
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Dr. John Doe"
                  className="w-full text-sm border border-slate-200 rounded-sm px-3.5 py-2.5 focus:outline-none focus:ring-2 transition-all bg-white text-slate-800 placeholder-slate-300" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Specialization <span className="text-red-400">*</span></label>
                <select name="specialization" value={form.specialization} onChange={handleChange}
                  className="w-full text-sm border border-slate-200 rounded-sm px-3.5 py-2.5 focus:outline-none focus:ring-2 transition-all bg-white text-slate-800">
                  <option value="">Select specialization</option>
                  {specializations.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Phone Number <span className="text-red-400">*</span></label>
                <input type="text" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 9876543210"
                  className="w-full text-sm border border-slate-200 rounded-sm px-3.5 py-2.5 focus:outline-none focus:ring-2 transition-all bg-white text-slate-800 placeholder-slate-300" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Consultation Fee (₹) <span className="text-red-400">*</span></label>
                <input type="number" name="consultationFee" value={form.consultationFee} onChange={handleChange} placeholder="500"
                  className="w-full text-sm border border-slate-200 rounded-sm px-3.5 py-2.5 focus:outline-none focus:ring-2 transition-all bg-white text-slate-800 placeholder-slate-300" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Experience (years)</label>
                <input type="number" name="experience" value={form.experience} onChange={handleChange} placeholder="5"
                  className="w-full text-sm border border-slate-200 rounded-sm px-3.5 py-2.5 focus:outline-none focus:ring-2 transition-all bg-white text-slate-800 placeholder-slate-300" />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Bio</label>
                <textarea name="bio" value={form.bio} onChange={handleChange} rows={3} placeholder="Brief description about your expertise and approach to patient care..."
                  className="w-full text-sm border border-slate-200 rounded-sm px-3.5 py-2.5 focus:outline-none focus:ring-2 transition-all bg-white text-slate-800 placeholder-slate-300 resize-none" />
              </div>
            </div>
            <div className="flex justify-end mt-8">
              <button onClick={handleRegister} disabled={loading || !form.name || !form.specialization}
                className="flex items-center gap-2 px-8 py-3.5 text-sm font-bold text-white rounded-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:opacity-90 active:scale-95"
                style={{ backgroundColor: '#26c6da', boxShadow: '0 4px 12px rgba(38,198,218,0.3)' }}>
                {loading ? 'Submitting...' : 'Continue →'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {currentStep === 2 && (
        <div className="bg-white border border-slate-200 rounded-sm overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
            <h3 className="text-sm font-bold text-slate-800">Step 2 — Upload Documents</h3>
            <p className="text-xs text-slate-400 mt-0.5">All three documents are required for verification</p>
          </div>
          <div className="p-6 space-y-4">
            {[
              { name: 'medicalLicense', label: 'Medical License', desc: 'Government issued medical license' },
              { name: 'degree', label: 'Medical Degree Certificate', desc: 'MBBS, MD, or equivalent degree' },
              { name: 'idProof', label: 'ID Verification', desc: 'Aadhaar Card, PAN Card, or Passport' },
            ].map((doc) => (
              <div key={doc.name}>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">
                  {doc.label} <span className="text-red-400">*</span>
                  <span className="text-slate-400 font-normal ml-1">— {doc.desc}</span>
                </label>
                <label htmlFor={doc.name}
                  className={`flex items-center gap-4 w-full p-4 border-2 border-dashed rounded-sm cursor-pointer transition-all ${
                    docs[doc.name] ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50'
                  }`}>
                  <div className={`w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0 ${docs[doc.name] ? 'bg-emerald-100' : 'bg-white border border-slate-200'}`}>
                    {docs[doc.name] ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                    )}
                  </div>
                  <div>
                    {docs[doc.name] ? (
                      <>
                        <p className="text-sm font-bold text-emerald-700">{docs[doc.name].name}</p>
                        <p className="text-xs text-emerald-500 mt-0.5">Click to change file</p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm font-semibold text-slate-500">Click to upload file</p>
                        <p className="text-xs text-slate-400 mt-0.5">PDF, JPG, PNG — Max 5MB</p>
                      </>
                    )}
                  </div>
                </label>
                <input type="file" id={doc.name} name={doc.name} accept=".pdf,.jpg,.jpeg,.png" onChange={handleFile} className="hidden" />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-t border-slate-200">
            <button onClick={() => setCurrentStep(1)} className="px-5 py-2.5 text-sm font-bold text-slate-500 border border-slate-200 rounded-sm hover:bg-white transition-colors">
              ← Back
            </button>
            <button onClick={handleDocuments} disabled={loading || !docs.medicalLicense || !docs.degree || !docs.idProof}
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white rounded-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:opacity-90"
              style={{ backgroundColor: '#26c6da', boxShadow: '0 4px 12px rgba(38,198,218,0.25)' }}>
              {loading ? 'Uploading...' : 'Submit Documents →'}
            </button>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {currentStep === 3 && (
        <div className="bg-white border border-slate-200 rounded-sm p-10 text-center" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <div className="w-20 h-20 rounded-sm bg-amber-100 flex items-center justify-center mx-auto mb-5">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Under Review</h3>
          <p className="text-slate-500 text-sm max-w-sm mx-auto">
            Documents submitted successfully! Our admin team will review and approve your account within <strong className="text-slate-700">24–48 hours</strong>.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-sm px-5 py-3 text-sm font-semibold text-amber-700">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Email notification will be sent on approval
          </div>
        </div>
      )}

      {/* Step 4 */}
      {currentStep === 4 && (
        <div className="bg-white border border-slate-200 rounded-sm p-10 text-center" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <div className="w-20 h-20 rounded-sm bg-emerald-100 flex items-center justify-center mx-auto mb-5">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.5"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Account Approved! 🎉</h3>
          <p className="text-slate-500 text-sm max-w-sm mx-auto">
            Your account has been verified. Set your availability and start accepting patient appointments.
          </p>
        </div>
      )}
    </div>
  );
};

export default OnboardingPage;
