"use client";

import { Draggable } from "@hello-pangea/dnd";
import { Task } from "@/types/board";

interface TaskCardProps {
  task: Task;
  index: number;
  onEdit: () => void;
  isDragDisabled?: boolean;
}

export function TaskCard({
  task,
  index,
  onEdit,
  isDragDisabled,
}: TaskCardProps) {
  return (
    <Draggable
      draggableId={task.id}
      index={index}
      isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`task-card ${snapshot.isDragging ? "task-card-dragging" : ""}`}
          onClick={onEdit}
          style={provided.draggableProps.style}
        >
          <h3 className="task-card-title">{task.title}</h3>
          <p className="task-card-desc">{task.description}</p>
        </div>
      )}
    </Draggable>
  );
}
