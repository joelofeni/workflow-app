"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layout, Settings, CheckCircle2 } from "lucide-react";

const links = [
  { name: "Board", href: "/", icon: Layout },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <Link href="/" className="sidebar-brand">
        <span className="sidebar-logo-mark">
          <CheckCircle2 size={20} strokeWidth={2.5} />
        </span>
        <div className="sidebar-logo-group">
          <span className="sidebar-logo-text">Workflow</span>
          <span className="sidebar-logo-sub">Task Management</span>
        </div>
      </Link>

      <div className="sidebar-divider" />

      <nav className="sidebar-nav">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`sidebar-link ${isActive ? "active" : ""}`}
            >
              <Icon size={18} />
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-footer-pill">
          <span className="sidebar-footer-dot" />
          <span className="sidebar-footer-text">v1.0</span>
        </div>
      </div>
    </aside>
  );
}
