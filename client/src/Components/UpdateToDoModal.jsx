/*eslint-disable */
import { useState } from "react";
import axios from "axios";
import showToast from "../Utils/ShowToast";
import { useAuth } from "../Store/AuthStore";

function UpdateToDoModal({ data, onClose, setAllToDos }) {
  const { user } = useAuth();
  const userId = user._id;
  const [formData, setFormData] = useState({
    title: data.title || "",
    description: data.description || "",
    status: data.status || "",
    userId: userId,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/todo/${data._id}/update`,
        formData
      );
      const updatedTodo = response.data.data;
      showToast("Success", "Todo updated successfully", "success");
      setAllToDos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === data._id ? { ...todo, ...updatedTodo } : todo
        )
      );
      onClose();
    } catch (error) {
      console.error(
        "Error updating todo:",
        error.response?.data || error.message
      );
      showToast("Error", "Error updating todo", "error");
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="input input-bordered w-full my-2"
          />
          <textarea
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="textarea textarea-bordered w-full min-h-[100px] max-h-[200px] resize-none bg-white"
            style={{ whiteSpace: "pre-wrap" }}
          />
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose} // This will close both modals when clicked
              className="btn btn-secondary"
            >
              Close
            </button>
            <button type="submit" className="btn btn-primary">
              Update Todo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateToDoModal;
