import React, { useEffect, useState } from "react";
import { axios } from "../util/axios";

const InstructorList = ({ onSelect }) => {
  const [instructors, setInstructors] = useState([]);
  const [activeInstructor, setActiveInstructor] = useState(null);

  useEffect(() => {
    getInstructors();
  }, []);

  const getInstructors = async () => {
    try {
      const response = await axios.get("/instructors", {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      setInstructors(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching instructors:", error);
    }
  };

  const handleSelect = (id) => {
    setActiveInstructor(id);
    onSelect(id);
  };

  return (
    <div className="p-8 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 rounded-xl shadow-lg">
      <h2 className="text-3xl text-center font-semibold text-indigo-200 mb-6">
        Select an Instructor
      </h2>
      <ul className="space-y-4 w-full">
        {instructors.map((instructor) => (
          <li key={instructor?.id} className="flex justify-center">
            <button
              onClick={() => handleSelect(instructor?.id)}
              className={`max-w-lg w-full py-3 px-6 text-lg font-medium text-gray-100 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 ${
                activeInstructor === instructor?.id
                  ? "bg-gradient-to-r from-pink-700 to-pink-800"
                  : "bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
              }`}
            >
              {instructor?.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InstructorList;
