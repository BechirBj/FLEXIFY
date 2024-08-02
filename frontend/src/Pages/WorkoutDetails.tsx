import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { Private_api } from "../API/API";
import APIS from "../API/ENDPOINTS";
import { IconContext } from "react-icons";
import { toast } from "react-toastify";

interface Set {
  id?: string;
  serie: number;
  reps: number;
  kg: number;
}

const WorkoutDetails: React.FC = () => {
  const [data, setData] = useState("");
  const location = useLocation();
  const ExerciseId = location.state?.id;
  const ExerciseName = location.state?.name;
  const [Sets, setSets] = useState<Set[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleShowSets = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }
    try {
      const response = await Private_api.get(APIS.GET_SET);
      if (response.status === 200) {
        const setsData = response.data.map((set: any) => ({
          id: set.id,
          serie: set.serie || 1,
          reps: set.reps || 0,
          kg: set.kg || 0,
        }));
        setSets(setsData);
      } else {
        setError("Failed to fetch data");
      }
    } catch (error) {
      setError("Error fetching data");
      console.error("Error fetching data:", error);
    }
  };

  const addSet = () => {
    setSets((prevSets) => [
      ...prevSets,
      {
        serie:
          prevSets.length > 0 ? prevSets[prevSets.length - 1].serie + 1 : 1,
        reps: 0,
        kg: 0,
      },
    ]);
  };

  const updateSetValue = (
    index: number,
    field: "reps" | "kg",
    value: number
  ) => {
    setSets((prevSets) =>
      prevSets.map((set, i) => (i === index ? { ...set, [field]: value } : set))
    );
  };

  const DeleteSet = async (index: number) => {
    const setToDelete = Sets[index];
    if (setToDelete.id) {
      try {
        const response = await Private_api.delete(
          `${APIS.REMOVE_SET}/${setToDelete.id}`
        );
        if (response.status === 200 || response.status === 204) {
          toast.success("Set deleted successfully !");
        } else {
          throw new Error("Failed to delete set");
        }
      } catch (error) {
        setError("Failed to delete set");
        toast.error("Can't delete set");
        return;
      }
    }
    setSets((prevSets) => {
      const updatedSets = prevSets.filter((_, i) => i !== index);
      return updatedSets.map((set, i) => ({
        ...set,
        serie: i + 1,
      }));
    });
  };

  useEffect(() => {
    handleShowSets();
  }, []);

  const handleSaveSets = async (ExerciseId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }
    const List = Sets.map((Set) => ({
      id: Set.id,
      serie: Set.serie,
      kg: Set.kg,
      reps: Set.reps,
    }));
    try {
      const updatedSets = await Promise.all(
        List.map(async (Set) => {
          if (Set.id) {
            const response = await Private_api.put(
              `${APIS.UPDATE_SET}/${Set.id}`,
              {
                serie: Set.serie,
                kg: Set.kg,
                reps: Set.reps,
              }
            );
            if (response.status === 200) {
              return response.data;
            }
          } else {
            const response = await Private_api.post(
              `${APIS.ADD_SET}/${ExerciseId}`,
              {
                serie: Set.serie,
                kg: Set.kg,
                reps: Set.reps,
              }
            );
            if (response.status === 201) {
              return response.data;
            }
          }
          throw new Error("Set operation failed");
        })
      );
      setSets(updatedSets);
      toast.success("Sets saved successfully");
    } catch (error) {
      setError("Failed to save set");
      toast.error("Can't save set");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Adding Exercise Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Title: {ExerciseName}
            </h3>
            <table className="min-w-full bg-white shadow-md rounded overflow-hidden mb-4">
              <thead>
                <tr>
                  <th className="py-2 px-4 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                    Séries
                  </th>
                  <th className="py-2 px-4 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                    Réps
                  </th>
                  <th className="py-2 px-4 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                    KG
                  </th>
                  <th className="py-2 px-4 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                    Remove
                  </th>
                </tr>
              </thead>
              <tbody>
                {Sets.map((set, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4">{set.serie}</td>
                    <td className="py-2 px-4">
                      <input
                        type="number"
                        value={set.reps}
                        onChange={(e) =>
                          updateSetValue(
                            index,
                            "reps",
                            parseInt(e.target.value, 10)
                          )
                        }
                        className="w-full border rounded px-2 py-1"
                        min={0}
                      />
                    </td>
                    <td className="py-2 px-4">
                      <input
                        type="number"
                        value={set.kg}
                        onChange={(e) =>
                          updateSetValue(
                            index,
                            "kg",
                            parseInt(e.target.value, 10)
                          )
                        }
                        className="w-full border rounded px-2 py-1"
                        min={0}
                      />
                    </td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => DeleteSet(index)}
                        className="w-full px-2 py-1 content-center"
                      >
                        <IconContext.Provider
                          value={{ color: "red", size: "1.5em" }}
                        >
                          <MdDelete />
                        </IconContext.Provider>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={4} className="py-2 px-4">
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleSaveSets(ExerciseId)}
                        className="w-full max-w-xs px-4 py-2 bg-blue-500 text-white rounded font-semibold hover:bg-blue-600 transition duration-200"
                      >
                        Save Sets
                      </button>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
            <button
              onClick={addSet}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded font-semibold hover:bg-blue-600 transition duration-200"
            >
              (+ Add a Set)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetails;
