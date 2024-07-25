import React from 'react';
import { useAuth } from '../Routes/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Home: React.FC = () => {

  const { isAuthenticated } = useAuth();
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to FLEXIFY</h1>
          <p className="text-lg mb-8">
            Track your workouts, monitor progress, and achieve your fitness goals.
          </p>
          <Link
            to={isAuthenticated ? '/workouts' : '/login'}
            className="bg-white text-primary px-6 py-3 rounded-lg font-semibold transition duration-300 hover:bg-gray-200"
          >
            Get Started
          </Link>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition duration-300">
            <h3 className="text-xl font-bold mb-2">Track Workouts</h3>
            <p>Log exercises and keep a record of your workouts.</p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition duration-300">
            <h3 className="text-xl font-bold mb-2">Monitor Progress</h3>
            <p>Visualize your progress over time with charts and stats.</p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition duration-300">
            <h3 className="text-xl font-bold mb-2">Achieve Goals</h3>
            <p>Set fitness goals and track your achievements.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
