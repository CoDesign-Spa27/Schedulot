import React from "react";
import { useAuth } from "../context/authContext"; 
import { useNavigate } from "react-router-dom";
const Home = () => {
  const { user, logout} = useAuth();
 const navigate = useNavigate();
 if(user.user_type === "student"){
    navigate("/instructors")
 }else{
    navigate("/availability")
 }
  return (
    <div className="p-4">
      {user ? (
        <div>
          <h1 className="text-white">Welcome, {user.name}</h1>
          <button onClick={logout} className="bg-blue-500 text-white p-2 rounded">
            Logout
          </button>
        </div>
      ) : (
        <h1>Please login</h1>
      )}
    </div>
  );
};

export default Home;
