"use client";

import { Task } from "@/types/board";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="task-card">
      <h3 className="task-card-title">{task.title}</h3>
      <p className="task-card-desc">{task.description}</p>
    </div>
  );
}
