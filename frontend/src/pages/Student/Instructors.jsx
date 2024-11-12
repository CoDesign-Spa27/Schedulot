import React, { useState,useEffect } from "react";
import InstructorList from "../../components/InstructorList";
import SlotList from "../../components/SlotList";
import BookingList from "../../components/BookingList";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
function App() {
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const { user, logout } = useAuth();
const navigate=useNavigate();

  useEffect(()=>{
    user
  },[]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="w-full max-w-4xl space-y-8">
         
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-xl">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Welcome, {user.name}
          </h1>
          <button
            onClick={logout}
            className="bg-white hover:bg-gray-100 text-purple-600 font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
          >
            Logout
          </button>
        </div>
 
        <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 p-8 rounded-lg shadow-xl backdrop-blur-lg bg-opacity-70">
          <InstructorList onSelect={(id) => setSelectedInstructor(id)} />
          {selectedInstructor && (
            <div className="mt-6">
              <h2 className="text-xl font-bold text-indigo-200 mb-4">
                Available Slots
              </h2>
              <SlotList instructorId={selectedInstructor} />
            </div>
          )}
        </div>
 
        <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 p-8 rounded-lg shadow-xl backdrop-blur-lg bg-opacity-70">
          <h2 className="text-xl font-bold text-indigo-200 mb-4">
            Booking History
          </h2>
          <BookingList />
        </div>
      </div>
    </div>
  );
}

export default App;
