"use client";

import { motion } from "framer-motion";
import { Droppable, Draggable } from "@hello-pangea/dnd";
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
        <motion.div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`column ${snapshot.isDraggingOver ? "column-dragover" : ""}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div className="column-header">
            <h2 className="column-title">{column.title}</h2>
            <span
              className="column-count"
              suppressHydrationWarning
              aria-label={`${tasks.length} tasks in ${column.title}`}
            >
              {tasks.length}
            </span>
          </div>

          <div className="column-tasks">
            {tasks.map((task, index) => (
              <Draggable
                key={task.id}
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
                    onClick={() => onOpenEdit(task.id)}
                    style={provided.draggableProps.style}
                  >
                    <TaskCard task={task} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>

          <AddTaskButton onClick={onOpenCreate} />
        </motion.div>
      )}
    </Droppable>
  );
}
