import { Wand2, Trash2, Loader2 } from 'lucide-react';

interface InputSectionProps {
  inputText: string;
  onInputChange: (text: string) => void;
  onGenerate: () => void;
  onClear: () => void;
  isLoading: boolean;
}

export function InputSection({
  inputText,
  onInputChange,
  onGenerate,
  onClear,
  isLoading
}: InputSectionProps) {
  const charCount = inputText.length;
  const maxChars = 500;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-[#2C3E50] to-[#34495E] px-5 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">输入中文</h2>
            <p className="text-xs text-gray-300 mt-0.5">输入你想要转换的中文内容</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-medium ${charCount > maxChars ? 'text-red-300' : 'text-gray-300'}`}>
              {charCount}/{maxChars}
            </span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="relative">
          <textarea
            value={inputText}
            onChange={(e) => onInputChange(e.target.value.slice(0, maxChars))}
            placeholder="请输入中文内容，例如：&#10;• 很久很久以前&#10;• 我非常想你&#10;• 今天天气真好"
            className="w-full h-40 px-4 py-3 text-base text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-xl resize-none transition-all duration-200 focus:outline-none focus:border-[#E74C3C] focus:bg-white placeholder:text-gray-400 placeholder:leading-relaxed"
            disabled={isLoading}
          />
          {inputText && (
            <button
              onClick={onClear}
              className="absolute top-3 right-3 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
              title="清空"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onGenerate}
            disabled={!inputText.trim() || isLoading}
            className={`
              flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white
              transition-all duration-300 transform
              ${inputText.trim() && !isLoading
                ? 'bg-gradient-to-r from-[#E74C3C] to-[#C0392B] hover:from-[#C0392B] hover:to-[#A93226] hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl'
                : 'bg-gray-300 cursor-not-allowed'
              }
            `}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>生成中...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                <span>生成中式英语</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
