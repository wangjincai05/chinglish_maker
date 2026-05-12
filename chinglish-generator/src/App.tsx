import { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { ResultSection } from './components/ResultSection';
import { ExamplesSection } from './components/ExamplesSection';
import { HistorySection } from './components/HistorySection';
import { ToastContainer } from './components/Toast';
import { translateToChinglish } from './utils/translationRules';
import { examples } from './utils/examples';
import { getHistory, addToHistory, clearHistory, deleteHistoryItem, formatTimestamp, HistoryItem, HistoryDisplayItem } from './utils/historyManager';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

function App() {
  const [inputText, setInputText] = useState('');
  const [chinglish, setChinglish] = useState('');
  const [standard, setStandard] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [copiedField, setCopiedField] = useState<'chinglish' | 'standard' | null>(null);
  const [expandedExample, setExpandedExample] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info') => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    setToasts(prev => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const handleGenerate = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setChinglish('');
    setStandard('');
    setShowCompare(false);

    await new Promise(resolve => setTimeout(resolve, 800));

    const result = translateToChinglish(inputText.trim());
    setChinglish(result.chinglish);
    setStandard(result.standard);
    setShowCompare(true);
    setIsLoading(false);

    const newHistoryItem = addToHistory({
      chinese: inputText.trim(),
      chinglish: result.chinglish,
      standard: result.standard
    });
    setHistory(getHistory());

    showToast('生成成功！', 'success');
  };

  const handleClear = () => {
    setInputText('');
    setChinglish('');
    setStandard('');
    setShowCompare(false);
  };

  const handleCopy = async (text: string, field: 'chinglish' | 'standard') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      showToast('复制成功！', 'success');
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      showToast('复制失败，请手动复制', 'error');
    }
  };

  const handleViewHistory = (item: HistoryDisplayItem) => {
    setInputText(item.chinese);
    setChinglish(item.chinglish);
    setStandard(item.standard);
    setShowCompare(true);
    showToast('已加载历史记录', 'info');
  };

  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
    showToast('历史记录已清空', 'info');
  };

  const handleDeleteHistory = (id: string) => {
    const updatedHistory = deleteHistoryItem(id);
    setHistory(updatedHistory);
    showToast('已删除该记录', 'info');
  };

  const historyWithFormat = history.map(item => ({
    ...item,
    timestamp: formatTimestamp(item.timestamp)
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <InputSection
              inputText={inputText}
              onInputChange={setInputText}
              onGenerate={handleGenerate}
              onClear={handleClear}
              isLoading={isLoading}
            />

            <ResultSection
              chinglish={chinglish}
              standard={standard}
              showCompare={showCompare}
              isLoading={isLoading}
              onCopyChinglish={() => handleCopy(chinglish, 'chinglish')}
              onCopyStandard={() => handleCopy(standard, 'standard')}
              onToggleCompare={() => setShowCompare(!showCompare)}
              copiedField={copiedField}
            />
          </div>

          <div className="space-y-6">
            <ExamplesSection
              examples={examples}
              expandedId={expandedExample}
              onToggle={(id) => setExpandedExample(expandedExample === id ? null : id)}
            />

            <HistorySection
              history={historyWithFormat}
              onView={handleViewHistory}
              onClear={handleClearHistory}
              onDelete={handleDeleteHistory}
            />
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 bg-white mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            ChingLish Generator · 趣味学习 · 识别中式英语
          </p>
        </div>
      </footer>

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

export default App;
