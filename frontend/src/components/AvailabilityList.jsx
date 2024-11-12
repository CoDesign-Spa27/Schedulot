import React from 'react';

const AvailabilityList = ({ slots, onEdit }) => {
  return (
    <div className="mt-8 p-6 bg-gradient-to-r from-indigo-600 via-purple-700 to-indigo-600 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-100 mb-6">Available Slots</h2>
      {slots.length > 0 ? (
        <ul className="space-y-6">
          {slots.map((slot) => (
            <li
              key={slot.id}
              className="flex flex-col p-5 bg-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
            >
              <p className="text-gray-800">
                <strong>Date:</strong> {slot.date}
              </p>
              <p className="text-gray-800">
                <strong>Start Time:</strong> {slot.start_time}
              </p>
              <p className="text-gray-800">
                <strong>End Time:</strong> {slot.end_time}
              </p>
              <button
                className="mt-4 w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-md shadow transition-colors duration-300"
                onClick={() => onEdit(slot)}
              >
                Edit Slot
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-200">No available slots found.</p>
      )}
    </div>
  );
};

export default AvailabilityList;
