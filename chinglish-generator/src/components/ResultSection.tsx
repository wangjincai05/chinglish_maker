import { Copy, Check, ArrowRightLeft, Eye, EyeOff, Loader2 } from 'lucide-react';

interface ResultSectionProps {
  chinglish: string;
  standard: string;
  showCompare: boolean;
  isLoading: boolean;
  onCopyChinglish: () => void;
  onCopyStandard: () => void;
  onToggleCompare: () => void;
  copiedField: 'chinglish' | 'standard' | null;
}

export function ResultSection({
  chinglish,
  standard,
  showCompare,
  isLoading,
  onCopyChinglish,
  onCopyStandard,
  onToggleCompare,
  copiedField
}: ResultSectionProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-[#2C3E50] to-[#34495E] px-5 py-4">
          <h2 className="text-lg font-bold text-white">转换结果</h2>
        </div>
        <div className="p-8 flex flex-col items-center justify-center min-h-[200px]">
          <Loader2 className="w-10 h-10 text-[#E74C3C] animate-spin mb-4" />
          <p className="text-gray-500">正在生成中式英语...</p>
        </div>
      </div>
    );
  }

  if (!chinglish) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-[#2C3E50] to-[#34495E] px-5 py-4">
          <h2 className="text-lg font-bold text-white">转换结果</h2>
        </div>
        <div className="p-8 flex flex-col items-center justify-center min-h-[200px] text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <ArrowRightLeft className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-400 text-sm">输入中文内容，点击生成按钮</p>
          <p className="text-gray-300 text-xs mt-1">查看中式英语与标准英语的差异</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-[#2C3E50] to-[#34495E] px-5 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">转换结果</h2>
            <p className="text-xs text-gray-300 mt-0.5">中式英语 vs 标准英语</p>
          </div>
          <button
            onClick={onToggleCompare}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-200 text-white text-sm"
          >
            {showCompare ? (
              <>
                <EyeOff className="w-4 h-4" />
                <span className="hidden sm:inline">隐藏对比</span>
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">查看标准</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 border border-red-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-red-600 uppercase tracking-wider">Chinglish</span>
            <button
              onClick={onCopyChinglish}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                ${copiedField === 'chinglish'
                  ? 'bg-green-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }
              `}
            >
              {copiedField === 'chinglish' ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>已复制</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>复制</span>
                </>
              )}
            </button>
          </div>
          <p className="text-gray-800 text-lg leading-relaxed">{chinglish}</p>
        </div>

        {showCompare && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-center my-2">
              <div className="h-px bg-gray-200 flex-1"></div>
              <ArrowRightLeft className="w-4 h-4 text-gray-400 mx-3" />
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-green-600 uppercase tracking-wider">Standard English</span>
                <button
                  onClick={onCopyStandard}
                  className={`
                    flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                    ${copiedField === 'standard'
                      ? 'bg-green-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                    }
                  `}
                >
                  {copiedField === 'standard' ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>已复制</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>复制</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-gray-800 text-lg leading-relaxed">{standard}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
