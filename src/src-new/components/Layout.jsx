import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen flex flex-col">
      <nav className="fixed top-0 w-full z-50 glass-nav">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link to="/" className="logo">
              <img src="/logo.png" alt="MediGhar Logo" />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-10">
            <div className="flex space-x-8 text-sm font-medium items-center">
              <Link to="/" className="hover:text-sky-600 transition-colors">Home</Link>

              <div className="relative group py-2">
                <Link to="/services" className="hover:text-sky-600 transition-colors flex items-center gap-1">
                  Services
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </Link>
                <div className="absolute top-full left-0 mt-0 w-56 bg-white rounded-xl shadow-lg border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col py-2 z-50">
                  <Link to="/online-consultation" className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-sky-600 hover:bg-sky-50 transition-colors">Online Consultation</Link>
                  <Link to="/lab-tests" className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-sky-600 hover:bg-sky-50 transition-colors">Lab Tests</Link>
                  <Link to="/order-tracking" className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-sky-600 hover:bg-sky-50 transition-colors">Order Tracking</Link>
                  <Link to="/medicine-reminder" className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-sky-600 hover:bg-sky-50 transition-colors">Medicine Reminder</Link>
                  <Link to="#" className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-sky-600 hover:bg-sky-50 transition-colors">Medicine Order</Link>
                  <Link to="/emergency-support" className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-sky-600 hover:bg-sky-50 transition-colors">Emergency Support</Link>
                </div>
              </div>

              <Link to="/careers" className="hover:text-sky-600 transition-colors">Careers</Link>
              <Link to="/contact" className="hover:text-sky-600 transition-colors">Contact</Link>
              <Link to="/about" className="hover:text-sky-600 transition-colors">About Us</Link>
            </div>
          </div>

          <button className="md:hidden text-slate-600" onClick={toggleMobileMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 p-6 space-y-4">
            <Link to="/" onClick={toggleMobileMenu} className="block font-medium hover:text-sky-600 transition-colors">Home</Link>
            <Link to="/services" onClick={toggleMobileMenu} className="block font-medium hover:text-sky-600 transition-colors">Services</Link>
            <Link to="/careers" onClick={toggleMobileMenu} className="block font-medium hover:text-sky-600 transition-colors">Careers</Link>
            <Link to="/contact" onClick={toggleMobileMenu} className="block font-medium hover:text-sky-600 transition-colors">Contact</Link>
            <Link to="/about" onClick={toggleMobileMenu} className="block font-medium hover:text-sky-600 transition-colors">About Us</Link>
          </div>
        )}
      </nav>

      <main className="flex-grow pb-10">
        <Outlet />
      </main>

      <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 items-start">
            <div className="col-span-1 md:col-span-2">
                <div className="mb-4">
                    <img className="logo2" src="/logo.png" alt="MediGhar Logo" onError={(e) => { e.target.src = 'https://via.placeholder.com/40x40?text=M'; }} />
                </div>
                <p className="max-w-sm mb-6 leading-relaxed text-slate-400">
                    Revolutionizing home healthcare with technology and compassion. Bringing professional medical support right to your doorstep for a healthier tomorrow.
                </p>
                <div className="flex space-x-4">
                    <a href="https://www.instagram.com/medighar_?igsh=ODN3Z2IzeXJkY2Uz" target="_blank" rel="noreferrer" className="p-2.5 bg-slate-800 rounded-xl hover:bg-sky-600 hover:text-white transition-all transform hover:-translate-y-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                    </a>
                    <a href="https://www.linkedin.com/company/medighar/" target="_blank" rel="noreferrer" className="p-2.5 bg-slate-800 rounded-xl hover:bg-sky-600 hover:text-white transition-all transform hover:-translate-y-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                    </a>
                    <a href="#" className="p-2.5 bg-slate-800 rounded-xl hover:bg-sky-600 hover:text-white transition-all transform hover:-translate-y-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                    </a>
                </div>
            </div>

            <div className="col-span-1">
                <h4 className="text-white font-bold mb-6 tracking-wide">Quick Links</h4>
                <ul className="space-y-4">
                    <li><Link to="/" className="hover:text-sky-400 transition-colors">Home</Link></li>
                    <li><Link to="/services" className="hover:text-sky-400 transition-colors">Services</Link></li>
                    <li><Link to="/careers" className="hover:text-sky-400 transition-colors">Careers</Link></li>
                    <li><Link to="/contact" className="hover:text-sky-400 transition-colors">Contact</Link></li>
                    <li><Link to="/about" className="hover:text-sky-400 transition-colors">About Us</Link></li>
                </ul>
            </div>

            <div className="col-span-1">
                <h4 className="text-white font-bold mb-6 tracking-wide">Legal</h4>
                <ul className="space-y-4">
                    <li><Link to="/privacy-policy" className="hover:text-sky-400 transition-colors">Privacy & Policy</Link></li>
                    <li><Link to="/terms" className="hover:text-sky-400 transition-colors">Terms and Service</Link></li>
                    <li><Link to="/cookies-policy" className="hover:text-sky-400 transition-colors">Cookies Policy</Link></li>
                    <li><Link to="/refund-policy" className="hover:text-sky-400 transition-colors">Refund Policy</Link></li>
                </ul>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-800 text-center text-sm">
            <p>© 2024 MediGhar Healthcare Services. All rights reserved. Designed with care for your health.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
