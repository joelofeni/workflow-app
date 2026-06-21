export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Column {
  id: TaskStatus;
  title: string;
  taskIds: string[];
}

export interface Board {
  tasks: Record<string, Task>;
  columns: Column[];
}

/* ======================================================
   ACTIONS
====================================================== */

export type BoardAction =
  | {
      type: "ADD_TASK";
      payload: { title: string; description: string; status: TaskStatus };
    }
  | {
      type: "UPDATE_TASK";
      payload: { id: string; title: string; description: string };
    }
  | { type: "DELETE_TASK"; payload: { id: string } }
  | {
      type: "MOVE_TASK";
      payload: {
        taskId: string;
        sourceColumnId: TaskStatus;
        destColumnId: TaskStatus;
        sourceIndex: number;
        destIndex: number;
      };
    }
  | {
      type: "REHYDRATE";
      payload: Board;
    };
