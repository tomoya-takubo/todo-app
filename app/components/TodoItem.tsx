import { useState } from 'react';
import { Check, Pencil, Trash2, X } from 'lucide-react';
import type { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
  onUpdateTodo: (id: number, newText: string) => void;
}

export default function TodoItem({ todo, onToggleTodo, onDeleteTodo, onUpdateTodo }: TodoItemProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>('');

  const startEdit = (id: number, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = () => {
    if (editText.trim() === '') return;
    onUpdateTodo(todo.id, editText);
    setEditingId(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  return (
    <div className='bg-white p-4 rounded-xl shadow-md hover:shadow-lg hover:-translate-1 transition-all duration-200'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <button
            onClick={() => onToggleTodo(todo.id)}
            className={
              todo.completed 
                ? 'w-6 h-6 rounded-full border-2 border-green-500 bg-green-500 text-white flex items-center justify-center'
                : 'w-6 h-6 rounded-full border-2 border-gray-300 bg-gray-200 hover:bg-gray-300'
            }
          >
            {todo.completed && <Check className='w-4 h-4' />}
          </button>
          {editingId !== todo.id ? (
            <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
              {todo.text}
            </span>
          ) : (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyPress={handleKeyPress}
              className='flex-1 border-2 rounded-md px-4 py-2'
              autoFocus
            />
          )}
        </div>
        <div className='flex items-center gap-2'>
          {editingId !== todo.id ? (
            <>
              <button
                onClick={() => startEdit(todo.id, todo.text)}
                className='text-blue-500 hover:text-blue-700 p-2 rounded cursor-pointer'>
                <Pencil className='w-4 h-4' />
              </button>
              <button 
                onClick={() => onDeleteTodo(todo.id)} 
                className='text-red-500 hover:text-red-700 p-2 rounded cursor-pointer'>
                <Trash2 className='w-4 h-4' />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={saveEdit}
                className='text-green-500 hover:text-green-700 p-2 rounded cursor-pointer'>
                <Check className='w-4 h-4' />
              </button>
              <button
                onClick={cancelEdit}
                className='text-gray-500 hover:text-gray-700 p-2 rounded cursor-pointer'>
                <X className='w-4 h-4' />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}