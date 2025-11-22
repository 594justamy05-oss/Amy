import React from 'react';
import { Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-8 pt-8">
      <div className="inline-flex items-center justify-center bg-white p-4 rounded-full shadow-lg border-4 border-primary mb-4 animate-bounce-slow">
        <Sparkles className="text-yellow-400 w-8 h-8 mr-2" />
        <h1 className="text-3xl md:text-4xl font-bold text-gray-700 tracking-wide font-['Zen_Maru_Gothic']">
          萌系 <span className="text-primary">AIDA</span> 文案生成器
        </h1>
        <Sparkles className="text-yellow-400 w-8 h-8 ml-2" />
      </div>
      <p className="text-gray-500 text-lg font-medium bg-white/50 inline-block px-4 py-1 rounded-xl backdrop-blur-sm">
        讓 AI 大師為你施展文字魔法 ✨
      </p>
    </header>
  );
};

export default Header;