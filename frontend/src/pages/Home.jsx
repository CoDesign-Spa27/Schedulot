import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { user, loading } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    user && setUserData(user);
   
  }, []);

  if (loading) {
    return (
      <div className="p-4 text-center">
        <p>Loading...</p>
      </div>
    );
  }

 
  const dashboardLink = userData?.user_type === "student" ? "/instructors" : "/availability";

  return (
    <div className="p-4">
      <Link to={dashboardLink}>
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
          Go to Dashboard
        </button>
      </Link>


      <h2>Please Refresh first before clicking any button!</h2>
    </div>
  );
};

export default Home;
