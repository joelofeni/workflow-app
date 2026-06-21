"use client";

import { useMemo, useCallback } from "react";
import { useBoard } from "@/hooks/useBoard";
import { TaskForm } from "./TaskForm";
import { useModal } from "../providers/ModalProviders";

export function TaskModal() {
  const { isOpen, mode, editingTaskId, defaultStatus, close } = useModal();
  const { state, dispatch } = useBoard();

  const editingTask = useMemo(() => {
    if (mode !== "edit" || !editingTaskId) return null;
    return state.tasks[editingTaskId] ?? null;
  }, [mode, editingTaskId, state.tasks]);

  const handleSave = useCallback(
    (values: { title: string; description: string }) => {
      if (mode === "create") {
        dispatch({
          type: "ADD_TASK",
          payload: {
            title: values.title,
            description: values.description,
            status: defaultStatus,
          },
        });
      } else if (mode === "edit" && editingTaskId) {
        dispatch({
          type: "UPDATE_TASK",
          payload: {
            id: editingTaskId,
            title: values.title,
            description: values.description,
          },
        });
      }
      close();
    },
    [mode, defaultStatus, editingTaskId, dispatch, close],
  );

  const handleDelete = useCallback(() => {
    if (mode === "edit" && editingTaskId) {
      dispatch({
        type: "DELETE_TASK",
        payload: { id: editingTaskId },
      });
      close();
    }
  }, [mode, editingTaskId, dispatch, close]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={close}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {mode === "create" ? "New Task" : "Edit Task"}
          </h2>
          <button className="modal-close" onClick={close} aria-label="Close">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <TaskForm
          initialValues={
            editingTask
              ? {
                  title: editingTask.title,
                  description: editingTask.description,
                }
              : { title: "", description: "" }
          }
          mode={mode}
          onSave={handleSave}
          onDelete={handleDelete}
          onCancel={close}
        />
      </div>
    </div>
  );
}
