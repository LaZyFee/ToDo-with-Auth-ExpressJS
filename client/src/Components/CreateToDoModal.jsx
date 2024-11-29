/*eslint-disable */
import axios from "axios";
import { useState } from "react";
import ShowToast from "../Utils/ShowToast";
import { useAuth } from "../Store/AuthStore";

function CreateToDoModal({ onClose, setAllToDos }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ title: "", description: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/todo/create`,
        {
          ...formData,
          email: user.email,
        }
      );
      ShowToast("Success", "Todo created successfully", "success");

      setAllToDos((prev) => [response.data.data, ...prev]);
      onClose();
    } catch (error) {
      console.error("Error creating todo:", error);
      ShowToast("Error", "Please fill all the fields", "error");
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <form onSubmit={handleCreate}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Title"
            className="input input-bordered w-full my-2"
          />
          <textarea
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Write a description"
            className="textarea textarea-bordered w-full min-h-[100px] max-h-[200px] resize-none bg-white"
            style={{ whiteSpace: "pre-wrap" }}
          />
          <div className="flex justify-between mt-4">
            <button onClick={onClose} className="btn btn-secondary">
              Close
            </button>
            <button type="submit" className="btn btn-primary">
              Create Todo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateToDoModal;
