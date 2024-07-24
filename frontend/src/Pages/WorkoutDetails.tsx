// src/pages/WorkoutDetails.tsx
import React from 'react';

const WorkoutDetails: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Workout Details</h2>

        {/* Exercise List */}
        <div className="bg-white p-6 shadow-md rounded-lg mb-8">
          <h3 className="text-xl font-bold mb-4">Exercises</h3>
          <ul className="space-y-4">
            <li className="border-b pb-4">
              <h4 className="font-semibold">Exercise Name</h4>
              <p>Sets: 3</p>
              <p>Reps: 10</p>
              <p>Weight: 50 kg</p>
              <p>Notes: Keep back straight</p>
            </li>
            {/* Repeat for other exercises */}
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition duration-300">
            Edit Workout
          </button>
          <button className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300">
            Add Exercise
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetails;
