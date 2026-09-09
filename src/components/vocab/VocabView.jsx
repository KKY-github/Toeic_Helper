import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  Volume2, 
  Trash2, 
  Edit3, 
  Sparkles, 
  Layers, 
  HelpCircle,
  RotateCw,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ttsService } from '../../services/ttsService';

export default function VocabView({ 
  vocabList, 
  onAddWord, 
  onUpdateWord, 
  onDeleteWord, 
  onToggleMemorized,
  onOpenAddModal 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // all, learning, memorized, custom
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [studyMode, setStudyMode] = useState('list'); // list, flashcard, quiz

  // Flashcard State
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Quiz State
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState(null);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  // Filtered List
  const filteredList = useMemo(() => {
    return vocabList.filter(item => {
      // Search
      const matchSearch = 
        item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.example && item.example.toLowerCase().includes(searchTerm.toLowerCase()));

      if (!matchSearch) return false;

      // Status Filter
      if (activeFilter === 'learning' && item.memorized) return false;
      if (activeFilter === 'memorized' && !item.memorized) return false;
      if (activeFilter === 'custom' && !item.source?.includes('직접')) return false;

      // Category
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;

      return true;
    });
  }, [vocabList, searchTerm, activeFilter, selectedCategory]);

  const categories = useMemo(() => {
    const set = new Set(vocabList.map(v => v.category).filter(Boolean));
    return Array.from(set);
  }, [vocabList]);

  // Pronounce TTS
  const handlePronounce = (e, text) => {
    e?.stopPropagation();
    ttsService.speak({ text, rate: 0.9, accent: 'us' });
  };

  // Flashcard Controls
  const handleNextCard = (markMemorized = null) => {
    if (markMemorized !== null && filteredList[currentCardIndex]) {
      if (markMemorized !== filteredList[currentCardIndex].memorized) {
        onToggleMemorized(filteredList[currentCardIndex].id);
      }
    }
    setIsFlipped(false);
    if (currentCardIndex < filteredList.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
    } else {
      setCurrentCardIndex(0);
    }
  };

  // Quiz Choices Generation
  const currentQuizWord = filteredList[quizIndex];
  const quizChoices = useMemo(() => {
    if (!currentQuizWord) return [];
    const correct = currentQuizWord.meaning;
    const others = vocabList
      .filter(v => v.id !== currentQuizWord.id)
      .map(v => v.meaning)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    return [correct, ...others].sort(() => 0.5 - Math.random());
  }, [currentQuizWord, vocabList]);

  const handleQuizAnswer = (choice) => {
    if (selectedQuizAnswer !== null) return;
    setSelectedQuizAnswer(choice);
    const isCorrect = choice === currentQuizWord.meaning;

    if (isCorrect) {
      ttsService.playChime('correct');
      setQuizScore(prev => prev + 1);
    } else {
      ttsService.playChime('wrong');
    }

    setTimeout(() => {
      setSelectedQuizAnswer(null);
      if (quizIndex < Math.min(filteredList.length - 1, 9)) {
        setQuizIndex(prev => prev + 1);
      } else {
        setIsQuizCompleted(true);
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      }
    }, 1100);
  };

  const restartQuiz = () => {
    setQuizIndex(0);
    setQuizScore(0);
    setSelectedQuizAnswer(null);
    setIsQuizCompleted(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-violet-900 text-white p-6 sm:p-8 shadow-xl border border-indigo-700/50">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                개인 맞춤 토익 보카
              </span>
              <span className="text-xs text-indigo-300">
                총 {vocabList.length}개 단어 수록
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              토익 핵심 단어장 (Voca Vault)
            </h1>
            <p className="text-sm text-indigo-200 mt-1 max-w-xl">
              지문에서 모르는 단어를 즉시 추가하거나, <strong className="text-white underline underline-offset-2">자신이 외우고 싶은 단어를 직접 등록</strong>하여 플래시카드와 퀴즈로 정복하세요!
            </p>
          </div>

          {/* Direct Word Add Button */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenAddModal}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 flex items-center gap-2 transition active:scale-95 cursor-pointer"
            >
              <Plus className="w-5 h-5" />
              새 단어 직접 추가
            </button>

            {/* Mode Switcher */}
            <div className="flex bg-indigo-950/70 p-1 rounded-2xl border border-indigo-700/60">
              <button
                onClick={() => setStudyMode('list')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  studyMode === 'list' ? 'bg-indigo-600 text-white' : 'text-indigo-200 hover:text-white'
                }`}
              >
                단어 목록
              </button>
              <button
                onClick={() => setStudyMode('flashcard')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  studyMode === 'flashcard' ? 'bg-indigo-600 text-white' : 'text-indigo-200 hover:text-white'
                }`}
              >
                플래시카드
              </button>
              <button
                onClick={() => {
                  setStudyMode('quiz');
                  restartQuiz();
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  studyMode === 'quiz' ? 'bg-indigo-600 text-white' : 'text-indigo-200 hover:text-white'
                }`}
              >
                어휘 퀴즈
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODE 1: LIST VIEW */}
      {studyMode === 'list' && (
        <div className="space-y-5">
          {/* Filter and Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none pb-1 sm:pb-0">
              {[
                { id: 'all', label: `전체 (${vocabList.length})` },
                { id: 'learning', label: `외우는 중 (${vocabList.filter(v => !v.memorized).length})` },
                { id: 'memorized', label: `암기 완료 (${vocabList.filter(v => v.memorized).length})` },
                { id: 'custom', label: '직접 추가한 단어' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                    activeFilter === tab.id
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search & Category */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-56">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="단어, 뜻, 예문 검색..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {categories.length > 0 && (
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
                >
                  <option value="all">모든 분야</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* Vocab Cards Grid */}
          {filteredList.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800">
              <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
              <p className="text-base font-bold text-slate-600 dark:text-slate-400">
                등록된 단어가 없습니다.
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                상단의 "새 단어 직접 추가" 버튼을 눌러 나만의 단어를 등록해보세요!
              </p>
              <button
                onClick={onOpenAddModal}
                className="mt-4 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition"
              >
                단어 직접 추가하기
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredList.map((item) => (
                <div
                  key={item.id}
                  className={`group relative p-5 rounded-2xl border transition-all duration-200 card-hover ${
                    item.memorized
                      ? 'bg-slate-50/70 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/80 opacity-85'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm'
                  }`}
                >
                  {/* Top Bar: Word, POS, Category, Actions */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                          {item.word}
                        </span>
                        <button
                          onClick={(e) => handlePronounce(e, item.word)}
                          className="p-1 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-md transition"
                          title="발음 듣기"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/50">
                          {item.partOfSpeech}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-300 mt-1">
                        {item.meaning}
                      </p>
                    </div>

                    {/* Memorized Toggle & Delete */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onToggleMemorized(item.id)}
                        className={`p-1.5 rounded-lg transition ${
                          item.memorized
                            ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40'
                            : 'text-slate-300 hover:text-emerald-500'
                        }`}
                        title={item.memorized ? '암기 완료 상태 (클릭시 취소)' : '외웠어요 체크'}
                      >
                        {item.memorized ? (
                          <CheckCircle2 className="w-5 h-5 fill-emerald-500 text-white dark:text-slate-950" />
                        ) : (
                          <Circle className="w-5 h-5" />
                        )}
                      </button>

                      <button
                        onClick={() => onDeleteWord(item.id)}
                        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                        title="단어 삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Example & Translation */}
                  {item.example && (
                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/60 text-xs">
                      <p className="text-slate-700 dark:text-slate-300 font-medium">
                        "{item.example}"
                      </p>
                      {item.translation && (
                        <p className="text-slate-400 dark:text-slate-500 mt-0.5 text-[11px]">
                          {item.translation}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Note / Tag */}
                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {item.category || '비즈니스'}
                    </span>
                    {item.note && (
                      <span className="italic text-slate-500 dark:text-slate-400 truncate max-w-[200px]">
                        💡 {item.note}
                      </span>
                    )}
                    <span className="text-[10px] text-slate-400">
                      {item.source}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MODE 2: FLASHCARD VIEW */}
      {studyMode === 'flashcard' && (
        <div className="max-w-xl mx-auto space-y-6">
          {filteredList.length === 0 ? (
            <p className="text-center text-slate-400 py-12">학습할 단어가 없습니다.</p>
          ) : (
            <>
              {/* Progress */}
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>카드 {currentCardIndex + 1} / {filteredList.length}</span>
                <span>카드를 클릭하면 뜻과 예문이 뒤집힙니다</span>
              </div>

              {/* 3D Flip Card */}
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="relative min-h-[300px] p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-indigo-100 dark:border-indigo-900/60 shadow-xl cursor-pointer flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:border-indigo-300 dark:hover:border-indigo-700"
              >
                {!isFlipped ? (
                  /* FRONT: Word & Pronounce */
                  <div className="flex flex-col items-center justify-center flex-1 my-auto text-center space-y-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                      {filteredList[currentCardIndex].partOfSpeech}
                    </span>
                    <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {filteredList[currentCardIndex].word}
                    </h2>
                    <button
                      onClick={(e) => handlePronounce(e, filteredList[currentCardIndex].word)}
                      className="p-2 rounded-full bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 hover:scale-110 transition"
                      title="발음 듣기"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                    <p className="text-xs text-slate-400 mt-4 flex items-center gap-1">
                      <RotateCw className="w-3.5 h-3.5" /> 클릭하여 뜻 확인
                    </p>
                  </div>
                ) : (
                  /* BACK: Meaning & Example */
                  <div className="flex flex-col items-center justify-center flex-1 my-auto text-center space-y-3 animate-fadeIn">
                    <span className="text-xs font-semibold text-slate-400">
                      {filteredList[currentCardIndex].category}
                    </span>
                    <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      {filteredList[currentCardIndex].meaning}
                    </h3>
                    {filteredList[currentCardIndex].example && (
                      <div className="mt-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-700 dark:text-slate-300 max-w-md">
                        <p className="font-medium">"{filteredList[currentCardIndex].example}"</p>
                        {filteredList[currentCardIndex].translation && (
                          <p className="text-slate-400 mt-1 text-[11px]">
                            {filteredList[currentCardIndex].translation}
                          </p>
                        )}
                      </div>
                    )}
                    {filteredList[currentCardIndex].note && (
                      <p className="text-xs text-amber-600 dark:text-amber-400 italic">
                        💡 {filteredList[currentCardIndex].note}
                      </p>
                    )}
                  </div>
                )}

                {/* Card Footer Control */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] text-slate-400">
                    {filteredList[currentCardIndex].source}
                  </span>
                  <span className="text-[11px] font-semibold text-indigo-500">
                    {filteredList[currentCardIndex].memorized ? '암기 완료됨' : '학습 중'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleNextCard(false)}
                  className="py-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-sm text-slate-700 dark:text-slate-300 transition active:scale-98"
                >
                  아직 헷갈려요 (다음)
                </button>
                <button
                  onClick={() => handleNextCard(true)}
                  className="py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 font-bold text-sm text-white shadow-lg shadow-emerald-600/25 transition active:scale-98 flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  외웠어요! (암기완료)
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* MODE 3: VOCAB QUIZ */}
      {studyMode === 'quiz' && (
        <div className="max-w-xl mx-auto space-y-6">
          {!isQuizCompleted && currentQuizWord ? (
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                  문제 {quizIndex + 1} / {Math.min(filteredList.length, 10)}
                </span>
                <span>현재 점수: {quizScore}점</span>
              </div>

              {/* Quiz Word */}
              <div className="text-center py-4">
                <span className="text-xs uppercase font-bold text-indigo-500 dark:text-indigo-400 tracking-wider">
                  [{currentQuizWord.partOfSpeech}]
                </span>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-1">
                  {currentQuizWord.word}
                </h2>
                <button
                  onClick={(e) => handlePronounce(e, currentQuizWord.word)}
                  className="mt-2 inline-flex items-center gap-1 text-xs text-slate-400 hover:text-indigo-600"
                >
                  <Volume2 className="w-3.5 h-3.5" /> 발음 듣기
                </button>
              </div>

              {/* 4 Choices */}
              <div className="space-y-3">
                {quizChoices.map((choice, idx) => {
                  let btnStyle = 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80';
                  if (selectedQuizAnswer !== null) {
                    if (choice === currentQuizWord.meaning) {
                      btnStyle = 'bg-emerald-500 text-white border-emerald-500 font-bold';
                    } else if (choice === selectedQuizAnswer) {
                      btnStyle = 'bg-rose-500 text-white border-rose-500 font-bold';
                    } else {
                      btnStyle = 'opacity-40 border-slate-200 dark:border-slate-800';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={selectedQuizAnswer !== null}
                      onClick={() => handleQuizAnswer(choice)}
                      className={`w-full p-4 rounded-2xl border text-left text-sm transition-all duration-200 flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{choice}</span>
                      <span className="text-xs opacity-60 font-semibold">{idx + 1}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Quiz Completed Result */
            <div className="text-center p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Award className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                어휘 퀴즈 완료!
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                총 {Math.min(filteredList.length, 10)}문제 중{' '}
                <strong className="text-indigo-600 dark:text-indigo-400 font-bold text-base">
                  {quizScore}개
                </strong>
                를 맞추셨습니다.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={restartQuiz}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition"
                >
                  다시 도전하기
                </button>
                <button
                  onClick={() => setStudyMode('list')}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  단어 목록으로 돌아가기
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
