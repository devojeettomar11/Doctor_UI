import React from 'react';

const RefundPolicy = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-linear-to-br from-sky-600 to-emerald-500 py-20 text-center text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Refund Policy</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Understanding MediGhar's refund terms for healthcare services and orders.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-bold text-sky-600 mb-4">1. Introduction</h2>
            <p className="text-slate-600 leading-relaxed">
              At <span className="font-bold">MediGhar</span>, we aim to provide reliable and transparent healthcare services including medicine delivery, doctor consultations, and lab test bookings. 
              This Refund Policy outlines the circumstances under which refunds may be issued.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-bold text-sky-600 mb-4">2. Refunds for Medicine Orders</h2>
            <p className="text-slate-600 mb-4">Refunds for medicine orders may be issued under the following conditions:</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-slate-600">
                <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2.5 shrink-0"></span>
                <span>If the order is cancelled before it has been dispatched.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600">
                <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2.5 shrink-0"></span>
                <span>If the delivered product is damaged or incorrect.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600">
                <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2.5 shrink-0"></span>
                <span>If the medicine is unavailable after order confirmation.</span>
              </li>
            </ul>
            <p className="mt-4 text-slate-600 italic">Refund requests must be submitted within a reasonable time after delivery.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-bold text-sky-600 mb-4">3. Doctor Consultation Services</h2>
            <p className="text-slate-600 mb-4">Refunds for doctor consultations may be applicable if:</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-slate-600">
                <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2.5 shrink-0"></span>
                <span>The consultation is cancelled by the doctor.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600">
                <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2.5 shrink-0"></span>
                <span>Technical issues prevent the consultation from taking place.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600">
                <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2.5 shrink-0"></span>
                <span>The service could not be delivered due to platform-related errors.</span>
              </li>
            </ul>
            <p className="mt-4 text-slate-600 italic">Once a consultation has been successfully completed, refunds are generally not applicable.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-bold text-sky-600 mb-4">4. Lab Test Bookings</h2>
            <p className="text-slate-600 mb-4">Refunds for lab test bookings may be issued if:</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-slate-600">
                <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2.5 shrink-0"></span>
                <span>The test booking is cancelled before sample collection.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600">
                <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2.5 shrink-0"></span>
                <span>The laboratory partner cancels the test.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600">
                <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2.5 shrink-0"></span>
                <span>Service is unavailable in the requested location.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-bold text-sky-600 mb-4">5. Refund Processing</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Approved refunds will be processed using the original payment method whenever possible.
            </p>
            <p className="text-slate-600 leading-relaxed font-bold">
              Refunds may take several business days to reflect in the user’s account depending on the payment provider.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-bold text-sky-600 mb-4">6. Policy Updates</h2>
            <p className="text-slate-600 leading-relaxed">
              MediGhar reserves the right to update or modify this Refund Policy at any time. Users are encouraged to review this page periodically for updates.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-bold text-sky-600 mb-4">7. Contact Us</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              If you have any questions regarding refunds or cancellations, please contact MediGhar support.
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

export default RefundPolicy;
