import React, { useState } from 'react';
import { CheckCircle, XCircle, ChevronRight, BookPlus, Sparkles } from 'lucide-react';
import ClickableText from '../common/ClickableText';
import { ttsService } from '../../services/ttsService';

export default function Part6View({ questions, onRecordAttempt, onWordClick }) {
  const part6Questions = questions.filter(q => q.part === 6);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { 131: 0, 132: 2, ... }
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeBlankId, setActiveBlankId] = useState(131);

  const currentSet = part6Questions[currentSetIndex];

  if (!currentSet) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center">
        <p className="text-slate-500">Part 6 문제가 없습니다.</p>
      </div>
    );
  }

  const handleSelect = (blankId, choiceIdx) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [blankId]: choiceIdx }));
  };

  const handleSubmit = () => {
    if (isSubmitted) return;
    setIsSubmitted(true);

    let allCorrect = true;
    currentSet.blanks.forEach(b => {
      const isCorrect = selectedAnswers[b.blankId] === b.answer;
      if (!isCorrect) allCorrect = false;

      onRecordAttempt({
        questionId: `${currentSet.id}-${b.blankId}`,
        part: 6,
        selected: selectedAnswers[b.blankId],
        isCorrect,
        timeTaken: 45,
        category: 'business_collocation',
        questionSnapshot: {
          id: `${currentSet.id}-${b.blankId}`,
          part: 6,
          questionText: `${currentSet.title} [Blank ${b.blankId}]`,
          choices: b.choices,
          answer: b.answer,
          explanation: b.explanation,
          category: 'business_collocation'
        }
      });
    });

    if (allCorrect) {
      ttsService.playChime('correct');
    } else {
      ttsService.playChime('wrong');
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setActiveBlankId(131);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-xl text-xs font-bold bg-indigo-600 text-white">
            Part 6
          </span>
          <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
            {currentSet.title}
          </span>
        </div>
        <span className="text-xs text-slate-400">
          단어 클릭 시 단어장 추가 가능
        </span>
      </div>

      {/* Main Grid: Passage on Left, Questions on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Passage (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Passage Document
          </h2>
          <div className="text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-line font-normal">
            <ClickableText text={currentSet.passageText} onWordClick={onWordClick} />
          </div>

          {currentSet.keyVocab && (
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-400 block mb-2">지문 핵심 어휘</span>
              <div className="flex flex-wrap gap-2">
                {currentSet.keyVocab.map((v, i) => (
                  <button
                    key={i}
                    onClick={() => onWordClick && onWordClick(v.word, v.meaning)}
                    className="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300 hover:text-indigo-600 border border-slate-200 dark:border-slate-700 flex items-center gap-1"
                  >
                    <span className="font-bold">{v.word}</span>: {v.meaning}
                    <BookPlus className="w-3 h-3 ml-0.5 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Blanks Question List (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {currentSet.blanks.map((b) => {
            const selected = selectedAnswers[b.blankId];
            const isCorrect = selected === b.answer;

            return (
              <div
                key={b.blankId}
                className={`p-5 rounded-2xl border transition-all duration-200 ${
                  activeBlankId === b.blankId
                    ? 'bg-white dark:bg-slate-900 border-indigo-400 dark:border-indigo-600 shadow-md ring-2 ring-indigo-500/10'
                    : 'bg-white/80 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800'
                }`}
                onClick={() => setActiveBlankId(b.blankId)}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-xs px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                    [{b.blankId}] 문항
                  </span>
                  {isSubmitted && (
                    <span className="text-xs font-semibold flex items-center gap-1">
                      {isCorrect ? (
                        <span className="text-emerald-500 flex items-center gap-0.5">
                          <CheckCircle className="w-4 h-4" /> 정답
                        </span>
                      ) : (
                        <span className="text-rose-500 flex items-center gap-0.5">
                          <XCircle className="w-4 h-4" /> 오답
                        </span>
                      )}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  {b.choices.map((choice, idx) => {
                    const isChoiceSelected = selected === idx;
                    let style = 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800';

                    if (isSubmitted) {
                      if (idx === b.answer) {
                        style = 'bg-emerald-500 text-white border-emerald-500 font-bold';
                      } else if (isChoiceSelected) {
                        style = 'bg-rose-500 text-white border-rose-500 font-bold';
                      } else {
                        style = 'opacity-40 border-slate-200 dark:border-slate-800';
                      }
                    } else if (isChoiceSelected) {
                      style = 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-indigo-600 dark:text-indigo-300 font-semibold';
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isSubmitted}
                        onClick={() => handleSelect(b.blankId, idx)}
                        className={`w-full p-2.5 rounded-xl border text-left text-xs transition flex items-center gap-2 ${style}`}
                      >
                        <span className="font-bold text-slate-400">({choice.label})</span>
                        <span>{choice.text}</span>
                      </button>
                    );
                  })}
                </div>

                {isSubmitted && (
                  <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-0.5">[해설]</span>
                    {b.explanation}
                  </div>
                )}
              </div>
            );
          })}

          {/* Bottom Action */}
          <div className="pt-2">
            {!isSubmitted ? (
              <button
                disabled={Object.keys(selectedAnswers).length < currentSet.blanks.length}
                onClick={handleSubmit}
                className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-bold text-sm shadow-md shadow-indigo-600/25 transition active:scale-98"
              >
                전체 채점하기 ({Object.keys(selectedAnswers).length}/{currentSet.blanks.length})
              </button>
            ) : (
              <button
                onClick={handleReset}
                className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition"
              >
                다시 풀어보기
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
