import { useState } from 'react';
import { Plus } from 'lucide-react';

interface TodoInputProps {
  onAddTodo: (text: string) => void;
}

export default function TodoInput({ onAddTodo }: TodoInputProps) {
  const [inputText, setInputText] = useState<string>('');

  const handleAddTodo = () => {
    onAddTodo(inputText);
    setInputText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <section className='bg-white p-4 rounded-xl shadow-md'>
      <div className='flex gap-4'>
        <input
          type="text" 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder='タスクを入力してください'
          className='flex-1 border-2 rounded-md px-4 py-3' 
        />
        <button
          onClick={handleAddTodo}
          className='bg-blue-700 text-white px-8 py-3 rounded-md flex items-center gap-2'>
          <Plus className='w-3 h-3' /> 追加
        </button>
      </div>
    </section>
  );
}