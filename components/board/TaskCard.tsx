"use client";

import { Task } from "@/types/board";

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
}

export function TaskCard({ task, onEdit }: TaskCardProps) {
  return (
    <div className="task-card" onClick={onEdit}>
      <h3 className="task-card-title">{task.title}</h3>
      <p className="task-card-desc">{task.description}</p>
    </div>
  );
}
