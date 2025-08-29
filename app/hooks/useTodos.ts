import { useState } from 'react';
import type { Todo, Filters } from '../types/todo';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const activeTodos = totalTodos - completedTodos;

  const addTodo = (text: string) => {
    if (text.trim() === '') return;
    
    const newTodo: Todo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
    };

    setTodos(prev => [...prev, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const updateTodo = (id: number, newText: string) => {
    if (newText.trim() === '') return;
    
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, text: newText.trim() } : todo
      )
    );
  };

  const filteredTodos = (filter: Filters) => {
    return todos.filter(todo => {
      if (filter === 'all') return true;
      if (filter === 'now') return !todo.completed;
      if (filter === 'done') return todo.completed;
      return false;
    });
  };

  return {
    todos,
    totalTodos,
    completedTodos,
    activeTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    filteredTodos,
  };
}