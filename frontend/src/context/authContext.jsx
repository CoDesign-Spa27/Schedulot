import { createContext, useState, useContext,useEffect } from "react";
import { axios } from "../util/axios";
import {Navigate} from 'react-router-dom'
const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const token = JSON.stringify(localStorage.getItem("token"))
    if (token) {
      me(); 
    }
  }, []);
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post("/auth/register", userData);
 
      return response.data;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post("/auth/login", credentials);
      setUser(response.data);
      localStorage.setItem("token", JSON.stringify(response.data.token));
      return response.data;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };


  const me = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
      });
      setUser(response.data.user);
      console.log(response.data)
      return response.data;
    } catch (err) {
      console.log(err);
      if (err.response?.status === 401) {
        logout();
      }
      setError(err.response?.data?.error || "Failed to fetch user profile");
    } finally {
      setLoading(false);
    }
  };

  const value = { user, loading, error, register, login, logout, me };
  return <AuthContext.Provider value={value}> {!loading && children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};


export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};
