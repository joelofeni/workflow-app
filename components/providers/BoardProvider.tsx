"use client";

import React, { createContext, useReducer, ReactNode } from "react";
import { Board, BoardAction } from "@/types/board";
import { initialBoard } from "@/data/initialBoard";
import { boardReducer } from "@/lib/boardReducer";

interface BoardContextValue {
  state: Board;
  dispatch: React.Dispatch<BoardAction>;
}

export const BoardContext = createContext<BoardContextValue | null>(null);

export function BoardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(boardReducer, initialBoard);

  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
}
