import { useState } from 'react';
import { Link } from 'react-router-dom';

const MedicineReminder = () => {
  const [reminders, setReminders] = useState([]);
  const [medicineName, setMedicineName] = useState('');
  const [medicineTime, setMedicineTime] = useState('');

  const addReminder = () => {
    if (medicineName.trim() === '' || medicineTime === '') {
      alert("Please enter medicine name and time");
      return;
    }

    const newReminder = {
      id: Date.now(),
      name: medicineName,
      time: medicineTime
    };

    setReminders([...reminders, newReminder]);
    setMedicineName('');
    setMedicineTime('');
  };

  const deleteReminder = (id) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };

  return (
    <>
      <style>
        {`
        @keyframes float {
          0% { transform: translateY(0) }
          50% { transform: translateY(-12px) }
          100% { transform: translateY(0) }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        `}
      </style>

      {/* Hero Banner */}
      <section className="px-6 mt-10">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-sky-600 to-blue-600 rounded-3xl shadow-xl px-10 py-10 flex flex-col md:flex-row items-center justify-between text-white relative overflow-hidden">
            
            {/* Left Content */}
            <div className="max-w-lg text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Your Health Our Priority
              </h1>
              <p className="opacity-90 mb-6">
                Set smart medicine reminders, manage your treatment schedule and stay healthy with Medighar.
              </p>
              <button className="bg-slate-900 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition">
                💊 Set Reminder Now
              </button>
            </div>

            {/* Right Image + Floating Icons */}
            <div className="relative mt-8 md:mt-0 flex justify-center items-center">
              {/* Doctor Image */}
              <img
                src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
                className="w-36 md:w-44 relative z-10"
                alt="Doctor"
              />

              {/* Floating Icons */}
              <img src="https://cdn-icons-png.flaticon.com/512/2966/2966327.png"
                className="hidden md:block absolute -top-4 -left-6 w-10 animate-float z-20" alt="Icon" />
              <img src="https://cdn-icons-png.flaticon.com/512/2966/2966328.png"
                className="hidden md:block absolute top-12 -right-6 w-10 animate-float z-40" alt="Icon" />
              <img src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png"
                className="hidden md:block absolute bottom-0 left-4 w-10 animate-float z-50" alt="Icon" />
              <img src="https://cdn-icons-png.flaticon.com/512/3209/3209266.png"
                className="hidden md:block absolute bottom-6 right-0 w-10 animate-float z-20" alt="Icon" />
            </div>
          </div>
        </div>
      </section>

      {/* Reminder Form */}
      <section className="py-16 md:py-20 bg-white mt-10">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center text-slate-700">
            Set Your Reminder
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <input
              type="text"
              value={medicineName}
              onChange={(e) => setMedicineName(e.target.value)}
              placeholder="Enter Medicine Name"
              className="px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-sky-500 outline-none w-full"
            />
            <input
              type="time"
              value={medicineTime}
              onChange={(e) => setMedicineTime(e.target.value)}
              className="px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-sky-500 outline-none w-full"
            />
            <button
              onClick={addReminder}
              className="bg-sky-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-sky-700 hover:shadow-lg transition w-full"
            >
              ➕ Add Reminder
            </button>
          </div>
        </div>
      </section>

      {/* Reminder List */}
      <section className="py-16 md:py-20 bg-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-xl md:text-2xl font-bold mb-8 text-center text-slate-700">
            Your Reminders
          </h3>
          
          {reminders.length === 0 ? (
            <p className="text-center text-slate-500 mb-4">
              No reminders added yet
            </p>
          ) : (
            <div className="space-y-5">
              {reminders.map((reminder) => (
                <div key={reminder.id} className="bg-white p-5 rounded-lg shadow border flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 hover:shadow-lg transition">
                  <div>
                    <p className="font-semibold text-lg text-slate-700">{reminder.name}</p>
                    <p className="text-slate-500 text-sm mt-1">⏰ Time: {reminder.time}</p>
                  </div>
                  <button 
                    onClick={() => deleteReminder(reminder.id)}
                    className="text-red-500 font-medium hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-sky-600 to-blue-500 text-white py-16 md:py-20 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Stay Healthy with Medighar
        </h2>
        <p className="mb-8 opacity-90 px-6">
          Manage your medicines easily and maintain your treatment schedule.
        </p>
        <Link
          to="/"
          className="bg-white text-sky-600 px-8 py-3 rounded-full font-semibold shadow hover:bg-slate-100 transition inline-block"
        >
          ⬅ Back to Home
        </Link>
      </section>
    </>
  );
};

export default MedicineReminder;
