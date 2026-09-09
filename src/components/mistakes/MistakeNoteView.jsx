import React, { useState } from 'react';
import { 
  Bookmark, 
  CheckCircle2, 
  RotateCcw, 
  Calendar, 
  AlertTriangle, 
  Save, 
  FileEdit,
  Trash2,
  HelpCircle
} from 'lucide-react';
import ClickableText from '../common/ClickableText';
import { ttsService } from '../../services/ttsService';

export default function MistakeNoteView({ 
  mistakes, 
  onUpdateNote, 
  onResolveMistake, 
  onWordClick,
  onLaunchAIGen
}) {
  const [filterPart, setFilterPart] = useState('all');
  const [filterResolved, setFilterResolved] = useState('unresolved');
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [tempNoteText, setTempNoteText] = useState('');
  const [retryState, setRetryState] = useState({}); // { mistakeId: { selected, isSubmitted, isCorrect } }

  const filteredMistakes = mistakes.filter(m => {
    if (filterPart !== 'all' && m.question?.part !== parseInt(filterPart)) return false;
    if (filterResolved === 'unresolved' && m.resolved) return false;
    if (filterResolved === 'resolved' && !m.resolved) return false;
    return true;
  });

  const handleStartEditNote = (m) => {
    setEditingNoteId(m.id);
    setTempNoteText(m.userNote || '');
  };

  const handleSaveNote = (id) => {
    onUpdateNote(id, tempNoteText);
    setEditingNoteId(null);
  };

  const handleRetrySelect = (mId, choiceIdx) => {
    setRetryState(prev => ({
      ...prev,
      [mId]: { ...prev[mId], selected: choiceIdx }
    }));
  };

  const handleRetrySubmit = (m) => {
    const state = retryState[m.id];
    if (!state || state.selected === undefined) return;

    const isCorrect = state.selected === m.question.answer;
    if (isCorrect) {
      ttsService.playChime('correct');
      onResolveMistake(m.questionId);
    } else {
      ttsService.playChime('wrong');
    }

    setRetryState(prev => ({
      ...prev,
      [m.id]: { ...prev[m.id], isSubmitted: true, isCorrect }
    }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-900 via-rose-800 to-pink-900 text-white shadow-xl border border-rose-700/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/30 text-rose-200 border border-rose-400/30">
                스페이스드 리피티션 (망각곡선 복습)
              </span>
              <span className="text-xs text-rose-200">
                총 {mistakes.length}개 누적 오답
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              스마트 오답노트 & 약점 복습
            </h1>
            <p className="text-xs sm:text-sm text-rose-200 mt-1 max-w-xl">
              틀린 문제는 자동으로 수집되며, 오답 원인을 메모하고 1일/3일/7일 주기로 다시 풀어 완벽히 내 것으로 만듭니다.
            </p>
          </div>

          <div className="px-4 py-3 rounded-2xl bg-rose-950/60 border border-rose-700/60 text-center sm:text-right">
            <span className="text-xs text-rose-300 block">복습 대기 중인 오답</span>
            <span className="text-2xl font-black text-white">
              {mistakes.filter(m => !m.resolved).length}개
            </span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterResolved('unresolved')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              filterResolved === 'unresolved'
                ? 'bg-rose-600 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            복습 필요 ({mistakes.filter(m => !m.resolved).length})
          </button>
          <button
            onClick={() => setFilterResolved('resolved')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              filterResolved === 'resolved'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            해결 완료 ({mistakes.filter(m => m.resolved).length})
          </button>
          <button
            onClick={() => setFilterResolved('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              filterResolved === 'all'
                ? 'bg-slate-800 text-white dark:bg-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            전체 보기
          </button>
        </div>

        {/* Part Selector */}
        <div className="flex items-center gap-1">
          {['all', '1', '2', '3', '5', '6', '7'].map((p) => (
            <button
              key={p}
              onClick={() => setFilterPart(p)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                filterPart === p
                  ? 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold'
                  : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {p === 'all' ? '모든 파트' : `Part ${p}`}
            </button>
          ))}
        </div>
      </div>

      {/* Mistakes List */}
      {filteredMistakes.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800">
          <Bookmark className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
          <p className="text-base font-bold text-slate-600 dark:text-slate-400">
            해당 조건의 오답이 없습니다.
          </p>
          <p className="text-xs text-slate-400 mt-1">
            문제를 풀다가 틀린 문제가 생기면 이곳에 자동으로 축적됩니다.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMistakes.map((m) => {
            const q = m.question;
            const retry = retryState[m.id] || {};

            return (
              <div
                key={m.id}
                className={`p-6 sm:p-7 rounded-3xl border transition-all duration-200 ${
                  m.resolved
                    ? 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-80'
                    : 'bg-white dark:bg-slate-900 border-rose-200 dark:border-rose-950/60 shadow-sm'
                }`}
              >
                {/* Header info */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 text-xs font-bold">
                      Part {q?.part || 5}
                    </span>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {q?.grammarPoint || q?.category || '취약점'}
                    </span>
                    <span className="text-[11px] text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded-md font-medium">
                      누적 오답 {m.wrongCount || 1}회
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    {m.resolved ? (
                      <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg">
                        <CheckCircle2 className="w-3.5 h-3.5" /> 복습 완료
                      </span>
                    ) : (
                      <button
                        onClick={() => onResolveMistake(m.questionId)}
                        className="text-slate-400 hover:text-emerald-600 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> 마스터 표시
                      </button>
                    )}
                  </div>
                </div>

                {/* Question Sentence */}
                <div className="py-4 text-base font-medium text-slate-900 dark:text-white leading-relaxed">
                  <ClickableText text={q?.questionText} onWordClick={onWordClick} />
                </div>

                {/* Choices (Retry mode interactive) */}
                {q?.choices && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pb-4">
                    {q.choices.map((choice, idx) => {
                      const isSelected = retry.selected === idx;
                      let choiceStyle = 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800';

                      if (retry.isSubmitted) {
                        if (idx === q.answer) {
                          choiceStyle = 'bg-emerald-500 text-white border-emerald-500 font-bold';
                        } else if (isSelected) {
                          choiceStyle = 'bg-rose-500 text-white border-rose-500 font-bold';
                        } else {
                          choiceStyle = 'opacity-40 border-slate-200 dark:border-slate-800';
                        }
                      } else if (isSelected) {
                        choiceStyle = 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-indigo-700 dark:text-indigo-300 font-semibold';
                      }

                      return (
                        <button
                          key={idx}
                          disabled={retry.isSubmitted}
                          onClick={() => handleRetrySelect(m.id, idx)}
                          className={`p-3 rounded-xl border text-left text-xs transition flex items-center gap-2 ${choiceStyle}`}
                        >
                          <span className="font-bold text-slate-400">({choice.label})</span>
                          <span>{choice.text}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Retry action button */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="text-xs text-slate-400">
                    내가 골랐던 오답: <strong className="text-rose-500">
                      {m.userSelected !== undefined && q?.choices?.[m.userSelected] 
                        ? `(${q.choices[m.userSelected].label}) ${q.choices[m.userSelected].text}` 
                        : '미기록'}
                    </strong>
                  </div>

                  {!retry.isSubmitted ? (
                    <button
                      disabled={retry.selected === undefined}
                      onClick={() => handleRetrySubmit(m)}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-bold text-xs shadow-sm transition"
                    >
                      다시 풀어보기
                    </button>
                  ) : (
                    <span className={`text-xs font-bold ${retry.isCorrect ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {retry.isCorrect ? '다시 풀기 정답! 약점 극복 완료' : '다시 풀었으나 오답입니다.'}
                    </span>
                  )}
                </div>

                {/* User Personal Mistake Note Section */}
                <div className="mt-4 p-4 rounded-2xl bg-amber-50/60 dark:bg-slate-800/40 border border-amber-200/70 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-amber-800 dark:text-amber-400 flex items-center gap-1">
                      <FileEdit className="w-3.5 h-3.5" />
                      나만의 오답 원인 메모
                    </span>
                    {editingNoteId !== m.id && (
                      <button
                        onClick={() => handleStartEditNote(m)}
                        className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                      >
                        {m.userNote ? '메모 수정' : '+ 메모 작성'}
                      </button>
                    )}
                  </div>

                  {editingNoteId === m.id ? (
                    <div className="space-y-2 mt-2">
                      <textarea
                        rows={2}
                        value={tempNoteText}
                        onChange={(e) => setTempNoteText(e.target.value)}
                        placeholder="예: Despite 뒤에 명사구가 오는 것을 놓침. Although와 혼동하지 말 것!"
                        className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                        autoFocus
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingNoteId(null)}
                          className="px-3 py-1 rounded-lg text-xs text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800"
                        >
                          취소
                        </button>
                        <button
                          onClick={() => handleSaveNote(m.id)}
                          className="px-3 py-1 rounded-lg text-xs bg-amber-600 hover:bg-amber-500 text-white font-semibold flex items-center gap-1"
                        >
                          <Save className="w-3 h-3" /> 저장
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-700 dark:text-slate-300 italic">
                      {m.userNote ? `"${m.userNote}"` : '작성된 오답 메모가 없습니다. 왜 헷갈렸는지 기록해두면 기억에 오래 남습니다.'}
                    </p>
                  )}
                </div>

                {/* Explanation accordion / toggle */}
                <div className="mt-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-0.5">[해설 확인]</span>
                  {q?.explanation}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
