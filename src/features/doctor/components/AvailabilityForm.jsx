import React from 'react';
import { useAvailability } from '../hooks/useAvailability';
import { SLOT_DURATIONS } from '../types';

const AvailabilityForm = () => {
  const {
    availability,
    loading,
    saving,
    error,
    success,
    toggleDay,
    updateDayField,
    saveAvailability,
  } = useAvailability();

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4, 5, 6, 7].map((n) => (
          <div key={n} className="bg-gray-100 rounded-xl h-14 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* Info banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-5 text-sm text-blue-700">
        Toggle a day ON to set its working hours. Slots are auto-generated from your time range and slot duration.
        <br />
        <span className="text-xs opacity-80">
          Example: Monday 9:00 AM – 1:00 PM with 15 min slots = 16 appointment slots
        </span>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-4">
          {error}
        </div>
      )}

      {/* Success */}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl mb-4 flex items-center gap-2">
          <span>✓</span> Availability saved successfully!
        </div>
      )}

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-5">

        {/* Header row */}
        <div className="grid grid-cols-12 gap-3 px-5 py-3 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500">
          <div className="col-span-1">On</div>
          <div className="col-span-3">Day</div>
          <div className="col-span-3">Start time</div>
          <div className="col-span-3">End time</div>
          <div className="col-span-2">Slot (min)</div>
        </div>

        {/* Day rows */}
        {availability.map((item, index) => (
          <div
            key={item.day}
            className={`grid grid-cols-12 gap-3 items-center px-5 py-3.5 transition-opacity ${
              index !== availability.length - 1 ? 'border-b border-gray-100' : ''
            } ${!item.isAvailable ? 'opacity-40' : ''}`}
          >
            {/* Toggle switch */}
            <div className="col-span-1">
              <button
                type="button"
                onClick={() => toggleDay(item.day)}
                aria-label={`Toggle ${item.day}`}
                className={`relative w-9 h-5 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
                  item.isAvailable ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-200 ${
                    item.isAvailable ? 'left-4' : 'left-0.5'
                  }`}
                />
              </button>
            </div>

            {/* Day name */}
            <div className="col-span-3">
              <span className="text-sm font-medium text-gray-900">{item.day}</span>
            </div>

            {/* Start time */}
            <div className="col-span-3">
              <input
                type="time"
                value={item.startTime}
                disabled={!item.isAvailable}
                onChange={(e) => updateDayField(item.day, 'startTime', e.target.value)}
                className="w-full text-sm border border-gray-200 rounded-lg px-2.5 py-1.5 text-gray-900 bg-white disabled:bg-gray-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* End time */}
            <div className="col-span-3">
              <input
                type="time"
                value={item.endTime}
                disabled={!item.isAvailable}
                onChange={(e) => updateDayField(item.day, 'endTime', e.target.value)}
                className="w-full text-sm border border-gray-200 rounded-lg px-2.5 py-1.5 text-gray-900 bg-white disabled:bg-gray-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Slot duration */}
            <div className="col-span-2">
              <select
                value={item.slotDuration}
                disabled={!item.isAvailable}
                onChange={(e) => updateDayField(item.day, 'slotDuration', Number(e.target.value))}
                className="w-full text-sm border border-gray-200 rounded-lg px-2 py-1.5 text-gray-900 bg-white disabled:bg-gray-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {SLOT_DURATIONS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* Preview: show slot count for enabled days */}
      {availability.some((d) => d.isAvailable) && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 mb-5">
          <p className="text-xs font-medium text-gray-500 mb-3">Slot preview</p>
          <div className="flex flex-wrap gap-3">
            {availability
              .filter((d) => d.isAvailable)
              .map((d) => {
                const [sh, sm] = d.startTime.split(':').map(Number);
                const [eh, em] = d.endTime.split(':').map(Number);
                const totalMins = (eh * 60 + em) - (sh * 60 + sm);
                const slots = totalMins > 0 ? Math.floor(totalMins / d.slotDuration) : 0;
                return (
                  <div key={d.day} className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs">
                    <span className="font-medium text-gray-800">{d.day.slice(0, 3)}</span>
                    <span className="text-gray-400 mx-1">·</span>
                    <span className="text-blue-600 font-medium">{slots} slots</span>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Save button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={saveAvailability}
          disabled={saving || !availability.some((d) => d.isAvailable)}
          className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {saving ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Saving...
            </span>
          ) : (
            'Save availability'
          )}
        </button>
      </div>
    </div>
  );
};

export default AvailabilityForm;
