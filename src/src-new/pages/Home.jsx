import { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [medicineName, setMedicineName] = useState('');
  const [medicineTime, setMedicineTime] = useState('');
  const [reminders, setReminders] = useState([]);

  const handleAddReminder = () => {
    if (!medicineName.trim() || !medicineTime) {
      alert("Please enter both medicine name and time");
      return;
    }
    setReminders([...reminders, { id: Date.now(), name: medicineName, time: medicineTime }]);
    setMedicineName('');
    setMedicineTime('');
  };

  const handleDeleteReminder = (id) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  return (
    <>
      {/* Home Section */}
      <section id="home" className="relative min-h-screen pt-20 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://img.freepik.com/premium-photo/health-insurance-concept-plus-sign-healthcare-medical-icon-health-access-welfare-health-c_820340-30087.jpg?semt=ais_hybrid&w=740&q=80"
            className="w-full h-full object-cover brightness-[0.75]" 
            alt="Stethoscope on reflective surface" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50 to-slate-50"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center mt-[-10vh]">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-sky-100 text-sky-700 text-sm font-bold uppercase tracking-widest animate-pulse">
            Next-Gen Healthcare
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-tight drop-shadow-lg">
            Your Health, <br/><span className="text-sky-400">Our Priority</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-700 max-w-3xl mx-auto leading-relaxed mb-10 font-medium">
            MediGhar brings modern medical support to your home — from doctor consultations to fast medicine
            delivery, lab tests, and emergency help.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto w-full px-6 mt-24">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center card-hover">
            <div className="text-3xl font-bold text-sky-600 mb-1">With in 40 min</div>
            <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Delivery time</div>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center card-hover">
            <div className="text-3xl font-bold text-sky-600 mb-1">300+</div>
            <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Top Doctors</div>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center card-hover">
            <div className="text-3xl font-bold text-sky-600 mb-1">100%</div>
            <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Safe & Secure</div>
          </div>
          {/* A dummy card to make it 4 columns, since one was commented out in original HTML. But original HTML had 3 cards and grid-cols-4. I will adjust the first card to what was commented out. */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center card-hover">
            <div className="text-3xl font-bold text-sky-600 mb-1">24/7</div>
            <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Availability</div>
          </div>
        </div>
      </section>

      {/* MEDICINE REMINDER SECTION */}
      <section id="reminder" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content Side */}
            <div>
              <span className="text-sky-600 font-bold tracking-widest uppercase text-sm">Smart Healthcare</span>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mt-4 mb-6 leading-tight">
                Never Miss a Dose with <span className="text-sky-600">Smart Reminders</span>
              </h2>
              <p className="text-slate-600 text-lg mb-10 leading-relaxed">
                Manage your treatment schedule effortlessly. Set reminders for your medications and stay on track with your recovery.
              </p>

              <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <h4 className="text-xl font-bold text-slate-800 mb-6">Set New Reminder</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-2">Medicine Name</label>
                    <input 
                      type="text" 
                      value={medicineName}
                      onChange={(e) => setMedicineName(e.target.value)}
                      placeholder="e.g. Paracetamol" 
                      className="w-full px-5 py-4 bg-white rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-2">Reminder Time</label>
                    <input 
                      type="time" 
                      value={medicineTime}
                      onChange={(e) => setMedicineTime(e.target.value)}
                      className="w-full px-5 py-4 bg-white rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                    />
                  </div>
                  <button 
                    onClick={handleAddReminder} 
                    className="w-full bg-sky-600 text-white py-5 rounded-2xl font-bold shadow-lg shadow-sky-200 hover:bg-sky-700 transition-all transform hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"/><path d="M12 5v14"/>
                    </svg>
                    Add Reminder
                  </button>
                </div>
              </div>
            </div>

            {/* List Side */}
            <div className="relative">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-200 min-h-[400px]">
                <div className="flex items-center justify-between mb-8">
                  <h4 className="font-bold text-slate-800">Your Reminders</h4>
                  <span className="text-xs text-sky-600 font-bold px-3 py-1 bg-sky-50 rounded-full">ACTIVE</span>
                </div>

                <div className="space-y-4">
                  {reminders.length > 0 ? (
                    reminders.map((reminder) => (
                      <div key={reminder.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center text-sky-600">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>
                          </div>
                          <div>
                            <p className="font-bold text-slate-800">{reminder.name}</p>
                            <p className="text-slate-500 text-sm flex items-center gap-1">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                              {reminder.time}
                            </p>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleDeleteReminder(reminder.id)}
                          className="text-red-500 font-bold hover:text-red-700 transition-colors px-4 py-2 hover:bg-red-50 rounded-lg"
                        >
                          Delete
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>
                      </div>
                      <p className="text-slate-400 font-medium">No reminders added yet</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Decoration */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-sky-100 rounded-full -z-10 blur-3xl opacity-60"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-100 rounded-full -z-10 blur-3xl opacity-60"></div>
            </div>
          </div>
        </div>
      </section>

      {/* UNIQUE FEATURE SECTION (from index1.html) */}
      <section id="features" className="py-24 feature-gradient overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content Side */}
            <div className="order-2 lg:order-1">
              <span className="text-sky-600 font-bold tracking-widest uppercase text-sm">Our Unique Feature</span>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mt-4 mb-6 leading-tight">
                Complete Control Over Your <span className="text-sky-600">Medicine Purchases</span>
              </h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                Unlike traditional medical apps, Medighar allows you to first select the medicines you need and then compare prices from multiple nearby medical stores.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-sky-600 border border-sky-50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-800">Better Price Transparency</h4>
                    <p className="text-slate-500">Know exactly what you're paying and where the best deals are.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-green-500 border border-green-50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-800">Cost Savings</h4>
                    <p className="text-slate-500">Save money on every order by choosing the most affordable local pharmacy.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-indigo-500 border border-indigo-50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-800">Freedom to Choose</h4>
                    <p className="text-slate-500">Place orders at the medical store you trust the most.</p>
                  </div>
                </div>
              </div>

              <p className="mt-10 font-semibold text-slate-800 bg-white/50 md:inline-block px-4 py-2 rounded-lg border border-white">
                With Medighar, you make informed decisions and save money.
              </p>
            </div>

            {/* Visual Side (Mockup Comparison) */}
            <div className="order-1 lg:order-2 relative">
              <div className="bg-white rounded-[2.5rem] shadow-xl p-6 border border-slate-200 max-w-md mx-auto relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h5 className="font-bold text-slate-800">Price Comparison</h5>
                  <span className="text-xs text-sky-600 font-bold px-2 py-1 bg-sky-50 rounded-md">3 Stores Near You</span>
                </div>
                
                <div className="space-y-4">
                  {/* Store 1 */}
                  <div className="p-4 rounded-2xl border-2 border-sky-500 bg-sky-50 relative">
                    <div className="absolute -top-3 right-4 bg-sky-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">LOWEST PRICE</div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-lg">🏪</div>
                        <div>
                          <p className="font-bold text-slate-800 text-sm">City Pharma</p>
                          <p className="text-[10px] text-slate-500">0.8 km away • ★ 4.8</p>
                        </div>
                      </div>
                      <p className="text-lg font-bold text-sky-600">₹442.00</p>
                    </div>
                  </div>
                  {/* Store 2 */}
                  <div className="p-4 rounded-2xl border border-slate-100 bg-white">
                    <div className="flex justify-between items-center opacity-70">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-lg">🏥</div>
                        <div>
                          <p className="font-bold text-slate-800 text-sm">HealthFirst Meds</p>
                          <p className="text-[10px] text-slate-500">1.2 km away • ★ 4.5</p>
                        </div>
                      </div>
                      <p className="text-lg font-bold text-slate-400">₹485.00</p>
                    </div>
                  </div>
                  {/* Store 3 */}
                  <div className="p-4 rounded-2xl border border-slate-100 bg-white">
                    <div className="flex justify-between items-center opacity-70">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-lg">🏬</div>
                        <div>
                          <p className="font-bold text-slate-800 text-sm">Apollo Store</p>
                          <p className="text-[10px] text-slate-500">2.5 km away • ★ 4.2</p>
                        </div>
                      </div>
                      <p className="text-lg font-bold text-slate-400">₹510.00</p>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-6 bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-2">
                  <span>Order from City Pharma</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </button>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-sky-200 rounded-full blur-3xl opacity-50"></div>
              <div className="absolute -top-10 -left-10 w-48 h-48 bg-indigo-200 rounded-full blur-3xl opacity-30"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
