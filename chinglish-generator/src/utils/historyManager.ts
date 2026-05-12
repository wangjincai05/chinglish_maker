export interface HistoryItem {
  id: string;
  chinese: string;
  chinglish: string;
  standard: string;
  timestamp: number;
}

export interface HistoryDisplayItem {
  id: string;
  chinese: string;
  chinglish: string;
  standard: string;
  timestamp: string;
}

const STORAGE_KEY = 'chinglish_history';
const MAX_HISTORY = 5;

export function getHistory(): HistoryItem[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    const history = JSON.parse(data) as HistoryItem[];
    return history.sort((a, b) => b.timestamp - a.timestamp);
  } catch {
    return [];
  }
}

export function addToHistory(item: Omit<HistoryItem, 'id' | 'timestamp'>): HistoryItem {
  const history = getHistory();
  const newItem: HistoryItem = {
    ...item,
    id: generateId(),
    timestamp: Date.now(),
  };

  const updatedHistory = [newItem, ...history].slice(0, MAX_HISTORY);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  return newItem;
}

export function clearHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function deleteHistoryItem(id: string): HistoryItem[] {
  const history = getHistory();
  const updatedHistory = history.filter(item => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  return updatedHistory;
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return '刚刚';
  if (diffMins < 60) return `${diffMins}分钟前`;
  if (diffHours < 24) return `${diffHours}小时前`;
  if (diffDays < 7) return `${diffDays}天前`;

  return date.toLocaleDateString('zh-CN', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
