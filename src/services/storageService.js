// Persistent Local Storage Service for TOEIC Study Assistant
import { INITIAL_VOCAB } from '../data/initialVocab';
import { INITIAL_QUESTIONS } from '../data/initialQuestions';

const STORAGE_KEYS = {
  VOCAB: 'toeic_vocab_list_v1',
  ATTEMPTS: 'toeic_attempts_v1',
  MISTAKES: 'toeic_mistakes_v1',
  PROFILE: 'toeic_user_profile_v1',
  AI_SETTINGS: 'toeic_ai_settings_v1',
  CUSTOM_QUESTIONS: 'toeic_custom_questions_v1',
};

// Safe JSON parser
function safeGet(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (err) {
    console.error(`Error reading ${key} from storage:`, err);
    return fallback;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error writing ${key} to storage:`, err);
  }
}

export const StorageService = {
  // --- VOCABULARY ---
  getVocabList() {
    const stored = safeGet(STORAGE_KEYS.VOCAB, null);
    if (!stored) {
      safeSet(STORAGE_KEYS.VOCAB, INITIAL_VOCAB);
      return INITIAL_VOCAB;
    }
    return stored;
  },

  addWord(wordData) {
    const list = this.getVocabList();
    // Normalize word
    const newWord = {
      id: `custom-v-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      word: wordData.word.trim(),
      partOfSpeech: wordData.partOfSpeech || 'noun',
      meaning: wordData.meaning.trim(),
      example: wordData.example ? wordData.example.trim() : '',
      translation: wordData.translation ? wordData.translation.trim() : '',
      category: wordData.category || '기타/개인추가',
      note: wordData.note || '',
      memorized: false,
      reviewCount: 0,
      addedAt: new Date().toISOString(),
      source: wordData.source || '사용자 직접 추가'
    };
    const updated = [newWord, ...list];
    safeSet(STORAGE_KEYS.VOCAB, updated);
    return newWord;
  },

  updateWord(id, updates) {
    const list = this.getVocabList();
    const updated = list.map(item => item.id === id ? { ...item, ...updates } : item);
    safeSet(STORAGE_KEYS.VOCAB, updated);
    return updated;
  },

  deleteWord(id) {
    const list = this.getVocabList();
    const updated = list.filter(item => item.id !== id);
    safeSet(STORAGE_KEYS.VOCAB, updated);
    return updated;
  },

  toggleMemorized(id) {
    const list = this.getVocabList();
    const updated = list.map(item => 
      item.id === id ? { ...item, memorized: !item.memorized } : item
    );
    safeSet(STORAGE_KEYS.VOCAB, updated);
    return updated;
  },

  incrementReview(id) {
    const list = this.getVocabList();
    const updated = list.map(item => 
      item.id === id ? { ...item, reviewCount: (item.reviewCount || 0) + 1 } : item
    );
    safeSet(STORAGE_KEYS.VOCAB, updated);
    return updated;
  },

  // --- QUESTIONS & ATTEMPTS ---
  getAllQuestions() {
    const custom = safeGet(STORAGE_KEYS.CUSTOM_QUESTIONS, []);
    return [...INITIAL_QUESTIONS, ...custom];
  },

  saveCustomQuestion(question) {
    const custom = safeGet(STORAGE_KEYS.CUSTOM_QUESTIONS, []);
    const updated = [question, ...custom];
    safeSet(STORAGE_KEYS.CUSTOM_QUESTIONS, updated);
    return question;
  },

  getAttempts() {
    return safeGet(STORAGE_KEYS.ATTEMPTS, []);
  },

  recordAttempt({ questionId, part, selected, isCorrect, timeTaken, category, questionSnapshot }) {
    const attempts = this.getAttempts();
    const newAttempt = {
      id: `att-${Date.now()}`,
      questionId,
      part,
      selected,
      isCorrect,
      timeTaken: timeTaken || 0,
      category: category || 'general',
      answeredAt: new Date().toISOString(),
    };
    const updatedAttempts = [newAttempt, ...attempts];
    safeSet(STORAGE_KEYS.ATTEMPTS, updatedAttempts);

    // If incorrect, record to mistakes note
    if (!isCorrect && questionSnapshot) {
      this.addMistake(questionSnapshot, selected);
    }

    // Update streak and daily progress
    this.checkAndUpdateDailyProgress();

    return newAttempt;
  },

  // --- MISTAKES NOTE ---
  getMistakes() {
    return safeGet(STORAGE_KEYS.MISTAKES, []);
  },

  addMistake(question, userSelected) {
    const mistakes = this.getMistakes();
    const existingIndex = mistakes.findIndex(m => m.questionId === question.id);
    const now = new Date().toISOString();

    if (existingIndex >= 0) {
      mistakes[existingIndex].wrongCount = (mistakes[existingIndex].wrongCount || 1) + 1;
      mistakes[existingIndex].lastFailedAt = now;
      mistakes[existingIndex].userSelected = userSelected;
      mistakes[existingIndex].resolved = false;
    } else {
      mistakes.unshift({
        id: `m-${Date.now()}`,
        questionId: question.id,
        question,
        userSelected,
        wrongCount: 1,
        userNote: '',
        resolved: false,
        lastFailedAt: now,
        nextReviewDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 1 day interval
      });
    }
    safeSet(STORAGE_KEYS.MISTAKES, mistakes);
  },

  updateMistakeNote(id, userNote) {
    const mistakes = this.getMistakes();
    const updated = mistakes.map(m => m.id === id ? { ...m, userNote } : m);
    safeSet(STORAGE_KEYS.MISTAKES, updated);
    return updated;
  },

  resolveMistake(questionId) {
    const mistakes = this.getMistakes();
    const updated = mistakes.map(m => m.questionId === questionId ? { ...m, resolved: true } : m);
    safeSet(STORAGE_KEYS.MISTAKES, updated);
    return updated;
  },

  // --- USER PROFILE & STREAK ---
  getProfile() {
    const fallback = {
      targetScore: 850,
      currentScoreEstimate: 720,
      dailyTarget: 20,
      todayCount: 0,
      streakDays: 3,
      lastActiveDate: new Date().toISOString().split('T')[0],
      createdAt: '2026-09-01T00:00:00Z',
    };
    return safeGet(STORAGE_KEYS.PROFILE, fallback);
  },

  updateProfile(updates) {
    const current = this.getProfile();
    const updated = { ...current, ...updates };
    safeSet(STORAGE_KEYS.PROFILE, updated);
    return updated;
  },

  checkAndUpdateDailyProgress() {
    const profile = this.getProfile();
    const today = new Date().toISOString().split('T')[0];
    let { streakDays, lastActiveDate, todayCount } = profile;

    if (lastActiveDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (lastActiveDate === yesterday) {
        streakDays += 1;
      } else if (lastActiveDate < yesterday) {
        streakDays = 1;
      }
      lastActiveDate = today;
      todayCount = 1;
    } else {
      todayCount += 1;
    }

    this.updateProfile({ streakDays, lastActiveDate, todayCount });
  },

  // --- AI SETTINGS ---
  getAiSettings() {
    return safeGet(STORAGE_KEYS.AI_SETTINGS, {
      provider: 'gemini',
      apiKey: '',
      model: 'gemini-1.5-flash',
      useSimulatedFallback: true,
    });
  },

  updateAiSettings(settings) {
    const current = this.getAiSettings();
    const updated = { ...current, ...settings };
    safeSet(STORAGE_KEYS.AI_SETTINGS, updated);
    return updated;
  },

  // --- EXPORT & IMPORT ---
  exportAllData() {
    return {
      version: 1,
      exportedAt: new Date().toISOString(),
      vocab: this.getVocabList(),
      attempts: this.getAttempts(),
      mistakes: this.getMistakes(),
      profile: this.getProfile(),
      aiSettings: this.getAiSettings(),
      customQuestions: safeGet(STORAGE_KEYS.CUSTOM_QUESTIONS, []),
    };
  },

  importAllData(jsonObj) {
    if (!jsonObj || !jsonObj.version) throw new Error('올바르지 않은 백업 데이터 형식입니다.');
    if (jsonObj.vocab) safeSet(STORAGE_KEYS.VOCAB, jsonObj.vocab);
    if (jsonObj.attempts) safeSet(STORAGE_KEYS.ATTEMPTS, jsonObj.attempts);
    if (jsonObj.mistakes) safeSet(STORAGE_KEYS.MISTAKES, jsonObj.mistakes);
    if (jsonObj.profile) safeSet(STORAGE_KEYS.PROFILE, jsonObj.profile);
    if (jsonObj.aiSettings) safeSet(STORAGE_KEYS.AI_SETTINGS, jsonObj.aiSettings);
    if (jsonObj.customQuestions) safeSet(STORAGE_KEYS.CUSTOM_QUESTIONS, jsonObj.customQuestions);
    return true;
  }
};
