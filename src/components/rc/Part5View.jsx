import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Sparkles, 
  ChevronRight, 
  RotateCcw, 
  BookPlus, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import ClickableText from '../common/ClickableText';
import { ttsService } from '../../services/ttsService';

export default function Part5View({ 
  questions, 
  onRecordAttempt, 
  onWordClick, 
  onLaunchAIGen 
}) {
  const part5Questions = questions.filter(q => q.part === 5);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(true);

  const currentQ = part5Questions[currentIndex];

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isTimerActive && !isSubmitted) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, isSubmitted]);

  // Reset state when changing questions
  const loadQuestion = (index) => {
    setCurrentIndex(index);
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setTimerSeconds(0);
    setIsTimerActive(true);
  };

  if (!currentQ) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center">
        <p className="text-slate-500">Part 5 문제가 없습니다.</p>
      </div>
    );
  }

  const handleSubmit = () => {
    if (selectedAnswer === null || isSubmitted) return;

    setIsSubmitted(true);
    setIsTimerActive(false);

    const isCorrect = selectedAnswer === currentQ.answer;

    if (isCorrect) {
      ttsService.playChime('correct');
    } else {
      ttsService.playChime('wrong');
    }

    onRecordAttempt({
      questionId: currentQ.id,
      part: 5,
      selected: selectedAnswer,
      isCorrect,
      timeTaken: timerSeconds,
      category: currentQ.category,
      questionSnapshot: currentQ
    });
  };

  const handleNext = () => {
    if (currentIndex < part5Questions.length - 1) {
      loadQuestion(currentIndex + 1);
    } else {
      loadQuestion(0);
    }
  };

  const isCorrect = selectedAnswer === currentQ.answer;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 animate-fadeIn">
      {/* Top Header Card */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-xl text-xs font-bold bg-indigo-600 text-white">
            Part 5
          </span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            단문 빈칸 채우기 (Incomplete Sentences)
          </span>
          <span className="text-xs px-2.5 py-0.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold border border-indigo-200/50 dark:border-indigo-800/50">
            문항 {currentIndex + 1} / {part5Questions.length}
          </span>
        </div>

        {/* Timer & Difficulty */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <Clock className="w-3.5 h-3.5 text-indigo-500" />
            <span>{timerSeconds}초</span>
            <span className="text-[10px] text-slate-400 font-normal">(권장 25초)</span>
          </div>

          <span className="text-xs px-2 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-200 dark:border-emerald-800">
            {currentQ.grammarPoint || '핵심 문법'}
          </span>
        </div>
      </div>

      {/* Question Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
        {/* Helper guide */}
        <div className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center justify-between">
          <span>문장 내 모르는 단어를 클릭하면 바로 단어장에 추가할 수 있습니다.</span>
          <span className="font-semibold text-indigo-500">#{currentQ.category}</span>
        </div>

        {/* Question Text with Clickable words */}
        <div className="text-lg sm:text-xl font-medium text-slate-900 dark:text-white leading-relaxed tracking-tight py-2 border-y border-slate-100 dark:border-slate-800">
          <ClickableText
            text={currentQ.questionText}
            onWordClick={onWordClick}
          />
        </div>

        {/* 4 Choices */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {currentQ.choices.map((choice, idx) => {
            const isSelected = selectedAnswer === idx;
            let choiceStyle = 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-800 dark:text-slate-200';

            if (isSubmitted) {
              if (idx === currentQ.answer) {
                choiceStyle = 'bg-emerald-500 text-white border-emerald-500 font-bold shadow-md shadow-emerald-500/20';
              } else if (isSelected) {
                choiceStyle = 'bg-rose-500 text-white border-rose-500 font-bold';
              } else {
                choiceStyle = 'opacity-40 border-slate-200 dark:border-slate-800 text-slate-400';
              }
            } else if (isSelected) {
              choiceStyle = 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-indigo-700 dark:text-indigo-300 font-semibold ring-2 ring-indigo-500/20';
            }

            return (
              <button
                key={idx}
                disabled={isSubmitted}
                onClick={() => setSelectedAnswer(idx)}
                className={`p-4 rounded-2xl border text-left text-sm transition-all duration-150 flex items-center gap-3 ${choiceStyle}`}
              >
                <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                  isSubmitted && idx === currentQ.answer
                    ? 'bg-white text-emerald-600'
                    : isSelected && !isSubmitted
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}>
                  {choice.label}
                </span>
                <span className="font-medium">{choice.text}</span>
              </button>
            );
          })}
        </div>

        {/* Action Button: Submit or Next */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          {!isSubmitted ? (
            <button
              disabled={selectedAnswer === null}
              onClick={handleSubmit}
              className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-bold text-sm shadow-md shadow-indigo-600/25 transition active:scale-98"
            >
              정답 확인 (제출)
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => onLaunchAIGen && onLaunchAIGen(currentQ.category)}
                className="px-4 py-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-xs font-semibold hover:bg-purple-100 transition flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                이 유형 AI 유사 문제 풀기
              </button>

              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md shadow-indigo-600/25 transition flex items-center gap-1.5"
              >
                다음 문제
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* AI Explanation Card (Visible after submit) */}
      {isSubmitted && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5 animate-fadeIn">
          {/* Result Banner */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              {isCorrect ? (
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                  <XCircle className="w-6 h-6" />
                </div>
              )}
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {isCorrect ? '정답입니다! 👏' : '오답입니다. 오답노트에 자동 저장되었습니다.'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  정답: <strong className="text-indigo-600 dark:text-indigo-400">({currentQ.choices[currentQ.answer].label}) {currentQ.choices[currentQ.answer].text}</strong> | 풀이 소요 시간: {timerSeconds}초
                </p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
              AI 심층 해설
            </span>
          </div>

          {/* Explanation Content */}
          <div className="space-y-4 text-sm leading-relaxed">
            {/* Translation */}
            {currentQ.translation && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                <span className="text-xs font-bold text-slate-400 block mb-1">
                  [전문 해석]
                </span>
                <p className="font-medium">{currentQ.translation}</p>
              </div>
            )}

            {/* Detailed Explanation */}
            <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-slate-800/40 border border-indigo-100/70 dark:border-slate-800 whitespace-pre-line text-slate-800 dark:text-slate-200">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 block mb-1">
                [정답 및 오답 상세 분석]
              </span>
              {currentQ.explanation}
            </div>

            {/* Key Vocabulary list with 1-click addition */}
            {currentQ.keyVocab && currentQ.keyVocab.length > 0 && (
              <div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-2">
                  [핵심 토익 어휘 - 클릭 시 단어장 추가]
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentQ.keyVocab.map((v, i) => (
                    <button
                      key={i}
                      onClick={() => onWordClick && onWordClick(v.word, v.meaning)}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-amber-950/40 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-200 flex items-center gap-1.5 transition group"
                    >
                      <span className="font-bold text-indigo-600 dark:text-indigo-400 group-hover:text-amber-600">
                        {v.word}
                      </span>
                      <span className="text-slate-400">: {v.meaning}</span>
                      <BookPlus className="w-3 h-3 text-slate-300 group-hover:text-amber-600" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
