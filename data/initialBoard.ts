import { Board } from "@/types/board";

export const initialBoard: Board = {
  tasks: {
    "task-1": {
      id: "task-1",
      title: "Research competitor workflows",
      description: "Analyze how Linear, Notion, and Trello handle drag-and-drop interactions.",
      status: "todo",
      createdAt: "2026-06-19T10:00:00Z",
      updatedAt: "2026-06-19T10:00:00Z",
    },
    "task-2": {
      id: "task-2",
      title: "Design token system",
      description: "Define color, spacing, and typography tokens that align with Luravia.",
      status: "todo",
      createdAt: "2026-06-19T10:05:00Z",
      updatedAt: "2026-06-19T10:05:00Z",
    },
    "task-3": {
      id: "task-3",
      title: "Set up project scaffold",
      description: "Initialize Next.js 16, TypeScript, Tailwind, and folder structure.",
      status: "in-progress",
      createdAt: "2026-06-19T10:10:00Z",
      updatedAt: "2026-06-19T10:10:00Z",
    },
    "task-4": {
      id: "task-4",
      title: "Implement board layout",
      description: "Create sidebar, header, and column structure with responsive behavior.",
      status: "in-progress",
      createdAt: "2026-06-19T10:15:00Z",
      updatedAt: "2026-06-19T10:15:00Z",
    },
    "task-5": {
      id: "task-5",
      title: "Build drag and drop",
      description: "Integrate @hello-pangea/dnd for moving tasks between columns.",
      status: "done",
      createdAt: "2026-06-19T10:20:00Z",
      updatedAt: "2026-06-19T10:20:00Z",
    },
    "task-6": {
      id: "task-6",
      title: "Add theme switching",
      description: "Implement dark and light modes using next-themes and CSS variables.",
      status: "done",
      createdAt: "2026-06-19T10:25:00Z",
      updatedAt: "2026-06-19T10:25:00Z",
    },
  },
  columns: [
    { id: "todo", title: "To Do", taskIds: ["task-1", "task-2"] },
    { id: "in-progress", title: "In Progress", taskIds: ["task-3", "task-4"] },
    { id: "done", title: "Done", taskIds: ["task-5", "task-6"] },
  ],
};
