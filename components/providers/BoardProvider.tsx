"use client";

import React, { createContext, useReducer, useEffect, ReactNode } from "react";
import { Board, BoardAction } from "@/types/board";
import { initialBoard } from "@/data/initialBoard";
import { boardReducer } from "@/lib/boardReducer";
import { getStorageItem, setStorageItem } from "@/hooks/useLocalStorage";

const STORAGE_KEY = "workflow-board-v1";

interface BoardContextValue {
  state: Board;
  dispatch: React.Dispatch<BoardAction>;
}

export const BoardContext = createContext<BoardContextValue | null>(null);

export function BoardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(boardReducer, initialBoard);

  // Load from localStorage after mount (client-only)
  useEffect(() => {
    const stored = getStorageItem<Board | null>(STORAGE_KEY, null);
    if (stored) {
      dispatch({ type: "REHYDRATE", payload: stored });
    }
  }, []);

  // Persist on every state change
  useEffect(() => {
    setStorageItem(STORAGE_KEY, state);
  }, [state]);

  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
}
