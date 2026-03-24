import React from 'react';

const TermsOfService = () => {
  const sections = [
    { id: 'intro', title: 'Introduction' },
    { id: 'use', title: 'Platform Usage' },
    { id: 'responsibility', title: 'User Responsibilities' },
    { id: 'services', title: 'Service Disclaimer' },
    { id: 'limitations', title: 'Limitations of Liability' },
    { id: 'updates', title: 'Terms Updates' },
    { id: 'contact', title: 'Contact' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-linear-to-br from-sky-600 to-emerald-500 py-20 text-center text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms & Conditions</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Please read these terms carefully before using the MediGhar platform.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Navigation */}
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-24 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-sky-600 mb-6">Sections</h3>
              <nav className="space-y-4">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block text-slate-600 hover:text-sky-600 font-medium transition-colors"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-8">
            <div id="intro" className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold text-sky-600 mb-4">1. Introduction</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Welcome to <span className="font-bold">MediGhar</span>. By accessing or using this platform, you agree to comply with the terms and conditions described in this document.
              </p>
              <p className="text-slate-600 leading-relaxed">
                These terms govern your use of MediGhar services including medicine ordering, doctor consultation, and lab test booking.
              </p>
            </div>

            <div id="use" className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold text-sky-600 mb-4">2. Platform Usage</h2>
              <p className="text-slate-600 mb-4">Users must use the MediGhar platform only for lawful purposes and in accordance with these terms.</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-slate-600">
                  <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2.5 shrink-0"></span>
                  <span>The platform should not be used for fraudulent activities.</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600">
                  <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2.5 shrink-0"></span>
                  <span>Users must respect all applicable laws and regulations.</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600">
                  <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2.5 shrink-0"></span>
                  <span>Unauthorized access or misuse of the platform is prohibited.</span>
                </li>
              </ul>
            </div>

            <div id="responsibility" className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold text-sky-600 mb-4">3. User Responsibilities</h2>
              <p className="text-slate-600 mb-4">Users are responsible for providing accurate and complete information when using the platform.</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-slate-600">
                  <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2.5 shrink-0"></span>
                  <span>Provide correct personal and contact details.</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600">
                  <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2.5 shrink-0"></span>
                  <span>Ensure that account credentials remain secure.</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600">
                  <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2.5 shrink-0"></span>
                  <span>Use healthcare services responsibly.</span>
                </li>
              </ul>
            </div>

            <div id="services" className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold text-sky-600 mb-4">4. Service Disclaimer</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                MediGhar operates as a digital platform that connects users with independent healthcare providers such as doctors, pharmacies, and diagnostic laboratories.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The platform itself does not directly provide medical treatment, diagnosis, or healthcare services.
              </p>
              <p className="text-slate-600 leading-relaxed font-bold">
                All medical advice and services are the responsibility of the respective healthcare professionals.
              </p>
            </div>

            <div id="limitations" className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold text-sky-600 mb-4">5. Limitations of Liability</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                MediGhar will not be held responsible for medical outcomes resulting from services provided by third-party healthcare professionals.
              </p>
              <p className="text-slate-600 leading-relaxed font-bold">
                Users should consult qualified healthcare professionals for medical decisions and treatment.
              </p>
            </div>

            <div id="updates" className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold text-sky-600 mb-4">6. Updates to Terms</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                MediGhar reserves the right to modify these Terms and Conditions at any time.
              </p>
              <p className="text-slate-600 leading-relaxed font-bold">
                Continued use of the platform after updates indicates acceptance of the revised terms.
              </p>
            </div>

            <div id="contact" className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold text-sky-600 mb-4">7. Contact Us</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you have any questions regarding these Terms and Conditions, please contact us.
              </p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-slate-700 font-bold">Email: <a href="mailto:medighar151@gmail.com" className="text-sky-600 hover:underline">medighar151@gmail.com</a></p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
