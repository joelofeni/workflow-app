"use client";

import { useCallback } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useBoard } from "@/hooks/useBoard";
import { TaskStatus } from "@/types/board";
import { Column } from "./Column";
import { TaskModal } from "@/components/task/TaskModal";
import { useModal } from "../providers/ModalProviders";

export function Board() {
  const { state, dispatch } = useBoard();
  const { openCreate, openEdit } = useModal();

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source, draggableId } = result;

      // Dropped outside any droppable
      if (!destination) return;

      // Dropped in same position
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      dispatch({
        type: "MOVE_TASK",
        payload: {
          taskId: draggableId,
          sourceColumnId: source.droppableId as TaskStatus,
          destColumnId: destination.droppableId as TaskStatus,
          sourceIndex: source.index,
          destIndex: destination.index,
        },
      });
    },
    [dispatch],
  );

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
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
      </DragDropContext>
      <TaskModal />
    </>
  );
}
