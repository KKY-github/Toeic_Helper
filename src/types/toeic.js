// TOEIC Constants and Types

export const TOEIC_PARTS = {
  PART1: { id: 1, name: 'Part 1', title: '사진 묘사 (Photographs)', section: 'LC', count: 6 },
  PART2: { id: 2, name: 'Part 2', title: '질의 응답 (Question-Response)', section: 'LC', count: 25 },
  PART3: { id: 3, name: 'Part 3', title: '짧은 대화 (Conversations)', section: 'LC', count: 39 },
  PART4: { id: 4, name: 'Part 4', title: '설명문 (Short Talks)', section: 'LC', count: 30 },
  PART5: { id: 5, name: 'Part 5', title: '단문 빈칸 채우기 (Incomplete Sentences)', section: 'RC', count: 30 },
  PART6: { id: 6, name: 'Part 6', title: '장문 빈칸 채우기 (Text Completion)', section: 'RC', count: 16 },
  PART7: { id: 7, name: 'Part 7', title: '독해 (Reading Comprehension)', section: 'RC', count: 54 },
};

export const GRAMMAR_CATEGORIES = [
  { id: 'pos', name: '품사 구분 (명사/동사/형용사/부사)', icon: 'Layers' },
  { id: 'tense_voice', name: '시제 및 태 (능동태 vs 수동태)', icon: 'Clock' },
  { id: 'agreement', name: '수 일치 및 대명사', icon: 'CheckSquare' },
  { id: 'conjunction_preposition', name: '접속사 vs 전치사 구별', icon: 'GitMerge' },
  { id: 'relative', name: '관계대명사 / 관계부사', icon: 'Link' },
  { id: 'participle', name: '분사구문 및 준동사 (to부정사/동명사)', icon: 'Workflow' },
  { id: 'subjunctive', name: '가정법 및 도치/특수구문', icon: 'Zap' },
  { id: 'business_collocation', name: '비즈니스 빈출 어휘 및 연어(Collocation)', icon: 'Briefcase' },
];

export const DIFFICULTY_LEVELS = [
  { id: 'easy', label: '기본 (600~700점대)', color: 'emerald' },
  { id: 'medium', label: '실전 (750~850점대)', color: 'blue' },
  { id: 'hard', label: '고난도 (900점 이상 만점대)', color: 'purple' },
];

export const TARGET_SCORES = [700, 750, 800, 850, 900, 950, 990];
