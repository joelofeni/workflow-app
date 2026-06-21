"use client";

import { Column as ColumnType, Task } from "@/types/board";
import { TaskCard } from "./TaskCard";
import { AddTaskButton } from "./AddTaskButton";

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  onOpenCreate: () => void;
  onOpenEdit: (taskId: string) => void;
}

export function Column({
  column,
  tasks,
  onOpenCreate,
  onOpenEdit,
}: ColumnProps) {
  return (
    <div className="column">
      <div className="column-header">
        <h2 className="column-title">{column.title}</h2>
        <span className="column-count" suppressHydrationWarning>
          {tasks.length}
        </span>
      </div>

      <div className="column-tasks">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={() => onOpenEdit(task.id)}
          />
        ))}
      </div>

      <AddTaskButton onClick={onOpenCreate} />
    </div>
  );
}
