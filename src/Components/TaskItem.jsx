import React from 'react';

export default function TaskItem({ task, onDelete, onEdit }) {
  const priorityColors = {
    'Yüksek': 'bg-rose-500/20 text-rose-400 border-rose-500/30',
    'Normal': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'Düşük': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  };

  return (
    <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-slate-600 transition shadow-md">
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <h3 className="font-bold text-slate-100 text-lg">{task.title}</h3>
          <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${priorityColors[task.priority] || priorityColors['Normal']}`}>
            {task.priority}
          </span>
        </div>
        {task.description && (
          <p className="text-slate-400 text-sm">{task.description}</p>
        )}
        <span className="text-xs text-slate-500 block">Eklenme: {task.createdAt}</span>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-center">
        {/* Güncelle Butonu (Update) */}
        <button 
          onClick={() => onEdit(task)}
          className="bg-amber-600/20 hover:bg-amber-600 text-amber-400 hover:text-white px-3 py-1.5 rounded-lg text-sm font-medium transition border border-amber-600/30 cursor-pointer"
        >
          Düzenle
        </button>
        {/* Sil Butonu (Delete) */}
        <button 
          onClick={() => onDelete(task.id)}
          className="bg-rose-600/20 hover:bg-rose-600 text-rose-400 hover:text-white px-3 py-1.5 rounded-lg text-sm font-medium transition border border-rose-600/30 cursor-pointer"
        >
          Sil
        </button>
      </div>
    </div>
  );
}