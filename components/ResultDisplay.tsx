import React from 'react';
import { AidaResponse } from '../types';
import { Copy, Check } from 'lucide-react';

interface ResultDisplayProps {
  result: AidaResponse;
}

const SectionCard: React.FC<{ title: string; content: string; color: string; icon: string }> = ({ title, content, color, icon }) => (
  <div className={`p-4 rounded-2xl ${color} mb-4 border border-white/50 shadow-sm`}>
    <h4 className="font-bold text-gray-700 mb-2 flex items-center">
      <span className="text-2xl mr-2">{icon}</span> {title}
    </h4>
    <p className="text-gray-600 leading-relaxed whitespace-pre-line">{content}</p>
  </div>
);

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    const textToCopy = `${result.title}\n\n${result.fullPost}\n\n${result.hashtags.join(' ')}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full animate-fade-in-up">
       <h2 className="text-xl font-bold text-gray-600 mb-4 flex items-center justify-center">
        <span className="bg-highlight w-8 h-8 rounded-full flex items-center justify-center mr-2 text-white shadow-sm">3</span>
        文案成果
      </h2>

      <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-pop/30">
        
        {/* AIDA Analysis Section */}
        <div className="mb-8 grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2 bg-white p-4 rounded-2xl border-2 border-dashed border-primary/40 text-center mb-2">
             <h3 className="text-2xl font-bold text-primary mb-1">{result.title}</h3>
          </div>
          
          <SectionCard 
            title="Attention (注意力)" 
            content={result.attention} 
            color="bg-red-50" 
            icon="👀" 
          />
          <SectionCard 
            title="Interest (興趣)" 
            content={result.interest} 
            color="bg-orange-50" 
            icon="🤔" 
          />
          <SectionCard 
            title="Desire (慾望)" 
            content={result.desire} 
            color="bg-pink-50" 
            icon="😍" 
          />
          <SectionCard 
            title="Action (行動)" 
            content={result.action} 
            color="bg-green-50" 
            icon="🛒" 
          />
        </div>

        {/* Final Output & Copy Button */}
        <div className="bg-gray-50 rounded-2xl p-6 relative group border-2 border-gray-100">
            <div className="absolute top-4 right-4">
                <button 
                    onClick={handleCopy}
                    className="bg-white p-2 rounded-xl shadow-md hover:shadow-lg transition-all text-gray-500 hover:text-primary active:scale-95 border border-gray-100"
                    title="複製全文"
                >
                    {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                </button>
            </div>
            <div className="prose prose-pink max-w-none">
                <h3 className="text-xl font-bold text-gray-800 mb-4">完整貼文預覽</h3>
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed font-sans">
                    {result.fullPost}
                </div>
                <div className="mt-4 text-blue-400 font-medium">
                    {result.hashtags.map(tag => tag.startsWith('#') ? tag : `#${tag}`).join(' ')}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;