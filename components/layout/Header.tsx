"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Menu,
  X,
  Layout,
  Settings,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { useSearch } from "@/components/providers/SearchProvider";
import { useModal } from "../providers/ModalProviders";

const navLinks = [
  { href: "/", label: "Board", icon: Layout },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Header() {
  const { openCreate } = useModal();
  const { query, setQuery } = useSearch();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const pathname = usePathname();

  const closeMobileNav = () => setIsMobileNavOpen(false);

  return (
    <>
      <header className="header">
        <div className="header-left">
          <button
            className="mobile-nav-toggle"
            onClick={() => setIsMobileNavOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          <h1 className="header-title">Board</h1>
        </div>

        <div className="header-right">
          <div className="header-search-wrap">
            <Search size={16} className="header-search-icon" />

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
            <span>New Task</span>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileNavOpen && (
        <>
          <div className="mobile-nav-backdrop" onClick={closeMobileNav} />
          <div className="mobile-nav-drawer">
            <div className="mobile-nav-header">
              <Link href="/" className="sidebar-brand" onClick={closeMobileNav}>
                <span className="sidebar-logo-mark">
                  <CheckCircle2 size={20} strokeWidth={2.5} />
                </span>
                <div className="sidebar-logo-group">
                  <span className="sidebar-logo-text">Workflow</span>
                  <span className="sidebar-logo-sub">Task Management</span>
                </div>
              </Link>
              <button
                className="mobile-nav-close"
                onClick={closeMobileNav}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <div className="sidebar-divider" />

            <nav className="mobile-nav-links">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`mobile-nav-link ${isActive ? "active" : ""}`}
                    onClick={closeMobileNav}
                  >
                    <Icon size={18} />
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mobile-nav-footer">
              <div className="sidebar-footer-pill">
                <span className="sidebar-footer-dot" />
                <span className="sidebar-footer-text">v1.0</span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
