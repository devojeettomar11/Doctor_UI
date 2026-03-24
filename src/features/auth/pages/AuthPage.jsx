import React, { useState } from 'react';
import { Mail, Lock, User, Phone, Briefcase, ShieldCheck, ArrowRight } from 'lucide-react';

import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const InputField = ({ icon: Icon, type = 'text', placeholder, name, value, onChange }) => (
  <div className="relative mb-4">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
      <Icon size={20} />
    </div>
    <input
      type={type}
      name={name}
      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-trustworthy-main transition-all duration-300"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'patient',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  
  const { login, register, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    if (isLogin) {
      const result = await login({
        email: formData.email,
        password: formData.password
      });
      
      if (result.success) {
        setStatus({ type: 'success', message: 'Logged in successfully!' });
        const redirectPath = result.user?.role === 'store_admin' ? '/store' : '/';
        setTimeout(() => navigate(redirectPath), 1500);
      } else {
        setStatus({ type: 'error', message: result.message });
      }
    } else {
      const result = await register(formData);
      
      if (result.success) {
        setStatus({ type: 'success', message: 'Account created successfully!' });
        const redirectPath = result.user?.role === 'store_admin' ? '/store' : '/';
        setTimeout(() => navigate(redirectPath), 1500);
      } else {
        setStatus({ type: 'error', message: result.message });
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">

        <div className="hidden md:flex md:w-5/12 bg-linear-to-br from-teal-trustworthy-main to-teal-trustworthy-darker p-10 flex-col justify-between text-white">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <ShieldCheck size={32} className="text-teal-trustworthy-lighter" />
              <h1 className="text-2xl font-bold tracking-tight">MediGhar</h1>
            </div>
            <h2 className="text-3xl font-bold mb-4 leading-tight">
              {isLogin ? 'Welcome back to better health.' : 'Join us for priority healthcare.'}
            </h2>
            <p className="text-teal-trustworthy-lighter text-lg">
              {isLogin ? 'Log in to access your dashboard, prescriptions, and tailored care.' : 'Create an account to streamline your medical needs.'}
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl backdrop-blur-md">
              <div className="p-2 bg-white/20 rounded-full">
                <User size={20} className="text-white" />
              </div>
              <p className="font-medium">Secure Patient Portal</p>
            </div>
            <div className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl backdrop-blur-md">
              <div className="p-2 bg-white/20 rounded-full">
                <Briefcase size={20} className="text-white" />
              </div>
              <p className="font-medium">24/7 Remote Access</p>
            </div>
          </div>
        </div>

        {/* Right Side: Form Area */}
        <div className="md:w-7/12 p-8 md:p-12 flex flex-col justify-center bg-white relative">
          <div className="absolute top-8 right-8 text-sm md:hidden">
            <span className="font-bold text-teal-trustworthy-darker">MediGhar</span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              {isLogin ? 'Sign In' : 'Create Account'}
            </h2>
            <p className="text-slate-500">
              {isLogin ? 'Please enter your credentials to proceed.' : 'Fill in the details below to register.'}
            </p>
          </div>

          {status.message && (
            <div className={`mb-6 p-4 rounded-2xl text-sm font-medium ${
              status.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
            }`}>
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <InputField icon={User} name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
            )}

            <InputField icon={Mail} type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />

            {!isLogin && (
              <InputField icon={Phone} type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
            )}

            {!isLogin && (
              <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Briefcase size={20} />
                </div>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-trustworthy-main appearance-none transition-all duration-300"
                >
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                  <option value="clinic_admin">Clinic Admin</option>
                  <option value="store_admin">Store Admin</option>
                  <option value="admin">System Admin</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            )}

            <InputField icon={Lock} type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-slate-900 text-white font-bold rounded-2xl py-4 flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Register Account'}
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-slate-500">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-bold text-teal-trustworthy-darker hover:text-teal-trustworthy-main transition-colors"
            >
              {isLogin ? 'Register now' : 'Sign in'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthPage;
