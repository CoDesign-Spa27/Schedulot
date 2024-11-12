import React, { useState, useEffect } from 'react';
import { axios } from '../../util/axios';
import AvailabilityForm from '../../components/AvailabilityForm';
import AvailabilityList from '../../components/AvailabilityList';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
const Availability = () => {
  const [availability, setAvailability] = useState([]);
  const [editSlot, setEditSlot] = useState(null);
  const { user, logout } = useAuth();
  const navigate=useNavigate();

  useEffect(()=>{
    if(user.user_type !== "instructor") {
  navigate("/instructors"); 
    }
  },[]);
  const fetchAvailability = async () => {
    try {
      const res = await axios.get('/instructor/availability', {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      setAvailability(res.data.availability);
      console.log(res.data.availability);
    } catch (error) {
      console.error("Error fetching availability:", error);
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

  const handleEdit = (slot) => {
    setEditSlot(slot);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-purple-800">
          Welcome, {user.name}
        </h1>
        <button
          onClick={logout}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-transform duration-300 transform hover:scale-105"
        >
          Logout
        </button>
      </div>
      <h1 className="text-4xl font-bold text-center mb-10 text-purple-800">
        Instructor Availability Management
      </h1>
      <div className="mb-8">
        <AvailabilityForm fetchAvailability={fetchAvailability} editSlot={editSlot} />
      </div>
      <AvailabilityList slots={availability} onEdit={handleEdit} />
    </div>
  );
};

export default Availability;
