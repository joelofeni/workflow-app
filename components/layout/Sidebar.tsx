"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layout, Settings } from "lucide-react";

const links = [
  { name: "Board", href: "/", icon: Layout },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <Link href="/" className="sidebar-brand">
        <span className="sidebar-logo-mark">W</span>
        <span className="sidebar-logo-text">Workflow</span>
      </Link>

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
    </aside>
  );
}
