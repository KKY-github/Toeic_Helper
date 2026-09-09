# 🎓 TOEIC Helper (토익 AI 스마트 학습 도우미)

<div align="center">

![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-1.5%20Flash-8E75B2?style=for-the-badge&logo=google-gemini&logoColor=white)
![Web Speech API](https://img.shields.io/badge/Web%20Speech-TTS%20%26%20Audio-FF6B6B?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

<br/>

**생성형 AI(Google Gemini)와 스마트 음성 엔진(Web Speech / Web Audio API)을 결합한 차세대 토익(TOEIC) 올인원 맞춤형 학습 플랫폼**  
실전 파트별 문제 풀이, 인터랙티브 어휘 학습, 취약 유형 실시간 AI 문제 생성, 그리고 스마트 오답노트까지 한 곳에서 제공합니다.

</div>

---

## 📋 목차
1. [프로젝트 소개](#-프로젝트-소개)
2. [핵심 기능 명세](#-핵심-기능-명세)
3. [기술 스택 및 아키텍처](#-기술-스택-및-아키텍처)
4. [프로젝트 구조](#-프로젝트-구조)
5. [설치 및 실행 방법](#-설치-및-실행-방법)
6. [상세 기능 사용 가이드](#-상세-기능-사용-가이드)
7. [데이터 저장 및 보안](#-데이터-저장-및-보안)

---

## 💡 프로젝트 소개

**TOEIC Helper**는 토익 수험생이 시간 낭비 없이 목표 점수(600점부터 900+ 만점까지)를 최단기간에 달성할 수 있도록 설계된 웹 애플리케이션입니다.

- **실시간 AI 문제 생성**: 수험생의 취약 문법 유형(시제, 수일치, 접속사/전치사 등)을 타깃팅하여 Google Gemini 기반 무한 실전문제를 생성합니다.
- **다국적 억양 LC 플레이어**: 네이티브 Web Speech API를 활용해 미국(🇺🇸), 영국(🇬🇧), 호주(🇦🇺) 원어민 발음 및 4단계 배속(0.75x ~ 1.5x)을 지원합니다.
- **인터랙티브 텍스트(Clickable Text)**: 지문이나 문제 속 모르는 영단어를 클릭하기만 하면 즉시 사전 뜻 조회 및 단어장 저장이 가능합니다.
- **100% 무서버 로컬 지속성**: 별도의 백엔드 데이터베이스 없이 브라우저의 안전한 로컬 저장소를 활용하여 학습 기록, 오답노트, 단어장을 완벽 보존하며 JSON 백업/복원을 지원합니다.

---

## ✨ 핵심 기능 명세

### 1. 📊 스마트 대시보드 (Dashboard)
- **점수 예측 및 목표 달성률**: 학습량과 정답률 데이터를 기반으로 실시간 예상 점수와 목표치 게이지 산출
- **연속 학습 스트릭 (🔥 Streak)**: 매일의 학습 출석을 체크하고 동기를 부여하는 스트릭 카운터
- **취약 문법 포인트 TOP 5 분석**: 가장 자주 틀린 문법 카테고리를 자동 도출하고, 1-Click "집중 훈련" 연동
- **파트별 정답률 차트**: RC(Part 5~7)와 LC(Part 1~4)의 영역별 정답률을 시각적 막대 그래프로 제공

### 2. 📖 RC (Reading Comprehension) 트레이닝
| 파트 | 주요 기능 및 특징 |
| :--- | :--- |
| **Part 5** (단문 빈칸 채우기) | • 권장 25초 카운트다운 타이머 제공<br/>• 문법 유형 배지(품사, 수일치, 시제/태, 접속사/전치사 등)<br/>• 제출 즉시 정답 여부 사운드(Web Audio Chime) & AI 심층 해설/전문 해석 제공<br/>• 취약 유형 발생 시 **"동일 유형 AI 문제 즉시 생성"** 연동 버튼 |
| **Part 6** (장문 빈칸 채우기) | • 비즈니스 이메일, 회람, 공지 등 실전 비즈니스 포맷 지문 뷰어<br/>• 4개 빈칸([131]~[134]) 연계 풀이 및 전체 문맥 적합 문장 삽입 지원 |
| **Part 7** (독해 완성) | • 비즈니스 기사, 광고문 등 장문 독해 지문과 복수 문항 연계 |
| **공통** | • 모든 지문과 선지에 **인터랙티브 단어 클릭(`ClickableText`)** 적용 (단어 클릭 시 즉시 뜻 팝업 및 단어장 저장) |

### 3. 🎧 LC (Listening Comprehension) 트레이닝
| 파트 | 주요 기능 및 특징 |
| :--- | :--- |
| **Part 1** (사진 묘사) | • 비즈니스 회의, 창고 물류 등 고품질 실전 시각 자료 렌더링<br/>• (A), (B), (C), (D) 개별 보기별 음성 및 전체 듣기 지원 |
| **Part 2** (질의응답) | • 질문 청취 후 3지선다(A, B, C) 즉각 선택<br/>• 유사 발음 혼동 및 우회적 답변 함정 해설 제공 |
| **Part 3 & 4** (대화 및 담화) | • 2~3인 남녀 화자 대화 스크립트 기반 오디오 스트림<br/>• 3개 연계 문항 세트 동시 풀이 |
| **스마트 오디오 컨트롤러** | • **3개국 네이티브 억양 선택**: 🇺🇸 미국, 🇬🇧 영국, 🇦🇺 호주<br/>• **4단계 배속 조절**: `0.75x`, `1.0x`, `1.25x`, `1.5x`<br/>• 구간 무한 반복 재생(Loop) & 정답 확인 후 스크립트 대조 기능 |

### 4. 📚 나만의 단어장 (Voca Vault)
- **사용자 단어 직접 추가 (`WordModal`)**:
  - 단어명, 품사(명사/동사/형용사/부사 등), 한글 뜻, 예문, 예문 해석, 카테고리, 개인 암기 팁/연상 메모 등록
  - **AI 자동완성 번개(⚡) 버튼**: 단어만 입력하고 클릭하면 AI가 품사/뜻/예문을 자동으로 추천 및 입력
  - 단어별 원어민 TTS 발음 청취
- **3가지 맞춤형 학습 모드**:
  1. **카드 & 목록 뷰**: 품사 배지, 검색 필터(단어/뜻/예문), 암기완료(Mastered) 토글, 직접 추가 단어 필터
  2. **3D 플래시카드 모드**: 부드러운 3D 카드 뒤집기 애니메이션을 통한 빠른 암기 점검 ("외웠어요" / "헷갈려요")
  3. **어휘 스피드 퀴즈 모드**: 단어장 기반 10문항 4지선다 퀴즈 + 만점/완료 시 컨페티(Confetti 폭죽) 축하 효과

### 5. 🤖 실시간 AI 맞춤형 문제 생성기 (`AIGeneratorView`)
- **타깃 커스터마이징**:
  - 파트 선택: Part 5 (단문) / Part 6 (장문)
  - 문법 영역: 품사 자리, 수일치, 시제 및 태, 접속사 vs 전치사, 관계사, 준동사(to부정사/동명사/분사), 가정법/도치, 비즈니스 빈출 어휘
  - 목표 난이도: 입문/중급(600~700), 실전(750~850), 고난도 킬러(900+ 만점)
- **하이브리드 듀얼 엔진**:
  - **Google Gemini 1.5 Flash**: API 키 입력 시 최신 AI 모델이 프롬프트 기반 정밀 토익 문제 생성
  - **스마트 시뮬레이터 Fallback Engine**: API 키가 없거나 네트워크 오류 시에도 내장된 토익 문제 은행과 규칙 엔진을 통해 즉각적인 고품질 문제 생성 보장
- 생성된 문제는 즉석 풀이 후 개인 문제 은행에 영구 저장 가능

### 6. 📝 스마트 오답노트 (`MistakeNoteView`)
- **오답 자동 수집**: 풀이 중 틀린 문항은 문제, 지문, 선택한 오답, 정답, 문법 포인트와 함께 자동 기록
- **에빙하우스 망각곡선 기반 복습 알림**: 최적의 복습 주기에 맞춰 복습 권장 뱃지 표시
- **나만의 오답 원인 메모**: "내가 왜 이 보기를 골랐는지", "어떤 함정에 빠졌는지" 개인 피드백 기록
- **오답 즉석 재시험**: 오답노트 안에서 문제를 다시 풀어보고 정답 시 '마스터 완료' 상태로 전환

### 7. ⚙️ 설정 및 데이터 관리 (`SettingsModal`)
- 목표 토익 점수 및 일일 문제 풀이 목표 설정
- Google Gemini API Key 등록 및 안전한 로컬 보관
- 전체 학습 데이터 JSON 내보내기(Backup), 가져오기(Restore), 데이터 초기화(Reset) 지원
- 눈의 피로를 줄여주는 완전한 다크 모드 / 라이트 모드 지원

---

## 🛠 기술 스택 및 아키텍처

```
toeic_Helper/
├── Frontend Core   : React 19 (19.2.8), React DOM 19.2.8
├── Build Tool      : Vite 8 (8.2.2) + @vitejs/plugin-react
├── Styling         : Tailwind CSS v4 (@tailwindcss/vite, tailwindcss 4.3.3)
├── Audio Engine    : Web Speech API (Native SpeechSynthesis) & Web Audio API (Chimes)
├── AI Engine       : Google Gemini 1.5 Flash REST API + Offline Heuristic Simulator
├── Icons & FX      : Lucide React, Canvas Confetti
├── Linter          : Oxlint (1.79.0)
└── Persistence     : Browser LocalStorage Architecture
```

### 시스템 아키텍처 다이어그램

```mermaid
flowchart TD
    subgraph UI_Layer ["사용자 인터페이스 (React 19 + Tailwind v4)"]
        Nav[Navbar & Global WordModal]
        Dash[DashboardView]
        RC[Part 5, 6, 7 Views]
        LC[Part 1, 2, 3/4 Views]
        Vocab[VocabView (Cards / Flashcards / Quiz)]
        Mistakes[MistakeNoteView]
        AIGen[AIGeneratorView]
    end

    subgraph Service_Layer ["코어 비즈니스 로직 & 서비스"]
        Storage[StorageService\n(LocalStorage CRUD)]
        TTS[TTSService\n(Web Speech & Web Audio)]
        AI[AIService\n(Gemini 1.5 Flash + Fallback Bank)]
    end

    subgraph Data_Layer ["데이터 및 영속성"]
        LS[(Browser LocalStorage)]
        InitialData[초기 토익 문제 & 빈출 어휘]
    end

    UI_Layer --> Service_Layer
    Service_Layer --> Data_Layer
```

---

## 📂 프로젝트 구조

```
toeic_Helper/
├── index.html                 # 앱 진입점 HTML
├── package.json               # 프로젝트 의존성 및 스크립트
├── vite.config.js             # Vite 및 TailwindCSS 플러그인 설정
├── public/                    # 정적 에셋
└── src/
    ├── main.jsx               # React 19 렌더 루트
    ├── App.jsx                # 메인 라우터, 전역 상태, 모달 통합
    ├── index.css              # Tailwind CSS 및 커스텀 애니메이션 토큰
    ├── components/
    │   ├── common/
    │   │   ├── Navbar.jsx         # 상단 네비게이션, 스트릭/통계 배지, 다크모드
    │   │   ├── AudioPlayer.jsx    # 국가별 억양/배속 제어 오디오 컴포넌트
    │   │   ├── ClickableText.jsx  # 단어 클릭 시 뜻 조회 및 단어장 연동 컴포넌트
    │   │   └── WordModal.jsx      # 사용자 단어 직접 등록 및 AI 자동완성 모달
    │   ├── dashboard/
    │   │   ├── DashboardView.jsx  # 대시보드 (점수, 스트릭, 취약점 TOP 5, 차트)
    │   │   └── SettingsModal.jsx  # 목표 설정, Gemini API 키 관리, JSON 백업/복원
    │   ├── rc/
    │   │   ├── Part5View.jsx      # Part 5 단문 빈칸 + 타이머 + 실시간 해설
    │   │   ├── Part6View.jsx      # Part 6 장문 빈칸 + 4문항 세트 풀이
    │   │   └── Part7View.jsx      # Part 7 독해 지문 풀이
    │   ├── lc/
    │   │   ├── Part1View.jsx      # Part 1 사진 묘사 + 개별 선지 음성
    │   │   ├── Part2View.jsx      # Part 2 질의응답 (3지선다)
    │   │   └── Part34View.jsx     # Part 3/4 대화/담화 다문항 세트
    │   ├── vocab/
    │   │   └── VocabView.jsx      # 단어장 목록, 3D 플래시카드, 10문항 스피드 퀴즈
    │   ├── mistakes/
    │   │   └── MistakeNoteView.jsx# 오답노트 (복습 주기, 개인 메모, 즉석 재시험)
    │   └── ai-generator/
    │       └── AIGeneratorView.jsx# 파트/문법/난이도별 실시간 AI 토익 문제 생성기
    ├── data/
    │   ├── initialQuestions.js    # 검증된 토익 실전 샘플 문제 데이터
    │   └── initialVocab.js        # 토익 빈출 핵심 단어 기본 데이터
    └── services/
        ├── storageService.js      # 로컬 스토리지 데이터 입출력 및 정규화
        ├── ttsService.js          # Web Speech API 및 Web Audio 효과음 제어
        └── aiService.js           # Gemini API 호출 및 오프라인 Fallback 생성기
```

---

## 🚀 설치 및 실행 방법

### 요구 사항
- **Node.js**: v18.0.0 이상 권장
- **npm**: v9.0.0 이상

### 1. 저장소 복제 (Clone)
```bash
git clone https://github.com/KKY-github/Toeic_Helper.git
cd Toeic_Helper
```

### 2. 의존성 패키지 설치
```bash
npm install
```

### 3. 로컬 개발 서버 구동
```bash
npm run dev
```
터미널에 표시되는 로컬 URL(`http://localhost:5173`)로 브라우저에서 접속합니다.

### 4. 프로덕션 빌드 및 배포 미리보기
```bash
# 프로덕션 번들 빌드 (dist/ 생성)
npm run build

# 빌드 결과물 로컬 미리보기
npm run preview
```

### 5. 코드 린트 검사
```bash
npm run lint
```

---

## 📖 상세 기능 사용 가이드

### 1. 나만의 단어 추가 및 학습
1. 화면 상단 네비게이션 우측의 **"+ 새 단어"** 버튼을 누르거나 단어장 탭으로 이동합니다.
2. 추가할 영어 단어를 입력한 뒤 **번개(⚡) 아이콘**을 클릭하면 AI가 품사, 한국어 뜻, 비즈니스 예문을 자동으로 채워줍니다.
3. 스피커 아이콘을 눌러 원어민 발음을 확인하고 저장합니다.
4. 문제를 푸는 중 지문이나 선지의 모르는 단어를 클릭(`ClickableText`)하여 즉시 단어장에 북마크할 수도 있습니다.
5. 단어장 상단에서 **[목록 뷰]**, **[플래시카드]**, **[스피드 퀴즈]** 탭을 전환하며 반복 학습을 진행합니다.

### 2. AI 문제 생성 및 Gemini API 키 등록 (선택 사항)
> [!NOTE]
> Gemini API 키를 입력하지 않아도, 내장된 **스마트 시뮬레이터**를 통해 기본 템플릿과 유형별 문제 생성을 무제한으로 이용할 수 있습니다.

1. 화면 상단 우측의 **⚙️(설정)** 아이콘을 클릭합니다.
2. [Google AI Studio](https://aistudio.google.com/)에서 발급받은 Gemini API 키를 입력하고 저장합니다.
3. 상단 메뉴의 **"AI 문제 생성"** 탭으로 이동합니다.
4. 원하는 **파트(Part 5/6)**, **문법 영역(시제, 수일치, 품사 등)**, **목표 난이도**를 선택하고 **"AI 문제 생성하기"**를 누릅니다.
5. 생성된 문제를 풀고, 즉시 정답 및 상세 해설을 확인한 뒤 오답노트나 문제 은행에 반영합니다.

### 3. LC 음성 청취 옵션 활용
- LC 문제 풀이 화면 상단 오디오 플레이어에서:
  - 🇺🇸 **US** (미국식 표준 발음)
  - 🇬🇧 **UK** (영국식 억양)
  - 🇦🇺 **AU** (호주식 억양)
- 취약한 발음 환경에 맞춰 선택할 수 있으며, 배속을 `1.25x` 또는 `1.5x`로 올려 실전 고난도 청취 훈련을 수행할 수 있습니다.

### 4. 오답노트 관리 및 복습
1. 문제를 틀리면 오답노트에 자동 등록됩니다.
2. **"내가 왜 틀렸는지"** 입력란에 개인적인 실수 원인(예: "수일치를 안 보고 시제만 봄")을 메모합니다.
3. 시간이 지난 후 **"다시 풀기"** 버튼을 눌러 재도전하고, 맞히면 **"마스터 완료"** 처리하여 취약점을 지워나갑니다.

---

## 🔒 데이터 저장 및 보안

- **프라이버시 보장**: 입력한 단어, 풀이 기록, 오답 메모, API Key 등 모든 데이터는 사용자의 브라우저 로컬 저장소(`localStorage`)에만 보관되며 외부 서버로 무단 전송되지 않습니다.
- **백업 및 기기 이전**:
  - 설정 모달(⚙️)의 **"데이터 백업 (JSON 내보내기)"**를 클릭하여 현재까지의 모든 학습 데이터를 파일로 내려받을 수 있습니다.
  - 다른 PC나 브라우저에서 **"백업 파일 불러오기 (Import)"**를 통해 손쉽게 이전할 수 있습니다.

---

## 📄 라이선스 (License)

This project is licensed under the [MIT License](LICENSE).
자유롭게 수정 및 재배포가 가능합니다.
