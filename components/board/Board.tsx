"use client";

import { useBoard } from "@/hooks/useBoard";
import { Column } from "./Column";
import { TaskModal } from "@/components/task/TaskModal";
import { useModal } from "../providers/ModalProviders";

export function Board() {
  const { state } = useBoard();
  const { openCreate, openEdit } = useModal();

  return (
    <>
      <div className="board">
        {state.columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            tasks={column.taskIds.map((id) => state.tasks[id])}
            onOpenCreate={() => openCreate(column.id)}
            onOpenEdit={(taskId) => openEdit(taskId)}
          />
        ))}
      </div>
      <TaskModal />
    </>
  );
}
