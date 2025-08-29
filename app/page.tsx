'use client';
import { useState } from 'react';
import TodoHeader from './components/TodoHeader';
import TodoStats from './components/TodoStats';
import TodoInput from './components/TodoInput';
import TodoFilter from './components/TodoFilter';
import TodoList from './components/TodoList';
import { useTodos } from './hooks/useTodos';
import type { Filters } from './types/todo';

export default function Home() {
  const [selectedFilter, setSelectedFilter] = useState<Filters>('all');
  const {
    totalTodos,
    completedTodos,
    activeTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    filteredTodos: getFilteredTodos
  } = useTodos();

  const filteredTodos = getFilteredTodos(selectedFilter);

  return (
    <div className='bg-blue-50 min-h-screen'>
      <TodoHeader />
      
      <main>  
        <div className='max-w-2xl mx-auto space-y-6 p-6 rounded-xl'>
          <TodoStats 
            totalTodos={totalTodos}
            activeTodos={activeTodos}
            completedTodos={completedTodos}
          />

          <TodoInput onAddTodo={addTodo} />

          <TodoFilter 
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
          />

          <TodoList 
            todos={filteredTodos}
            onToggleTodo={toggleTodo}
            onDeleteTodo={deleteTodo}
            onUpdateTodo={updateTodo}
          />

          <footer className='text-center text-gray-500 mt-6'>
            <h4>Next.js + React Hooks + Framer Motion で作成</h4>
            <h4>学習要素: useState, useEffect, イベントハンドリング, 条件付きレンダリング</h4>
          </footer>
        </div>
      </main>
    </div>
  );
}