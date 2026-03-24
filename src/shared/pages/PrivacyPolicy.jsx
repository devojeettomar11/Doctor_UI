import React from 'react';

const PrivacyPolicy = () => {
  const sections = [
    { id: 'intro', title: 'Introduction' },
    { id: 'data', title: 'Information We Collect' },
    { id: 'usage', title: 'How We Use Data' },
    { id: 'security', title: 'Data Security' },
    { id: 'sharing', title: 'Information Sharing' },
    { id: 'rights', title: 'User Rights' },
    { id: 'updates', title: 'Policy Updates' },
    { id: 'contact', title: 'Contact' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-linear-to-br from-sky-600 to-emerald-500 py-20 text-center text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Your privacy is important to us. MediGhar ensures your healthcare data stays secure and protected.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Navigation */}
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-24 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-sky-600 mb-6">Policy Sections</h3>
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
                Welcome to <span className="font-bold">MediGhar</span>, a digital healthcare platform designed to simplify access to medical services such as medicine ordering, doctor consultation, and lab test booking.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you use our platform.
              </p>
            </div>

            <div id="data" className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold text-sky-600 mb-4">2. Information We Collect</h2>
              <p className="text-slate-600 mb-4">To deliver healthcare services efficiently, MediGhar may collect the following types of information:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-slate-600">
                  <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2.5 shrink-0"></span>
                  <span>Full Name and basic identity information</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600">
                  <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2.5 shrink-0"></span>
                  <span>Email address and phone number</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600">
                  <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2.5 shrink-0"></span>
                  <span>Delivery address for medicine orders</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600">
                  <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2.5 shrink-0"></span>
                  <span>Healthcare service requests</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600">
                  <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2.5 shrink-0"></span>
                  <span>Device and usage information</span>
                </li>
              </ul>
            </div>

            <div id="usage" className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold text-sky-600 mb-4">3. How We Use Your Information</h2>
              <p className="text-slate-600 mb-4">Your data is used only for legitimate service purposes, including:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-slate-600">
                  <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2.5 shrink-0"></span>
                  <span>Processing medicine orders and lab bookings</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600">
                  <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2.5 shrink-0"></span>
                  <span>Connecting patients with registered doctors</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600">
                  <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2.5 shrink-0"></span>
                  <span>Improving our platform and services</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600">
                  <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2.5 shrink-0"></span>
                  <span>Providing customer support</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600">
                  <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2.5 shrink-0"></span>
                  <span>Sending important service notifications</span>
                </li>
              </ul>
            </div>

            <div id="security" className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold text-sky-600 mb-4">4. Data Security</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                MediGhar implements strong security measures to protect your personal and healthcare data.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                We use modern security practices to prevent unauthorized access, data loss, or misuse of information.
              </p>
              <p className="text-slate-600 leading-relaxed font-bold">
                Your trust is important to us, and we continuously improve our systems to ensure data protection.
              </p>
            </div>

            <div id="sharing" className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold text-sky-600 mb-4">5. Sharing of Information</h2>
              <p className="text-slate-600 mb-4">MediGhar does not sell or trade your personal information.</p>
              <p className="text-slate-600 mb-4">However, limited information may be shared only when necessary:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-slate-600">
                  <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2.5 shrink-0"></span>
                  <span>With verified healthcare providers to fulfill service requests</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600">
                  <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2.5 shrink-0"></span>
                  <span>With pharmacies for medicine delivery</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600">
                  <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2.5 shrink-0"></span>
                  <span>When required by law or government authorities</span>
                </li>
              </ul>
            </div>

            <div id="rights" className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold text-sky-600 mb-4">6. User Rights</h2>
              <p className="text-slate-600 mb-4">As a MediGhar user, you have the right to:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-slate-600">
                  <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2.5 shrink-0"></span>
                  <span>Access your personal information</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600">
                  <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2.5 shrink-0"></span>
                  <span>Update or correct inaccurate information</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600">
                  <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2.5 shrink-0"></span>
                  <span>Request deletion of your account data</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600">
                  <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2.5 shrink-0"></span>
                  <span>Contact us regarding privacy concerns</span>
                </li>
              </ul>
            </div>

            <div id="updates" className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold text-sky-600 mb-4">7. Policy Updates</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                We may update this Privacy Policy occasionally to reflect service improvements or legal changes.
              </p>
              <p className="text-slate-600 leading-relaxed font-bold">
                Users are encouraged to review this page periodically to stay informed about how we protect their information.
              </p>
            </div>

            <div id="contact" className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold text-sky-600 mb-4">8. Contact Us</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you have any questions regarding this Privacy Policy, feel free to contact us.
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

export default PrivacyPolicy;
