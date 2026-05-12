import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BottomNav } from './components/BottomNav';
import { ToastContainer } from './components/Toast';
import { TranslatePage } from './pages/TranslatePage';
import { HistoryPage } from './pages/HistoryPage';
import { ExamplesPage } from './pages/ExamplesPage';
import { useAppStore } from './store/useAppStore';

function Header() {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-md mx-auto px-4 py-4">
        <h1 className="text-xl font-bold text-gray-900">中式英语生成器</h1>
        <p className="text-sm text-gray-500">趣味学习，识别中式英语</p>
      </div>
    </div>
  );
}

function App() {
  const { toasts, removeToast, loadHistory } = useAppStore();

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<TranslatePage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/examples" element={<ExamplesPage />} />
        </Routes>
        <BottomNav />
        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </div>
    </Router>
  );
}

export default App;
