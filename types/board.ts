export type TaskStatus =
  | "todo"
  | "in-progress"
  | "done";

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
