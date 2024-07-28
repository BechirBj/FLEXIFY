import React, { useEffect, useState } from "react";
import { Private_api } from "../API/API";
import APIS from "../API/ENDPOINTS";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";

interface Workout {
  id: string;
  name: string;
  owner: {
    username: string;
  };
}

const Workouts: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState("");

  const [Workout, setWorkout] = useState<Workout[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [newWorkoutTitle, setNewWorkoutTitle] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleShowWorkouts = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }

    try {
      const response = await Private_api.get(APIS.GET_ALL_WORKOUTS);
      if (response.status === 200) {
        setWorkout(response.data);
      } else {
        setError("Failed to fetch data");
      }
    } catch (error) {
      setError("Error fetching data");
      console.error("Error fetching data:", error);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewWorkoutTitle("");
  };

  const handleOpenUpdateModal = (id: string, currentTitle: string) => {
    setEditingId(id);
    setNewWorkoutTitle(currentTitle);
    setUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setNewWorkoutTitle("");
    setEditingId(null);
  };

  useEffect(() => {
    handleShowWorkouts();
  }, []);

  const handleSaveWorkout = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (!newWorkoutTitle) {
      toast.warning("Please insert a Workout Title");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }
    const TX = {
      name: newWorkoutTitle,
    };
    try {
      const response = await Private_api.post(APIS.ADD_WORKOUT, TX);
      if (response.status === 201) {
        toast.success("Workout Created successfully");
        setData(response.data);

        handleCloseModal();
        handleShowWorkouts();
      } else {
        setError("Failed to create Workout");
      }
    } catch (error) {
      setError("Failed to create workout");
      console.error("Error creating workout:", error);
    }
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }
    try {
      const response = await Private_api.delete(`${APIS.DELETE_WORKOUT}/${id}`);
      if (response.status === 200) {
        setWorkout((prev) => prev.filter((workout) => workout.id !== id));
        toast.success("Workout Deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  const handleUpdateWorkout = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (!newWorkoutTitle || !editingId) {
      toast.warning("Please enter a valid title");
      return;
    }

    const TX = {
      name: newWorkoutTitle,
    };

    try {
      const response = await Private_api.patch(
        `${APIS.UPDATE_WORKOUT}/${editingId}`,
        TX
      );
      if (response.status === 200) {
        toast.success("Workout title updated successfully");
        setWorkout((prev) =>
          prev.map((workout) =>
            workout.id === editingId
              ? { ...workout, name: newWorkoutTitle }
              : workout
          )
        );
        handleCloseUpdateModal();
      } else {
        toast.error(`Failed to update workout title: ${response.statusText}`);
      }
    } catch (error) {
      toast.error("Failed to update workout title");
      console.error("Error updating workout title:", error);
    }
  };

  const handleViewDetails = (id: string, name: string) => {
    navigate("/Exercises", { state: { id, name } });
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Workouts
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Workout.map((x) => (
            <div
              key={x.id}
              className="bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Title: {x.name}
              </h3>
              <p className="text-sm text-gray-500">
                <span className="font-medium text-gray-600">Owner:</span>{" "}
                {x.owner.username}
              </p>
              <div className="flex gap-3">
                <div className="mt-4">
                  <button
                    onClick={() => handleViewDetails(x.id, x.name)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-600 transition-colors duration-200"
                  >
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
                <div className="mt-4">
                  <IconContext.Provider
                    value={{ color: "black", className: "" }}
                  >
                    <button
                      onClick={() => handleOpenUpdateModal(x.id, x.name)}
                      className="bg-yellow-500 text-black px-4 py-2 rounded-full font-semibold hover:bg-yellow-600 transition-colors duration-200"
                    >
                      <div className="flex gap-4 items-center">
                        Update the Title
                        <FaEdit />
                      </div>
                    </button>
                  </IconContext.Provider>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <button
            onClick={handleOpenModal}
            className="bg-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-600 transition duration-300"
          >
            Create Workout
          </button>
        </div>
        {showModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-md">
              <h3 className="text-xl font-semibold mb-4">New Workout</h3>
              <input
                type="text"
                value={newWorkoutTitle}
                onChange={(e) => setNewWorkoutTitle(e.target.value)}
                placeholder="Enter workout title"
                className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring focus:border-blue-300"
              />
              <div className="flex justify-end space-x-4">
                <button
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded font-semibold hover:bg-gray-400 transition duration-200"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded font-semibold hover:bg-blue-600 transition duration-200"
                  onClick={handleSaveWorkout}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
        {updateModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-md">
              <h3 className="text-xl font-semibold mb-4">Update Workout</h3>
              <input
                type="text"
                value={newWorkoutTitle}
                onChange={(e) => setNewWorkoutTitle(e.target.value)}
                placeholder="Enter new workout title"
                className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring focus:border-blue-300"
              />
              <div className="flex justify-end space-x-4">
                <button
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded font-semibold hover:bg-gray-400 transition duration-200"
                  onClick={handleCloseUpdateModal}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded font-semibold hover:bg-blue-600 transition duration-200"
                  onClick={handleUpdateWorkout}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Workouts;
