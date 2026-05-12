import { Clock, Trash2, Eye, ArrowRight } from 'lucide-react';
import type { HistoryDisplayItem } from '../utils/historyManager';

interface HistorySectionProps {
  history: HistoryDisplayItem[];
  onView: (item: HistoryDisplayItem) => void;
  onClear: () => void;
  onDelete: (id: string) => void;
}

export function HistorySection({ history, onView, onClear, onDelete }: HistorySectionProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-[#2C3E50] to-[#34495E] px-5 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-white" />
            <h2 className="text-lg font-bold text-white">历史记录</h2>
            {history.length > 0 && (
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full text-white">{history.length}/5</span>
            )}
          </div>
          {history.length > 0 && (
            <button
              onClick={onClear}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-200 text-white text-sm"
            >
              <Trash2 className="w-4 h-4" />
              <span>清空</span>
            </button>
          )}
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {history.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-gray-400 text-sm">暂无历史记录</p>
            <p className="text-gray-300 text-xs mt-1">生成的内容会自动保存在这里</p>
          </div>
        ) : (
          history.map((item) => (
            <div key={item.id} className="px-5 py-4 hover:bg-gray-50 transition-colors duration-200 group">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400 mb-1">{item.timestamp}</p>
                  <p className="text-gray-800 text-sm font-medium truncate mb-1">{item.chinese}</p>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <span className="text-red-600 truncate max-w-[120px]">{item.chinglish}</span>
                    <ArrowRight className="w-3 h-3 flex-shrink-0" />
                    <span className="text-green-600 truncate max-w-[120px]">{item.standard}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={() => onView(item)}
                    className="p-1.5 text-gray-400 hover:text-[#E74C3C] hover:bg-red-50 rounded-lg transition-all duration-200"
                    title="查看"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                    title="删除"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
