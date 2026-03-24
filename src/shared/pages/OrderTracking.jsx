import { useState } from 'react';
import { Link } from 'react-router-dom';

const OrderTracking = () => {
  const [orderId, setOrderId] = useState('');
  const [showStatus, setShowStatus] = useState(false);

  const handleTrackOrder = () => {
    if (orderId.trim() === '') {
      alert('Please enter a valid Order ID');
      return;
    }
    setShowStatus(true);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-sky-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Live Order Tracking
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Track your medicines, lab test bookings, and healthcare services in real-time with Medighar.
          </p>
        </div>
      </section>

      {/* Tracking Form */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">

          <h2 className="text-3xl font-bold mb-6">Track Your Order</h2>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <input 
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter Your Order ID"
              className="w-full md:w-2/3 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
            />

            <button 
              onClick={handleTrackOrder}
              className="bg-sky-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-sky-700 transition"
            >
              Track Now
            </button>
          </div>

        </div>
      </section>

      {/* Order Status Section */}
      {showStatus && (
        <section className="py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-6">

            <div className="bg-white p-10 rounded-3xl shadow-sm border">

              <h3 className="text-2xl font-bold mb-8 text-center" >
                Order Status for {orderId}
              </h3>

              <div className="grid md:grid-cols-4 gap-6 text-center">

                <div className="status-step">
                  <div className="text-sky-600 font-bold text-lg mb-2">1</div>
                  <p>Order Confirmed</p>
                </div>

                <div className="status-step">
                  <div className="text-sky-600 font-bold text-lg mb-2">2</div>
                  <p>Processing</p>
                </div>

                <div className="status-step">
                  <div className="text-sky-600 font-bold text-lg mb-2">3</div>
                  <p>Out for Delivery</p>
                </div>

                <div className="status-step">
                  <div className="text-sky-600 font-bold text-lg mb-2">4</div>
                  <p>Delivered</p>
                </div>

              </div>

              <div className="mt-10 text-center">
                <p className="text-slate-600">
                  Thank you for choosing Medighar. We ensure timely and safe delivery of your healthcare services.
                </p>
              </div>

            </div>

          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-sky-600 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Need Help With Your Order?
        </h2>
        <p className="mb-8">
          Our support team is available 24/7 to assist you.
        </p>
        <Link to="/contact" className="bg-white text-sky-600 px-8 py-3 rounded-full font-bold hover:bg-slate-100 transition">
          Contact Support
        </Link>
      </section>
    </>
  );
};

export default OrderTracking;
