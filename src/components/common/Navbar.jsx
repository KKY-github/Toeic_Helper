import React from 'react';
import { 
  Sparkles, 
  Flame, 
  Plus, 
  Settings, 
  Moon, 
  Sun, 
  BookOpen, 
  Bookmark, 
  BarChart3, 
  Headphones, 
  FileCheck2,
  ChevronDown
} from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  stats,
  isDarkMode,
  setIsDarkMode,
  onOpenWordModal,
  onOpenSettings,
  vocabCount = 0,
  mistakeCount = 0,
}) {
  return (
    <header className="sticky top-0 z-40 w-full glass-nav transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Main Title */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
              <span className="font-extrabold text-base tracking-tighter">990</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
                  TOEIC AI
                </span>
                <span className="text-xs px-1.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-200/50 dark:border-indigo-800/50">
                  Master
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                목표 점수 달성 AI 학습 도우미
              </p>
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                activeTab === 'dashboard'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              대시보드
            </button>

            {/* RC Dropdown or Group */}
            <div className="relative group">
              <button
                className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition ${
                  ['part5', 'part6', 'part7'].includes(activeTab)
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <BookOpen className="w-4 h-4 text-indigo-500" />
                RC 모듈
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>
              <div className="absolute left-0 mt-1 w-44 p-1.5 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 hidden group-hover:block transition-all animate-fadeIn">
                <button
                  onClick={() => setActiveTab('part5')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition ${
                    activeTab === 'part5' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  Part 5 (단문 빈칸)
                </button>
                <button
                  onClick={() => setActiveTab('part6')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition ${
                    activeTab === 'part6' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  Part 6 (장문 빈칸)
                </button>
                <button
                  onClick={() => setActiveTab('part7')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition ${
                    activeTab === 'part7' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  Part 7 (실전 독해)
                </button>
              </div>
            </div>

            {/* LC Dropdown or Group */}
            <div className="relative group">
              <button
                className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition ${
                  ['part1', 'part2', 'part34'].includes(activeTab)
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Headphones className="w-4 h-4 text-emerald-500" />
                LC 모듈
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>
              <div className="absolute left-0 mt-1 w-44 p-1.5 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 hidden group-hover:block transition-all animate-fadeIn">
                <button
                  onClick={() => setActiveTab('part1')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition ${
                    activeTab === 'part1' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  Part 1 (사진 묘사)
                </button>
                <button
                  onClick={() => setActiveTab('part2')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition ${
                    activeTab === 'part2' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  Part 2 (질의 응답)
                </button>
                <button
                  onClick={() => setActiveTab('part34')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition ${
                    activeTab === 'part34' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  Part 3/4 (대화 & 담화)
                </button>
              </div>
            </div>

            {/* Vocab Tab */}
            <button
              onClick={() => setActiveTab('vocab')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                activeTab === 'vocab'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              단어장
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                activeTab === 'vocab' ? 'bg-white/25 text-white' : 'bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-300'
              }`}>
                {vocabCount}
              </span>
            </button>

            {/* Mistakes Tab */}
            <button
              onClick={() => setActiveTab('mistakes')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                activeTab === 'mistakes'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Bookmark className="w-4 h-4 text-rose-500" />
              오답노트
              {mistakeCount > 0 && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  activeTab === 'mistakes' ? 'bg-white/25 text-white' : 'bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400'
                }`}>
                  {mistakeCount}
                </span>
              )}
            </button>

            {/* AI Custom Problem Gen Tab */}
            <button
              onClick={() => setActiveTab('ai_gen')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                activeTab === 'ai_gen'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm'
                  : 'text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40'
              }`}
            >
              <Sparkles className="w-4 h-4 text-purple-500 animate-pulse" />
              AI 맞춤 문제
            </button>
          </nav>

          {/* Right Header Stats & Actions */}
          <div className="flex items-center gap-2.5">
            {/* Streak Counter */}
            <div 
              title={`현재 ${stats?.streakDays || 1}일 연속 학습 중!`}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900 text-xs font-bold"
            >
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-bounce" />
              <span>{stats?.streakDays || 1}일</span>
            </div>

            {/* Daily Goal Badge */}
            <div 
              title={`오늘 목표: ${stats?.todayCount || 0} / ${stats?.dailyTarget || 20} 문제 풀이`}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold"
            >
              <FileCheck2 className="w-3.5 h-3.5 text-indigo-500" />
              <span>{stats?.todayCount || 0}/{stats?.dailyTarget || 20}</span>
            </div>

            {/* Quick Word Add Button (Requested Key Feature) */}
            <button
              onClick={onOpenWordModal}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
              title="나만의 새 단어 직접 추가"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">단어 추가</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title={isDarkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Settings Button */}
            <button
              onClick={onOpenSettings}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="설정 (목표 점수, AI 키 설정)"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-1 border-t border-slate-200/60 dark:border-slate-800/60 scrollbar-none">
          {[
            { id: 'dashboard', label: '대시보드' },
            { id: 'part5', label: 'Part 5' },
            { id: 'part6', label: 'Part 6' },
            { id: 'part7', label: 'Part 7' },
            { id: 'part1', label: 'Part 1' },
            { id: 'part2', label: 'Part 2' },
            { id: 'part34', label: 'Part 3/4' },
            { id: 'vocab', label: `단어장 (${vocabCount})` },
            { id: 'mistakes', label: `오답 (${mistakeCount})` },
            { id: 'ai_gen', label: 'AI 생성' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                activeTab === item.id
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
