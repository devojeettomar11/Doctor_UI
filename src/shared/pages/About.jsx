const About = () => {
  return (
    <>
      <section id="about" className="py-24 bg-white relative overflow-hidden">
        <div className="blob -top-24 -left-24"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
              <div className="absolute inset-0 bg-sky-200 rounded-3xl transform rotate-3 scale-105 opacity-30">
              </div>
              <img src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=1000"
                alt="Healthcare Professional"
                className="relative rounded-3xl shadow-2xl z-10 w-full object-cover aspect-[4/5]" />
            </div>
            <div className="lg:w-1/2">
              <span className="text-sky-600 font-bold tracking-widest uppercase text-sm mb-4 block">About
                MediGhar</span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">MediGhar – Smart
                Healthcare at Your Fingertips</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                MediGhar is an emerging digital healthcare platform from India, built to make medicine
                delivery, lab tests, and doctor consultations easier and faster.
                <br/><br/>
                Our goal is simple — connect patients, pharmacies, and certified healthcare professionals
                through a fast, reliable digital system.
                <br/><br/>
                MediGhar is more than just an online pharmacy — it’s your all-in-one digital health
                companion.
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-sky-100 p-2 rounded-lg text-sky-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                      strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Our Vision</h4>
                    <p className="text-slate-600">To become one of India’s most trusted digital healthcare
                      platforms, helping people manage their health conveniently from home.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-sky-100 p-2 rounded-lg text-sky-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                      strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Our Mission</h4>
                    <p className="text-slate-600">
                      ✔ Authentic medicines<br/>
                      ✔ Reliable lab tests<br/>
                      ✔ Expert doctor consultations<br/>
                      ✔ Using technology to make healthcare smarter, faster, and easier.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-sky-100 p-2 rounded-lg text-sky-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                      strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">What We Offer</h4>
                    <p className="text-slate-600">
                      ✔ Verified Medicines<br/>
                      ✔ Reliable Delivery (Within Available Areas)<br/>
                      ✔ Online Doctor Consultation<br/>
                      ✔ Lab Test Bookings & Digital Reports
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
