import React, { useEffect, useState } from "react";
import { axios } from "../util/axios";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = async () => {
    try {
      const response = await axios.get("/bookings", {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  

  return (
    <div className="p-8 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 rounded-xl shadow-lg mt-6">
      <h2 className="text-2xl font-semibold text-indigo-200 mb-6">Your Bookings</h2>
      {bookings.length === 0 ? (
        <p className="text-gray-400">No bookings available.</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map((booking) => (
            <li
              key={booking.id}
              className="flex flex-col sm:flex-row justify-between p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105"
            >
              <div>
                <span className="block text-lg font-medium text-gray-100">
                  {booking.start_time} - {booking.end_time}
                </span>
                <span className="block text-sm text-gray-300">on {booking.date} </span>
              </div>
              <button  className="mt-4 sm:mt-0 sm:ml-4 px-4 py-2 bg-gray-800 text-gray-200 font-medium rounded-md hover:bg-gray-700 transition duration-300">
                View Details
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingList;
