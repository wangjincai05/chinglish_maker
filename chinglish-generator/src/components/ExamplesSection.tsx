import { ChevronDown, BookOpen, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';
import type { Example } from '../utils/examples';

interface ExamplesSectionProps {
  examples: Example[];
  expandedId: string | null;
  onToggle: (id: string) => void;
}

export function ExamplesSection({ examples, expandedId, onToggle }: ExamplesSectionProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-[#E74C3C] to-[#C0392B] px-5 py-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-white" />
          <h2 className="text-lg font-bold text-white">经典案例</h2>
          <span className="ml-auto text-xs bg-white/20 px-2 py-0.5 rounded-full text-white">{examples.length}个案例</span>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {examples.map((example) => (
          <div key={example.id} className="transition-all duration-300">
            <button
              onClick={() => onToggle(example.id)}
              className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 text-left"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs bg-[#E74C3C]/10 text-[#E74C3C] px-2 py-0.5 rounded-full font-medium">
                    {example.scene}
                  </span>
                </div>
                <p className="text-gray-800 font-medium truncate">{example.chinese}</p>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 ml-3 flex-shrink-0 transition-transform duration-300 ${
                  expandedId === example.id ? 'rotate-180' : ''
                }`}
              />
            </button>

            {expandedId === example.id && (
              <div className="px-5 pb-5 space-y-4 animate-fade-in">
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">中式英语</span>
                  </div>
                  <p className="text-gray-700 italic">{example.chinglish}</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-xs font-semibold text-green-600 uppercase tracking-wider">标准表达</span>
                  </div>
                  <p className="text-gray-700 font-medium">{example.standard}</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">错误解析</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{example.explanation}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
