import React, { useState, useEffect } from 'react';
import TaskForm from '../Components/TaskForm';
import TaskItem from '../Components/TaskItem';

export default function HomePage() {
  // Görevleri localStorage'dan alıyoruz (sayfa yenilense bile silinmez)
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Düzenleme modunda olan görevi takip etmek için
  const [editingTask, setEditingTask] = useState(null);

  // Görevler her değiştiğinde localStorage'a kaydediyoruz
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Ekleme veya Güncelleme İşlemi (Create / Update)
  const handleSaveTask = (taskData) => {
    if (editingTask) {
      // Güncelleme
      setTasks(tasks.map(task => task.id === editingTask.id ? { ...task, ...taskData } : task));
      setEditingTask(null);
    } else {
      // Ekleme
      const newTask = {
        id: Date.now(),
        ...taskData,
        createdAt: new Date().toLocaleDateString('tr-TR')
      };
      setTasks([newTask, ...tasks]);
    }
  };

  // Silme İşlemi (Delete)
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    if (editingTask && editingTask.id === id) {
      setEditingTask(null);
    }
  };

  // Düzenleme modunu açma
  const handleEditClick = (task) => {
    setEditingTask(task);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Başlık */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-indigo-400 tracking-wide">
            TNC Group - Web Geliştirme Projesi
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            ReactJS, Tailwind CSS ve LocalStorage Destekli Görev Yönetim Sistemi[cite: 1]
          </p>
        </header>

        {/* Görev Ekleme / Güncelleme Formu Bileşeni */}
        <TaskForm onSave={handleSaveTask} editingTask={editingTask} onCancel={() => setEditingTask(null)} />

        {/* Listeleme Alanı (Read) */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-slate-200 border-b border-slate-700 pb-2 flex justify-between items-center">
            <span>Görev Listesi</span>
            <span className="text-xs bg-indigo-600 px-2.5 py-1 rounded-full">
              Toplam: {tasks.length}
            </span>
          </h2>

          {tasks.length === 0 ? (
            <div className="text-center py-12 bg-slate-800/50 rounded-xl border border-dashed border-slate-700 text-slate-400">
              Henüz eklenmiş bir görev yok. Yukarıdaki formdan yeni bir görev ekleyebilirsin!
            </div>
          ) : (
            <div className="space-y-3">
              {tasks.map(task => (
                <TaskItem 
                  key={task.id} 
                  task={task} 
                  onDelete={handleDeleteTask} 
                  onEdit={handleEditClick} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}