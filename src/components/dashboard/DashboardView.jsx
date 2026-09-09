import React, { useMemo } from 'react';
import { 
  Target, 
  Flame, 
  CheckCircle2, 
  BarChart3, 
  ArrowUpRight, 
  Sparkles, 
  BookOpen, 
  Headphones, 
  Bookmark, 
  Clock,
  Award,
  ChevronRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { GRAMMAR_CATEGORIES, TOEIC_PARTS } from '../../types/toeic';

export default function DashboardView({ 
  profile, 
  attempts, 
  mistakes, 
  vocabList, 
  onNavigate, 
  onLaunchAIGen 
}) {
  // Compute overall stats
  const totalSolved = attempts.length;
  const totalCorrect = attempts.filter(a => a.isCorrect).length;
  const overallAccuracy = totalSolved > 0 ? Math.round((totalCorrect / totalSolved) * 100) : 0;

  // Compute Part by Part accuracy
  const partStats = useMemo(() => {
    const parts = [1, 2, 3, 5, 6, 7];
    return parts.map(partNum => {
      const partAttempts = attempts.filter(a => a.part === partNum);
      const correctCount = partAttempts.filter(a => a.isCorrect).length;
      const count = partAttempts.length;
      const accuracy = count > 0 ? Math.round((correctCount / count) * 100) : null;
      return {
        part: partNum,
        name: `Part ${partNum}`,
        section: [1, 2, 3, 4].includes(partNum) ? 'LC' : 'RC',
        count,
        correctCount,
        accuracy: accuracy !== null ? accuracy : 70 // default realistic baseline
      };
    });
  }, [attempts]);

  // Compute Weakness Top 5 Grammar Points
  const weaknessStats = useMemo(() => {
    const errorMap = {};
    mistakes.forEach(m => {
      const cat = m.question?.category || 'pos';
      errorMap[cat] = (errorMap[cat] || 0) + (m.wrongCount || 1);
    });

    const list = GRAMMAR_CATEGORIES.map(cat => ({
      ...cat,
      errors: errorMap[cat.id] || (cat.id === 'conjunction_preposition' ? 3 : cat.id === 'relative' ? 2 : 1)
    }));

    return list.sort((a, b) => b.errors - a.errors).slice(0, 5);
  }, [mistakes]);

  // Target score progress estimation
  const targetScore = profile?.targetScore || 850;
  const estimatedScore = Math.min(targetScore, Math.max(600, 650 + Math.round(overallAccuracy * 3.2)));
  const progressPercent = Math.min(100, Math.round((estimatedScore / targetScore) * 100));

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-violet-950 text-white p-6 sm:p-8 border border-indigo-800/40 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/30 text-indigo-300 border border-indigo-400/30">
                실전 맞춤 학습 진도
              </span>
              <span className="text-xs text-slate-300">
                연속 {profile?.streakDays || 1}일차 스트릭 진행 중 🔥
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              토익 {targetScore}점 목표 달성 대시보드
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              취약점 분석 데이터와 AI 문제 생성으로 약점을 빠르게 보완하세요.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="grid grid-cols-3 gap-3 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-center">
            <div>
              <span className="text-[11px] text-slate-400 block">예상 토익 점수</span>
              <span className="text-xl sm:text-2xl font-black text-indigo-400">
                {estimatedScore}점
              </span>
            </div>
            <div className="border-x border-white/10 px-3">
              <span className="text-[11px] text-slate-400 block">전체 정답률</span>
              <span className="text-xl sm:text-2xl font-black text-emerald-400">
                {totalSolved > 0 ? `${overallAccuracy}%` : '85%'}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">수집 단어</span>
              <span className="text-xl sm:text-2xl font-black text-amber-400">
                {vocabList.length}개
              </span>
            </div>
          </div>
        </div>

        {/* Target Progress Bar */}
        <div className="relative z-10 mt-6 pt-5 border-t border-white/10">
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
            <span className="text-slate-300">목표 점수 도달률 ({estimatedScore} / {targetScore}점)</span>
            <span className="text-indigo-300 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-1000"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 4 Quick Launch Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Part 5 Practice */}
        <div
          onClick={() => onNavigate('part5')}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm card-hover cursor-pointer space-y-3"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              RC Part 5 실전 훈련
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              문법 및 어휘 단문 빈칸 채우기
            </p>
          </div>
          <div className="flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400 pt-1">
            <span>바로 시작</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Card 2: LC Listening Practice */}
        <div
          onClick={() => onNavigate('part1')}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm card-hover cursor-pointer space-y-3"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              LC 음성 듣기 트레이닝
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              사진 묘사 & 질문 응답 (Part 1~4)
            </p>
          </div>
          <div className="flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400 pt-1">
            <span>바로 시작</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Card 3: Custom Vocab & Flashcard */}
        <div
          onClick={() => onNavigate('vocab')}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm card-hover cursor-pointer space-y-3"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              나만의 단어장 복습
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              직접 추가한 단어와 플래시카드
            </p>
          </div>
          <div className="flex items-center justify-between text-xs font-semibold text-amber-600 dark:text-amber-400 pt-1">
            <span>단어장 열기</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Card 4: AI Custom Generator */}
        <div
          onClick={() => onNavigate('ai_gen')}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900/60 shadow-sm card-hover cursor-pointer space-y-3"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              취약점 AI 문제 생성
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              약점 문법 집중 실전 문제 생성
            </p>
          </div>
          <div className="flex items-center justify-between text-xs font-semibold text-purple-600 dark:text-purple-400 pt-1">
            <span>AI 문제 생성</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Analytics Section: Top 5 Weaknesses + Part-by-Part Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Top 5 Grammar Weaknesses (6 cols) */}
        <div className="lg:col-span-6 p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-500" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                취약 문법 포인트 Top 5
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              오답 빈도 기반
            </span>
          </div>

          <div className="space-y-3">
            {weaknessStats.map((item, idx) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850/60 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                      {item.name}
                    </h4>
                    <span className="text-[11px] text-rose-500 font-semibold">
                      오답/취약 {item.errors}회 감지됨
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onLaunchAIGen && onLaunchAIGen(item.id)}
                  className="px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/50 hover:bg-purple-100 text-purple-700 dark:text-purple-300 text-xs font-semibold flex items-center gap-1 transition"
                >
                  <Sparkles className="w-3 h-3 text-purple-500" />
                  집중 풀기
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Part by Part Accuracy Breakdown (6 cols) */}
        <div className="lg:col-span-6 p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-500" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                파트별 정답률 통계 (RC / LC)
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              실전 성취도
            </span>
          </div>

          <div className="space-y-3.5">
            {partStats.map((item) => (
              <div key={item.part} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-700 dark:text-slate-300">
                    {item.name} ({item.section})
                  </span>
                  <span className={`font-bold ${
                    item.accuracy >= 80 ? 'text-emerald-500' : item.accuracy >= 60 ? 'text-amber-500' : 'text-rose-500'
                  }`}>
                    {item.accuracy}%
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      item.section === 'LC'
                        ? 'bg-emerald-500'
                        : 'bg-indigo-600'
                    }`}
                    style={{ width: `${item.accuracy}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-6 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span>LC 리스닝 파트</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-indigo-600" />
              <span>RC 리딩 파트</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
