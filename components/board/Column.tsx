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
}

export function Column({
  column,
  tasks,
  onOpenCreate,
  onOpenEdit,
}: ColumnProps) {
  return (
    <Droppable droppableId={column.id}>
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
