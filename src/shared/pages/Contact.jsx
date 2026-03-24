import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'General Inquiry',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ type: 'success', message: '✅ ' + data.message });
        setFormData({ name: '', email: '', inquiryType: 'General Inquiry', message: '' });
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
      // Fallback or Web3forms approach - if backend is down
      try {
        const web3FormData = new FormData();
        web3FormData.append('access_key', 'c37093b3-c647-4cdc-8adb-700e37df7c8c');
        web3FormData.append('name', formData.name);
        web3FormData.append('email', formData.email);
        web3FormData.append('inquiry_type', formData.inquiryType);
        web3FormData.append('message', formData.message);

        const web3Response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: web3FormData
        });

        const web3Data = await web3Response.json();
        if (web3Data.success) {
          setStatus({ type: 'success', message: '✅ Message sent successfully!' });
          setFormData({ name: '', email: '', inquiryType: 'General Inquiry', message: '' });
        } else {
          setStatus({ type: 'error', message: '❌ Failed to send message. Please try again or email us directly at medighar151@gmail.com' });
        }
      } catch (err) {
        setStatus({ type: 'error', message: '❌ Failed to send message. Please try again or email us directly at medighar151@gmail.com' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-slate-50 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
            <div className="lg:w-1/3 bg-sky-600 p-12 text-white">
              <h3 className="text-3xl font-bold mb-8">Contact Us</h3>
              <p className="text-sky-100 mb-12">Need help? Our team is available 24/7 to assist you with your health concerns.</p>

              <div className="space-y-8">
                <div className="flex items-center space-x-6">
                  <div className="bg-white/10 p-4 rounded-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-sky-200">Email Address</div>
                    <div className="text-lg font-bold"><a href="mailto:medighar151@gmail.com" className="email-link">medighar151@gmail.com</a></div>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="bg-white/10 p-4 rounded-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-sky-200">Office Location</div>
                    <div className="text-lg font-bold">Remote</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-2/3 p-12 bg-white">
              {status.message && (
                <div className={`mb-6 p-4 rounded-2xl text-center ${status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {status.message}
                </div>
              )}
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Inquiry Type</label>
                  <select name="inquiryType" value={formData.inquiryType} onChange={handleChange} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-sky-500 outline-none transition-all appearance-none cursor-pointer">
                    <option>General Inquiry</option>
                    <option>Doctor Consultation</option>
                    <option>Emergency Services</option>
                    <option>Career Opportunities</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Message</label>
                  <textarea rows="4" name="message" value={formData.message} onChange={handleChange} required placeholder="How can we help you?" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-sky-500 outline-none transition-all"></textarea>
                </div>
                <button type="submit" disabled={loading} className="w-full bg-slate-900 text-white font-bold py-5 rounded-2xl hover:bg-slate-800 transition-all shadow-xl disabled:opacity-50">
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
