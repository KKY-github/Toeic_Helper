import React, { useState } from 'react';
import { CheckCircle, XCircle, ChevronRight, BookPlus, Volume2 } from 'lucide-react';
import AudioPlayer from '../common/AudioPlayer';
import { ttsService } from '../../services/ttsService';

export default function Part1View({ questions, onRecordAttempt, onWordClick }) {
  const part1Questions = questions.filter(q => q.part === 1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQ = part1Questions[currentIndex];

  if (!currentQ) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center text-slate-500">
        Part 1 문제가 없습니다.
      </div>
    );
  }

  // Combine full audio text for playback
  const fullAudioScript = `${currentQ.audioScript.question}. (A) ${currentQ.choices[0].text}. (B) ${currentQ.choices[1].text}. (C) ${currentQ.choices[2].text}. (D) ${currentQ.choices[3].text}.`;

  const handleSubmit = () => {
    if (selectedAnswer === null || isSubmitted) return;
    setIsSubmitted(true);

    const isCorrect = selectedAnswer === currentQ.answer;
    if (isCorrect) {
      ttsService.playChime('correct');
    } else {
      ttsService.playChime('wrong');
    }

    onRecordAttempt({
      questionId: currentQ.id,
      part: 1,
      selected: selectedAnswer,
      isCorrect,
      timeTaken: 30,
      category: 'business_collocation',
      questionSnapshot: currentQ
    });
  };

  const handleNext = () => {
    if (currentIndex < part1Questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
    setSelectedAnswer(null);
    setIsSubmitted(false);
  };

  const isCorrect = selectedAnswer === currentQ.answer;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-xl text-xs font-bold bg-emerald-600 text-white">
            Part 1
          </span>
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            사진 묘사 (Photographs)
          </span>
          <span className="text-xs px-2.5 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-200/50 dark:border-emerald-800/50">
            문항 {currentIndex + 1} / {part1Questions.length}
          </span>
        </div>
        <span className="text-xs text-slate-400">
          사진을 보고 가장 적절한 묘사를 고르세요
        </span>
      </div>

      {/* Main Grid: Photo Visual Scene + Audio & Choices */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left: Realistic Scene Visual Representation (6 cols) */}
        <div className="md:col-span-6 space-y-3">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-850 border border-slate-200 dark:border-slate-700 shadow-md aspect-4/3 flex flex-col justify-between p-6">
            {/* SVG Visual Scene Art */}
            <div className="absolute inset-0 flex items-center justify-center opacity-90">
              {currentQ.imageType === 'presentation' ? (
                <svg className="w-full h-full p-4" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Background Room */}
                  <rect width="400" height="300" fill="#e2e8f0" className="dark:fill-slate-800" />
                  <rect x="0" y="240" width="400" height="60" fill="#cbd5e1" className="dark:fill-slate-900" />
                  {/* Whiteboard with Charts */}
                  <rect x="60" y="40" width="200" height="130" rx="8" fill="#ffffff" stroke="#94a3b8" strokeWidth="4" />
                  <line x1="80" y1="140" x2="240" y2="140" stroke="#cbd5e1" strokeWidth="2" />
                  <rect x="90" y="90" width="20" height="40" fill="#6366f1" rx="2" />
                  <rect x="120" y="70" width="20" height="60" fill="#8b5cf6" rx="2" />
                  <rect x="150" y="100" width="20" height="30" fill="#a855f7" rx="2" />
                  <rect x="180" y="55" width="20" height="75" fill="#4f46e5" rx="2" />
                  <path d="M 95 85 L 125 65 L 155 95 L 195 50" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
                  {/* Presenter Person */}
                  <circle cx="285" cy="90" r="18" fill="#f59e0b" />
                  <path d="M 285 110 C 265 115, 260 170, 260 210 L 310 210 C 310 170, 305 115, 285 110 Z" fill="#3b82f6" />
                  {/* Pointing Arm towards board */}
                  <path d="M 268 125 L 210 100" stroke="#3b82f6" strokeWidth="8" strokeLinecap="round" />
                  {/* Attendees */}
                  <circle cx="100" cy="220" r="16" fill="#64748b" />
                  <path d="M 80 240 Q 100 230 120 240 L 120 280 L 80 280 Z" fill="#475569" />
                  <circle cx="170" cy="220" r="16" fill="#64748b" />
                  <path d="M 150 240 Q 170 230 190 240 L 190 280 L 150 280 Z" fill="#475569" />
                </svg>
              ) : (
                <svg className="w-full h-full p-4" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Warehouse Scene */}
                  <rect width="400" height="300" fill="#e2e8f0" className="dark:fill-slate-800" />
                  <rect x="0" y="240" width="400" height="60" fill="#94a3b8" className="dark:fill-slate-900" />
                  {/* Pallet with Boxes */}
                  <rect x="70" y="215" width="160" height="15" fill="#b45309" rx="2" />
                  <rect x="80" y="230" width="20" height="10" fill="#78350f" />
                  <rect x="140" y="230" width="20" height="10" fill="#78350f" />
                  <rect x="200" y="230" width="20" height="10" fill="#78350f" />
                  {/* Stacked Cardboard Boxes */}
                  <rect x="75" y="160" width="70" height="55" fill="#d97706" stroke="#b45309" strokeWidth="2" rx="3" />
                  <rect x="150" y="160" width="75" height="55" fill="#d97706" stroke="#b45309" strokeWidth="2" rx="3" />
                  <rect x="110" y="105" width="80" height="55" fill="#f59e0b" stroke="#b45309" strokeWidth="2" rx="3" />
                  {/* Worker inspecting */}
                  <circle cx="290" cy="120" r="16" fill="#f59e0b" />
                  <path d="M 275 140 L 305 140 L 315 220 L 265 220 Z" fill="#f97316" />
                  <path d="M 280 140 L 300 140 L 295 190 L 285 190 Z" fill="#fbbf24" />
                </svg>
              )}
            </div>

            {/* Photo description badge */}
            <div className="relative z-10 self-start px-3 py-1.5 rounded-xl bg-slate-900/70 backdrop-blur-md text-white text-xs font-semibold">
              📷 사진 장면: {currentQ.imageDescription}
            </div>

            <div className="relative z-10 self-end text-[11px] text-slate-600 dark:text-slate-400 bg-white/80 dark:bg-slate-900/80 px-2 py-1 rounded-lg">
              실제 시험과 동일한 비즈니스 사진 묘사
            </div>
          </div>

          {/* Audio Player Controller */}
          <AudioPlayer
            text={fullAudioScript}
            label={`문항 ${currentIndex + 1} 전체 음성 듣기`}
            transcriptText={isSubmitted ? currentQ.transcript : null}
            showScriptButton={isSubmitted}
            onWordClick={onWordClick}
          />
        </div>

        {/* Right: 4 Statement Choices & Explanation (6 cols) */}
        <div className="md:col-span-6 space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
              보기를 듣고 알맞은 보기를 선택하세요.
            </h3>

            <div className="space-y-2.5">
              {currentQ.choices.map((choice, idx) => {
                const isSelected = selectedAnswer === idx;
                let btnStyle = 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80';

                if (isSubmitted) {
                  if (idx === currentQ.answer) {
                    btnStyle = 'bg-emerald-500 text-white border-emerald-500 font-bold';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-500 text-white border-rose-500 font-bold';
                  } else {
                    btnStyle = 'opacity-40 border-slate-200 dark:border-slate-800';
                  }
                } else if (isSelected) {
                  btnStyle = 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-semibold ring-2 ring-emerald-500/20';
                }

                return (
                  <button
                    key={idx}
                    disabled={isSubmitted}
                    onClick={() => setSelectedAnswer(idx)}
                    className={`w-full p-4 rounded-2xl border text-left text-sm transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold text-xs">
                        {choice.label}
                      </span>
                      <span>{choice.text}</span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        ttsService.speak({ text: choice.text, rate: 0.95 });
                      }}
                      className="p-1.5 text-slate-400 hover:text-emerald-600 rounded-lg transition"
                      title="이 보기만 다시 듣기"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </button>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
              {!isSubmitted ? (
                <button
                  disabled={selectedAnswer === null}
                  onClick={handleSubmit}
                  className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold text-sm shadow-md shadow-emerald-600/25 transition active:scale-98"
                >
                  정답 확인
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md shadow-emerald-600/25 transition flex items-center gap-1.5"
                >
                  다음 사진 문제
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Explanation Box */}
          {isSubmitted && (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4 animate-fadeIn">
              <div className="flex items-center gap-2">
                {isCorrect ? (
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-500" />
                )}
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  {isCorrect ? '정답입니다!' : '오답입니다. 스크립트와 해설을 확인하세요.'}
                </h4>
              </div>

              <div className="text-xs leading-relaxed text-slate-700 dark:text-slate-300 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">[해설]</span>
                {currentQ.explanation}
              </div>

              {currentQ.keyVocab && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {currentQ.keyVocab.map((v, i) => (
                    <button
                      key={i}
                      onClick={() => onWordClick && onWordClick(v.word, v.meaning)}
                      className="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300 hover:text-emerald-600 border border-slate-200 dark:border-slate-700 flex items-center gap-1"
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
      </div>
    </div>
  );
}
