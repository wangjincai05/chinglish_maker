import React, { useState } from 'react'
import { Sparkles, ChevronDown, ChevronUp, Wand2 } from 'lucide-react'
import { examples } from '../utils/examples'
import { useAppStore } from '../store/useAppStore'
import { useNavigate } from 'react-router-dom'

export const ExamplesPage: React.FC = () => {
  const { setInputText, handleGenerate } = useAppStore()
  const navigate = useNavigate()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const handleUseExample = async (chinese: string) => {
    setInputText(chinese)
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="px-4 py-6">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-yellow-500" />
            翻译示例
          </h2>

          <div className="space-y-3">
            {examples.map((example) => (
              <div
                key={example.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
              >
                <button
                  onClick={() => setExpandedId(expandedId === example.id ? null : example.id)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <p className="font-medium text-gray-900">{example.chinese}</p>
                    {expandedId === example.id && (
                      <p className="text-xs text-gray-500 mt-1">{example.description}</p>
                    )}
                  </div>
                  {expandedId === example.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>

                {expandedId === example.id && (
                  <div className="px-5 pb-4 pt-2 border-t border-gray-100">
                    <div className="space-y-3 mb-4">
                      <div className="bg-red-50 rounded-xl p-4">
                        <p className="text-xs text-red-600 font-semibold mb-2">中式英语</p>
                        <p className="text-sm text-gray-800">{example.chinglish}</p>
                      </div>
                      <div className="bg-green-50 rounded-xl p-4">
                        <p className="text-xs text-green-600 font-semibold mb-2">标准英语</p>
                        <p className="text-sm text-gray-800">{example.standard}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleUseExample(example.chinese)}
                      className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                    >
                      <Wand2 className="w-4 h-4" />
                      使用这个示例
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
