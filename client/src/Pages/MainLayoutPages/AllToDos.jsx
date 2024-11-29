import axios from "axios";
import { useEffect, useState } from "react";
import Skeleton from "../../Components/Skeleton";
import ShowModal from "../../Components/ShowModal";
import Tab from "../../Components/Tab";
import { FaPenSquare } from "react-icons/fa";
import CreateToDoModal from "../../Components/CreateToDoModal";
import ShowToast from "../../Utils/ShowToast";
import { useAuth } from "../../Store/AuthStore";

function AllToDos() {
  const { user } = useAuth();
  const [allToDos, setAllToDos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Fetch todos on mount

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/todo/todos/${user.email}`)
      .then((response) => {
        setAllToDos(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      })
      .finally(() => setLoading(false));
  }, [user.email]);

  // Complete a todo
  const handleComplete = (event, id) => {
    event.stopPropagation();
    axios
      .patch(`${import.meta.env.VITE_BACKEND_URL}/todo/${id}/complete`)
      .then(() => {
        ShowToast("success", "Todo marked as complete", "success");
        setAllToDos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === id ? { ...todo, status: "complete" } : todo
          )
        );
      })
      .catch((error) => {
        console.error("Error completing todo:", error);
      });
  };

  // Format date for display
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

  // Truncate long descriptions
  const truncateDescription = (description, maxLength = 100) => {
    if (description.length > maxLength) {
      return (
        <>
          {description.slice(0, maxLength)}
          <span className="text-blue-600 text-2xl font-semibold">......</span>
        </>
      );
    }
    return description;
  };

  if (loading) return <Skeleton />;

  return (
    <div className="min-h-screen my-5 mx-5">
      <Tab />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:mx-5 my-5 lg:my-20">
        {allToDos
          .sort((a, b) => {
            // Sort by status first, with "active" todos appearing before others
            if (a.status !== b.status) return a.status === "active" ? -1 : 1;

            // If both have the same status, sort by creation date (newest first)
            return new Date(b.date) - new Date(a.date);
          })
          .map((todo) => (
            <div
              key={todo._id}
              className="card bg-base-500 shadow-xl hover:shadow-2xl"
              onClick={() => setSelectedTodo(todo)}
            >
              <div className="card-body">
                <h2 className="card-title font-semibold text-lime-500 lg:whitespace-nowrap">
                  {todo.title}
                </h2>
                <div className="divider"></div>
                <p
                  style={{
                    whiteSpace: "pre-wrap",
                    overflowWrap: "break-word",
                    wordBreak: "break-word",
                  }}
                >
                  {truncateDescription(todo.description)}
                </p>

                <hr />
                <p className="font-semibold text-green-600">
                  Status: {todo.status}
                </p>
                <hr />

                <p className="font-semibold text-fuchsia-600">
                  Created: {formatDate(todo.date)}
                </p>
                <hr />

                {todo.completedAt && (
                  <p className="font-semibold text-green-600">
                    Completed: {formatDate(todo.completedAt)}
                  </p>
                )}

                <div className="card-actions justify-end">
                  {todo.status === "active" && (
                    <button
                      onClick={(event) => handleComplete(event, todo._id)}
                      className="btn btn-primary"
                    >
                      Mark as Complete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Show modal if a todo is selected */}
      {selectedTodo && (
        <ShowModal
          data={selectedTodo}
          setAllToDos={setAllToDos}
          closeModal={() => {
            setSelectedTodo(null);
            setIsModalOpen(false);
          }}
        />
      )}

      {/* Show CreateToDoModal if isModalOpen is true */}
      {isModalOpen && (
        <CreateToDoModal
          onClose={() => setIsModalOpen(false)}
          setAllToDos={setAllToDos}
        />
      )}

      {/* Add onClick to open the modal */}
      <div
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-5 right-5 cursor-pointer"
      >
        <FaPenSquare className="text-5xl text-lime-500" />
      </div>
    </div>
  );
}

export default AllToDos;
