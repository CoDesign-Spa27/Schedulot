import React, { useState } from 'react';
import {axios} from '../util/axios'

const AvailabilityForm = ({ fetchAvailability, editSlot }) => {
  const [date, setDate] = useState(editSlot?.date || '');
  const [startTime, setStartTime] = useState(editSlot?.start_time || '');
  const [endTime, setEndTime] = useState(editSlot?.end_time || '');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { date, startTime, endTime };
      if (editSlot) {
        await axios.put(`/instructor/availability/${editSlot.id}`, data , {
          headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
      });
      } else {
        await axios.post('/instructor/availability', data ,{
          headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
      } );
      }
      fetchAvailability();
      setDate('');
      setStartTime('');
      setEndTime('');
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 py-6">
      <h2 className="text-xl font-bold mb-4">{editSlot ? 'Edit Availability' : 'Set Availability'}</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="mt-1 px-4 py-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
            className="mt-1 px-4 py-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
            className="mt-1 px-4 py-2 border rounded w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {editSlot ? 'Update Slot' : 'Set Availability'}
        </button>
      </form>
    </div>
  );
};

export default AvailabilityForm;
