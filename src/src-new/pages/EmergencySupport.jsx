import { Link } from 'react-router-dom';

const EmergencySupport = () => {
  return (
    <>
      <section className="bg-red-600 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <div className="flex justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse text-white">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl md:leading-[1.1] font-bold mb-6">
            24/7 Emergency Support
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-10 max-w-2xl mx-auto">
            In case of a medical emergency, don't wait. Call our dedicated helpline immediately for swift medical assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="tel:108" className="bg-white text-red-600 text-xl font-extrabold px-10 py-5 rounded-full hover:scale-105 active:scale-95 transition-transform shadow-xl flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              Call 108 Now
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="18" height="12" rx="2"/><path d="m15 15-3-3m0 0-3 3m3-3v6"/><path d="M16 8V6a2 2 0 0 0-2-2H10a2 2 0 0 0-2 2v2"/></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Ambulance Service</h3>
              <p className="text-slate-600">Standard and advanced life support ambulances available at a moment's notice.</p>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                 <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">On-call Doctors</h3>
              <p className="text-slate-600">Specialist doctors ready for immediate tele-consultation during emergencies.</p>
            </div>

             <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                 <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 21h4"/><path d="M12 17v4"/><path d="m20.2 14.5-.5.9A2 2 0 0 1 18 16.5H6a2 2 0 0 1-1.7-1.1l-.5-.9a2 2 0 0 1 .4-2.1L6 10V8a6 6 0 1 1 12 0v2l1.8 2.4a2 2 0 0 1 .4 2.1z"/><path d="M12 4v0"/></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">First-aid guidance</h3>
              <p className="text-slate-600">Stay calm and receive step-by-step critical first aid advice over the phone.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 text-center bg-white">
        <h2 className="text-2xl font-bold mb-4">Not an emergency?</h2>
        <p className="text-slate-600 mb-6 max-w-lg mx-auto">For routine questions, orders, or setting up appointments, please visit our standard contact page.</p>
        <Link to="/contact" className="text-sky-600 font-semibold hover:text-sky-800 hover:underline">Go to Contact Page &rarr;</Link>
      </section>
    </>
  );
};

export default EmergencySupport;
