"use client";

import { initialBoard } from "@/data/initialBoard";
import { Column } from "./Column";

export function Board() {
  return (
    <div className="board">
      {initialBoard.columns.map((column) => (
        <Column
          key={column.id}
          column={column}
          tasks={column.taskIds.map((id) => initialBoard.tasks[id])}
        />
      ))}
    </div>
  );
}
