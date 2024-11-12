import React, { useEffect, useState } from "react";
import { axios } from "../util/axios";

const SlotList = ({ instructorId }) => {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    if (instructorId) {
      getSlots();
    }
  }, [instructorId]);

  const getSlots = async () => {
    try {
      const response = await axios.get(`/slots?instructorId=${instructorId}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      setSlots(response.data);
    } catch (error) {
      alert("Failed to fetch slots: " + error.response.data.message);
    }
  };

  const bookSlot = async (availabilityId) => {
    try {
      const response = await axios.post(
        "/bookings",
        { availability_id: availabilityId },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error + "error booking slot");
    }
  };

  const handleBooking = async (slotId) => {
    try {
      await bookSlot(slotId);
      alert("Booking confirmed successfully!");
      setSlots(slots.filter((slot) => slot.id !== slotId));
    } catch (error) {
      alert("Failed to book slot: " + error.response.data.message);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-r from-pink-500 to-blue-600 rounded-xl shadow-xl mt-8 text-white">
      <h2 className="text-3xl font-bold mb-6">Available Slots</h2>
      {slots.length === 0 && (
        <p className="text-gray-200">No available slots for this instructor.</p>
      )}
      <ul className="space-y-6">
        {slots.map((slot) => (
          <li
            key={slot.id}
            className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md text-gray-900 hover:shadow-lg transition-transform transform hover:scale-105"
          >
            <div>
              <p className="font-semibold">
                <span className="text-blue-600">{slot.date}</span> - {slot.start_time} to {slot.end_time}
              </p>
            </div>
            <button
              onClick={() => handleBooking(slot.id)}
              className="py-2 px-5 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-md shadow-lg transition-all duration-300 ease-in-out"
            >
              Book Slot
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SlotList;
