"use client";

import { Plus, Search } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useSearch } from "@/components/providers/SearchProvider";
import { useModal } from "../providers/ModalProviders";

export function Header() {
  const { openCreate } = useModal();
  const { query, setQuery } = useSearch();

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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <ThemeToggle />

        <button className="header-btn" onClick={() => openCreate("todo")}>
          <Plus size={16} />
          New Task
        </button>
      </div>
    </header>
  );
}
