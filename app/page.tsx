'use client';
import React, { useState } from 'react';
import { Check, FileText, Pencil, Plus, Trash2, X } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type Filters = 'all'|'now'|'done';

export default function Home() {
  const [selectedFilter, setSelectedFilter] = useState<Filters>('all');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>('');

  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const activeTodos = totalTodos - completedTodos;

  const addTodo = () => {
    // 新しいTODOを追加するロジック
    if (inputText.trim() === '') return; // 空の入力は無視
    const newTodo: Todo = {
      id: Date.now(),
      text: inputText,
      completed: false,
    };

    // 新しいTODOをtodos配列に追加
    setTodos([...todos, newTodo]);

    // 入力フィールドをクリア
    setInputText(''); // 入力フィールドをクリア
  };

  // 完了状態を切替える関数
  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // クリックしたらTODOを削除する関数
  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // フィルターされたTODOを取得する関数
  const filteredTodos = todos.filter(todo => {
    if (selectedFilter === 'all') return true; // 全てのTODOを表示
    if (selectedFilter === 'now') return !todo.completed; // 進行中のTODOを表示
    if (selectedFilter === 'done') return todo.completed; // 完了したTODOを表示
    return false; // デフォルトは何も表示しない
  });

  // 編集を開始する関数
  const startEdit = (id: number, text: string) => {
    setEditingId(id);
    setEditText(text);
  }

  // 編集を保存する関数
  const saveEdit = () => {

    if(editText.trim() === '') return; // 空の入力は無視

    setTodos(todos.map(todo =>
      todo.id === editingId ? { ...todo, text: editText } : todo
    ));
    setEditingId(null); // 編集モードを終了
    setEditText(''); // 入力フィールドをクリア
  };

  // 編集をキャンセルする関数
  const cancelEdit = () => {
    setEditingId(null); // 編集モードを終了
    setEditText(''); // 入力フィールドをクリア
  };

  return (
    <div className='bg-blue-50 min-h-screen'>
      <header>
        <div className='p-8 text-center'>
          <h1 className='text-5xl flex items-center justify-center gap-3 mb-4'>
            <FileText className='w-12 h-12' /> Next.js ToDoアプリ
          </h1>
          <h3>React Hooks とアニメーションを学ぼう！</h3>
        </div>
      </header>
      
      <main>  
        <div className='max-w-2xl mx-auto space-y-6 p-6 rounded-xl'>

          {/* ToDo総数/進行中/完了数を表示するセクション */}
          <section className='bg-white p-4 rounded-xl shadow-md'>
            <div className='grid grid-cols-3 gap-4'>
              {/* 総数 */}
              <div className='text-center'>
                <div className='text-2xl font-bold text-blue-600'>{totalTodos}</div>
                <div className='text-sm text-gray-500'>全体</div>
              </div>
              {/* 進行中の数 */}
              <div className='text-center'>
                <div className='text-2xl font-bold text-orange-600'>{activeTodos}</div>
                <div className='text-sm text-gray-500'>進行中</div>
              </div>
              {/* 完了した数 */}
              <div className='text-center'>
                <div className='text-2xl font-bold text-green-600'>{completedTodos}</div>
                <div className='text-sm text-gray-500'>完了</div>
              </div>
            </div>
          </section>

          {/* タスクを追加する入力フィールドのセクション */}
          <section className='bg-white p-4 rounded-xl shadow-md'>
            <div className='flex gap-4'>
              {/* 入力フィールド */}
              <input
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder='タスクを入力してください'
                className='flex-1 border-2 rounded-md px-4 py-3' />
              {/* 追加ボタン */}
              <button
                onClick={addTodo}
                className='bg-blue-700 text-white px-8 py-3 rounded-md flex items-center gap-2'>
                <Plus className='w-3 h-3' /> 追加
              </button>
            </div>
          </section>

          {/* リストをフィルタリングするセクション */}
          <section className='p-4'>
            <div className='flex justify-center'>
              <div className='flex gap-2'>
                {/* すべて */}
                <button 
                  onClick={() => setSelectedFilter('all')} 
                  className={
                    selectedFilter === 'all'
                      ? 'px-4 py-2 rounded-md bg-blue-600 text-white cursor-pointer'
                      : 'px-4 py-2 rounded-md bg-gray-100 text-gray-700 cursor-pointer'
                }>
                  すべて
                </button>
                {/* 進行中 */}
                <button 
                  onClick={() => setSelectedFilter('now')} 
                  className={
                    selectedFilter === 'now'
                      ? 'px-4 py-2 rounded-md bg-blue-600 text-white cursor-pointer'
                      : 'px-4 py-2 rounded-md bg-gray-100 text-gray-700 cursor-pointer'
                }>
                  進行中
                </button>
                {/* 完了 */}
                <button 
                  onClick={() => setSelectedFilter('done')} 
                  className={
                    selectedFilter === 'done' 
                      ? 'px-4 py-2 rounded-md bg-blue-600 text-white cursor-pointer'
                      : 'px-4 py-2 rounded-md bg-gray-100 text-gray-700 cursor-pointer'
                }>
                  完了
                </button>
              </div>
            </div>
          </section>

          {/* 追加したTodoを一覧表示するセクション */}
          <section className='space-y-3'>
            {filteredTodos.map((todo: Todo) => (
              <>
                <div key={todo.id} className='bg-white p-4 rounded-xl shadow-md hover:shadow-lg hover:-translate-1 transition-all duration-200'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      {/* ToDoリスト冒頭の完了未完了ボタン */}
                      <button
                        onClick={() => toggleTodo(todo.id)}
                        className={
                          todo.completed 
                            ? 'w-6 h-6 rounded-full border-2 border-green-500 bg-green-500 text-white flex items-center justify-center'
                            : 'w-6 h-6 rounded-full border-2 border-gray-300 bg-gray-200 hover:bg-gray-300'
                          }
                      >
                        {todo.completed && <Check className='w-4 h-4' />}
                      </button>
                      {/* ToDoタスク名表示 */}
                      {editingId !== todo.id ? (
                        // 通常表示
                        <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                          {todo.text}
                        </span>
                      ) : (
                        // 編集中
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className='flex-1 border-2 rounded-md px-4 py-2'
                        />
                      )}
                    </div>
                    {/* ToDo末尾のアイコンボタン群 */}
                    <div className='flex items-center gap-2'>
                      {editingId !== todo.id ? (
                        // 通常表示
                        <>
                          {/* ✏️編集ボタン */}
                          <button
                            onClick={() => startEdit(todo.id, todo.text)}
                            className='text-blue-500 hover:text-blue-700 p-2 rounded cursor-pointer'>
                            <Pencil className='w-4 h-4' />
                          </button>
                          {/* 🗑️削除ボタン */}
                          <button onClick={() => deleteTodo(todo.id)} className='text-red-500 hover:text-red-700 p-2 rounded cursor-pointer'>
                            <Trash2 className='w-4 h-4' />
                          </button>
                        </>
                      ) : (
                      // 編集中
                        <>
                          {/* ✔️保存ボタン */}
                          <button
                            onClick={saveEdit}
                            className='text-green-500 hover:text-green-700 p-2 rounded cursor-pointer'>
                            <Check className='w-4 h-4' />
                          </button>
                          {/* ❌キャンセルボタン */}
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
              </>
            ))}
          </section>

          <footer className='text-center text-gray-500 mt-6'>
            <h4>Next.js + React Hooks + Framer Motion で作成</h4>
            <h4>学習要素: useState, useEffect, イベントハンドリング, 条件付きレンダリング</h4>
          </footer>
        </div>
      </main>
    </div>
  );
}
