import axios from "axios";
import { useEffect, useState } from "react";
import Skeleton from "../../Components/Skeleton";
import Tab from "../../Components/Tab";
import { useAuth } from "../../Store/AuthStore";

function ActiveTodos() {
  const { user } = useAuth();
  const [allToDos, setAllToDos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const email = user.email;
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/todo/active?email=${email}`)
      .then((response) => {
        const todosData = response.data.data;
        setAllToDos(todosData);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
        setError("Failed to load todos. Please try again.");
      })
      .finally(() => setLoading(false));
  }, [email]);

  const formatDate = (date) =>
    new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

  if (loading) return <Skeleton />;
  if (error) return <div className="text-red-600 my-5">{error}</div>;

  return (
    <div className="min-h-screen my-5 mx-5">
      <Tab />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:mx-5 my-5 lg:my-20">
        {allToDos.length > 0 ? (
          allToDos
            .sort((a, b) => {
              // If both have the same status, sort by creation date (newest first)
              return new Date(b.date) - new Date(a.date);
            })
            .map((todo) => (
              <div
                key={todo._id}
                className="card bg-base-100 shadow-xl hover:shadow-2xl"
              >
                <div className="card-body">
                  <h2 className="card-title text-fuchsia-600 font-semibold">
                    {todo.title}
                  </h2>
                  <p
                    style={{
                      whiteSpace: "pre-wrap",
                      overflowWrap: "break-word",
                      wordBreak: "break-word",
                    }}
                  >
                    {todo.description}
                  </p>

                  <div className="card-actions justify-end">
                    <p className="text-sm font-bold text-green-700">
                      Status: {todo.status}
                    </p>
                    <p className="font-semibold text-fuchsia-600">
                      Created: {formatDate(todo.date)}
                    </p>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <p className="text-fuchsia-600 font-bold text-2xl">
            No Active todos found. Please add a todo.
          </p>
        )}
      </div>
    </div>
  );
}

export default ActiveTodos;
