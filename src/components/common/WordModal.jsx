import React, { useState, useEffect } from 'react';
import { X, Sparkles, BookPlus, Check, Volume2 } from 'lucide-react';
import { AIService } from '../../services/aiService';
import { ttsService } from '../../services/ttsService';

export default function WordModal({ isOpen, onClose, onSave, initialData = null }) {
  const [word, setWord] = useState('');
  const [partOfSpeech, setPartOfSpeech] = useState('noun');
  const [meaning, setMeaning] = useState('');
  const [example, setExample] = useState('');
  const [translation, setTranslation] = useState('');
  const [category, setCategory] = useState('비즈니스');
  const [note, setNote] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (initialData) {
      setWord(initialData.word || '');
      setPartOfSpeech(initialData.partOfSpeech || 'noun');
      setMeaning(initialData.meaning || '');
      setExample(initialData.example || '');
      setTranslation(initialData.translation || '');
      setCategory(initialData.category || '비즈니스');
      setNote(initialData.note || '');
      setErrorMsg('');

      // If only word was supplied from text click and no meaning, auto fill
      if (initialData.word && !initialData.meaning) {
        handleAiFill(initialData.word);
      }
    } else {
      setWord('');
      setPartOfSpeech('noun');
      setMeaning('');
      setExample('');
      setTranslation('');
      setCategory('비즈니스');
      setNote('');
      setErrorMsg('');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleAiFill = async (targetWord = word) => {
    if (!targetWord || !targetWord.trim()) {
      setErrorMsg('단어를 먼저 입력해주세요.');
      return;
    }
    setErrorMsg('');
    setIsAiLoading(true);
    try {
      const details = await AIService.lookupWordDetails(targetWord.trim());
      if (details.pos) setPartOfSpeech(details.pos);
      if (details.meaning) setMeaning(details.meaning);
      if (details.example) setExample(details.example);
    } catch (e) {
      console.warn('AI fill failed:', e);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handlePronounce = () => {
    if (!word) return;
    ttsService.speak({ text: word, rate: 0.9, accent: 'us' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!word.trim()) {
      setErrorMsg('단어(Word)는 필수 입력 항목입니다.');
      return;
    }
    if (!meaning.trim()) {
      setErrorMsg('한국어 뜻(Meaning)을 입력해주세요.');
      return;
    }

    onSave({
      id: initialData?.id,
      word: word.trim(),
      partOfSpeech,
      meaning: meaning.trim(),
      example: example.trim(),
      translation: translation.trim(),
      category,
      note: note.trim(),
    });

    onClose();
  };

  const categories = ['비즈니스', '마케팅/영업', '인사/채용', '재무/회계', '일정/회의', '물류/배송', '기획/전략', '기타'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden transition-all transform scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <BookPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {initialData?.id ? '단어 수정하기' : '나만의 단어 직접 추가'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                개인 단어장에 새로운 토익 핵심 어휘를 등록합니다
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {errorMsg && (
            <div className="p-3 text-xs rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900">
              {errorMsg}
            </div>
          )}

          {/* Word Input + Pronounce + AI Fill */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
              영어 단어 / 숙어 <span className="text-rose-500">*</span>
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
                  placeholder="예: implement, tentative, reimburse"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  autoFocus
                />
                {word && (
                  <button
                    type="button"
                    onClick={handlePronounce}
                    title="발음 듣기"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={() => handleAiFill()}
                disabled={isAiLoading || !word}
                className="px-3 py-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-xs font-semibold border border-indigo-200 dark:border-indigo-800 flex items-center gap-1.5 transition disabled:opacity-40"
              >
                <Sparkles className={`w-3.5 h-3.5 ${isAiLoading ? 'animate-spin' : ''}`} />
                {isAiLoading ? '조회중...' : 'AI 자동완성'}
              </button>
            </div>
          </div>

          {/* Part of Speech & Category */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                품사 (Part of Speech)
              </label>
              <select
                value={partOfSpeech}
                onChange={(e) => setPartOfSpeech(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="noun">명사 (noun)</option>
                <option value="verb">동사 (verb)</option>
                <option value="adjective">형용사 (adjective)</option>
                <option value="adverb">부사 (adverb)</option>
                <option value="preposition">전치사 (preposition)</option>
                <option value="conjunction">접속사 (conjunction)</option>
                <option value="idiom">숙어/표현 (phrase)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                분야 카테고리
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Meaning (Korean) */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
              한국어 뜻 <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={meaning}
              onChange={(e) => setMeaning(e.target.value)}
              placeholder="예: 시행하다, 실행하다"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Example Sentence */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
              영어 예문 (Example Sentence)
            </label>
            <textarea
              rows={2}
              value={example}
              onChange={(e) => setExample(e.target.value)}
              placeholder="예: The management will implement the new policy next week."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Example Translation */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
              예문 한국어 해석
            </label>
            <input
              type="text"
              value={translation}
              onChange={(e) => setTranslation(e.target.value)}
              placeholder="예: 경영진은 다음 주에 새로운 규정을 시행할 것이다."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* User Memory Note */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
              나만의 암기 팁 / 연상 메모
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="예: im(안에) + plement(채우다) -> 계획을 채워 실행하다"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Buttons */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium transition"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-semibold shadow-md shadow-indigo-500/25 flex items-center gap-1.5 transition active:scale-98"
            >
              <Check className="w-4 h-4" />
              {initialData?.id ? '수정 저장' : '단어장에 추가'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
