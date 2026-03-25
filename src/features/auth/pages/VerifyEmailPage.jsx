import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import httpClient from '@/services/httpClient';
import { CheckCircle, XCircle, Loader, ArrowRight } from 'lucide-react';

const VerifyEmailPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const { data } = await httpClient.get(`/auth/verify-email/${token}`);
        setStatus('success');
        setMessage(data.message || 'Email verified successfully!');
      } catch (error) {
        setStatus('error');
        setMessage(error.response?.data?.message || 'Invalid or expired verification link.');
      }
    };

    if (token) {
      verifyToken();
    } else {
      setStatus('error');
      setMessage('No verification token provided.');
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center">
        <div className="mb-8 flex justify-center">
          <Link to="/" className="flex items-center gap-2">
            <img src="/images/logo.jpg" alt="Logo" className="h-10 w-auto rounded-xl shadow-sm" />
            <span className="text-2xl font-black tracking-tighter text-slate-900">
              Medi<span className="text-sky-600">Ghar</span>
            </span>
          </Link>
        </div>

        {status === 'verifying' && (
          <div className="space-y-4">
            <div className="flex justify-center">
              <Loader className="w-16 h-16 text-sky-600 animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Verifying your email...</h2>
            <p className="text-slate-500 text-lg">Please wait while we confirm your registration.</p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-6">
            <div className="flex justify-center">
              <CheckCircle className="w-20 h-20 text-emerald-500" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">All set!</h2>
            <p className="text-slate-600 text-lg">{message}</p>
            <Link
              to="/login"
              className="w-full bg-slate-900 text-white font-bold rounded-2xl py-4 flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
            >
              Back to Login
              <ArrowRight size={20} />
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-6">
            <div className="flex justify-center">
              <XCircle className="w-20 h-20 text-rose-500" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Verification Failed</h2>
            <p className="text-slate-600 text-lg">{message}</p>
            <div className="flex flex-col gap-3">
              <Link
                to="/register"
                className="w-full bg-slate-900 text-white font-bold rounded-2xl py-4 flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
              >
                Try Registering Again
                <ArrowRight size={20} />
              </Link>
              <Link to="/" className="text-slate-500 font-medium hover:text-slate-700">
                Back to Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
