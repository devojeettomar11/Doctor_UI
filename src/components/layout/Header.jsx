import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, LogIn, UserPlus, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuthStore } from '@/store';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services', dropdown: [
      { name: 'Online Consultation', path: '/online-consultation' },
      { name: 'Lab Tests', path: '/lab-tests' },
      { name: 'Order Tracking', path: '/order-tracking' },
      { name: 'Medicine Reminder', path: '/medicine-reminder' },
      { name: 'Emergency Support', path: '/emergency-support' },
    ]},
    { name: 'About', path: '/about' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-slate-200/50 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img 
            src="/images/logo.jpg" 
            alt="MediGhar Logo" 
            className="h-10 w-auto rounded-lg shadow-sm group-hover:scale-105 transition-transform duration-300" 
          />
          {!isScrolled && (
            <span className="text-2xl font-black tracking-tighter text-slate-800">
              Medi<span className="text-sky-600">Ghar</span>
            </span>
          )}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group py-2">
              <Link
                to={link.path}
                className={`text-sm font-bold transition-colors flex items-center gap-1 ${location.pathname === link.path ? 'text-sky-600' : 'text-slate-600 hover:text-sky-600'}`}
              >
                {link.name}
                {link.dropdown && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />}
              </Link>

              {link.dropdown && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-2xl shadow-2xl shadow-slate-200 border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col py-3 z-50 overflow-hidden translate-y-2 group-hover:translate-y-0 text-left">
                  {link.dropdown.map((sub) => (
                    <Link
                      key={sub.name}
                      to={sub.path}
                      className="px-5 py-3 text-sm font-bold text-slate-700 hover:text-sky-600 hover:bg-sky-50 transition-all flex items-center justify-between group/sub"
                    >
                      {sub.name}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover/sub:opacity-100 -translate-x-2 group-hover/sub:translate-x-0 transition-all"><path d="m9 18 6-6-6-6"/></svg>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-slate-600 font-bold hover:text-sky-600 transition-colors flex items-center gap-2">
                  <LayoutDashboard size={18} /> Dashboard
                </Link>
                <button 
                  onClick={logout}
                  className="bg-rose-50 text-rose-600 px-6 py-3 rounded-2xl font-black text-sm hover:bg-rose-100 transition-all flex items-center gap-2"
                >
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-slate-600 font-bold hover:text-sky-600 transition-colors flex items-center gap-2">
                  <LogIn size={18} /> Login
                </Link>
                <Link to="/register" className="bg-sky-600 text-white px-7 py-3 rounded-2xl font-black text-sm shadow-xl shadow-sky-100 hover:bg-sky-700 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center gap-2">
                  Get Started <UserPlus size={18} />
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-0 top-[72px] bg-white z-40 transition-transform duration-500 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 space-y-6 h-full overflow-y-auto">
          {navLinks.map((link) => (
            <div key={link.name} className="space-y-4">
              <Link
                to={link.path}
                onClick={toggleMobileMenu}
                className="text-2xl font-black text-slate-900 flex items-center justify-between"
              >
                {link.name}
                {link.dropdown && <ChevronDown size={20} />}
              </Link>
              {link.dropdown && (
                <div className="grid grid-cols-1 gap-3 pl-4">
                  {link.dropdown.map((sub) => (
                    <Link
                      key={sub.name}
                      to={sub.path}
                      onClick={toggleMobileMenu}
                      className="text-lg font-bold text-slate-500 hover:text-sky-600"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-8 border-t border-slate-100 flex flex-col gap-4">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  onClick={toggleMobileMenu} 
                  className="w-full py-5 rounded-2xl bg-slate-50 text-slate-900 text-center font-black text-lg flex items-center justify-center gap-2"
                >
                  <LayoutDashboard size={20} /> Dashboard
                </Link>
                <button 
                  onClick={() => { logout(); toggleMobileMenu(); }} 
                  className="w-full py-5 rounded-2xl bg-rose-50 text-rose-600 text-center font-black text-lg flex items-center justify-center gap-2"
                >
                  <LogOut size={20} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={toggleMobileMenu} className="w-full py-5 rounded-2xl bg-slate-50 text-slate-900 text-center font-black text-lg flex items-center justify-center gap-2">
                  <LogIn size={20} /> Login
                </Link>
                <Link to="/register" onClick={toggleMobileMenu} className="w-full py-5 rounded-2xl bg-sky-600 text-white text-center font-black text-lg shadow-xl shadow-sky-100 flex items-center justify-center gap-2">
                  Get Started <UserPlus size={20} />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
