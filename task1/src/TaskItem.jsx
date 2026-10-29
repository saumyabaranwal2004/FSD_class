import React from "react";

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="task-item">
      <span
        onClick={() => onToggle(task.id)}
        className={task.done ? "completed" : ""}
      >
        {task.text}
      </span>

      <button
        className="delete-button"
        onClick={() => onDelete(task.id)}
      >
        Delete
      </button>
    </li>
  );
}

export default TaskItem;