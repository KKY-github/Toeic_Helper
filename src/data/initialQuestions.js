// Curated Initial TOEIC Practice Questions (Part 1 - 7)

export const INITIAL_QUESTIONS = [
  // --- PART 1: 사진 묘사 (Photographs) ---
  {
    id: 'p1-1',
    part: 1,
    type: 'photograph',
    category: 'business_collocation',
    difficulty: 'medium',
    imageType: 'presentation',
    imagePrompt: 'A business woman presenting charts on a whiteboard in a modern conference room with colleagues listening.',
    // Rich SVG scene representation for offline/zero-dependency perfection
    imageDescription: '회의실에서 한 여성이 화이트보드의 차트를 가리키며 동료들에게 발표하고 있는 모습',
    questionText: 'Look at the photograph and choose the statement that best describes what you see.',
    audioScript: {
      question: 'Number 1. Look at the photograph labeled number 1 in your test book.',
      choices: [
        '(A) She is adjusting a computer projector.',
        '(B) She is pointing at a chart on a board.',
        '(C) She is distributing handouts to the attendees.',
        '(D) She is typing on a laptop keyboard.'
      ]
    },
    choices: [
      { label: 'A', text: '(A) She is adjusting a computer projector.' },
      { label: 'B', text: '(B) She is pointing at a chart on a board.' },
      { label: 'C', text: '(C) She is distributing handouts to the attendees.' },
      { label: 'D', text: '(D) She is typing on a laptop keyboard.' }
    ],
    answer: 1, // B
    transcript: {
      A: 'She is adjusting a computer projector. (그녀는 컴퓨터 프로젝터를 조절하고 있다.)',
      B: 'She is pointing at a chart on a board. (그녀는 보드 위의 차트를 가리키고 있다.)',
      C: 'She is distributing handouts to the attendees. (그녀는 참석자들에게 유인물을 나누어주고 있다.)',
      D: 'She is typing on a laptop keyboard. (그녀는 노트북 키보드를 타이핑하고 있다.)'
    },
    explanation: '발표자가 화이트보드에 부착된 판매 차트를 손으로 가리키고(pointing at a chart on a board) 있으므로 (B)가 정답입니다. 프로젝터 조절(A), 유인물 배포(C), 노트북 타이핑(D)은 사진의 동작과 일치하지 않습니다.',
    keyVocab: [
      { word: 'point at', meaning: '~을 가리키다' },
      { word: 'attendee', meaning: '참석자' },
      { word: 'distribute', meaning: '배포하다, 나누어주다' }
    ]
  },
  {
    id: 'p1-2',
    part: 1,
    type: 'photograph',
    category: 'business_collocation',
    difficulty: 'easy',
    imageType: 'warehouse',
    imagePrompt: 'A worker wearing a safety vest inspecting cardboard boxes stacked on pallets in a warehouse.',
    imageDescription: '창고에서 안전조끼를 입은 직원이 파렛트 위에 쌓인 상자들을 점검하고 있는 모습',
    questionText: 'Look at the photograph and choose the statement that best describes what you see.',
    audioScript: {
      question: 'Number 2. Look at the photograph labeled number 2 in your test book.',
      choices: [
        '(A) Some boxes are stacked on a wooden pallet.',
        '(B) A forklift is unloading cargo from a truck.',
        '(C) The shelves are completely empty.',
        '(D) A worker is sealing a package with tape.'
      ]
    },
    choices: [
      { label: 'A', text: '(A) Some boxes are stacked on a wooden pallet.' },
      { label: 'B', text: '(B) A forklift is unloading cargo from a truck.' },
      { label: 'C', text: '(C) The shelves are completely empty.' },
      { label: 'D', text: '(D) A worker is sealing a package with tape.' }
    ],
    answer: 0, // A
    transcript: {
      A: 'Some boxes are stacked on a wooden pallet. (상자 몇 개가 목재 파렛트 위에 쌓여 있다.)',
      B: 'A forklift is unloading cargo from a truck. (지게차가 트럭에서 화물을 내리고 있다.)',
      C: 'The shelves are completely empty. (선반들이 완전히 비어 있다.)',
      D: 'A worker is sealing a package with tape. (작업자가 테이프로 소포를 밀봉하고 있다.)'
    },
    explanation: '사물 상태 묘사 문제입니다. 파렛트 위에 골판지 상자들이 단정하게 쌓여(stacked on a pallet) 있는 상태이므로 (A)가 정답입니다.',
    keyVocab: [
      { word: 'be stacked', meaning: '쌓여 있다' },
      { word: 'pallet', meaning: '화물 운반대, 파렛트' },
      { word: 'cargo', meaning: '화물' }
    ]
  },

  // --- PART 2: 질의 응답 (Question-Response) ---
  {
    id: 'p2-1',
    part: 2,
    type: 'question_response',
    category: 'business_collocation',
    difficulty: 'medium',
    questionText: 'Where can I find the quarterly revenue report?',
    audioScript: {
      question: 'Where can I find the quarterly revenue report?',
      choices: [
        '(A) Yes, it increased by ten percent.',
        '(B) It’s posted on the employee portal.',
        '(C) Mr. Davis reported it yesterday.'
      ]
    },
    choices: [
      { label: 'A', text: '(A) Yes, it increased by ten percent.' },
      { label: 'B', text: '(B) It’s posted on the employee portal.' },
      { label: 'C', text: '(C) Mr. Davis reported it yesterday.' }
    ],
    answer: 1, // B
    transcript: {
      Q: 'Where can I find the quarterly revenue report? (분기별 수익 보고서는 어디서 찾을 수 있나요?)',
      A: '(A) Yes, it increased by ten percent. (네, 10% 증가했습니다. - 의문사 의문에 Yes/No 오답)',
      B: '(B) It’s posted on the employee portal. (직원 포털에 게시되어 있습니다. - 장소 정답)',
      C: '(C) Mr. Davis reported it yesterday. (데이비스 씨가 어제 그것을 보고했습니다. - 유사 발음 혼동 오답)'
    },
    explanation: 'Where 의문사 질문이므로 장소나 위치를 가리키는 답변을 찾아야 합니다. (A)는 의문사 의문문에 올 수 없는 Yes 응답이며, (C)는 report 단어의 중복/유사 발음 함정입니다. 직원 포털에 올라와 있다는 위치를 알려준 (B)가 정답입니다.',
    keyVocab: [
      { word: 'quarterly', meaning: '분기별의' },
      { word: 'revenue', meaning: '수익, 매출' },
      { word: 'portal', meaning: '포털 사이트, 내부 전산망' }
    ]
  },
  {
    id: 'p2-2',
    part: 2,
    type: 'question_response',
    category: 'business_collocation',
    difficulty: 'hard',
    questionText: 'Has the client approved the revised blueprint yet?',
    audioScript: {
      question: 'Has the client approved the revised blueprint yet?',
      choices: [
        '(A) I haven’t checked my email this morning.',
        '(B) No, in the conference room.',
        '(C) She wore a blue suit.'
      ]
    },
    choices: [
      { label: 'A', text: '(A) I haven’t checked my email this morning.' },
      { label: 'B', text: '(B) No, in the conference room.' },
      { label: 'C', text: '(C) She wore a blue suit.' }
    ],
    answer: 0, // A
    transcript: {
      Q: 'Has the client approved the revised blueprint yet? (고객이 수정된 도면을 승인했나요?)',
      A: '(A) I haven’t checked my email this morning. (오늘 아침 메일을 아직 확인해보지 못했습니다. - 우회적 정답)',
      B: '(B) No, in the conference room. (아니요, 회의실에서요. - 문맥 불일치)',
      C: '(C) She wore a blue suit. (그녀는 파란색 정장을 입었습니다. - blueprint의 blue 연상 함정)'
    },
    explanation: '최신 토익 고득점 변별력 문항인 "우회적 답변(모르쇠/확인해봐야 함)" 유형입니다. "오늘 아침 메일을 아직 확인하지 않아서 승인 여부를 잘 모른다"는 뉘앙스의 (A)가 정답입니다.',
    keyVocab: [
      { word: 'approve', meaning: '승인하다' },
      { word: 'revised', meaning: '수정된, 개정된' },
      { word: 'blueprint', meaning: '설계도, 청사진' }
    ]
  },

  // --- PART 3/4: 짧은 대화 / 설명문 (Conversations & Talks) ---
  {
    id: 'p3-1',
    part: 3,
    type: 'conversation_set',
    category: 'business_collocation',
    difficulty: 'medium',
    title: 'Questions 32-34 refer to the following conversation.',
    audioScript: {
      passage: `Man: Hi Sarah, do you know if the software update on the server will affect our department today?
Woman: According to the email from IT, the maintenance is scheduled for 8 PM tonight, so our regular work during office hours won't be interrupted.
Man: That's a relief! I have to submit the monthly sales analytics to the director by 5 PM.
Woman: Good luck with that. Let me know if you need any assistance compiling the customer feedback charts.`,
    },
    passageText: `Man: Hi Sarah, do you know if the software update on the server will affect our department today?
Woman: According to the email from IT, the maintenance is scheduled for 8 PM tonight, so our regular work during office hours won't be interrupted.
Man: That's a relief! I have to submit the monthly sales analytics to the director by 5 PM.
Woman: Good luck with that. Let me know if you need any assistance compiling the customer feedback charts.`,
    subQuestions: [
      {
        id: 'p3-1-q1',
        number: 32,
        questionText: 'What are the speakers mainly discussing?',
        choices: [
          { label: 'A', text: '(A) A system maintenance schedule' },
          { label: 'B', text: '(B) A new software purchase' },
          { label: 'C', text: '(C) A department relocation' },
          { label: 'D', text: '(D) A hiring process' }
        ],
        answer: 0,
        explanation: '남자가 서버 소프트웨어 업데이트 일정과 부서 영향 여부를 묻고 있고 여자가 IT 안내에 대해 답하고 있으므로 (A) 시스템 유지보수 일정이 정답입니다.'
      },
      {
        id: 'p3-1-q2',
        number: 33,
        questionText: 'When is the man required to submit a report?',
        choices: [
          { label: 'A', text: '(A) By 8:00 AM' },
          { label: 'B', text: '(B) By noon' },
          { label: 'C', text: '(C) By 5:00 PM' },
          { label: 'D', text: '(D) By 8:00 PM' }
        ],
        answer: 2,
        explanation: '남자가 "I have to submit the monthly sales analytics to the director by 5 PM."이라고 명시했으므로 (C) 5:00 PM이 정답입니다.'
      },
      {
        id: 'p3-1-q3',
        number: 34,
        questionText: 'What does the woman offer to do?',
        choices: [
          { label: 'A', text: '(A) Contact the IT department' },
          { label: 'B', text: '(B) Help compile charts' },
          { label: 'C', text: '(C) Postpone the meeting' },
          { label: 'D', text: '(D) Review the contract' }
        ],
        answer: 1,
        explanation: '여자가 마지막에 "Let me know if you need any assistance compiling the customer feedback charts."라고 도움을 제안했으므로 (B) 차트 취합 돕기가 정답입니다.'
      }
    ],
    keyVocab: [
      { word: 'maintenance', meaning: '유지보수, 점검' },
      { word: 'interrupt', meaning: '방해하다, 중단시키다' },
      { word: 'compile', meaning: '취합하다, 엮다' }
    ]
  },

  // --- PART 5: 단문 빈칸 채우기 (Incomplete Sentences) ---
  {
    id: 'p5-1',
    part: 5,
    type: 'incomplete_sentence',
    category: 'pos', // 품사 구분
    difficulty: 'easy',
    grammarPoint: '부사 자리 (동사 수식)',
    questionText: 'The executive committee reviewed the budget proposals ------- before granting final approval for the project.',
    choices: [
      { label: 'A', text: 'thorough' },
      { label: 'B', text: 'thoroughly' },
      { label: 'C', text: 'thoroughness' },
      { label: 'D', text: 'more thorough' }
    ],
    answer: 1, // B
    explanation: `[정답] (B) thoroughly
[문법 포인트] 동사구(reviewed the budget proposals) 뒤에서 동사의 행위를 수식해 주는 부사 자리입니다.
- thorough (형용사: 철저한)
- thoroughly (부사: 철저하게, 꼼꼼하게)
- thoroughness (명사: 철저함)
- more thorough (형용사 비교급)
집행위원회가 예산 제안서를 '철저하게 검토했다'는 의미가 되어야 하므로 부사 (B)가 정답입니다.`,
    translation: '집행위원회는 해당 프로젝트에 대한 최종 승인을 내리기 전에 예산 제안서를 철저하게 검토했다.',
    keyVocab: [
      { word: 'executive committee', meaning: '집행위원회' },
      { word: 'proposal', meaning: '제안서' },
      { word: 'thoroughly', meaning: '철저하게, 빈틈없이' },
      { word: 'approval', meaning: '승인, 인가' }
    ]
  },
  {
    id: 'p5-2',
    part: 5,
    type: 'incomplete_sentence',
    category: 'conjunction_preposition', // 접속사 vs 전치사
    difficulty: 'medium',
    grammarPoint: '양보의 접속사 vs 전치사 구별',
    questionText: '------- unexpected supply chain disruptions, the manufacturing team successfully delivered all orders ahead of schedule.',
    choices: [
      { label: 'A', text: 'Although' },
      { label: 'B', text: 'Despite' },
      { label: 'C', text: 'Even though' },
      { label: 'D', text: 'Whereas' }
    ],
    answer: 1, // B
    explanation: `[정답] (B) Despite
[문법 포인트] 빈칸 뒤에 오는 "unexpected supply chain disruptions"는 [형용사 + 복합명사] 구조의 '명사구'입니다. 뒤에 주어+동사(절)가 아닌 명사구가 이어지므로 전치사가 필요합니다.
- Although / Even though / Whereas 는 접속사로 뒤에 주어+동사 절이 와야 합니다.
- Despite (전치사: ~에도 불구하고) 뒤에는 명사(구)가 오므로 (B)가 적합합니다.`,
    translation: '예상치 못한 공급망 차질에도 불구하고, 제조팀은 예정보다 앞서 모든 주문을 성공적으로 납품했다.',
    keyVocab: [
      { word: 'supply chain', meaning: '공급망' },
      { word: 'disruption', meaning: '차질, 중단' },
      { word: 'ahead of schedule', meaning: '예정보다 앞서서' },
      { word: 'deliver', meaning: '배송하다, 납품하다' }
    ]
  },
  {
    id: 'p5-3',
    part: 5,
    type: 'incomplete_sentence',
    category: 'tense_voice', // 시제 및 태
    difficulty: 'medium',
    grammarPoint: '수동태 현재완료 (동작의 대상)',
    questionText: 'All travel expense claims must ------- with original itemized receipts by the end of this month.',
    choices: [
      { label: 'A', text: 'submitting' },
      { label: 'B', text: 'have submitted' },
      { label: 'C', text: 'be submitted' },
      { label: 'D', text: 'submit' }
    ],
    answer: 2, // C
    explanation: `[정답] (C) be submitted
[문법 포인트] 주어인 "All travel expense claims(모든 출장비 청구서)"는 제출을 행하는 주체가 아니라 '제출되는 대상'입니다.
조동사 must 뒤에는 동사원형이 와야 하며, 수동태 구조 [be + p.p.]가 결합된 must be submitted가 정답입니다.`,
    translation: '모든 출장비 청구서는 이번 달 말까지 품목별 원본 영수증과 함께 제출되어야 합니다.',
    keyVocab: [
      { word: 'expense claim', meaning: '경비 청구' },
      { word: 'itemized receipt', meaning: '품목별 영수증' },
      { word: 'by the end of', meaning: '~의 말까지' }
    ]
  },
  {
    id: 'p5-4',
    part: 5,
    type: 'incomplete_sentence',
    category: 'relative', // 관계사
    difficulty: 'hard',
    grammarPoint: '복합관계대명사 vs 지시대명사',
    questionText: '------- wishes to participate in the international sales seminar must register online before Friday.',
    choices: [
      { label: 'A', text: 'Whoever' },
      { label: 'B', text: 'Anyone' },
      { label: 'C', text: 'Those' },
      { label: 'D', text: 'Whomever' }
    ],
    answer: 0, // A
    explanation: `[정답] (A) Whoever
[문법 포인트] 문장 구조를 보면 wishes(동사1)와 must register(동사2) 두 개의 동사가 존재하므로 접속사 역할을 겸할 수 있는 관계대명사가 필요합니다.
- Anyone은 대명사이므로 단독으로 두 개의 절을 연결할 수 없으며 (Anyone who wishes... 라면 가능)
- Those는 복수대명사이므로 단수동사 wishes와 수일치가 맞지 않습니다.
- Whoever(=Anyone who)는 주격 복합관계대명사로서 주어 자리를 채우며 두 절을 자연스럽게 연결합니다.`,
    translation: '국제 영업 세미나에 참가하기를 원하는 사람은 누구든지 금요일 전에 온라인으로 등록해야 한다.',
    keyVocab: [
      { word: 'participate in', meaning: '~에 참가하다' },
      { word: 'register', meaning: '등록하다' },
      { word: 'whoever', meaning: '~하는 사람은 누구든지' }
    ]
  },
  {
    id: 'p5-5',
    part: 5,
    type: 'incomplete_sentence',
    category: 'business_collocation', // 비즈니스 어휘/연어
    difficulty: 'medium',
    grammarPoint: '전치사 to와 결합하는 빈출 형용사',
    questionText: 'Employees who have completed three years of consecutive service are ------- to receive an additional week of paid leave.',
    choices: [
      { label: 'A', text: 'eligible' },
      { label: 'B', text: 'capable' },
      { label: 'C', text: 'probable' },
      { label: 'D', text: 'reliable' }
    ],
    answer: 0, // A
    explanation: `[정답] (A) eligible
[문법/어휘 포인트] 'be eligible to + 동사원형 (~할 자격이 있다)'은 토익 최빈출 콜로케이션입니다.
- be capable of + -ing (~할 능력이 있다)
- probable (유망한, 일어남직한)
- reliable (신뢰할 수 있는)
따라서 3년 연속 근속한 직원은 1주일의 추가 유급휴가를 받을 자격이 있다는 의미로 (A)가 정답입니다.`,
    translation: '3년 연속 근속을 마친 직원은 1주일의 추가 유급 휴가를 받을 자격이 주어집니다.',
    keyVocab: [
      { word: 'consecutive', meaning: '연속적인' },
      { word: 'be eligible to', meaning: '~할 자격이 있다' },
      { word: 'paid leave', meaning: '유급 휴가' }
    ]
  },

  // --- PART 6: 장문 빈칸 채우기 (Text Completion) ---
  {
    id: 'p6-1',
    part: 6,
    type: 'text_completion',
    category: 'business_collocation',
    difficulty: 'medium',
    title: 'Questions 131-134 refer to the following email.',
    passageText: `To: All Staff Members
From: Human Resources Department
Date: September 10, 2026
Subject: Upgraded Cafeteria Facilities

We are delighted to announce that the renovation of the company cafeteria has finally been completed. Starting next Monday, the facility will reopen with an [131:expanded] seating capacity and a variety of healthier dining options. 

To celebrate this occasion, free beverage vouchers will be distributed to everyone on opening day. Please note that the automated payment kiosks have also been updated to accept contactless mobile transactions. [132:-------].

We encourage all employees to visit and enjoy the revamped environment. If you have any feedback regarding the new menu offerings, please feel free to contact HR. [133:-------], your opinions help us create a better workplace for everyone.

Thank you for your [134:cooperation] during the construction period.`,
    blanks: [
      {
        blankId: 131,
        questionText: 'Question 131: Select the best word for blank [131].',
        choices: [
          { label: 'A', text: 'expanded' },
          { label: 'B', text: 'expanding' },
          { label: 'C', text: 'expansion' },
          { label: 'D', text: 'expands' }
        ],
        answer: 0,
        explanation: '명사구 "seating capacity(좌석 수용 능력)"를 앞에서 수식하여 \'확장된\'이라는 완료/수동 의미를 갖는 과거분사 형용사 (A) expanded가 정답입니다.'
      },
      {
        blankId: 132,
        questionText: 'Question 132: Choose the sentence that best fits the blank [132].',
        choices: [
          { label: 'A', text: 'This will significantly reduce waiting times during peak lunch hours.' },
          { label: 'B', text: 'The parking lot will be closed for resurfacing next week.' },
          { label: 'C', text: 'Please return all borrowed library books immediately.' },
          { label: 'D', text: 'All flights have been delayed due to severe weather.' }
        ],
        answer: 0,
        explanation: '앞 문장에서 비접촉 모바일 결제가 가능한 자동 키오스크가 업데이트되었다고 설명했으므로, 이와 논리적으로 이어지는 결과인 "이로 인해 점심 피크 시간대의 대기 시간이 대폭 단축될 것입니다" (A)가 가장 자연스럽습니다.'
      },
      {
        blankId: 133,
        questionText: 'Question 133: Select the best word for blank [133].',
        choices: [
          { label: 'A', text: 'In conclusion' },
          { label: 'B', text: 'After all' },
          { label: 'C', text: 'Meanwhile' },
          { label: 'D', text: 'Otherwise' }
        ],
        answer: 1,
        explanation: '의견 피드백을 환영하며 "어쨌든/결국(After all), 여러분의 의견은 모두를 위한 더 나은 일터를 만드는 데 도움이 됩니다"라는 이유를 뒷받침하는 연결어 (B) After all이 적절합니다.'
      },
      {
        blankId: 134,
        questionText: 'Question 134: Select the best word for blank [134].',
        choices: [
          { label: 'A', text: 'complaint' },
          { label: 'B', text: 'reluctance' },
          { label: 'C', text: 'cooperation' },
          { label: 'D', text: 'hesitation' }
        ],
        answer: 2,
        explanation: '공사 기간 동안 보여준 협조에 감사한다는 의미이므로 문맥상 (C) cooperation(협조)이 정답입니다.'
      }
    ],
    keyVocab: [
      { word: 'revamped', meaning: '개조된, 새로 단장한' },
      { word: 'contactless', meaning: '비접촉식의' },
      { word: 'seating capacity', meaning: '좌석 수용 인원' }
    ]
  },

  // --- PART 7: 독해 (Reading Comprehension) ---
  {
    id: 'p7-1',
    part: 7,
    type: 'reading_comprehension',
    category: 'business_collocation',
    difficulty: 'medium',
    title: 'Questions 147-148 refer to the following advertisement.',
    passageText: `Apex Cloud Solutions: Elevate Your Team's Productivity

Are you struggling to manage remote team workflows efficiently? Apex Cloud Solutions offers an integrated workspace platform tailored for growing enterprises. Our software consolidates project management, instant team messaging, and encrypted cloud storage into a single intuitive interface.

Special Introductory Offer:
Sign up for an annual enterprise plan before October 31 and receive:
- 20% discount on the first year subscription
- Free customized onboarding training session for your staff (valued at $500)
- 24/7 dedicated account manager support

Over 5,000 businesses worldwide trust Apex Cloud Solutions to streamline operations and boost collaboration. Visit www.apexcloudsolutions.com/trial today to start your risk-free 30-day trial. No credit card required.`,
    questions: [
      {
        id: 'p7-1-q1',
        number: 147,
        questionText: 'What service does Apex Cloud Solutions provide?',
        choices: [
          { label: 'A', text: 'Office furniture leasing' },
          { label: 'B', text: 'Integrated workspace software' },
          { label: 'C', text: 'Commercial real estate brokerage' },
          { label: 'D', text: 'Hardware repair services' }
        ],
        answer: 1,
        explanation: '지문 첫 문단에서 "integrated workspace platform... consolidates project management, instant team messaging, and encrypted cloud storage"라고 명시되어 있으므로 (B) 통합 업무 소프트웨어가 정답입니다.'
      },
      {
        id: 'p7-1-q2',
        number: 148,
        questionText: 'What benefit is offered to customers who subscribe before October 31?',
        choices: [
          { label: 'A', text: 'A free tablet device' },
          { label: 'B', text: 'Complimentary staff training' },
          { label: 'C', text: 'Two years of free cloud storage' },
          { label: 'D', text: 'Lifetime subscription discount' }
        ],
        answer: 1,
        explanation: '10월 31일 이전 가입 혜택 목록 중 "Free customized onboarding training session for your staff"가 명시되어 있으므로 (B) 무료 직원 교육 세션 제공이 정답입니다.'
      }
    ],
    keyVocab: [
      { word: 'consolidate', meaning: '통합하다, 하나로 묶다' },
      { word: 'streamline', meaning: '간소화하다, 능률화하다' },
      { word: 'onboarding', meaning: '신규 참여/교육 과정' }
    ]
  }
];
