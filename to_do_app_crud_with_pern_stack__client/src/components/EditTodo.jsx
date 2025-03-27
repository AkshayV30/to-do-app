import React, { useState } from "react";
import { useTodos } from "../hooks/useTodos";

const EditTodo = ({ todo }) => {
  const [description, setDescription] = useState(todo.description);

  const [isOpen, setIsOpen] = useState(false); // ✅ React state for modal

  const { updateTodoMutation } = useTodos(); // Get update mutation from hook

  const updateDescription = async (e) => {
    e.preventDefault();
    // console.log("Update button clicked"); // ✅ Check if this logs

    try {
      // console.log("📡 Sending API request...", {
      //   id: todo.todo_id,
      //   description,
      // });

      await updateTodoMutation.mutateAsync({ id: todo.todo_id, description });
      // console.log("✅ Todo updated successfully!");

      closeModal(); // Close the modal after update await updateTodoMutation.mutateAsync({ id: todo.todo_id, description });
      // console.log("✅ Todo updated successfully!");
    } catch (err) {
      console.error("Update failed:", err.message);
    }
  };

  const closeModal = () => {
    setIsOpen(false); // ✅ React state handles closing
  };

  return (
    <>
      {/* Open modal button */}
      <button className="btn btn-warning" onClick={() => setIsOpen(true)}>
        Edit
      </button>

      {/* Edit Todo Modal */}
      {isOpen && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Edit Todo</h4>
                <button type="button" className="close" onClick={closeModal}>
                  &times;
                </button>
              </div>

              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="modal-footer">
                <button className="btn btn-warning" onClick={updateDescription}>
                  Save
                </button>
                <button className="btn btn-danger" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditTodo;
