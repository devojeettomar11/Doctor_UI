import React from 'react';

const CookiePolicy = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-linear-to-br from-sky-600 to-emerald-500 py-20 text-center text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Learn how MediGhar uses cookies to improve your healthcare experience.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-8">
          {/* Card: Introduction */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-sky-600 mb-4">1. Introduction</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              This Cookie Policy explains how <span className="font-bold">MediGhar</span> uses cookies and similar technologies when you visit our platform. 
              These technologies help us improve website functionality, enhance user experience, and ensure the platform works efficiently.
            </p>
            <p className="text-slate-600 leading-relaxed">
              By continuing to use our website, you agree to the use of cookies in accordance with this policy.
            </p>
          </div>

          {/* Card: What Are Cookies */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-sky-600 mb-4">2. What Are Cookies?</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Cookies are small text files stored on your device when you visit a website. 
              They help websites remember user preferences, login sessions, and other important information.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Cookies allow MediGhar to provide a smoother and more personalized experience for users accessing healthcare services online.
            </p>
          </div>

          {/* Card: Types of Cookies */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-sky-600 mb-4">3. Types of Cookies We Use</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-slate-600">
                <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2.5 shrink-0"></span>
                <span><span className="font-bold">Essential Cookies:</span> Required for the proper functioning of the MediGhar platform.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600">
                <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2.5 shrink-0"></span>
                <span><span className="font-bold">Performance Cookies:</span> Help us understand how users interact with our website so we can improve performance.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600">
                <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2.5 shrink-0"></span>
                <span><span className="font-bold">Functional Cookies:</span> Remember user preferences and settings.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600">
                <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2.5 shrink-0"></span>
                <span><span className="font-bold">Analytics Cookies:</span> Help us analyze website traffic and user behavior.</span>
              </li>
            </ul>
          </div>

          {/* Card: Why We Use */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-sky-600 mb-4">4. Why We Use Cookies</h2>
            <p className="text-slate-600 mb-4">MediGhar uses cookies for several important purposes:</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-slate-600">
                <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2.5 shrink-0"></span>
                <span>To improve website performance and speed</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600">
                <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2.5 shrink-0"></span>
                <span>To remember user preferences</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600">
                <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2.5 shrink-0"></span>
                <span>To analyze platform usage and improve services</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600">
                <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2.5 shrink-0"></span>
                <span>To enhance security and prevent unauthorized activity</span>
              </li>
            </ul>
          </div>

          {/* Card: Managing Cookies */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-sky-600 mb-4">5. Managing Cookies</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Users can manage or disable cookies through their browser settings. 
              However, disabling certain cookies may affect the functionality of the MediGhar platform.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Most web browsers allow you to control cookies through settings such as blocking, deleting, or restricting cookies.
            </p>
          </div>

          {/* Card: Policy Updates */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-sky-600 mb-4">6. Policy Updates</h2>
            <p className="text-slate-600 leading-relaxed">
              MediGhar may update this Cookie Policy from time to time to reflect changes in technology or legal requirements. 
              Users are encouraged to review this page periodically.
            </p>
          </div>

          {/* Card: Contact Us */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-sky-600 mb-4">7. Contact Us</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              If you have questions regarding this Cookie Policy, you can contact the MediGhar team.
            </p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <p className="text-slate-700 font-bold">Email: <a href="mailto:medighar151@gmail.com" className="text-sky-600 hover:underline">medighar151@gmail.com</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
