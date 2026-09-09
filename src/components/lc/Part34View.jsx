import React, { useState } from 'react';
import { CheckCircle, XCircle, BookPlus } from 'lucide-react';
import AudioPlayer from '../common/AudioPlayer';
import ClickableText from '../common/ClickableText';
import { ttsService } from '../../services/ttsService';

export default function Part34View({ questions, onRecordAttempt, onWordClick }) {
  const part3Questions = questions.filter(q => q.part === 3 || q.part === 4);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentSet = part3Questions[currentSetIndex];

  if (!currentSet) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center text-slate-500">
        Part 3/4 문제가 없습니다.
      </div>
    );
  }

  const handleSelect = (qId, choiceIdx) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: choiceIdx }));
  };

  const handleSubmit = () => {
    if (isSubmitted) return;
    setIsSubmitted(true);

    let allCorrect = true;
    currentSet.subQuestions.forEach(q => {
      const isCorrect = selectedAnswers[q.id] === q.answer;
      if (!isCorrect) allCorrect = false;

      onRecordAttempt({
        questionId: q.id,
        part: currentSet.part,
        selected: selectedAnswers[q.id],
        isCorrect,
        timeTaken: 50,
        category: 'business_collocation',
        questionSnapshot: {
          id: q.id,
          part: currentSet.part,
          questionText: `${currentSet.title} - ${q.questionText}`,
          choices: q.choices,
          answer: q.answer,
          explanation: q.explanation,
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
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-xl text-xs font-bold bg-emerald-600 text-white">
            Part {currentSet.part}
          </span>
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            {currentSet.title}
          </span>
        </div>
        <span className="text-xs text-slate-400">
          대화를 듣고 3개 연계 문항의 정답을 고르세요
        </span>
      </div>

      {/* Audio Controller */}
      <AudioPlayer
        text={currentSet.audioScript.passage}
        label="대화 / 담화 전체 음성 청취"
        transcriptText={isSubmitted ? currentSet.passageText : null}
        showScriptButton={isSubmitted}
        onWordClick={onWordClick}
      />

      {/* Questions List */}
      <div className="space-y-4">
        {currentSet.subQuestions.map((q) => {
          const selected = selectedAnswers[q.id];
          const isCorrect = selected === q.answer;

          return (
            <div
              key={q.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  {q.number}. {q.questionText}
                </h3>
                {isSubmitted && (
                  <span className="shrink-0 text-xs font-bold">
                    {isCorrect ? (
                      <span className="text-emerald-500 flex items-center gap-0.5"><CheckCircle className="w-4 h-4" /> 정답</span>
                    ) : (
                      <span className="text-rose-500 flex items-center gap-0.5"><XCircle className="w-4 h-4" /> 오답</span>
                    )}
                  </span>
                )}
              </div>

              {/* Choices Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {q.choices.map((choice, idx) => {
                  const isChoiceSelected = selected === idx;
                  let style = 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800';

                  if (isSubmitted) {
                    if (idx === q.answer) {
                      style = 'bg-emerald-500 text-white border-emerald-500 font-bold';
                    } else if (isChoiceSelected) {
                      style = 'bg-rose-500 text-white border-rose-500 font-bold';
                    } else {
                      style = 'opacity-40 border-slate-200 dark:border-slate-800';
                    }
                  } else if (isChoiceSelected) {
                    style = 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-semibold';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isSubmitted}
                      onClick={() => handleSelect(q.id, idx)}
                      className={`p-3 rounded-xl border text-left text-xs transition flex items-center gap-2 ${style}`}
                    >
                      <span className="font-bold text-slate-400">({choice.label})</span>
                      <span>{choice.text}</span>
                    </button>
                  );
                })}
              </div>

              {isSubmitted && (
                <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-0.5">[해설]</span>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Submit Action */}
      <div className="pt-2 flex justify-end">
        {!isSubmitted ? (
          <button
            disabled={Object.keys(selectedAnswers).length < currentSet.subQuestions.length}
            onClick={handleSubmit}
            className="px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold text-sm shadow-md shadow-emerald-600/25 transition active:scale-98"
          >
            전체 채점하기 ({Object.keys(selectedAnswers).length}/{currentSet.subQuestions.length})
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition"
          >
            다시 풀어보기
          </button>
        )}
      </div>
    </div>
  );
}
