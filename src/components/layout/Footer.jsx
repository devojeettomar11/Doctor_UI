import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Facebook, Twitter, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f172a] text-slate-400 pt-24 pb-12 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 items-start relative z-10">
        {/* Brand Column */}
        <div className="col-span-1 lg:col-span-1">
          <Link to="/" className="flex items-center gap-3 mb-8 group">
            <img 
              src="/images/logo.jpg" 
              alt="MediGhar Logo" 
              className="h-12 w-auto rounded-xl shadow-lg shadow-sky-900/20 group-hover:scale-105 transition-transform duration-300" 
            />
            <span className="text-2xl font-black tracking-tighter text-white">
              Medi<span className="text-sky-600">Ghar</span>
            </span>
          </Link>
          <p className="mb-10 leading-relaxed text-slate-400 font-medium">
            Revolutionizing doorstep healthcare with cutting-edge technology and a compassionate heart. Your wellness, simplified.
          </p>
          <div className="flex gap-4">
            {[
              { icon: Instagram, link: "https://www.instagram.com/medighar_?igsh=ODN3Z2IzeXJkY2Uz" },
              { icon: Linkedin, link: "https://www.linkedin.com/company/medighar/" },
              { icon: Facebook, link: "#" },
              { icon: Twitter, link: "#" }
            ].map((social, i) => (
              <a 
                key={i} 
                href={social.link} 
                target="_blank" 
                rel="noreferrer" 
                className="w-11 h-11 bg-slate-800/50 backdrop-blur-md rounded-2xl flex items-center justify-center text-slate-400 border border-white/5 hover:bg-sky-600 hover:text-white hover:border-sky-500 transition-all transform hover:-translate-y-1"
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>

          <div className="mt-10">
            <p className="text-white font-black text-sm mb-4 tracking-wider uppercase">Get the App</p>
            <a 
              href="https://play.google.com/store" 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center gap-3 bg-black text-white px-5 py-2.5 rounded-xl border border-white/10 hover:border-sky-500/50 hover:bg-slate-900 transition-all group"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L18.66,16.19C19.44,16.63 19.44,17.37 18.66,17.81L4.85,25.78L14.69,15.94L16.81,15.12M17.15,12L4.63,4.48L14.69,14.53L17.15,12M18.66,7.81C19.44,8.25 19.44,8.99 18.66,9.43L16.81,10.5L14.69,8.4L4.85,2.78L18.66,7.81Z" />
              </svg>
              <div>
                <p className="text-[10px] font-bold text-slate-400 leading-none mb-1">GET IT ON</p>
                <p className="text-sm font-black text-white leading-none">Google Play</p>
              </div>
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 className="text-white font-black text-lg mb-8 tracking-wide">Quick Links</h4>
          <ul className="space-y-4">
            {['Home', 'Services', 'About Us', 'Careers', 'Contact'].map((item) => (
              <li key={item}>
                <Link to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`} className="group flex items-center gap-2 hover:text-sky-400 transition-all font-bold">
                  <span className="w-1.5 h-1.5 bg-slate-700 rounded-full group-hover:bg-sky-400 group-hover:w-3 transition-all"></span>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services Column */}
        <div>
          <h4 className="text-white font-black text-lg mb-8 tracking-wide">Our Services</h4>
          <ul className="space-y-4">
            {[
              { name: 'Online Consultation', path: '/online-consultation' },
              { name: 'Lab Tests', path: '/lab-tests' },
              { name: 'Order Tracking', path: '/order-tracking' },
              { name: 'Emergency Support', path: '/emergency-support' },
              { name: 'Medicine Reminder', path: '/medicine-reminder' }
            ].map((service) => (
              <li key={service.name}>
                <Link to={service.path} className="group flex items-center gap-2 hover:text-sky-400 transition-all font-bold">
                  <span className="w-1.5 h-1.5 bg-slate-700 rounded-full group-hover:bg-sky-400 group-hover:w-3 transition-all"></span>
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h4 className="text-white font-black text-lg mb-8 tracking-wide">Contact Us</h4>
          <ul className="space-y-6">
            <li className="flex gap-4">
              <div className="w-10 h-10 bg-slate-800/50 rounded-xl flex items-center justify-center text-sky-500 border border-white/5 shrink-0">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Email Support</p>
                <a href="mailto:support@medighar.com" className="text-white font-bold hover:text-sky-400 transition-colors">support@medighar.com</a>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-10 h-10 bg-slate-800/50 rounded-xl flex items-center justify-center text-emerald-500 border border-white/5 shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Call Anytime</p>
                <a href="tel:+1234567890" className="text-white font-bold hover:text-emerald-400 transition-colors">+91 123 456 7890</a>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-10 h-10 bg-slate-800/50 rounded-xl flex items-center justify-center text-rose-500 border border-white/5 shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Our Office</p>
                <p className="text-white font-bold leading-relaxed">Tech Hub, Silicon Valley,<br/>Bangalore, India</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 text-slate-500 font-bold text-sm">
        <p>© {currentYear} MediGhar Healthcare Services. Built for a healthier you.</p>
        <div className="flex gap-8">
          <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link to="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
          <Link to="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
