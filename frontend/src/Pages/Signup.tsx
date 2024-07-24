import React, { useState } from "react";
import { api } from "../API/API";
import APIS from "../API/ENDPOINTS";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const [data, setData] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = { username, email, password, age };
    console.log(form);
    try {
      await api.post(APIS.REGISTER, form).then((response) => {
        if (response.status === 201) {
          setData(response.data);
          toast.success("Registration successful");
          navigate("/login");
        } else {
          toast.error("Registration failed");
        }
      });
    } catch (error) {
      toast.error("Error registering user");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Name</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
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
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">Age</label>
            <input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="/login" className="text-sm text-blue-500 hover:underline">
            Already have an account? Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
