"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { TaskStatus } from "@/types/board";

interface ModalState {
  isOpen: boolean;
  mode: "create" | "edit";
  editingTaskId: string | null;
  defaultStatus: TaskStatus;
}

interface ModalContextValue extends ModalState {
  openCreate: (status: TaskStatus) => void;
  openEdit: (taskId: string) => void;
  close: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ModalState>({
    isOpen: false,
    mode: "create",
    editingTaskId: null,
    defaultStatus: "todo",
  });

  const openCreate = useCallback((status: TaskStatus) => {
    setState({
      isOpen: true,
      mode: "create",
      editingTaskId: null,
      defaultStatus: status,
    });
  }, []);

  const openEdit = useCallback((taskId: string) => {
    setState({
      isOpen: true,
      mode: "edit",
      editingTaskId: taskId,
      defaultStatus: "todo",
    });
  }, []);

  const close = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: false, editingTaskId: null }));
  }, []);

  return (
    <ModalContext.Provider value={{ ...state, openCreate, openEdit, close }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within ModalProvider");
  return context;
}
