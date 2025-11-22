import React from 'react';
import { Wand2 } from 'lucide-react';

interface InputFormProps {
  topic: string;
  setTopic: (topic: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ topic, setTopic, onGenerate, isLoading }) => {
  return (
    <div className="w-full mb-8">
      <h2 className="text-xl font-bold text-gray-600 mb-4 flex items-center">
        <span className="bg-secondary w-8 h-8 rounded-full flex items-center justify-center mr-2 text-white shadow-sm">2</span>
        輸入產品或主題
      </h2>
      
      <div className="bg-white p-1 rounded-3xl shadow-sm border-2 border-dashed border-primary/30 focus-within:border-primary focus-within:ring-4 focus-within:ring-pink-100 transition-all">
        <textarea
          className="w-full h-32 p-4 rounded-2xl resize-none outline-none text-gray-700 placeholder-gray-300 text-lg"
          placeholder="例如：一款貓咪造型的無線充電盤，可愛又實用..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <button
        onClick={onGenerate}
        disabled={isLoading || !topic.trim()}
        className={`
          mt-6 w-full py-4 rounded-2xl text-white font-bold text-xl tracking-wider shadow-lg transition-all transform
          flex items-center justify-center
          ${isLoading || !topic.trim() 
            ? 'bg-gray-300 cursor-not-allowed' 
            : 'bg-gradient-to-r from-primary to-secondary hover:from-red-300 hover:to-pink-300 hover:scale-[1.02] hover:shadow-xl active:scale-95'
          }
        `}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            大師思考中...
          </>
        ) : (
          <>
            <Wand2 className="mr-2 w-6 h-6" />
            開始生成文案
          </>
        )}
      </button>
    </div>
  );
};

export default InputForm;