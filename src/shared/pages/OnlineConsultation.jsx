import { useRef } from 'react';

const OnlineConsultation = () => {
  const specialitySliderRef = useRef(null);
  const doctorSliderRef = useRef(null);

  const scrollSlider = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = ref.current.clientWidth * 0.65;
      ref.current.scrollBy({
        left: direction === 'next' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
    <div className="relative">
        <div className="absolute inset-0 -z-10 opacity-60">
          <div className="absolute -top-20 -left-10 w-64 h-64 bg-[#0c7ed0] blur-[120px]"></div>
          <div className="absolute top-32 right-0 w-72 h-72 bg-sky-200 blur-[140px]"></div>
        </div>

        <section className="px-4 sm:px-6 lg:px-8 pb-14">
          <div className="max-w-5xl mx-auto bg-gradient-to-r from-[#0c7ed0] to-[#0a6ab1] text-white rounded-[38px] shadow-[0_30px_60px_rgba(13,70,140,0.35)] px-8 sm:px-12 py-10 sm:py-12 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 text-center md:text-left space-y-5">
              <div className="inline-flex items-center gap-2 bg-white/15 px-4 py-2 rounded-full text-sm font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-300 animate-pulse"></span>
                42 Doctors Online Now
              </div>
              <h1 className="text-4xl md:text-[3.2rem] font-bold leading-tight">
                Consult Doctors Anytime, Anywhere
              </h1>
              <p className="text-white/90 text-lg max-w-xl">
                Talk to certified doctors online & get expert medical advice instantly.
              </p>
              <button className="inline-flex items-center justify-center bg-white text-[#0b73c9] font-semibold px-8 py-3 rounded-full shadow-xl shadow-blue-200 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition">
                Book Consultation
              </button>
            </div>
            <div className="flex-shrink-0 w-full md:w-auto">
              <div className="relative mx-auto w-64 h-48 sm:w-72 sm:h-56 lg:w-80 lg:h-[270px] rounded-[26px] bg-white/20 p-1.5 shadow-[0_25px_45px_rgba(5,58,115,0.35)]">
                <div className="w-full h-full rounded-[22px] overflow-hidden bg-white">
                  <img src="https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=900&auto=format&fit=crop" alt="Doctor using smartphone" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white/70" id="specialities">
          <div className="w-full mx-auto px-6">
            <div className="flex flex-col gap-4 text-center mb-10">
              <h1 className="text-base font-semibold text-[#0c7ed0] uppercase tracking-[0.2em]">Consult by speciality</h1>
              <h2 className="text-4xl md:text-[3.25rem] font-bold">Find the right expert faster</h2>
              <p className="text-slate-500">Over 25 departments with experienced specialists ready to help you 24/7.</p>
            </div>

            <div className="relative max-w-7xl mx-auto">
              <button onClick={() => scrollSlider(specialitySliderRef, 'prev')} className="hidden md:flex absolute inset-y-0 -left-5 z-20 m-auto h-12 w-12 rounded-full bg-white border border-slate-100 shadow-xl text-sky-600 items-center justify-center hover:bg-sky-50 transition-all transform hover:scale-110 active:scale-90" aria-label="Scroll specialities left">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={() => scrollSlider(specialitySliderRef, 'next')} className="hidden md:flex absolute inset-y-0 -right-5 z-20 m-auto h-12 w-12 rounded-full bg-white border border-slate-100 shadow-xl text-sky-600 items-center justify-center hover:bg-sky-50 transition-all transform hover:scale-110 active:scale-90" aria-label="Scroll specialities right">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
              </button>

              <div className="relative">
                <div className="hidden md:block pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white via-white/90 to-transparent z-10"></div>
                <div className="hidden md:block pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white via-white/90 to-transparent z-10"></div>

                <div ref={specialitySliderRef} className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth pb-6 md:justify-center">
                  {/* Cards */}
                  {[
                    { title: "General Physician", img: "https://images.unsplash.com/photo-1537368910025-702850356d5a?auto=format&fit=crop&q=80&w=600", desc: "Fever, infections & routine care" },
                    { title: "Dermatologist", img: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=600&auto=format&fit=crop", desc: "Skin, hair & nails" },
                    { title: "Pediatrician", img: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=600&auto=format&fit=crop", desc: "Child health & vaccination" },
                    { title: "Cardiologist", img: "https://images.unsplash.com/photo-1530026405186-ed1f139313f4?auto=format&fit=crop&q=80&w=600", desc: "Hypertension & heart care" },
                    { title: "Orthopedic", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=600", desc: "Bones, joints & sports injuries" },
                    { title: "Gynecologist", img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=600", desc: "Women's wellness & fertility" },
                    { title: "Neurologist", img: "https://images.unsplash.com/photo-1460672985063-6764ac8b9c74?w=600&auto=format&fit=crop", desc: "Brain & nerve health" },
                  ].map((spec, index) => (
                    <div key={index} className="group block snap-start min-w-[260px] sm:min-w-[280px]">
                      <div className="relative h-[320px] rounded-4xl overflow-hidden shadow-sm hover:shadow-xl transition duration-500 hover:-translate-y-2 border border-slate-100">
                        <img src={spec.img} className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-110" alt={spec.title} />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent"></div>
                        <div className="relative z-10 flex flex-col justify-end h-full p-6 text-white">
                          <p className="text-sm text-white/80">{spec.desc}</p>
                          <h3 className="font-bold text-2xl mt-2">{spec.title}</h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="max-w-3xl mx-auto mt-10">
              <button className="w-full bg-[#0c7ed0] text-white py-4 px-6 text-lg font-semibold rounded-2xl shadow-xl shadow-blue-200 hover:bg-[#0b6db3] hover:scale-[1.01] active:scale-[0.99] transition">
                Book Specialist Consultation
              </button>
            </div>
          </div>
        </section>

        <section id="doctors" className="py-20 bg-slate-50">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="text-base font-semibold text-[#0c7ed0] uppercase tracking-[0.2em]">Available doctors</p>
            <h2 className="text-4xl md:text-[3.25rem] font-bold mt-2">Certified doctors ready to consult</h2>
            <p className="text-slate-500 mt-4">Choose from India's leading practitioners, verified and online now.</p>
          </div>

          <div className="relative mt-12 max-w-7xl mx-auto -mx-4 sm:-mx-6 lg:-mx-10 px-4 sm:px-6 lg:px-10">
            <button onClick={() => scrollSlider(doctorSliderRef, 'prev')} className="flex absolute inset-y-0 -left-4 sm:-left-6 z-20 m-auto h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-white border border-slate-100 shadow-xl text-sky-600 items-center justify-center hover:bg-sky-50 transition-all transform hover:scale-110 active:scale-90" aria-label="Scroll doctors left">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={() => scrollSlider(doctorSliderRef, 'next')} className="flex absolute inset-y-0 -right-4 sm:-right-6 z-20 m-auto h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-white border border-slate-100 shadow-xl text-sky-600 items-center justify-center hover:bg-sky-50 transition-all transform hover:scale-110 active:scale-90" aria-label="Scroll doctors right">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
            </button>

            <div className="relative px-4 sm:px-6 lg:px-10">
              <div className="hidden md:block pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-slate-50 via-slate-50/95 to-transparent z-10"></div>
              <div className="hidden md:block pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-slate-50 via-slate-50/95 to-transparent z-10"></div>

              <div ref={doctorSliderRef} className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth pr-2 no-scrollbar md:justify-center">
                {/* Doctor Cards */}
                {[
                  { name: "Dr. Anjali Sharma", spec: "General Physician", tag: "Gold Medalist", badge: "Online Now", badgeStyle: "emerald", info: "Consulted 5,000+ patients. Specialized in preventive care.", price: "499", oldPrice: "999", img: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=600&auto=format&fit=crop" },
                  { name: "Dr. Raj Mehta", spec: "Dermatologist", tag: "", badge: "Available in 5 mins", badgeStyle: "amber", info: "Known for holistic skin, hair, and allergy care. 3,200+ cases.", price: "699", oldPrice: "1,199", img: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=600&auto=format&fit=crop" },
                  { name: "Dr. Aisha Khan", spec: "Neurologist", tag: "Stroke Specialist", badge: "Available in 4 mins", badgeStyle: "purple", info: "Expertise in migraine, epilepsy, and post-stroke rehab.", price: "899", oldPrice: "1,399", img: "https://images.unsplash.com/photo-1460672985063-6764ac8b9c74?w=600&auto=format&fit=crop" }
                ].map((doc, i) => (
                  <article key={i} className="group flex flex-col bg-white rounded-4xl p-6 min-w-[300px] sm:min-w-[340px] shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 snap-start">
                    <div className="flex justify-between items-start mb-6">
                      <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                        doc.badgeStyle === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                        doc.badgeStyle === 'amber' ? 'bg-amber-50 text-amber-600' :
                        'bg-purple-50 text-purple-600'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                          doc.badgeStyle === 'emerald' ? 'bg-emerald-500' :
                          doc.badgeStyle === 'amber' ? 'bg-amber-500' :
                          'bg-purple-500'
                        }`}></span>
                        {doc.badge}
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{doc.spec}</span>
                    </div>

                    <div className="flex gap-4 mb-6">
                      <div className="relative shrink-0">
                        <img src={doc.img} className="w-20 h-20 rounded-2xl object-cover shadow-md" alt={doc.name} />
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-sky-600 rounded-lg flex items-center justify-center text-white shadow-lg">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                        </div>
                      </div>
                      <div className="flex flex-col justify-center">
                        <h3 className="font-bold text-slate-900 group-hover:text-sky-600 transition-colors">{doc.name}</h3>
                        <p className="text-xs text-slate-500 mt-0.5">{doc.spec}</p>
                        {doc.tag && (
                          <div className="mt-2 inline-block">
                            <span className="text-[9px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-100 uppercase tracking-tighter">
                              {doc.tag}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-slate-600 line-clamp-2 mb-6 h-10 leading-relaxed">
                      {doc.info}
                    </p>

                    <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-slate-400 line-through mb-0.5 font-medium">₹{doc.oldPrice}</div>
                        <div className="text-xl font-extrabold text-slate-900">₹{doc.price}</div>
                      </div>
                      <button className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-sky-100 transition-all transform hover:scale-105 active:scale-95">
                        Consult Now
                      </button>
                    </div>
                  </article>
                ))}


              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center mb-3">How Consultation Works</h2>
          <p className="text-slate-500 text-center mb-12">Get expert medical advice in four simple steps.</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="group relative flex flex-col items-center p-6 rounded-2xl bg-white shadow hover:shadow-xl transition">
              <div className="w-14 h-14 rounded-full bg-[#0c7ed0] text-white flex items-center justify-center text-xl font-bold">1</div>
              <h3 className="font-bold mt-4 mb-1 group-hover:text-[#0c7ed0] transition-colors">Select Doctor</h3>
              <p className="text-sm text-slate-500 text-center">Filter by speciality, language, and experience.</p>
            </div>
            <div className="group relative flex flex-col items-center p-6 rounded-2xl bg-white shadow hover:shadow-xl transition">
              <div className="w-14 h-14 rounded-full bg-[#0c7ed0] text-white flex items-center justify-center text-xl font-bold">2</div>
              <h3 className="font-bold mt-4 mb-1 group-hover:text-[#0c7ed0] transition-colors">Book Slot</h3>
              <p className="text-sm text-slate-500 text-center">Pick a convenient time and confirm instantly.</p>
            </div>
            <div className="group relative flex flex-col items-center p-6 rounded-2xl bg-white shadow hover:shadow-xl transition">
              <div className="w-14 h-14 rounded-full bg-[#0c7ed0] text-white flex items-center justify-center text-xl font-bold">3</div>
              <h3 className="font-bold mt-4 mb-1 group-hover:text-[#0c7ed0] transition-colors">Chat / Video</h3>
              <p className="text-sm text-slate-500 text-center">Connect via secure chat or HD video consultation.</p>
            </div>
            <div className="group relative flex flex-col items-center p-6 rounded-2xl bg-white shadow hover:shadow-xl transition">
              <div className="w-14 h-14 rounded-full bg-[#0c7ed0] text-white flex items-center justify-center text-xl font-bold">4</div>
              <h3 className="font-bold mt-4 mb-1 group-hover:text-[#0c7ed0] transition-colors">Get Prescription</h3>
              <p className="text-sm text-slate-500 text-center">Receive e-prescription & follow-up reminders.</p>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-[#0c7ed0] to-[#0a6ab1] text-white text-center py-16">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse"></span>
            100% secure & private
          </div>
          <h2 className="text-3xl font-bold mb-2">Need medical advice right now?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">Connect with Medighar's senior doctors within minutes and get a personalized care plan without stepping out.</p>
          <button className="bg-white text-[#0c7ed0] px-8 py-3.5 rounded-full font-semibold hover:bg-blue-50 hover:scale-105 transition shadow-xl">
            Start consultation
          </button>
        </section>
    </div>
    </>
  );
};

export default OnlineConsultation;
