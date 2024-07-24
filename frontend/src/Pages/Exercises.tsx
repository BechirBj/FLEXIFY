// src/pages/Exercises.tsx
import React from 'react';

const Exercises: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Exercises</h2>

        {/* Exercise List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Exercise Card */}
          <div className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition duration-300">
            <h3 className="text-xl font-bold mb-2">Exercise Name</h3>
            <p>Type: Strength</p>
            <p>Muscles Targeted: Chest, Triceps</p>
            <div className="mt-4">
              <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                Edit
              </button>
            </div>
          </div>
          {/* Repeat Exercise Card for other exercises */}
        </div>

        {/* Add Exercise Button */}
        <div className="mt-8">
          <button className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300">
            Add Exercise
          </button>
        </div>
      </div>
    </div>
  );
};

export default Exercises;
