import React, { useState } from 'react';
import { CheckCircle, XCircle, ChevronRight, BookPlus, Volume2, Headphones } from 'lucide-react';
import AudioPlayer from '../common/AudioPlayer';
import { ttsService } from '../../services/ttsService';

export default function Part2View({ questions, onRecordAttempt, onWordClick }) {
  const part2Questions = questions.filter(q => q.part === 2);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQ = part2Questions[currentIndex];

  if (!currentQ) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center text-slate-500">
        Part 2 문제가 없습니다.
      </div>
    );
  }

  const fullAudioScript = `${currentQ.audioScript.question}. (A) ${currentQ.choices[0].text}. (B) ${currentQ.choices[1].text}. (C) ${currentQ.choices[2].text}.`;

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
      part: 2,
      selected: selectedAnswer,
      isCorrect,
      timeTaken: 20,
      category: 'business_collocation',
      questionSnapshot: currentQ
    });
  };

  const handleNext = () => {
    if (currentIndex < part2Questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
    setSelectedAnswer(null);
    setIsSubmitted(false);
  };

  const isCorrect = selectedAnswer === currentQ.answer;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-xl text-xs font-bold bg-emerald-600 text-white">
            Part 2
          </span>
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            질의응답 (Question-Response)
          </span>
          <span className="text-xs px-2.5 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-200/50 dark:border-emerald-800/50">
            문항 {currentIndex + 1} / {part2Questions.length}
          </span>
        </div>
        <span className="text-xs text-slate-400">
          질문과 3개 응답(A, B, C)을 듣고 가장 자연스러운 답변을 고르세요
        </span>
      </div>

      {/* Audio Controller */}
      <AudioPlayer
        text={fullAudioScript}
        label={`Part 2 문항 ${currentIndex + 1} 음성 듣기`}
        transcriptText={isSubmitted ? currentQ.transcript : null}
        showScriptButton={isSubmitted}
        onWordClick={onWordClick}
      />

      {/* Main Question & Choices Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
        {/* Exam simulation notice */}
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-900/60">
          <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-300">
              실전 시험 시뮬레이션
            </h4>
            <p className="text-xs text-emerald-700 dark:text-emerald-400">
              실제 토익 시험지에는 질문과 보기가 인쇄되지 않습니다. 음성을 집중해서 듣고 답을 고르세요!
            </p>
          </div>
        </div>

        {/* Revealed Question Text (Only after submitting, or button to reveal) */}
        {isSubmitted && (
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-sm">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 block mb-1">
              [질문 원문]
            </span>
            <p className="text-base font-bold text-slate-900 dark:text-white">
              {currentQ.questionText}
            </p>
          </div>
        )}

        {/* 3 Choices (A, B, C) */}
        <div className="space-y-3">
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
                  <span className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold text-sm">
                    {choice.label}
                  </span>
                  <span className="font-medium">{choice.text}</span>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    ttsService.speak({ text: choice.text, rate: 0.95 });
                  }}
                  className="p-2 text-slate-400 hover:text-emerald-600 rounded-lg transition"
                  title="이 보기만 다시 듣기"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </button>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          {!isSubmitted ? (
            <button
              disabled={selectedAnswer === null}
              onClick={handleSubmit}
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold text-sm shadow-md shadow-emerald-600/25 transition active:scale-98"
            >
              정답 확인 (제출)
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md shadow-emerald-600/25 transition flex items-center gap-1.5"
            >
              다음 문제
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Explanation Box */}
      {isSubmitted && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4 animate-fadeIn">
          <div className="flex items-center gap-3">
            {isCorrect ? (
              <CheckCircle className="w-6 h-6 text-emerald-500" />
            ) : (
              <XCircle className="w-6 h-6 text-rose-500" />
            )}
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              {isCorrect ? '정답입니다! 👏' : '오답입니다. 출제 함정을 확인하세요.'}
            </h4>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
              [출제 포인트 및 함정 해설]
            </span>
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
  );
}
