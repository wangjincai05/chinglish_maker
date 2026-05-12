# 中式英语生成器 (Chinglish Generator)

一款有趣的中文转中式英语工具，帮助你学习中式英语与标准英语之间的差异。

## ✨ 功能特性

- **中文转中式英语**：输入中文，一键生成地道的中式英语表达
- **标准英语对照**：同时提供标准英语翻译，对比学习
- **案例库**：内置丰富的中式英语案例，包含场景说明和解释
- **历史记录**：自动保存转换历史，支持本地持久化
- **响应式设计**：完美适配移动端和桌面端

## 🛠️ 技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| 框架 | React | 18.3.x |
| 构建工具 | Vite | 6.3.x |
| 样式 | Tailwind CSS | 3.4.x |
| 状态管理 | Zustand | 5.0.x |
| 路由 | React Router | 7.3.x |
| 图标 | Lucide React | 0.511.x |
| 语言 | TypeScript | 5.8.x |

## 📦 快速开始

### 安装依赖

```bash
cd chinglish-generator
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

### 代码检查

```bash
npm run lint
npm run check
```

## 📁 项目结构

```
chinglish-generator/
├── public/           # 静态资源
├── src/
│   ├── components/   # UI 组件
│   │   ├── Header.tsx          # 页头组件
│   │   ├── InputSection.tsx    # 输入区域
│   │   ├── ResultSection.tsx   # 结果展示
│   │   ├── ExamplesSection.tsx # 案例展示
│   │   ├── HistorySection.tsx  # 历史记录
│   │   ├── BottomNav.tsx       # 底部导航
│   │   ├── Empty.tsx           # 空状态
│   │   └── Toast.tsx           # 提示组件
│   ├── pages/        # 页面组件
│   │   ├── Home.tsx           # 首页
│   │   ├── TranslatePage.tsx  # 翻译页面
│   │   ├── ExamplesPage.tsx   # 案例页面
│   │   └── HistoryPage.tsx    # 历史页面
│   ├── utils/        # 工具函数
│   │   ├── translationRules.ts  # 翻译规则
│   │   ├── examples.ts          # 案例数据
│   │   └── historyManager.ts    # 历史管理
│   ├── store/        # 状态管理
│   │   └── useAppStore.ts       # 全局状态
│   ├── hooks/        # 自定义 Hooks
│   │   └── useTheme.ts          # 主题 Hook
│   ├── lib/          # 通用库
│   │   └── utils.ts             # 工具函数
│   ├── App.tsx       # 根组件
│   ├── main.tsx      # 入口文件
│   └── index.css     # 全局样式
└── package.json
```

## 🚀 使用说明

1. **输入中文文本**：在输入框中输入想要转换的中文句子
2. **点击生成**：点击"生成中式英语"按钮
3. **查看结果**：页面会显示中式英语和标准英语两种翻译结果
4. **复制结果**：点击复制按钮快速复制结果到剪贴板
5. **浏览案例**：查看预设的中式英语案例，学习常见错误表达
6. **查看历史**：访问历史页面查看之前的转换记录

## 📝 示例

| 中文 | 中式英语 | 标准英语 |
|------|---------|----------|
| 很久很久以前 | Very long long time ago | Once upon a time |
| 学习知识 | Study knowledge | Acquire knowledge |
| 红茶 | Red tea | Black tea |
| 吃早饭 | Eat breakfast | Have breakfast |

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！