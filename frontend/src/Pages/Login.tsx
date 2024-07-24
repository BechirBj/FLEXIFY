import React, { useState } from 'react';
import { api } from '../API/API';
import APIS from '../API/ENDPOINTS';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = { email, password };
    
    try {
      const response = await api.post(APIS.LOGIN, form);
      if (response.status === 201) {
        console.log(response.data);
        const { access_token, role ,sub} = response.data;
        localStorage.setItem('token', access_token); 
        localStorage.setItem('sub', sub);
        localStorage.setItem('role', role);
        toast.success("Login successful");
        console.log(response.data);
        window.location.href = "/";
      }
    } catch (error) {
      if (error instanceof AxiosError) { 
        if (error.response) {
          const { data } = error.response;
          if (error.response.status === 401 && data.message) {
            toast.error(data.message);
          } else {
            toast.error("Registration failed");
          }
        } else if (error.request) {
          console.error("No response received:", error.request);
          toast.error("Error occurred while registering");
        } else {
          console.error("Error fetching data:", error.message);
          toast.error("Error occurred while registering");
        }
      }    
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="/forgot-password" className="text-sm text-blue-500 hover:underline">
            Forgot Password?
          </a>
        </div>
        <div className="mt-4 text-center">
          <a href="/signup" className="text-sm text-blue-500 hover:underline">
            Don't have an account? Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
