import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  Clock, 
  CheckCircle, 
  XCircle, 
  ChevronRight, 
  BookPlus, 
  Wand2, 
  HelpCircle,
  Zap
} from 'lucide-react';
import { AIService } from '../../services/aiService';
import { GRAMMAR_CATEGORIES, DIFFICULTY_LEVELS } from '../../types/toeic';
import ClickableText from '../common/ClickableText';
import { ttsService } from '../../services/ttsService';

export default function AIGeneratorView({ onSaveCustomQuestion, onRecordAttempt, onWordClick }) {
  const [selectedCategory, setSelectedCategory] = useState('conjunction_preposition');
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium');
  const [targetPart, setTargetPart] = useState(5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuestion, setGeneratedQuestion] = useState(null);

  // Question solving state
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGeneratedQuestion(null);
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setTimerSeconds(0);

    try {
      const newQ = await AIService.generateQuestion({
        part: targetPart,
        category: selectedCategory,
        difficulty: selectedDifficulty
      });
      setGeneratedQuestion(newQ);
      if (onSaveCustomQuestion) onSaveCustomQuestion(newQ);
    } catch (e) {
      console.error('Generation failed:', e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || isSubmitted || !generatedQuestion) return;

    setIsSubmitted(true);
    const isCorrect = selectedAnswer === generatedQuestion.answer;

    if (isCorrect) {
      ttsService.playChime('correct');
    } else {
      ttsService.playChime('wrong');
    }

    onRecordAttempt({
      questionId: generatedQuestion.id,
      part: generatedQuestion.part,
      selected: selectedAnswer,
      isCorrect,
      timeTaken: timerSeconds,
      category: generatedQuestion.category,
      questionSnapshot: generatedQuestion
    });
  };

  const isCorrect = generatedQuestion && selectedAnswer === generatedQuestion.answer;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white shadow-xl border border-purple-700/50">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/30 text-purple-200 border border-purple-400/30 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-purple-300" />
            AI 맞춤형 출제 엔진
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
          취약점 기반 실시간 AI 문제 생성기
        </h1>
        <p className="text-sm text-purple-200 mt-1 max-w-2xl leading-relaxed">
          자신이 자주 헷갈리는 문법 포인트와 난이도를 선택하면, LLM AI가 실제 비즈니스 컨텍스트의 최신 토익 실전 문제를 즉석에서 출제해 드립니다.
        </p>
      </div>

      {/* Generator Control Panel */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
        <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Wand2 className="w-4 h-4 text-purple-500" />
          출제 조건 맞춤 설정
        </h2>

        {/* 1. Target Part */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
            1. 출제 파트 선택
          </label>
          <div className="flex gap-2">
            {[
              { id: 5, label: 'Part 5 (단문 빈칸)' },
              { id: 6, label: 'Part 6 (장문 빈칸)' }
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setTargetPart(p.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  targetPart === p.id
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Grammar Categories Grid */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
            2. 집중 훈련할 문법 / 어휘 포인트 선택
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {GRAMMAR_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-3 rounded-2xl border text-left text-xs transition flex items-center gap-2.5 ${
                  selectedCategory === cat.id
                    ? 'bg-purple-50 dark:bg-purple-950/60 border-purple-500 text-purple-800 dark:text-purple-200 font-bold ring-2 ring-purple-500/20 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${selectedCategory === cat.id ? 'bg-purple-600' : 'bg-slate-300 dark:bg-slate-700'}`} />
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3. Difficulty Level */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
            3. 난이도 (목표 점수대)
          </label>
          <div className="flex flex-wrap gap-2.5">
            {DIFFICULTY_LEVELS.map((diff) => (
              <button
                key={diff.id}
                onClick={() => setSelectedDifficulty(diff.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                  selectedDifficulty === diff.id
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                {diff.label}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-bold text-sm shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer disabled:opacity-50"
          >
            <Sparkles className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
            {isGenerating ? 'AI가 토익 출제 가이드라인에 맞추어 문제 생성 중...' : '맞춤 문제 지금 즉시 생성하기'}
          </button>
        </div>
      </div>

      {/* Generated Problem Card */}
      {generatedQuestion && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-purple-200 dark:border-purple-900/60 shadow-xl space-y-6 animate-fadeIn">
          {/* Tag & Source Banner */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-bold">
                Part {generatedQuestion.part}
              </span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {generatedQuestion.grammarPoint || generatedQuestion.category}
              </span>
            </div>
            <span className="text-[11px] text-purple-600 dark:text-purple-400 font-medium">
              ✨ AI 맞춤 생성 완료
            </span>
          </div>

          {/* Question Text with Clickable word lookup */}
          <div className="text-lg sm:text-xl font-medium text-slate-900 dark:text-white leading-relaxed">
            <ClickableText
              text={generatedQuestion.questionText}
              onWordClick={onWordClick}
            />
          </div>

          {/* 4 Choices */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {generatedQuestion.choices.map((choice, idx) => {
              const isSelected = selectedAnswer === idx;
              let choiceStyle = 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200';

              if (isSubmitted) {
                if (idx === generatedQuestion.answer) {
                  choiceStyle = 'bg-emerald-500 text-white border-emerald-500 font-bold';
                } else if (isSelected) {
                  choiceStyle = 'bg-rose-500 text-white border-rose-500 font-bold';
                } else {
                  choiceStyle = 'opacity-40 border-slate-200 dark:border-slate-800';
                }
              } else if (isSelected) {
                choiceStyle = 'bg-purple-50 dark:bg-purple-950/60 border-purple-500 text-purple-700 dark:text-purple-300 font-semibold ring-2 ring-purple-500/20';
              }

              return (
                <button
                  key={idx}
                  disabled={isSubmitted}
                  onClick={() => setSelectedAnswer(idx)}
                  className={`p-4 rounded-2xl border text-left text-sm transition-all flex items-center gap-3 ${choiceStyle}`}
                >
                  <span className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center text-xs font-bold shrink-0">
                    {choice.label}
                  </span>
                  <span className="font-medium">{choice.text}</span>
                </button>
              );
            })}
          </div>

          {/* Submit Action */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            {!isSubmitted ? (
              <button
                disabled={selectedAnswer === null}
                onClick={handleSubmitAnswer}
                className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white font-bold text-sm shadow-md shadow-purple-600/25 transition active:scale-98"
              >
                정답 확인 (제출)
              </button>
            ) : (
              <button
                onClick={handleGenerate}
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-md shadow-purple-600/25 transition flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                또 다른 문제 생성하기
              </button>
            )}
          </div>

          {/* Explanation Box */}
          {isSubmitted && (
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-4 animate-fadeIn">
              <div className="flex items-center gap-2">
                {isCorrect ? (
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-500" />
                )}
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  {isCorrect ? '정답입니다! 완벽히 이해하셨네요 👏' : '오답입니다. AI 해설을 확인해보세요.'}
                </h4>
              </div>

              {generatedQuestion.translation && (
                <div className="text-xs text-slate-600 dark:text-slate-300 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="font-bold block mb-0.5 text-slate-400">[전문 해석]</span>
                  {generatedQuestion.translation}
                </div>
              )}

              <div className="text-xs leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-purple-600 dark:text-purple-400 block mb-1">[AI 상세 해설]</span>
                {generatedQuestion.explanation}
              </div>

              {generatedQuestion.keyVocab && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {generatedQuestion.keyVocab.map((v, i) => (
                    <button
                      key={i}
                      onClick={() => onWordClick && onWordClick(v.word, v.meaning)}
                      className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 text-xs text-slate-700 dark:text-slate-200 hover:text-purple-600 border border-slate-200 dark:border-slate-700 flex items-center gap-1"
                    >
                      <span className="font-bold">{v.word}</span>: {v.meaning}
                      <BookPlus className="w-3 h-3 text-slate-400" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
