import type { Filters } from '../types/todo';

interface TodoFilterProps {
  selectedFilter: Filters;
  onFilterChange: (filter: Filters) => void;
}

export default function TodoFilter({ selectedFilter, onFilterChange }: TodoFilterProps) {
  const filterButtons = [
    { key: 'all' as Filters, label: 'すべて' },
    { key: 'now' as Filters, label: '進行中' },
    { key: 'done' as Filters, label: '完了' },
  ];

  return (
    <section className='p-4'>
      <div className='flex justify-center'>
        <div className='flex gap-2'>
          {filterButtons.map(({ key, label }) => (
            <button 
              key={key}
              onClick={() => onFilterChange(key)} 
              className={
                selectedFilter === key
                  ? 'px-4 py-2 rounded-md bg-blue-600 text-white cursor-pointer'
                  : 'px-4 py-2 rounded-md bg-gray-100 text-gray-700 cursor-pointer'
              }
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}