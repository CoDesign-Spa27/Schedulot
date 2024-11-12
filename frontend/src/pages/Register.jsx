import React,{useState} from 'react'
import {useAuth} from '../context/authContext';
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        user_type: 'student'
      });
      const { register, loading, error } = useAuth();
      const navigate = useNavigate();


      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await register(formData);
          navigate('/login');
        } catch (err) {
            console.error(err);
        };
      };
  return (
    <div>
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Create Account</h2>
 
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) =>setFormData({ ...formData, password: e.target.value })}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-600 mb-2">
             Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value}) }
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
            />
          </div>
      <div className="mb-6">
        <label htmlFor="user_type" className="block text-gray-600 mb-2">
          Role
        </label>
        <select
          id="user_type"
          value={formData.user_type}
          onChange={(e) => setFormData({ ...formData, user_type: e.target.value })}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
        </select>
      </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
    </div>
  );
}

export default Register
