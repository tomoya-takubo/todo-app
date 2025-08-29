interface TodoStatsProps {
  totalTodos: number;
  activeTodos: number;
  completedTodos: number;
}

export default function TodoStats({ totalTodos, activeTodos, completedTodos }: TodoStatsProps) {
  return (
    <section className='bg-white p-4 rounded-xl shadow-md'>
      <div className='grid grid-cols-3 gap-4'>
        <div className='text-center'>
          <div className='text-2xl font-bold text-blue-600'>{totalTodos}</div>
          <div className='text-sm text-gray-500'>全体</div>
        </div>
        <div className='text-center'>
          <div className='text-2xl font-bold text-orange-600'>{activeTodos}</div>
          <div className='text-sm text-gray-500'>進行中</div>
        </div>
        <div className='text-center'>
          <div className='text-2xl font-bold text-green-600'>{completedTodos}</div>
          <div className='text-sm text-gray-500'>完了</div>
        </div>
      </div>
    </section>
  );
}