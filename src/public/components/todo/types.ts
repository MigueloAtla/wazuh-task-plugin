
interface TodoProps {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoListProps {
  todos: TodoProps[];
  activeFilter: string;
  handleSetComplete: (id: number) => void;
  handleDelete: (id: number) => void;
  handleClearComplete: () => void;
  showAllTodos: () => void;
  showActiveTodos: () => void;
  showCompletedTodos: () => void;
}