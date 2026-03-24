import { Link } from 'react-router-dom';

const Services = () => {
  return (
    <>
      <section id="services" className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-sky-600 font-bold tracking-widest uppercase text-sm mb-4 block">
              Our Services
            </span>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Comprehensive Care Solutions</h2>
            <p className="text-slate-600 text-lg">
              We provide a wide range of specialized medical services tailored
              to meet your unique health requirements immediately.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {/* Service 1 */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 card-hover group">
              <div className="h-48 overflow-hidden relative">
                <img src="https://media.istockphoto.com/id/1326991951/photo/view-over-client-shoulder-sit-at-desk-receive-medical-consultation-online.jpg?s=612x612&w=0&k=20&c=yojJZJo7Stu-SFrQq-9EA-3XuvGrYsMBHrJKdGUH0rs=" alt="Online Consultation" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-3">Online Doctor Consultation</h3>
                <p className="text-slate-600 mb-6">• Video consultation<br/>• Digital prescription</p>
                <Link to="/online-consultation" className="text-sky-600 font-bold flex items-center group/link">
                  Learn More 
                  <svg className="ml-2 w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </Link>
              </div>
            </div>

            {/* Service 2 */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 card-hover group">
              <div className="h-48 overflow-hidden relative">
                <img src="https://static.vecteezy.com/system/resources/previews/023/894/492/non_2x/24-hours-medical-servises-24-7-medical-call-center-emergency-patient-support-first-aid-doctor-holding-in-hand-24x7-sign-and-medicine-icons-network-connection-on-virtual-screen-illustration-vector.jpg" alt="Emergency Support" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-3">Emergency Support (24/7)</h3>
                <p className="text-slate-600 mb-6">Urgent doctor guidance anytime</p>
                <Link to="/emergency-support" className="text-sky-600 font-bold flex items-center group/link">
                  Learn More
                  <svg className="ml-2 w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </Link>
              </div>
            </div>

            {/* Service 3 */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 card-hover group">
              <div className="h-48 overflow-hidden relative">
                <img src="https://www.indushealthplus.com/front/media/article_img/icons/7.jpg" alt="Lab Tests" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-3">Lab Tests & Health Checkups at Home</h3>
                <p className="text-slate-600 mb-6">Home sample collection</p>
                <Link to="/lab-tests" className="text-sky-600 font-bold flex items-center group/link">
                  Learn more 
                  <svg className="ml-2 w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 4 */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 card-hover group">
              <div className="h-48 overflow-hidden relative">
                <img src="https://cdn.prod.website-files.com/634f8a681508d6180f9a2128/6865271da32274ab15d70dd8_reasons-why-customers-prefer-real-time-order-tracking.webp" alt="Order Tracking" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-3">Order Tracking (Live)</h3>
                <p className="text-slate-600 mb-6">Step-by-step updates</p>
                <Link to="/order-tracking" className="text-sky-600 font-bold flex items-center group/link">
                  Learn More 
                  <svg className="ml-2 w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </Link>
              </div>
            </div>

            {/* Service 5 */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 card-hover group">
              <div className="h-48 overflow-hidden relative">
                <img src="https://managixglobal.com/wp-content/uploads/2022/07/e107-dl-buying-medicine-online.jpg" alt="Medicine Order" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-3">Medicine Order</h3>
                <p className="text-slate-600 mb-6">Home convenience</p>
                <Link to="#" className="text-sky-600 font-bold flex items-center group/link">
                  Learn More
                  <svg className="ml-2 w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </Link>
              </div>
            </div>

            {/* Service 6 */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 card-hover group">
              <div className="h-48 overflow-hidden relative">
                <img src="https://cdn.aptoide.com/imgs/a/6/7/a672a2eb5c23c21dd5427463a96c07a1_fgraphic.png" alt="Medicine Reminder System" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-3">Medicine Reminder System</h3>
                <p className="text-slate-600 mb-6">• Daily reminders<br/>• Weekly schedule<br/>• Missed alerts</p>
                <Link to="/medicine-reminder" className="text-sky-600 font-bold flex items-center group/link">
                  Learn More 
                  <svg className="ml-2 w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
