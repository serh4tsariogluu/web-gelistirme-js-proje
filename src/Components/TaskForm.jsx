import React, { useState, useEffect } from 'react';

export default function TaskForm({ onSave, editingTask, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Normal');

  // Düzenlenecek görev seçildiğinde inputları doldur
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setPriority(editingTask.priority || 'Normal');
    } else {
      setTitle('');
      setDescription('');
      setPriority('Normal');
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({ title, description, priority });
    setTitle('');
    setDescription('');
    setPriority('Normal');
  };

  return (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700">
      <h3 className="text-lg font-bold mb-4 text-indigo-300">
        {editingTask ? '✏️ Görevi Güncelle' : '➕ Yeni Görev Ekle'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Görev Başlığı</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Örn: React projesini tamamla..."
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500 transition"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Açıklama</label>
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Görev detaylarını buraya yazabilirsin..."
            rows="2"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 focus:outline-none focus:border-indigo-500 transition resize-none"
          />
        </div>

        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Öncelik</label>
            <select 
              value={priority} 
              onChange={(e) => setPriority(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500 transition"
            >
              <option value="Düşük">Düşük</option>
              <option value="Normal">Normal</option>
              <option value="Yüksek">Yüksek</option>
            </select>
          </div>

          <div className="flex items-end gap-2 pt-5">
            {editingTask && (
              <button 
                type="button"
                onClick={onCancel}
                className="bg-slate-700 hover:bg-slate-600 text-slate-200 px-4 py-2.5 rounded-lg font-medium transition cursor-pointer"
              >
                İptal
              </button>
            )}
            <button 
              type="submit"
              className={`px-6 py-2.5 rounded-lg font-semibold text-white transition shadow-lg cursor-pointer ${
                editingTask 
                  ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-900/30' 
                  : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-900/30'
              }`}
            >
              {editingTask ? 'Güncelle' : 'Ekle'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}