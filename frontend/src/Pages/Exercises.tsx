import React, { useEffect, useState } from "react";
import { Private_api } from "../API/API";
import APIS from "../API/ENDPOINTS";
import {  useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
interface Exercise {
  id: string;
  name: string;
  muscle: string;
}

interface ExList {
  id: string;
  name: string;
  muscle: string;
}

type SelectedExercise = {
  name: string;
  muscle: string;
};

const Exercises: React.FC = () => {
  const [exersiset, setexersiset] = useState<Exercise[]>([]);

  const [ExList, setExList] = useState<ExList[]>([]);
  const [data, setData] = useState("");

  const handleShowExList = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }
    try {
      const response = await Private_api.get(APIS.GET_EXLIST);
      if (response.status === 200) {
        setExList(response.data);
        console.log("Exercise list:", response.data);
      } else {
        setError("Failed to fetch data");
      }
    } catch (error) {
      setError("Error fetching data");
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    handleShowExList();
    handleShowExersiset();
  }, []);

  const location = useLocation();
  const workoutId = location.state?.id;
  const workoutName = location.state?.name;
  const [Exercises, setExercises] = useState<Exercise[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [selectedExercises, setSelectedExercises] = useState<
    SelectedExercise[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleSelect = (id: string, name: string, muscle: string) => {
    setSelectedExercises((prevSelected) => {
      const isSelected = prevSelected.some(
        (exercise) => exercise.name === name && exercise.muscle === muscle
      );

      if (isSelected) {
        return prevSelected.filter(
          (exercise) => !(exercise.name === name && exercise.muscle === muscle)
        );
      } else {
        return [...prevSelected, { name, muscle }];
      }
    });
  };

  const handleAdd = async (workoutId: string) => {
    handleCloseModal();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }
    const List = selectedExercises.map((exercise) => ({
      name: exercise.name,
      muscle: exercise.muscle,
    }));
    for (const exercise of List) {
      try {
        const response = await Private_api.post(
          `${APIS.ADD_EXERCISE}/${workoutId}`,
          {
            name: exercise.name,
            muscle: exercise.muscle,
          }
        );
        if (response.status === 201) {
          toast.success("Exercises added successfully");
          setData(response.data);
        }
      } catch (error) {
        setError("Failed to create workout");
        toast.error("Can't create workout");
      }
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleShowExersiset = async () => {
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
        handleShowExersiset();
      } else {
        setError("Failed to fetch data");
      }
    } catch (error) {
      setError("Error fetching data");
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }
    try {
      const response = await Private_api.delete(
        `${APIS.DELETE_EXERCISE}/${id}`
      );
      if (response.status === 200) {
        setexersiset((prev) => prev.filter((exerciset) => exerciset.id !== id));
        toast.success("Exercise Deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting Exercise:", error);
    }
  };

  const navigate = useNavigate();
  const handleViewDetails = (id: string, name: string) => {
    navigate("/WorkoutDetails", { state: { id, name } });
  };
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-8">
        Exercise List {workoutName}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exersiset.map((x) => (
          <div
            key={x.id}
            className="bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Title: {x.name}
            </h3>
            <p className="text-sm text-gray-500">
              <span className="font-medium text-gray-600">Muscle:</span>{" "}
              {x.muscle}
            </p>
            <div className="flex gap-3">
              <div className="mt-4">
                <button 
                onClick={() => handleViewDetails(x.id, x.name)}
                className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-600 transition-colors duration-200">
                  View Details
                </button>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => handleDelete(x.id)}
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {Exercises.map((workout) => (
          <div
            key={workout.id}
            className="bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Title: {workout.name}
            </h3>
            <p className="text-sm text-gray-500">
              <span className="font-medium text-gray-600">Owner:</span>{" "}
              {workout.muscle}
            </p>
            <div className="flex gap-3 mt-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-600 transition-colors duration-200">
                View Details
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-400 transition-colors duration-200">
                <div className="flex gap-4 items-center">
                  Delete
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
                  </svg>
                </div>
              </button>
              <button className="bg-yellow-500 text-black px-4 py-2 rounded-full font-semibold hover:bg-yellow-600 transition-colors duration-200">
                <div className="flex gap-4 items-center">
                  Update the Title
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 576 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: "black" }}
                  >
                    <path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleOpenModal}
        className="bg-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-600 transition duration-300"
      >
        Show Exercises
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
            <h3 className="text-2xl font-semibold mb-4">Select Exercises</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-md overflow-hidden shadow-lg">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 text-left font-semibold text-gray-700">
                      Select
                    </th>
                    <th className="py-2 px-4 text-left font-semibold text-gray-700">
                      Exercise Name
                    </th>
                    <th className="py-2 px-4 text-left font-semibold text-gray-700">
                      Muscle Group
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ExList.map((exercise) => (
                    <tr
                      key={exercise.id}
                      className={`border-b transition duration-300 ease-in-out ${
                        selectedExercises.some(
                          (e) =>
                            e.name === exercise.name &&
                            e.muscle === exercise.muscle
                        )
                          ? "bg-blue-100"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() =>
                        toggleSelect(
                          exercise.id,
                          exercise.name,
                          exercise.muscle
                        )
                      }
                    >
                      <td className="py-2 px-4">
                        <input
                          type="checkbox"
                          checked={selectedExercises.some(
                            (e) =>
                              e.name === exercise.name &&
                              e.muscle === exercise.muscle
                          )}
                          onChange={() =>
                            toggleSelect(
                              exercise.id,
                              exercise.name,
                              exercise.muscle
                            )
                          }
                          className="form-checkbox h-4 w-4 text-blue-600"
                        />
                      </td>
                      <td className="py-2 px-4">{exercise.name}</td>
                      <td className="py-2 px-4">{exercise.muscle}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-4 space-x-4">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded font-semibold hover:bg-gray-400 transition duration-200"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded font-semibold hover:bg-blue-600 transition duration-200"
                onClick={() => handleAdd(workoutId)}
              >
                Add Selected
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Exercises;
