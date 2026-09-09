import React, { useState, useEffect } from 'react';
import Navbar from './components/common/Navbar';
import WordModal from './components/common/WordModal';
import DashboardView from './components/dashboard/DashboardView';
import SettingsModal from './components/dashboard/SettingsModal';
import Part5View from './components/rc/Part5View';
import Part6View from './components/rc/Part6View';
import Part7View from './components/rc/Part7View';
import Part1View from './components/lc/Part1View';
import Part2View from './components/lc/Part2View';
import Part34View from './components/lc/Part34View';
import VocabView from './components/vocab/VocabView';
import MistakeNoteView from './components/mistakes/MistakeNoteView';
import AIGeneratorView from './components/ai-generator/AIGeneratorView';
import { StorageService } from './services/storageService';

export default function App() {
  // Navigation & Dark mode
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('toeic_dark_mode');
      return saved ? JSON.parse(saved) : window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Core Data States
  const [vocabList, setVocabList] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [mistakes, setMistakes] = useState([]);
  const [profile, setProfile] = useState(null);

  // Modals
  const [isWordModalOpen, setIsWordModalOpen] = useState(false);
  const [wordModalData, setWordModalData] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Toast message
  const [toastMessage, setToastMessage] = useState('');

  // Initialize data on mount
  useEffect(() => {
    refreshAllData();
  }, []);

  // Sync dark mode class with HTML tag
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('toeic_dark_mode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const refreshAllData = () => {
    setVocabList(StorageService.getVocabList());
    setQuestions(StorageService.getAllQuestions());
    setAttempts(StorageService.getAttempts());
    setMistakes(StorageService.getMistakes());
    setProfile(StorageService.getProfile());
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // --- ATTEMPT HANDLER ---
  const handleRecordAttempt = (attemptData) => {
    StorageService.recordAttempt(attemptData);
    setAttempts(StorageService.getAttempts());
    setMistakes(StorageService.getMistakes());
    setProfile(StorageService.getProfile());
  };

  // --- VOCAB HANDLERS ---
  const handleSaveWord = (wordData) => {
    if (wordData.id) {
      const updated = StorageService.updateWord(wordData.id, wordData);
      setVocabList(updated);
      showToast(`'${wordData.word}' 단어를 수정했습니다.`);
    } else {
      const created = StorageService.addWord(wordData);
      setVocabList(StorageService.getVocabList());
      showToast(`'${created.word}' 단어가 단어장에 추가되었습니다! 🎉`);
    }
  };

  const handleDeleteWord = (id) => {
    const updated = StorageService.deleteWord(id);
    setVocabList(updated);
    showToast('단어가 삭제되었습니다.');
  };

  const handleToggleMemorized = (id) => {
    const updated = StorageService.toggleMemorized(id);
    setVocabList(updated);
  };

  // Open Word Modal for direct manual entry
  const handleOpenAddWordModal = () => {
    setWordModalData(null);
    setIsWordModalOpen(true);
  };

  // Click a word inside questions/passages to quickly lookup or add
  const handleWordClick = (word, meaning = '') => {
    setWordModalData({ word, meaning });
    setIsWordModalOpen(true);
  };

  // --- MISTAKE HANDLERS ---
  const handleUpdateNote = (id, userNote) => {
    const updated = StorageService.updateMistakeNote(id, userNote);
    setMistakes(updated);
    showToast('오답 메모가 저장되었습니다.');
  };

  const handleResolveMistake = (questionId) => {
    const updated = StorageService.resolveMistake(questionId);
    setMistakes(updated);
    showToast('오답을 마스터 완료 처리했습니다! 👏');
  };

  // --- AI QUESTION GENERATION HANDLERS ---
  const handleSaveCustomQuestion = (newQuestion) => {
    StorageService.saveCustomQuestion(newQuestion);
    setQuestions(StorageService.getAllQuestions());
  };

  const handleLaunchAIGen = (category) => {
    setActiveTab('ai_gen');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        stats={profile}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        onOpenWordModal={handleOpenAddWordModal}
        onOpenSettings={() => setIsSettingsOpen(true)}
        vocabCount={vocabList.length}
        mistakeCount={mistakes.filter(m => !m.resolved).length}
      />

      {/* Main View Router */}
      <main className="flex-1 w-full pb-16">
        {activeTab === 'dashboard' && (
          <DashboardView
            profile={profile}
            attempts={attempts}
            mistakes={mistakes}
            vocabList={vocabList}
            onNavigate={(tab) => setActiveTab(tab)}
            onLaunchAIGen={handleLaunchAIGen}
          />
        )}

        {activeTab === 'part5' && (
          <Part5View
            questions={questions}
            onRecordAttempt={handleRecordAttempt}
            onWordClick={handleWordClick}
            onLaunchAIGen={handleLaunchAIGen}
          />
        )}

        {activeTab === 'part6' && (
          <Part6View
            questions={questions}
            onRecordAttempt={handleRecordAttempt}
            onWordClick={handleWordClick}
          />
        )}

        {activeTab === 'part7' && (
          <Part7View
            questions={questions}
            onRecordAttempt={handleRecordAttempt}
            onWordClick={handleWordClick}
          />
        )}

        {activeTab === 'part1' && (
          <Part1View
            questions={questions}
            onRecordAttempt={handleRecordAttempt}
            onWordClick={handleWordClick}
          />
        )}

        {activeTab === 'part2' && (
          <Part2View
            questions={questions}
            onRecordAttempt={handleRecordAttempt}
            onWordClick={handleWordClick}
          />
        )}

        {activeTab === 'part34' && (
          <Part34View
            questions={questions}
            onRecordAttempt={handleRecordAttempt}
            onWordClick={handleWordClick}
          />
        )}

        {activeTab === 'vocab' && (
          <VocabView
            vocabList={vocabList}
            onAddWord={handleSaveWord}
            onUpdateWord={handleSaveWord}
            onDeleteWord={handleDeleteWord}
            onToggleMemorized={handleToggleMemorized}
            onOpenAddModal={handleOpenAddWordModal}
          />
        )}

        {activeTab === 'mistakes' && (
          <MistakeNoteView
            mistakes={mistakes}
            onUpdateNote={handleUpdateNote}
            onResolveMistake={handleResolveMistake}
            onWordClick={handleWordClick}
            onLaunchAIGen={handleLaunchAIGen}
          />
        )}

        {activeTab === 'ai_gen' && (
          <AIGeneratorView
            onSaveCustomQuestion={handleSaveCustomQuestion}
            onRecordAttempt={handleRecordAttempt}
            onWordClick={handleWordClick}
          />
        )}
      </main>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-slate-900/90 dark:bg-white/95 text-white dark:text-slate-900 text-xs font-semibold shadow-2xl backdrop-blur-md border border-slate-700/50 dark:border-slate-200 animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Word Modal: Direct Manual Addition & Edit */}
      <WordModal
        isOpen={isWordModalOpen}
        onClose={() => {
          setIsWordModalOpen(false);
          setWordModalData(null);
        }}
        onSave={handleSaveWord}
        initialData={wordModalData}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        profile={profile}
        onUpdateProfile={(updates) => {
          const updated = StorageService.updateProfile(updates);
          setProfile(updated);
        }}
        onDataImported={refreshAllData}
      />
    </div>
  );
}
