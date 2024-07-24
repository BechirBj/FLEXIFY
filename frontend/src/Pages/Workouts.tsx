import React from 'react';

const Workouts: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Workouts</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition duration-300">
            <h3 className="text-xl font-bold mb-2">Workout Title</h3>
            <p>Date: 2024-07-23</p>
            <p>Exercises: 5</p>
            <p>Duration: 60 mins</p>
            <div className="mt-4 flex justify-between">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                View
              </button>
              <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300">
                Edit
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300">
                Delete
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300">
            Create Workout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Workouts;
