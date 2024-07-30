// src/pages/WorkoutDetails.tsx
import React, { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import { Private_api } from '../API/API';
import APIS from '../API/ENDPOINTS';

interface Sets{
  id: string;
  exerciseId: string;
  serie: number;
  reps: number;
  kg: number;
}


const WorkoutDetails: React.FC = () => {
  const location = useLocation();
  const workoutId = location.state?.id;
  const workoutName = location.state?.name;
  const [exersiset, setexersiset] = useState<Sets[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleShowSets = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }
    try {
      const response = await Private_api.get(
        `${APIS.GET_EXERCISES}/${workoutId}`
      );
      if (response.status === 200) {
        setexersiset(response.data);
        handleShowSets();
      } else {
        setError("Failed to fetch data");
      }
    } catch (error) {
      setError("Error fetching data");
      console.error("Error fetching data:", error);
    }
  };

  useEffect(()=>
  {
    handleShowSets();
  })
 
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Adding Exercise Details</h2>

        {/* Exercise List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exersiset.map((x) => (
          <div
            key={x.serie}
            className="bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Title: {x.exerciseId}
            </h3>
            <p className="text-sm text-gray-500">
              <span className="font-medium text-gray-600">Muscle:</span>{" "}
              {x.kg}
            </p>
            <div className="flex gap-3">
              <div className="mt-4">
                <button 
                // onClick={() => handleViewDetails(x.id, x.name)}
                className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-600 transition-colors duration-200">
                  View Details
                </button>
              </div>
              <div className="mt-4">
                <button
                  // onClick={() => handleDelete(x.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-400 transition-colors duration-200"
                >
                  <div className="flex gap-4 items-center">
                    Delete
                    <MdDelete />
                  </div>
                </button>
              </div>
            </div>
          </div>
        ))}
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
