import React from 'react'
import { Wand2, RefreshCw, Copy, Check } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { clsx } from 'clsx'

export const TranslatePage: React.FC = () => {
  const {
    inputText,
    setInputText,
    chinglish,
    standard,
    showCompare,
    isLoading,
    copiedField,
    handleGenerate,
    handleClear,
    handleCopy
  } = useAppStore()

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="px-4 py-6">
        <div className="max-w-md mx-auto space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <textarea
              className="w-full h-32 p-4 text-lg bg-gray-50 rounded-xl border-0 resize-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
              placeholder="输入你想要转换的中文内容..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleClear}
                className="flex-1 py-3 px-4 text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors font-medium"
              >
                清空
              </button>
              <button
                onClick={handleGenerate}
                disabled={isLoading || !inputText.trim()}
                className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    生成中...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    生成中式英语
                  </>
                )}
              </button>
            </div>
          </div>

          {showCompare && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 shadow-sm border border-red-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-red-600 font-bold text-sm uppercase tracking-wider">中式英语</span>
                  <button
                    onClick={() => handleCopy(chinglish, 'chinglish')}
                    className="p-2 rounded-lg hover:bg-white/60 transition-colors"
                  >
                    {copiedField === 'chinglish' ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5 text-red-600" />
                    )}
                  </button>
                </div>
                <p className="text-xl font-semibold text-gray-800">{chinglish}</p>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex items-center">
                  <div className="bg-white p-2 rounded-full shadow-sm border border-gray-200">
                    <RefreshCw className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-sm border border-green-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-green-600 font-bold text-sm uppercase tracking-wider">标准英语</span>
                  <button
                    onClick={() => handleCopy(standard, 'standard')}
                    className="p-2 rounded-lg hover:bg-white/60 transition-colors"
                  >
                    {copiedField === 'standard' ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5 text-green-600" />
                    )}
                  </button>
                </div>
                <p className="text-xl font-semibold text-gray-800">{standard}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
