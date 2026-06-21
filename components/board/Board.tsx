"use client";

import { useBoard } from "@/hooks/useBoard";
import { Column } from "./Column";

export function Board() {
  const { state } = useBoard();

  return (
    <div className="board">
      {state.columns.map((column) => (
        <Column
          key={column.id}
          column={column}
          tasks={column.taskIds.map((id) => state.tasks[id])}
        />
      ))}
    </div>
  );
}
