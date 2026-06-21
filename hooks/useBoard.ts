"use client";

import { useContext } from "react";
import { BoardContext } from "@/components/providers/BoardProvider";

export function useBoard() {
  const context = useContext(BoardContext);

  if (!context) {
    throw new Error("useBoard must be used within a BoardProvider");
  }

  return context;
}
