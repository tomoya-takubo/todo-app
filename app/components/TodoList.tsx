import TodoItem from './TodoItem';
import type { Todo } from '../types/todo';

interface TodoListProps {
  todos: Todo[];
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
  onUpdateTodo: (id: number, newText: string) => void;
}

export default function TodoList({ todos, onToggleTodo, onDeleteTodo, onUpdateTodo }: TodoListProps) {
  return (
    <section className='space-y-3'>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleTodo={onToggleTodo}
          onDeleteTodo={onDeleteTodo}
          onUpdateTodo={onUpdateTodo}
        />
      ))}
    </section>
  );
}