import axios from "axios";
import { useEffect, useState } from "react";
import Skeleton from "../../Components/Skeleton";
import Tab from "../../Components/Tab";
import { useAuth } from "../../Store/AuthStore";

function CompleteTodos() {
  const { user } = useAuth();
  const [allToDos, setAllToDos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/todo/complete?email=${user.email}`
      )
      .then((response) => {
        const todosData = response.data.data;
        setAllToDos(todosData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
        setLoading(false);
      });
  }, [user.email]);
  if (loading) return <Skeleton />;

  return (
    <div className="min-h-screen my-5 mx-5">
      <Tab />{" "}
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
                    {todo.completedAt && (
                      <p className="font-semibold text-green-600">
                        Completed:{" "}
                        {new Date(todo.completedAt).toLocaleString("en-US", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          hour12: true,
                        })}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
        ) : (
          <p className="text-fuchsia-600 font-bold text-2xl">
            No completed todos found.Please check ToDos & Complete them.{" "}
          </p>
        )}
      </div>
    </div>
  );
}

export default CompleteTodos;
