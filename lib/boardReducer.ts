import { Board, BoardAction, Task } from "@/types/board";
import { generateId } from "@/lib/utils";

export function boardReducer(state: Board, action: BoardAction): Board {
  switch (action.type) {
    case "ADD_TASK": {
      const { title, description, status } = action.payload;
      const id = generateId();
      const now = new Date().toISOString();

      const newTask: Task = {
        id,
        title,
        description,
        status,
        createdAt: now,
        updatedAt: now,
      };

      return {
        tasks: { ...state.tasks, [id]: newTask },
        columns: state.columns.map((column) =>
          column.id === status
            ? { ...column, taskIds: [...column.taskIds, id] }
            : column,
        ),
      };
    }

    case "UPDATE_TASK": {
      const { id, title, description } = action.payload;
      const task = state.tasks[id];

      if (!task) return state;

      return {
        ...state,
        tasks: {
          ...state.tasks,
          [id]: {
            ...task,
            title,
            description,
            updatedAt: new Date().toISOString(),
          },
        },
      };
    }

    case "DELETE_TASK": {
      const { id } = action.payload;
      const { [id]: _, ...remainingTasks } = state.tasks;

      return {
        tasks: remainingTasks,
        columns: state.columns.map((column) => ({
          ...column,
          taskIds: column.taskIds.filter((taskId) => taskId !== id),
        })),
      };
    }

    case "MOVE_TASK": {
      const { taskId, sourceColumnId, destColumnId, sourceIndex, destIndex } =
        action.payload;

      const sourceColumn = state.columns.find((c) => c.id === sourceColumnId);
      const destColumn = state.columns.find((c) => c.id === destColumnId);

      if (!sourceColumn || !destColumn) return state;

      if (sourceColumnId === destColumnId) {
        const newTaskIds = Array.from(sourceColumn.taskIds);
        newTaskIds.splice(sourceIndex, 1);
        newTaskIds.splice(destIndex, 0, taskId);

        return {
          ...state,
          columns: state.columns.map((column) =>
            column.id === sourceColumnId
              ? { ...column, taskIds: newTaskIds }
              : column,
          ),
        };
      }

      const newSourceTaskIds = sourceColumn.taskIds.filter(
        (id) => id !== taskId,
      );
      const newDestTaskIds = Array.from(destColumn.taskIds);
      newDestTaskIds.splice(destIndex, 0, taskId);

      return {
        ...state,
        tasks: {
          ...state.tasks,
          [taskId]: {
            ...state.tasks[taskId],
            status: destColumnId,
            updatedAt: new Date().toISOString(),
          },
        },
        columns: state.columns.map((column) => {
          if (column.id === sourceColumnId) {
            return { ...column, taskIds: newSourceTaskIds };
          }
          if (column.id === destColumnId) {
            return { ...column, taskIds: newDestTaskIds };
          }
          return column;
        }),
      };
    }

    case "REHYDRATE": {
      return action.payload;
    }

    default:
      return state;
  }
}
