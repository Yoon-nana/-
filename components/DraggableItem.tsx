import React from 'react';
import { EmojiItem } from '../types';

interface DraggableItemProps {
  item: EmojiItem;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, itemId: string) => void;
}

export const DraggableItem: React.FC<DraggableItemProps> = ({ item, onDragStart }) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, item.id)}
      className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center text-3xl sm:text-4xl bg-white rounded-full shadow-md hover:shadow-xl cursor-grab active:cursor-grabbing transition-transform hover:scale-110 active:scale-95 border-2 border-slate-100 select-none"
      title={item.name}
    >
      {item.emoji}
    </div>
  );
};