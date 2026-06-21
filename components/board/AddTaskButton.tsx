"use client";

interface AddTaskButtonProps {
  onClick: () => void;
}

export function AddTaskButton({ onClick }: AddTaskButtonProps) {
  return (
    <button className="add-task-btn" onClick={onClick}>
      + Add task
    </button>
  );
}
