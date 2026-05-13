import { Languages, Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="relative overflow-hidden bg-gradient-to-r from-[#E74C3C] via-[#C0392B] to-[#E74C3C] text-white">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white animate-pulse"></div>
        <div className="absolute bottom-5 right-20 w-24 h-24 rounded-full bg-white animate-pulse delay-300"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-white animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="p-2 sm:p-3 bg-white/20 rounded-xl backdrop-blur-sm">
            <Languages className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
              ChingLish Generator
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 opacity-80" />
              <p className="text-xs sm:text-sm opacity-90 font-medium">
                中式英语生成器 · 趣味学习新体验
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
    </header>
  );
}
