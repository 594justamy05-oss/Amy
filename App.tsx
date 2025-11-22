
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import StyleSelector from './components/StyleSelector';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';
import { CopyStyle, GenerateState } from './types';
import { generateCopy } from './services/geminiService';
import { AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<CopyStyle>(CopyStyle.UNCLE_GUN);
  const [state, setState] = useState<GenerateState>({
    isLoading: false,
    result: null,
    error: null,
  });

  const handleGenerate = useCallback(async () => {
    if (!topic.trim()) return;

    setState(prev => ({ ...prev, isLoading: true, error: null, result: null }));

    try {
      const data = await generateCopy(topic, selectedStyle);
      setState({
        isLoading: false,
        result: data,
        error: null,
      });
    } catch (error: any) {
      setState({
        isLoading: false,
        result: null,
        error: error.message || "發生未知錯誤",
      });
    }
  }, [topic, selectedStyle]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50 px-4 py-8 font-['Nunito']">
      <div className="max-w-4xl mx-auto">
        <Header />
        
        <main className="space-y-8">
          <StyleSelector 
            selectedStyle={selectedStyle} 
            onSelect={setSelectedStyle} 
          />
          
          <InputForm 
            topic={topic} 
            setTopic={setTopic} 
            onGenerate={handleGenerate}
            isLoading={state.isLoading}
          />

          {state.error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-xl flex items-center animate-pulse shadow-sm" role="alert">
              <AlertCircle className="w-6 h-6 mr-2" />
              <p>{state.error}</p>
            </div>
          )}

          {state.result && (
            <ResultDisplay result={state.result} />
          )}
        </main>

        <footer className="mt-16 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} 萌系 AIDA 文案生成器 | Powered by Gemini 2.5</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
