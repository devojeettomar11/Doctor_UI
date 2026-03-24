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
      <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://img.freepik.com/premium-photo/health-insurance-concept-plus-sign-healthcare-medical-icon-health-access-welfare-health-c_820340-30087.jpg?semt=ais_hybrid&w=740&q=80"
            className="w-full h-full object-cover brightness-[0.75]"
            alt="Stethoscope on reflective surface"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50 to-slate-50"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-sky-100 text-sky-700 text-sm font-bold uppercase tracking-widest animate-pulse">
            Next-Gen Healthcare
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-tight drop-shadow-lg">
            Your Health, <br /><span className="text-sky-400">Our Priority</span>
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
            <div className="text-3xl font-bold text-sky-600 mb-1">30+</div>
            <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Top Doctors</div>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center card-hover">
            <div className="text-3xl font-bold text-sky-600 mb-1">100%</div>
            <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Safe & Secure</div>
          </div>
          {/* A dummy card to make it 4 columns, since one was commented out in original HTML. But original HTML had 3 cards and grid-cols-4. I will adjust the first card to what was commented out. */}
          {/* <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center card-hover">
            <div className="text-3xl font-bold text-sky-600 mb-1">24/7</div>
            <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Availability</div>
          </div> */}
        </div>
      </section>



      {/* ALL FEATURES SECTION */}
      <section id="all-features" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sky-600 font-bold tracking-widest uppercase text-sm mb-4 block">Our Ecosystem</span>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Everything You Need for <span className="text-sky-600">Better Health</span></h2>
            <p className="text-slate-600 text-lg">Explore all our services designed to make your healthcare journey seamless and stress-free.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Online Consultation", desc: "Talk to certified doctors instantly.", icon: "👨‍⚕️", link: "/online-consultation" },
              { title: "Lab Tests", desc: "Book diagnostic tests from home.", icon: "🔬", link: "/lab-tests" },
              { title: "Order Tracking", desc: "Track your medicines in real-time.", icon: "📦", link: "/order-tracking" },
              { title: "Medicine Reminder", desc: "Never miss a dose with smart alerts.", icon: "⏰", link: "/medicine-reminder" },
              { title: "Emergency Support", desc: "24/7 urgent medical guidance.", icon: "🚑", link: "/emergency-support" },
              { title: "Our Services", desc: "Discover our full range of care.", icon: "🏥", link: "/services" },
              { title: "About Us", desc: "Learn about our mission and vision.", icon: "📖", link: "/about" },
              { title: "Careers", desc: "Join our mission to save lives.", icon: "💼", link: "/careers" },
              { title: "Contact Us", desc: "We're here to help you 24/7.", icon: "📞", link: "/contact" }
            ].map((feature, idx) => (
              <div key={idx} className="group bg-slate-50 rounded-4xl p-8 border border-slate-100 hover:border-sky-200 hover:bg-white hover:shadow-2xl hover:shadow-sky-100 transition-all duration-500 hover:-translate-y-2">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-sky-600 transition-colors">{feature.title}</h3>
                <p className="text-slate-500 mb-6 line-clamp-2">{feature.desc}</p>
                <Link to={feature.link} className="inline-flex items-center gap-2 text-sky-600 font-bold hover:gap-3 transition-all">
                  Explore Now
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOIN US CTA SECTION */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Decorative Background Icons (Subtle) */}
        <div className="absolute top-10 right-10 opacity-10 animate-pulse">
          <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
        </div>
        <div className="absolute bottom-10 left-10 opacity-10">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m16 12-4-4-4 4m0 4h8" /></svg>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
            Ready to Take Control of <br /><span className="text-sky-400">Your Health?</span>
          </h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of users who trust MediGhar for their daily healthcare needs. Fast, secure, and professional.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link to="/register" className="w-full md:w-auto bg-sky-500 text-white px-12 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-sky-900/20 hover:bg-sky-600 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3">
              Create Free Account <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </Link>
            <div className="text-slate-500 font-bold uppercase tracking-widest text-sm">OR</div>
            <Link to="/login" className="w-full md:w-auto bg-white/10 backdrop-blur-md text-white border border-white/20 px-12 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center">
              Login to Portal
            </Link>
          </div>

          <div className="mt-16 flex items-center justify-center gap-8 border-t border-white/10 pt-16 grayscale opacity-50">
            <span className="font-bold text-2xl">TRUSTED</span>
            <span className="font-bold text-2xl">SECURE</span>
            <span className="font-bold text-2xl">24/7</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
