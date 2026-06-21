"use client";

import { Plus, Search } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">Board</h1>
      </div>

      <div className="header-right">
        <div style={{ position: "relative" }}>
          <Search
            size={16}
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-tertiary)",
              pointerEvents: "none",
            }}
          />
          <input
            type="text"
            placeholder="Search tasks..."
            className="header-search"
            style={{ paddingLeft: "40px" }}
          />
        </div>

        <ThemeToggle />

        <button className="header-btn">
          <Plus size={16} />
          New Task
        </button>
      </div>
    </header>
  );
}
