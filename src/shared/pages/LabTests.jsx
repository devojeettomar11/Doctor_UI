import { Link } from 'react-router-dom';

const LabTests = () => {
  return (
    <>
      {/* Hero Banner Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        <div className="group bg-gradient-to-r from-[#0082c8] to-[#005c97] rounded-[16px] md:h-[230px] flex flex-col md:flex-row items-center justify-between text-white relative overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer">

          {/* Background Decorative Icons */}
          <svg className="absolute top-[18%] left-[45%] opacity-20 w-16 h-16 hidden md:block group-hover:-translate-y-3 group-hover:scale-110 group-hover:opacity-30 transition-all duration-700 ease-out"
            fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
            </path>
          </svg>

          <svg className="absolute top-[15%] right-[32%] opacity-15 w-20 h-20 hidden lg:block group-hover:rotate-12 group-hover:scale-110 transition-transform duration-700 ease-out"
            fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>

          <svg className="absolute bottom-[20%] left-[55%] opacity-20 w-24 h-24 hidden md:block group-hover:-translate-x-3 group-hover:scale-110 group-hover:opacity-30 transition-all duration-700 ease-out"
            fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
          </svg>

          {/* Content Area */}
          <div className="p-8 md:px-12 md:py-0 w-full md:w-2/3 relative z-10 flex flex-col justify-center h-full">

            <h1 className="text-3xl lg:text-[40px] font-bold mb-3 leading-tight tracking-tight group-hover:text-blue-50 transition-colors duration-300">
              Book trusted lab tests from home.
            </h1>

            <p className="text-base lg:text-xl font-normal mb-8 text-white max-w-lg opacity-95 group-hover:opacity-100 transition-opacity duration-300">
              Get accurate diagnostics safely with Medighar.
            </p>

            {/* CTA Button */}
            <button className="bg-[#1a1a1a] text-white text-[15px] font-bold flex items-center justify-center gap-2 px-6 py-2.5 rounded-full hover:bg-black group-hover:bg-slate-900 group-hover:scale-[1.03] group-hover:-translate-y-0.5 transition-all duration-300 w-max shadow-sm hover:shadow-xl border border-transparent">
              <span className="text-xl leading-none -mt-1 font-serif group-hover:rotate-[15deg] transition-transform duration-300">✨</span>
              Book Lab Test<span className="text-[10px] font-normal opacity-70 ml-1">Beta</span>
            </button>
          </div>

          {/* Graphic / Illustration */}
          <div className="relative w-full md:w-1/3 h-48 md:h-full mt-6 md:mt-0 flex items-end justify-center md:justify-end z-10 overflow-hidden md:pr-12 lg:pr-16">
            <img src="https://cdn-icons-png.flaticon.com/512/3208/3208929.png" alt="Lab Test Diagnostics"
              className="h-[120%] object-contain object-bottom -mb-2 drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)] group-hover:scale-[1.05] group-hover:drop-shadow-[0_15px_25px_rgba(0,0,0,0.35)] transition-all duration-500 ease-out origin-bottom" />
          </div>

        </div>
      </section>

      {/* About Service */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          <div>
            <h2 className="text-3xl font-bold mb-6">Healthcare at Your Doorstep</h2>
            <p className="text-slate-600 mb-4">
              Medighar offers professional lab testing services from the comfort of your home.
              Our trained medical staff ensures safe and hygienic sample collection.
            </p>
            <p className="text-slate-600 mb-4">
              From routine blood tests to comprehensive health checkup packages,
              we provide fast, reliable, and affordable diagnostic services.
            </p>
            <p className="text-slate-600">
              Receive your detailed lab reports digitally and consult with doctors if required —
              all without stepping outside.
            </p>
          </div>

          <div>
            <img src="https://www.indushealthplus.com/front/media/article_img/icons/7.jpg" alt="Lab Test Professional"
              className="rounded-3xl shadow-lg hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-500 cursor-pointer" />
          </div>

        </div>
      </section>

      {/* Popular Tests Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Popular Lab Tests</h2>
            <p className="text-slate-600">
              We offer a wide range of diagnostic tests and preventive health packages.
            </p>
          </div>

          <div className="flex overflow-x-auto gap-6 hide-scroll-bar pb-6 -mx-6 px-6 snap-x md:grid md:grid-cols-3 md:gap-8 md:-mx-0 md:px-0 md:pb-0 md:overflow-visible no-scrollbar">

            {/* Card 1 */}
            <div className="group flex-none w-[85vw] sm:w-[320px] md:w-auto md:min-w-0 bg-white rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] cursor-pointer transition-all duration-300 border snap-center flex flex-col justify-center relative overflow-hidden h-[220px]"
              style={{ background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)" }}>
              <div className="relative z-10 w-2/3">
                <div className="bg-red-100 text-red-600 text-[10px] md:text-xs font-bold px-2 py-1 rounded inline-block mb-3 group-hover:scale-105 transition-transform duration-300 origin-left">
                  Up to 15% off</div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2 leading-tight group-hover:text-red-500 transition-colors duration-300">
                  Complete Blood<br />Count (CBC)</h3>
                <p className="text-sm text-slate-600 mb-4 line-clamp-2">Evaluate overall health and detect disorders.</p>
                <button className="bg-[#1a1a1a] text-white text-xs md:text-sm font-semibold py-2 px-5 rounded-lg group-hover:bg-red-600 group-hover:scale-105 transition-all duration-300 border border-transparent shadow-sm">
                  Order now
                </button>
              </div>
              <img src="https://cdn-icons-png.flaticon.com/512/3208/3208940.png" alt="CBC Test"
                className="absolute bottom-[-10px] right-[-10px] w-28 md:w-32 object-contain opacity-90 drop-shadow-[0_10px_10px_rgba(0,0,0,0.15)] group-hover:scale-110 group-hover:-translate-x-2 group-hover:-translate-y-2 transition-all duration-500" />
            </div>

            {/* Card 2 */}
            <div className="group flex-none w-[85vw] sm:w-[320px] md:w-auto md:min-w-0 bg-[#009688] text-white rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] cursor-pointer transition-all duration-300 border snap-center flex flex-col justify-center relative overflow-hidden h-[220px]"
              style={{ background: "linear-gradient(135deg, #0d9488 0%, #115e59 100%)" }}>
              <div className="relative z-10 w-2/3">
                <div className="bg-black/20 text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded inline-block mb-3 group-hover:scale-105 transition-transform duration-300 origin-left">
                  Popular Package</div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 leading-tight drop-shadow-sm group-hover:text-teal-100 transition-colors duration-300">
                  Full Body<br />Checkup</h3>
                <p className="text-sm text-teal-100 mb-4 line-clamp-2">Complete health screening package for preventive care.</p>
                <button className="bg-[#1a1a1a] text-white text-xs md:text-sm font-semibold py-2 px-5 rounded-lg group-hover:bg-[#000] group-hover:scale-105 transition-all duration-300 border border-transparent shadow-sm">
                  Order now
                </button>
              </div>
              <img src="https://cdn-icons-png.flaticon.com/512/4611/4611394.png" alt="Full Body Test"
                className="absolute bottom-4 right-0 w-24 md:w-28 object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.25)] group-hover:scale-110 group-hover:-translate-x-3 transition-all duration-500" />
            </div>

            {/* Card 3 */}
            <div className="group flex-none w-[85vw] sm:w-[320px] md:w-auto md:min-w-0 bg-white rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] cursor-pointer transition-all duration-300 border snap-center flex flex-col justify-center relative overflow-hidden h-[220px]"
              style={{ background: "linear-gradient(135deg, #eff6ff 0%, #bae6fd 100%)" }}>
              <div className="relative z-10 w-2/3">
                <div className="bg-sky-100 text-sky-700 text-[10px] md:text-xs font-bold px-2 py-1 rounded inline-block mb-3 group-hover:scale-105 transition-transform duration-300 origin-left">
                  To 20% off</div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2 leading-tight group-hover:text-sky-600 transition-colors duration-300">
                  Diabetes &<br />Thyroid</h3>
                <p className="text-sm text-slate-600 mb-4 line-clamp-2">Monitor blood sugar and thyroid levels accurately.</p>
                <button className="bg-[#1a1a1a] text-white text-xs md:text-sm font-semibold py-2 px-5 rounded-lg group-hover:bg-sky-600 group-hover:scale-105 transition-all duration-300 border border-transparent shadow-sm">
                  Order now
                </button>
              </div>
              <img src="https://cdn-icons-png.flaticon.com/512/9123/9123164.png" alt="Diabetes Test"
                className="absolute bottom-[-10px] right-2 w-24 md:w-28 object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.15)] group-hover:scale-110 group-hover:-translate-x-2 transition-all duration-500" />
            </div>

          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight">How It Works</h2>
          </div>

          <div className="flex overflow-x-auto gap-4 md:gap-8 hide-scroll-bar pb-8 -mx-6 px-6 snap-x md:grid md:grid-cols-4 md:text-center md:-mx-0 md:px-0 md:pb-0 md:overflow-visible relative no-scrollbar">

            {/* Desktop Connection Line */}
            <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-0.5 bg-sky-100 z-0"></div>

            <div className="group flex-none w-[65vw] sm:w-[200px] md:w-auto snap-center text-center px-4 hover:-translate-y-2 transition-transform duration-300 cursor-pointer relative z-10">
              <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center border-4 border-sky-50 shadow-sm mb-6 group-hover:scale-110 group-hover:border-sky-100 transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-sky-400 to-[#0082c8] rounded-full flex items-center justify-center text-2xl font-black text-white shadow-inner group-hover:from-[#0082c8] group-hover:to-[#005c97] transition-all">
                  1</div>
              </div>
              <h4 className="font-bold text-slate-800 mb-2 group-hover:text-[#0082c8] transition-colors">Book Online</h4>
              <p className="text-slate-500 text-sm max-w-[150px] mx-auto leading-relaxed group-hover:text-slate-700 transition-colors">
                Select and book a lab test securely online.</p>
            </div>

            <div className="group flex-none w-[65vw] sm:w-[200px] md:w-auto snap-center text-center px-4 hover:-translate-y-2 transition-transform duration-300 cursor-pointer relative z-10">
              <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center border-4 border-sky-50 shadow-sm mb-6 group-hover:scale-110 group-hover:border-sky-100 transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-sky-400 to-[#0082c8] rounded-full flex items-center justify-center text-2xl font-black text-white shadow-inner group-hover:from-[#0082c8] group-hover:to-[#005c97] transition-all">
                  2</div>
              </div>
              <h4 className="font-bold text-slate-800 mb-2 group-hover:text-[#0082c8] transition-colors">Provide Time</h4>
              <p className="text-slate-500 text-sm max-w-[150px] mx-auto leading-relaxed group-hover:text-slate-700 transition-colors">
                Give address and pick preferred active time.</p>
            </div>

            <div className="group flex-none w-[65vw] sm:w-[200px] md:w-auto snap-center text-center px-4 hover:-translate-y-2 transition-transform duration-300 cursor-pointer relative z-10">
              <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center border-4 border-sky-50 shadow-sm mb-6 group-hover:scale-110 group-hover:border-sky-100 transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-sky-400 to-[#0082c8] rounded-full flex items-center justify-center text-2xl font-black text-white shadow-inner group-hover:from-[#0082c8] group-hover:to-[#005c97] transition-all">
                  3</div>
              </div>
              <h4 className="font-bold text-slate-800 mb-2 group-hover:text-[#0082c8] transition-colors">Sample Collection</h4>
              <p className="text-slate-500 text-sm max-w-[150px] mx-auto leading-relaxed group-hover:text-slate-700 transition-colors">
                Safe and hygienic home sample collection.</p>
            </div>

            <div className="group flex-none w-[65vw] sm:w-[200px] md:w-auto snap-center text-center px-4 hover:-translate-y-2 transition-transform duration-300 cursor-pointer relative z-10">
              <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center border-4 border-sky-50 shadow-sm mb-6 group-hover:scale-110 group-hover:border-sky-100 transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-sky-400 to-[#0082c8] rounded-full flex items-center justify-center text-2xl font-black text-white shadow-inner group-hover:from-[#0082c8] group-hover:to-[#005c97] transition-all">
                  4</div>
              </div>
              <h4 className="font-bold text-slate-800 mb-2 group-hover:text-[#0082c8] transition-colors">Get Reports</h4>
              <p className="text-slate-500 text-sm max-w-[150px] mx-auto leading-relaxed group-hover:text-slate-700 transition-colors">
                Receive fast and accurate digital reports.</p>
            </div>

          </div>

        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Medighar?</h2>
            <p className="text-slate-600">
              We offer safe, quick, and reliable home diagnostic solutions.
            </p>
          </div>

          <div className="flex overflow-x-auto gap-6 hide-scroll-bar pb-8 -mx-6 px-6 snap-x md:grid md:grid-cols-3 md:gap-8 md:-mx-0 md:px-0 md:pb-0 md:overflow-visible no-scrollbar">

            <div className="group flex-none w-[80vw] sm:w-[320px] md:w-auto snap-center bg-white p-8 rounded-3xl shadow-sm border transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-emerald-600 transition-colors duration-300">
                Certified Labs</h3>
              <p className="text-slate-600 leading-relaxed group-hover:text-slate-800 transition-colors">
                We partner with trusted and certified diagnostic laboratories.
              </p>
            </div>

            <div className="group flex-none w-[80vw] sm:w-[320px] md:w-auto snap-center bg-white p-8 rounded-3xl shadow-sm border transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer">
              <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd"
                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-sky-600 transition-colors duration-300">Safe &
                Hygienic</h3>
              <p className="text-slate-600 leading-relaxed group-hover:text-slate-800 transition-colors">
                Trained professionals follow strict hygiene and safety standards.
              </p>
            </div>

            <div className="group flex-none w-[80vw] sm:w-[320px] md:w-auto snap-center bg-white p-8 rounded-3xl shadow-sm border transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-purple-600 transition-colors duration-300">Fast
                Reports</h3>
              <p className="text-slate-600 leading-relaxed group-hover:text-slate-800 transition-colors">
                Get accurate test results delivered quickly to your device.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0082c8] text-white py-16 text-center shadow-inner">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight">
          Ready to Book a Lab Test?
        </h2>
        <p className="mb-8 text-lg max-w-xl mx-auto opacity-95">
          Experience hassle-free diagnostic services and expert care with Medighar.
        </p>
        <Link to="/" className="bg-white text-[#0082c8] px-10 py-3.5 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all inline-block">
          Book Appointment
        </Link>
      </section>
    </>
  );
};

export default LabTests;
