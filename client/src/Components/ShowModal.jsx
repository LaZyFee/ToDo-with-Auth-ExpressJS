/*eslint-disable */
import { useState, useEffect, useRef } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import UpdateToDoModal from "./UpdateToDoModal";
import axios from "axios";

const ShowModal = ({ data, setAllToDos, closeModal }) => {
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const modalRef = useRef();
  const confirmModalRef = useRef();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeModal();
    };

    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        (!confirmModalRef.current ||
          !confirmModalRef.current.contains(event.target))
      ) {
        closeModal();
        setIsDeleteConfirmationOpen(false);
        setIsEditModalOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  const handleDelete = () => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/todo/${data._id}`)
      .then(() => {
        setAllToDos((prevTodos) =>
          prevTodos.filter((todo) => todo._id !== data._id)
        );
        closeModal();
        setIsDeleteConfirmationOpen(false);
      })
      .catch((error) => console.error("Error deleting todo:", error));
  };

  return (
    <>
      {/* Main Modal */}
      {!isEditModalOpen && (
        <div className={`modal ${data ? "modal-open" : ""} modal-middle`}>
          <div ref={modalRef} className="modal-box">
            <h3 className="font-bold text-lg">{data.title}</h3>
            <p
              style={{
                whiteSpace: "pre-wrap",
                overflowWrap: "break-word",
                wordBreak: "break-word",
              }}
            >
              {data.description}
            </p>

            <div className="flex justify-end gap-3 mt-4">
              <button
                className="btn bg-primary text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditModalOpen(true); // Only set the UpdateToDoModal open state
                }}
              >
                <FaEdit className="text-3xl" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDeleteConfirmationOpen(true);
                }}
                className="btn bg-red-500 text-white"
              >
                <FaTrashAlt className="text-3xl" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Conditionally render UpdateToDoModal */}
      {isEditModalOpen && (
        <UpdateToDoModal
          data={data}
          onClose={() => setIsEditModalOpen(false)}
          setAllToDos={setAllToDos}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmationOpen && (
        <div className="modal modal-open" ref={confirmModalRef}>
          <div className="modal-box bg-neutral text-neutral-content w-96">
            <div className="modal-body items-center text-center">
              <h2 className="font-bold text-xl">Confirm Delete</h2>
              <p>Are you sure you want to delete this todo?</p>
              <div className="modal-action flex justify-end gap-4 mt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete();
                  }}
                  className="btn btn-primary"
                >
                  Accept
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDeleteConfirmationOpen(false);
                  }}
                  className="btn btn-ghost"
                >
                  Deny
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowModal;
