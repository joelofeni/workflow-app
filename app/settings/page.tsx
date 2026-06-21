"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="settings-page">
      <div className="settings-container">
        <h1 className="settings-title">Settings</h1>

        {/* Appearance Section */}
        <section className="settings-section">
          <span className="settings-label">Appearance</span>
          <div className="settings-row">
            <div className="settings-info">
              <h2 className="settings-row-title">Theme</h2>
              <p className="settings-row-desc">
                Choose between dark and light mode.
              </p>
            </div>
            <div className="settings-options">
              <button
                className={`settings-option ${theme === "dark" ? "settings-option-active" : ""}`}
                onClick={() => setTheme("dark")}
              >
                <Moon size={16} />
                Dark
              </button>
              <button
                className={`settings-option ${theme === "light" ? "settings-option-active" : ""}`}
                onClick={() => setTheme("light")}
              >
                <Sun size={16} />
                Light
              </button>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="settings-divider" />

        {/* Workflow Section */}
        <section className="settings-section">
          <span className="settings-label">Workflow</span>
          <div className="settings-row">
            <div className="settings-info">
              <h2 className="settings-row-title">Board Persistence</h2>
              <p className="settings-row-desc">
                Tasks are automatically saved locally in your browser.
              </p>
            </div>
            <span className="settings-badge">Enabled</span>
          </div>
        </section>

        {/* Divider */}
        <div className="settings-divider" />

        {/* About Section */}
        <section className="settings-section">
          <span className="settings-label">About</span>
          <div className="settings-row">
            <div className="settings-info">
              <h2 className="settings-row-title">Workflow App v1</h2>
              <p className="settings-row-desc">
                Portfolio project demonstrating state management, drag and drop,
                persistence, search, and modern UI architecture.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
