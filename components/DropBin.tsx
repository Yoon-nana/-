import React from 'react';
import { Location } from '../types';

interface DropBinProps {
  id: Location;
  title: string;
  isOver: boolean;
  children: React.ReactNode;
  onDrop: (e: React.DragEvent<HTMLDivElement>, location: Location) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
}

export const DropBin: React.FC<DropBinProps> = ({ 
  id, 
  title, 
  children, 
  onDrop, 
  onDragOver, 
  onDragLeave,
  isOver 
}) => {
  return (
    <div
      onDrop={(e) => onDrop(e, id)}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      className={`
        flex-1 min-h-[200px] flex flex-col items-center p-4 rounded-2xl transition-all duration-300 border-4 border-dashed
        ${isOver ? 'bg-indigo-50 border-indigo-400 scale-[1.02]' : 'bg-slate-50 border-slate-300'}
      `}
    >
      <h3 className="text-slate-400 font-bold uppercase tracking-wider mb-4 text-sm pointer-events-none select-none">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2 justify-center content-start w-full h-full">
        {children}
      </div>
    </div>
  );
};