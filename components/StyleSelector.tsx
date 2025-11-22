
import React from 'react';
import { COPY_STYLES } from '../constants';
import { CopyStyle, StyleConfig } from '../types';

interface StyleSelectorProps {
  selectedStyle: CopyStyle;
  onSelect: (style: CopyStyle) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onSelect }) => {
  return (
    <div className="w-full mb-8">
      <h2 className="text-xl font-bold text-gray-600 mb-4 flex items-center">
        <span className="bg-secondary w-8 h-8 rounded-full flex items-center justify-center mr-2 text-white shadow-sm">1</span>
        選擇大師風格
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {COPY_STYLES.map((style: StyleConfig) => {
          const isSelected = selectedStyle === style.id;
          return (
            <button
              key={style.id}
              onClick={() => onSelect(style.id)}
              className={`
                relative flex flex-col items-start p-4 rounded-2xl border-2 transition-all duration-300 h-full text-left
                ${isSelected 
                  ? `${style.color} border-opacity-100 shadow-[0px_4px_0px_0px_rgba(0,0,0,0.1)] translate-y-[-2px] ring-2 ring-offset-2 ring-primary/30` 
                  : 'bg-white border-gray-200 text-gray-500 hover:border-primary/50 hover:bg-pink-50'
                }
              `}
            >
              <div className="text-4xl mb-3 transform transition-transform group-hover:scale-110">{style.icon}</div>
              <div className="font-bold text-lg mb-1">{style.name}</div>
              <div className="text-xs opacity-90 leading-tight">{style.description}</div>
              
              {isSelected && (
                <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StyleSelector;
