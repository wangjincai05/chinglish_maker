import React, { useEffect } from 'react'
import { Trash2, Clock, Eye, RotateCcw } from 'lucide-react'
import { useAppStore, useHistoryWithFormat } from '../store/useAppStore'
import { useNavigate } from 'react-router-dom'

export const HistoryPage: React.FC = () => {
  const {
    loadHistory,
    handleViewHistory,
    handleClearHistory,
    handleDeleteHistory
  } = useAppStore()
  const history = useHistoryWithFormat()
  const navigate = useNavigate()

  useEffect(() => {
    loadHistory()
  }, [loadHistory])

  const handleViewAndNavigate = (item: any) => {
    handleViewHistory(item)
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="px-4 py-6">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Clock className="w-6 h-6" />
              翻译历史
            </h2>
            {history.length > 0 && (
              <button
                onClick={handleClearHistory}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium"
              >
                <Trash2 className="w-4 h-4" />
                清空
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">还没有翻译历史</h3>
              <p className="text-gray-500">开始翻译，记录会保存在这里</p>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <p className="text-sm text-gray-500">{item.timestamp}</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewAndNavigate(item)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="查看并使用"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteHistory(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="删除"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-900 font-medium mb-3">{item.chinese}</p>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-red-50 rounded-xl p-3">
                      <p className="text-xs text-red-600 font-semibold mb-1">中式英语</p>
                      <p className="text-sm text-gray-800 line-clamp-2">{item.chinglish}</p>
                    </div>
                    <div className="bg-green-50 rounded-xl p-3">
                      <p className="text-xs text-green-600 font-semibold mb-1">标准英语</p>
                      <p className="text-sm text-gray-800 line-clamp-2">{item.standard}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleViewAndNavigate(item)}
                    className="w-full mt-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    再次使用
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
