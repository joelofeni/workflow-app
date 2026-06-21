"use client";

import { useCallback, useMemo } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useBoard } from "@/hooks/useBoard";
import { useSearch } from "@/components/providers/SearchProvider";
import { TaskStatus } from "@/types/board";
import { Column } from "./Column";
import { TaskModal } from "@/components/task/TaskModal";
import { EmptyState } from "@/components/ui/EmptyState";
import { useModal } from "../providers/ModalProviders";

export function Board() {
  const { state, dispatch } = useBoard();
  const { openCreate, openEdit } = useModal();
  const { query } = useSearch();

  const isSearching = query.trim().length > 0;

  const filteredColumns = useMemo(() => {
    if (!isSearching) {
      return state.columns.map((column) => ({
        ...column,
        tasks: column.taskIds.map((id) => state.tasks[id]),
      }));
    }

    const lowerQuery = query.toLowerCase();

    return state.columns.map((column) => ({
      ...column,
      tasks: column.taskIds
        .map((id) => state.tasks[id])
        .filter((task) => task.title.toLowerCase().includes(lowerQuery)),
    }));
  }, [state, query, isSearching]);

  const hasAnyResults = useMemo(() => {
    return filteredColumns.some((col) => col.tasks.length > 0);
  }, [filteredColumns]);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (isSearching) return;

      const { destination, source, draggableId } = result;

      if (!destination) return;

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
    [dispatch, isSearching],
  );

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board">
          {isSearching && !hasAnyResults ? (
            <div className="board-empty">
              <EmptyState message="No tasks match your search." />
            </div>
          ) : (
            filteredColumns.map((column) => (
              <Column
                key={column.id}
                column={column}
                tasks={column.tasks}
                onOpenCreate={() => openCreate(column.id)}
                onOpenEdit={(taskId) => openEdit(taskId)}
                isDragDisabled={isSearching}
              />
            ))
          )}
        </div>
      </DragDropContext>
      <TaskModal />
    </>
  );
}
