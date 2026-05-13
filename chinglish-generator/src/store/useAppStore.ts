import { create } from 'zustand'
import { translateToChinglish } from '../utils/translationRules'
import {
  getHistory,
  addToHistory,
  clearHistory,
  deleteHistoryItem,
  HistoryItem,
  HistoryDisplayItem,
  formatTimestamp
} from '../utils/historyManager'

interface AppStore {
  inputText: string
  setInputText: (text: string) => void
  chinglish: string
  standard: string
  showCompare: boolean
  isLoading: boolean
  history: HistoryItem[]
  copiedField: 'chinglish' | 'standard' | null
  setCopiedField: (field: 'chinglish' | 'standard' | null) => void
  toasts: Toast[]
  addToast: (message: string, type: 'success' | 'error' | 'info') => void
  removeToast: (id: string) => void
  
  handleGenerate: () => Promise<void>
  handleClear: () => void
  handleCopy: (text: string, field: 'chinglish' | 'standard') => Promise<void>
  handleViewHistory: (item: HistoryDisplayItem) => void
  handleClearHistory: () => void
  handleDeleteHistory: (id: string) => void
  loadHistory: () => void
}

interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

export const useAppStore = create<AppStore>((set, get) => ({
  inputText: '',
  setInputText: (text: string) => set({ inputText: text }),
  
  chinglish: '',
  standard: '',
  showCompare: false,
  isLoading: false,
  history: [],
  copiedField: null,
  setCopiedField: (field) => set({ copiedField: field }),
  
  toasts: [],
  addToast: (message, type) => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }))
  },
  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }))
  },
  
  handleGenerate: async () => {
    const { inputText, addToast } = get()
    if (!inputText.trim()) return

    set({ isLoading: true, chinglish: '', standard: '', showCompare: false })

    try {
      const result = await translateToChinglish(inputText.trim())
      set({ 
        chinglish: result.chinglish, 
        standard: result.standard, 
        showCompare: true, 
        isLoading: false 
      })

      addToHistory({
        chinese: inputText.trim(),
        chinglish: result.chinglish,
        standard: result.standard
      })
      set({ history: getHistory() })

      addToast('生成成功！', 'success')
    } catch {
      set({ isLoading: false })
      addToast('翻译失败，请重试', 'error')
    }
  },
  
  handleClear: () => {
    set({ inputText: '', chinglish: '', standard: '', showCompare: false })
  },
  
  handleCopy: async (text: string, field: 'chinglish' | 'standard') => {
    const { addToast, setCopiedField } = get()
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      addToast('复制成功！', 'success')
      setTimeout(() => setCopiedField(null), 2000)
    } catch {
      addToast('复制失败，请手动复制', 'error')
    }
  },
  
  handleViewHistory: (item: HistoryDisplayItem) => {
    set({
      inputText: item.chinese,
      chinglish: item.chinglish,
      standard: item.standard,
      showCompare: true
    })
    get().addToast('已加载历史记录', 'info')
  },
  
  handleClearHistory: () => {
    clearHistory()
    set({ history: [] })
    get().addToast('历史记录已清空', 'info')
  },
  
  handleDeleteHistory: (id: string) => {
    const updatedHistory = deleteHistoryItem(id)
    set({ history: updatedHistory })
    get().addToast('已删除该记录', 'info')
  },
  
  loadHistory: () => {
    set({ history: getHistory() })
  }
}))

export const useHistoryWithFormat = () => {
  const history = useAppStore((state) => state.history)
  return history.map((item) => ({
    ...item,
    timestamp: formatTimestamp(item.timestamp)
  }))
}
