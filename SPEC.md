# 中式英语生成器 - 技术架构文档

## 1. 项目架构

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                      │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   Input      │  │  Result     │  │   Sidebar           │ │
│  │   Component  │  │  Display    │  │   - Examples        │ │
│  │   - TextArea  │  │  - Chinglish│  │   - History         │ │
│  │   - Counter   │  │  - Standard │  │                     │ │
│  │   - Buttons   │  │  - Compare  │  │                     │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐│
│  │              Translation Engine                          ││
│  │  - Pattern Matching Rules                                ││
│  │  - Chinese-to-Chinglish Dictionary                       ││
│  │  - Standard English Repository                           ││
│  └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐│
│  │              State Management (React Hooks)               ││
│  │  - Current Input State                                   ││
│  │  - Generated Results State                               ││
│  │  - History State (localStorage)                          ││
│  │  - UI State (loading, toasts, modals)                    ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

## 2. 技术栈

| 类别 | 技术选型 | 说明 |
|------|---------|------|
| 框架 | React 18 | 组件化开发，用户界面 |
| 构建工具 | Vite | 快速开发，热更新 |
| 样式 | Tailwind CSS 3 | 原子化CSS，响应式设计 |
| 状态管理 | React Hooks (useState, useReducer) | 轻量级状态管理 |
| 存储 | localStorage | 历史记录持久化 |
| 图标 | Lucide React | 现代化图标库 |

## 3. 目录结构

```
/workspace/chinglish-generator/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── InputSection.jsx
│   │   ├── ResultSection.jsx
│   │   ├── ExamplesSection.jsx
│   │   ├── HistorySection.jsx
│   │   └── Toast.jsx
│   ├── utils/
│   │   ├── translationRules.js
│   │   ├── examples.js
│   │   └── historyManager.js
│   └── hooks/
│       └── useTranslation.js
```

## 4. 组件设计

### 4.1 Header 组件
- Logo + 标题展示
- 副标题：中式英语生成器

### 4.2 InputSection 组件
| 属性 | 说明 |
|------|------|
| inputText | 当前输入文本 |
| charCount | 字符计数 |
| onGenerate | 生成回调 |
| onClear | 清空回调 |

### 4.3 ResultSection 组件
| 属性 | 说明 |
|------|------|
| chinglish | 中式英语结果 |
| standard | 标准英语结果 |
| isLoading | 加载状态 |
| onCopy | 复制回调 |

### 4.4 ExamplesSection 组件
| 属性 | 说明 |
|------|------|
| examples | 案例列表 |
| expandedId | 展开的案例ID |
| onToggle | 展开/收起回调 |

### 4.5 HistorySection 组件
| 属性 | 说明 |
|------|------|
| history | 历史记录列表 |
| onView | 查看历史回调 |
| onClear | 清空历史回调 |

### 4.6 Toast 组件
| 属性 | 说明 |
|------|------|
| message | 提示消息 |
| type | success/error/info |
| onClose | 关闭回调 |

## 5. 核心工具函数

### 5.1 translationRules.js
```javascript
// 中式英语转换规则
const RULES = {
  // 逐字直译类
  "很久很久以前": "Very long long time ago",
  "非常": "very",  // 位置错误的very
  "我认为不行": "I think not",

  // 固定搭配类
  "学习知识": "Study knowledge",
  "学习英语": "Study English",
  "吃早饭": "Eat breakfast",
  "喝茶": "Drink tea",

  // 文化差异类
  "红茶": "Red tea",  // 中式
  "白菜": "Chinese cabbage",

  // 语法中式化
  "今天是星期几": "Today is what day of the week",
  "多少钱": "How much money",
};

// 标准英语对照
const STANDARD_TRANSLATIONS = {
  "Very long long time ago": "Once upon a time",
  "Study knowledge": "Acquire/Gain knowledge",
  "Red tea": "Black tea",
  // ... 更多对照
};
```

### 5.2 转换算法
1. 预处理：分句、标点处理
2. 匹配：逐条匹配转换规则
3. 回退：未匹配时使用基础直译
4. 组装：合并结果，添加标点

## 6. 数据模型

### 6.1 历史记录结构
```typescript
interface HistoryItem {
  id: string;           // UUID
  chinese: string;       // 中文原文
  chinglish: string;     // 中式英语
  standard: string;      // 标准英语
  timestamp: number;     // 时间戳
}
```

### 6.2 案例结构
```typescript
interface Example {
  id: string;
  title: string;
  scene: string;
  chinese: string;
  chinglish: string;
  standard: string;
  explanation: string;
}
```

## 7. 状态管理

### 7.1 全局状态
```javascript
const [state, setState] = useState({
  inputText: "",
  chinglish: "",
  standard: "",
  isLoading: false,
  showCompare: false,
  history: [],
  toasts: [],
  expandedExample: null,
});
```

### 7.2 localStorage 结构
```javascript
{
  "chinglish_history": [
    {
      "id": "uuid",
      "chinese": "今天天气真好",
      "chinglish": "Today weather very good",
      "standard": "The weather is really nice today",
      "timestamp": 1699999999999
    }
  ]
}
```

## 8. 样式规范

### 8.1 颜色系统
```css
:root {
  --color-primary: #E74C3C;     /* 中国红 */
  --color-secondary: #2C3E50;   /* 深蓝灰 */
  --color-success: #27AE60;     /* 成功绿 */
  --color-warning: #F39C12;     /* 警告橙 */
  --color-bg: #F8F9FA;          /* 浅灰白 */
  --color-text: #2C3E50;        /* 深灰文字 */
  --color-border: #E0E0E0;      /* 边框色 */
}
```

### 8.2 间距系统
```css
--spacing-xs: 0.25rem;   /* 4px */
--spacing-sm: 0.5rem;    /* 8px */
--spacing-md: 1rem;      /* 16px */
--spacing-lg: 1.5rem;    /* 24px */
--spacing-xl: 2rem;      /* 32px */
```

### 8.3 圆角系统
```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
```

## 9. 动画规范

### 9.1 过渡动画
- 默认过渡：0.3s ease
- 快速过渡：0.15s ease
- 慢速过渡：0.5s ease

### 9.2 Toast动画
- 进入：从右滑入 + 淡入
- 停留：2秒
- 退出：向右滑出 + 淡出

### 9.3 按钮动画
- Hover：scale(1.05), 阴影增强
- Active：scale(0.95)
- Loading：脉冲动画

## 10. 响应式断点

| 断点 | 宽度 | 布局 |
|------|------|------|
| sm | < 640px | 单列，全宽 |
| md | 640-768px | 单列，固定宽度 |
| lg | 768-1024px | 双列，窄边栏 |
| xl | > 1024px | 双列，宽边栏 |

---

*文档版本: 1.0*
*最后更新: 2024年*
