import { FileText } from 'lucide-react';

export default function TodoHeader() {
  return (
    <header>
      <div className='p-8 text-center'>
        <h1 className='text-5xl flex items-center justify-center gap-3 mb-4'>
          <FileText className='w-12 h-12' /> Next.js ToDoアプリ
        </h1>
        <h3>React Hooks とアニメーションを学ぼう！</h3>
      </div>
    </header>
  );
}