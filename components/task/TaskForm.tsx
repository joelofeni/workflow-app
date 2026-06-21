"use client";

import { useState, useCallback, FormEvent } from "react";

interface TaskFormValues {
  title: string;
  description: string;
}

interface TaskFormProps {
  initialValues: TaskFormValues;
  mode: "create" | "edit";
  onSave: (values: TaskFormValues) => void;
  onDelete: () => void;
  onCancel: () => void;
}

export function TaskForm({
  initialValues,
  mode,
  onSave,
  onDelete,
  onCancel,
}: TaskFormProps) {
  const [title, setTitle] = useState(initialValues.title);
  const [description, setDescription] = useState(initialValues.description);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const trimmed = title.trim();
      if (!trimmed) {
        setError("Title is required");
        return;
      }
      setError(null);
      onSave({ title: trimmed, description: description.trim() });
    },
    [title, description, onSave],
  );

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label htmlFor="task-title" className="form-label">
          Title
        </label>
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError(null);
          }}
          placeholder="Enter task title"
          className="form-input"
          autoFocus
        />
        {error && <span className="form-error">{error}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="task-description" className="form-label">
          Description
        </label>
        <textarea
          id="task-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add a description (optional)"
          rows={4}
          className="form-input form-textarea"
        />
      </div>

      <div className="modal-actions">
        <div>
          {mode === "edit" && (
            <button
              type="button"
              onClick={onDelete}
              className="btn-danger"
              aria-label="Delete task"
            >
              Delete
            </button>
          )}
        </div>

        <div className="modal-actions-right">
          <button type="button" onClick={onCancel} className="btn-ghost">
            Cancel
          </button>
          <button type="submit" className="header-btn">
            {mode === "create" ? "Create Task" : "Save Changes"}
          </button>
        </div>
      </div>
    </form>
  );
}
