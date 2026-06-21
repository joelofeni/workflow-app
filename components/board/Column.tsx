"use client";

import { Droppable } from "@hello-pangea/dnd";
import { Column as ColumnType, Task } from "@/types/board";
import { TaskCard } from "./TaskCard";
import { AddTaskButton } from "./AddTaskButton";

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  onOpenCreate: () => void;
  onOpenEdit: (taskId: string) => void;
  isDragDisabled?: boolean;
}

export function Column({
  column,
  tasks,
  onOpenCreate,
  onOpenEdit,
  isDragDisabled,
}: ColumnProps) {
  return (
    <Droppable droppableId={column.id} isDropDisabled={isDragDisabled}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`column ${snapshot.isDraggingOver ? "column-dragover" : ""}`}
        >
          <div className="column-header">
            <h2 className="column-title">{column.title}</h2>
            <span className="column-count" suppressHydrationWarning>
              {tasks.length}
            </span>
          </div>

          <div className="column-tasks">
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onEdit={() => onOpenEdit(task.id)}
                isDragDisabled={isDragDisabled}
              />
            ))}
            {provided.placeholder}
          </div>

          <AddTaskButton onClick={onOpenCreate} />
        </div>
      )}
    </Droppable>
  );
}
