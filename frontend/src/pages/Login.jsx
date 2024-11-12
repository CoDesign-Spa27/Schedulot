import React from 'react'
import {useAuth} from '../context/authContext';
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';

const Login = () => {

    const [formData, setFormData] = useState({ email: '', password: '' });
    const { login, loading, error } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await login(formData);
          navigate('/');
        } catch (err) {
      
        }
      };
  return (
    <div>
       <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Sign in to your account</h2>
        
 

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>setFormData({ ...formData, email: e.target.value })}
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData,password: e.target.value})}
              required
              className="mt-1 w-full p-2 border text-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
    </div>
  )
}

export default Login
