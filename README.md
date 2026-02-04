> ## ✏️ FE 21기 기초 프로젝트 : wikied

- 일정 : 2026. 02. 04 ~ 2026. 2.23
  <br> 2월 17일 ~ 20일(버그수정, 리팩토링, README정리, 시연영상 만들기)
  <br> 2월 21일 배포
- 팀명 : FE 21기 Part3 1팀
- 배포 URL : vercel -

> ## 💻 프로젝트 소개

- 프로젝트명 : wikied<br>
- 프로젝트 소개 : 위키 기반 소셜 네트워크 서비스
- 프로젝트 기획 요구사항
  <br>디자인 시안: [위키드 피그마](https://www.figma.com/design/7aLjzZy50LPISym2AMxuQW/-BBB-%EC%9C%84%ED%82%A4%EB%93%9C?node-id=1-1566&t=9GKiXgxR7KKUayno-0)
  <br>Swagger 문서 : https://wikied-api.vercel.app/docs/#/

> ## 🎯 프로젝트 목표

단순한 게시판 기능을 구현하는 데서 그치지 않고, 유저들이 직접 참여하고 함께 내용을 만들어가는 구조를 경험해보고 싶어 위키 기반 SNS 형태의 프로젝트를 선택했습니다.
기초 프로젝트를 통해 기본적인 화면 구성과 CRUD 구현에 익숙해진 이후, 인증 처리나 전역 상태 관리처럼 조금 더 복잡한 흐름을 다뤄볼 필요가 있다고 느꼈고, 그 연장선에서 이 프로젝트를 진행하게 되었습니다.

로그인과 인증 과정에서는 Refresh Token 구조를 적용해 실제 서비스와 비슷한 흐름을 만들어보고, 위키 편집 기능과 텍스트 에디터, 반응형 UI 등을 구현하면서 다양한 라이브러리를 직접 사용해보는 데 집중합니다.
또한 TanStack Query를 도입해 API 요청이 많은 환경에서 서버 데이터를 어떻게 관리하고 최적화할 수 있는지 경험해보고자 합니다.

<br>

> ## 🗓️ 개발 일정

- **26년 2월 3일:** R&R 분배 및 전반적인 흐름 결정
- **26년 2월 4일:** 기초 세팅 및 공용 UI 컴포넌트 제작
- **26년 2월 9일:** 1차 점검
- **26년 2월 16일:** 2차 점검
- **26년 2월 17일:** 리펙토링 및 버그 수정
- **26년 2월 21일:** 배포
- **26년 2월 22일:** 발표 준비
- **26년 2월 24일:** 프로젝트 제출
- **프로젝트종료:** 2월 24일 오전까지 / 제출은 자정까지

<br>

> ## 🛠 사용된 기술 스택 및 도구

- **프레임워크**: React (Vite), TypeScript, Next.js
- **상태 관리**: React Hooks(useState, useEffect), Context API
- **스타일링**: Tailwind CSS, shadcn/ui (UI컴포넌트 라이브러리)
- **데이터 통신**: Axios
- **인증**: OAuth
- **라우팅**: React Router
- **개발 및 버전 관리**: VS Code, Git / GitHub
- **빌드 및 배포**: NPM, Vercel
- **협업**: Git / GitHub, Discord, Google Docs
- **기술 스택 선택 이유:**
  본 프로젝트는 실제 서비스에 가까운 구조와 개발 환경을 경험하는 것을 목표로
  프론트엔드 중심의 기술 스택을 구성했습니다.

> #### Next.js + React + TypeScript

Next.js를 활용하여 파일 기반 라우팅과 서버/클라이언트 컴포넌트 구조를 경험하고,
TypeScript를 통해 컴포넌트와 데이터 구조의 타입 안정성을 확보했습니다.
이를 통해 런타임 오류를 줄이고, 협업 시 코드 가독성과 유지보수성을 높이고자 했습니다.

> #### Tailwind CSS + shadcn/ui

Tailwind CSS를 사용해 빠른 UI 개발과 일관된 디자인 시스템을 유지했고,
shadcn/ui를 통해 접근성과 확장성이 검증된 UI 컴포넌트를 활용하여
공통 컴포넌트 개발 비용을 줄이고 생산성을 높였습니다.

> ### Zustand + useState

단순한 UI 상태는 useState로 관리하고,
여러 페이지에서 공유되는 전역 상태는 Zustand로 분리하여
상태 관리 복잡도를 최소화하면서도 확장 가능한 구조를 설계했습니다.

> ### MongoDB + MongoDB Atlas

문서 기반 데이터베이스인 MongoDB를 사용하여
위키, 게시글, 사용자 정보와 같은 유연한 데이터 구조를 효율적으로 관리하고,
Atlas를 통해 클라우드 환경에서 안정적인 데이터 운영을 경험했습니다.

> ### OAuth
>
> 소셜 로그인 기반 인증 방식을 적용하여
> 보안성과 사용자 편의성을 동시에 고려한 인증 흐름을 구현했습니다.

> ### Vercel + AWS S3

Vercel을 통해 Next.js 프로젝트를 빠르고 안정적으로 배포하고,
AWS S3를 활용해 이미지 및 정적 리소스를 분리 관리하여
확장성과 성능을 고려한 인프라 구조를 구성했습니다.

> ### 개발 도구 (ESLint / Prettier / Husky)

ESLint와 Prettier로 코드 품질과 스타일을 통일하고,
Husky를 통해 커밋 단계에서 린트 검사를 자동화하여
팀 협업 시 발생할 수 있는 코드 품질 문제를 사전에 방지했습니다.

<br>

> ## 👥 팀원 소개 및 역할

<table width="100%" style="table-layout: fixed;">
  <tr>
    <td align="center" width="50%" style="padding:20px;">
      <h3>정주은</h3>
      <a href="https://github.com/zzungju">@zzungju</a>
      <br><br>
      ⭐ 회원가입 페이지<br>
      ⭐ 로그인 페이지<br>
      ⭐ 계정 설정 페이지<br>
    </td>
    <td align="center" width="50%" style="padding:20px;">
      <h3>김민성</h3>
      <a href="https://github.com/gitget1">@gitget1</a>
      <br><br>
      ⭐ 깃 초기 세팅<br>
      ⭐ PR권한<br>
      ⭐ 디스코드 연결<br>
      ⭐ 위키페이지<br>
    </td>
  </tr>

  <tr>
    <td align="center" width="50%" style="padding:20px;">
      <h3>이해인</h3>
      <a href="https://github.com/leehi9558">@leehi9558</a>
      <br><br>
      ⭐ README 작업<br>
      ⭐ 랜딩 페이지<br>
      ⭐ 위키 목록 페이지<br>
    </td>
    <td align="center" width="50%" style="padding:20px;">
      <h3>염승현</h3>
      <a href="https://github.com/YeomSeunghyeon">@YeomSeunghyeon</a>
      <br><br>
      ⭐ 게시판<br>
      ⭐ 상세 페이지<br>
      ⭐ 등록 페이지<br>
    </td>
  </tr>
</table>

---

> ## 📢 팀 규칙

- 4시간 동안 해결되지 않은 문제는 공유하기
- 팀회의 시간에 합의된것만 작업하기 (필요하다면 팀회의 요청)
- 코어시간(필수 상주시간) : 2시~5시
- 코어시간 외에 필요한 경우에는 긴급 회의 열기
- 합의되었을 경우에만 기술스택 변경 가능
- 매일 `merge`하기

<br>

> ## 💡 기능 요구사항

> 페이지 구성

- 메인 페이지 (`/`)
- 로그인 페이지 (`/login`)
- 회원가입 페이지 (`/signup`)
- 계정 설정 페이지 (`/mypage`)
- 내 위키 페이지 (`/wiki/{code}`)
- 위키 상세페이지 (`/wiki/{code}`)
- 위키 목록 (`/wikilist`)
- 자유게시판 목록 (`/boards`)
- 게시물 등록 페이지 (`/addboard`)
- 게시물 상세 페이지 (`/board/{boardId}`)

<br>

> ## 핵심 기능

> ### 📌 공통 (전 페이지 공통 기준)

#### 폰트·컬러 디자인 토큰 설정

#### 공용 컴포넌트 재사용 (Button, Input, Modal 등)

#### 반응형 레이아웃 대응

> ### 📌 메인 랜딩페이지

#### 주요 페이지로 이동하는 네비게이션

#### 로그인 여부에 따른 조건부 이동

#### 로그인 O → 내 위키

#### 로그인 X → 로그인 페이지

> ### 📌 로그인 페이지

#### 이메일·비밀번호 입력 및 유효성 검사

#### 로그인 성공 시 토큰 발급

#### 로그인 실패 시 에러 메시지 표시

#### 회원가입 페이지 이동

> ### 📌 회원가입 페이지

#### 입력값 유효성 검사 (이름 / 이메일 / 비밀번호)

#### 비밀번호 확인 로직

#### 가입 완료 후 로그인 페이지 이동

> ### 📌 마이페이지 계정 설정

#### 비밀번호 변경

#### 질문 + 답 입력 → 내 위키 생성

> ### 📌 내 위키 페이지

#### 퀴즈 정답 시 수정 권한 획득

#### 내 위키일 경우:

#### 인적사항 수정 가능

#### 위키 내용 수정 가능

#### 수정 가능 시간 5분 제한 + 타임아웃 모달

#### 위키 참여 링크 복사

> ### 📌 위키 상세 (타인 위키)

#### 퀴즈 정답 시 위키 내용 수정 가능

#### 인적사항 수정 ❌

#### 수정 가능 시간 5분 제한

#### 위키 참여 링크 복사

#### 👉 내 위키 / 타인 위키 권한 차이 처리가 핵심

> ### 📌 위키 목록 페이지

#### 전체 위키 리스트 렌더링

#### 위키 카드 클릭 → 상세 페이지 이동

#### 위키 참여 링크 복사

#### (없을 경우 EmptyState 표시)

> ### 📌 자유게시판 목록

#### 게시글 리스트 조회

#### 베스트 게시글 정렬

#### 제목 기반 검색

#### 게시글 상세 이동

> ### 📌 게시물 등록

#### 게시글 작성 및 등록

#### 등록 완료 후 상세 페이지 이동

#### 목록 페이지 복귀

> ### 📌 게시물 상세

#### 게시글 상세 조회

#### 작성자일 경우:

#### 수정 / 삭제

#### 댓글 작성

#### 내가 쓴 댓글 수정

> ### 🔔 알림 기능 (공통 기능)

#### 위키 수정 내역 알림 확인

#### 알림 개별 삭제

<br>

---

> ## 📁 폴더 구조

```
src/
├── assets/
│   ├── images/              # 공용 이미지
│   ├── icons/               # svg 아이콘
│   └── fonts/               # 웹폰트
│
├── styles/
│   └── globals.css          # tailwind base / reset
│
├── components/
│   ├── ui/                  # 순수 공용 UI
│   │   ├── Button/
│   │   │   └── Button.tsx
│   │   ├── Input/
│   │   ├── Modal/
│   │   ├── Dropdown/
│   │   ├── Snackbar/
│   │   └── Pagination/
│   │
│   ├── layout/              # 레이아웃 컴포넌트
│   │   ├── NavBar.tsx
│   │   ├── Footer.tsx
│   │   └── PageLayout.tsx
│   │
│   └── common/              # 여러 도메인에서 쓰는 컴포넌트
│       └── EmptyState.tsx
│
├── pages/
│   ├── _app.tsx             # 전역 설정 (layout, provider)
│   ├── _document.tsx
│   ├── index.tsx            # 메인 랜딩 (/)
│
│   ├── login/
│   │   └── index.tsx
│   ├── signup/
│   │   └── index.tsx
│   ├── mypage/
│   │   └── index.tsx
│
│   ├── wikilist/
│   │   └── index.tsx
│   ├── wiki/
│   │   └── [code].tsx
│
│   ├── boards/
│   │   ├── index.tsx
│   │   └── [boardId].tsx
│   ├── addboard/
│   │   └── index.tsx
│
├── stores/                  # Zustand 상태 관리
│   ├── auth.store.ts
│   ├── wiki.store.ts
│   └── notification.store.ts
│
├── api/                     # API 통신 로직
│   ├── axios.ts             # axios 인스턴스
│   ├── auth.api.ts
│   ├── wiki.api.ts
│   └── board.api.ts
│
├── hooks/                   # 커스텀 훅
│   ├── useAuth.ts
│   ├── useTimer.ts
│   └── useModal.ts
│
├── utils/                   # 순수 유틸
│   ├── validators.ts        # 이메일, 비밀번호 검증
│   ├── copyToClipboard.ts
│   └── formatDate.ts
```

---

> ## API 설계

- **API 통신 방식**: REST API
- **예시**:
  - GET /list : 리스트 목록 조회
  - POST /list : 리스트 생성

---

> ## ✨ 깃 커밋 컨벤션 & Branch 전략

### 커밋 컨벤션 (Gitmoji 기반)

| 아이콘 |   이모지 코드    |   타입   |                          설명                           |
| :----: | :--------------: | :------: | :-----------------------------------------------------: |
|   ✨   |    :sparkles:    |   Feat   |      사용자 또는 시스템 관점에서 새로운 기능 추가       |
|   🐛   |      :bug:       |   Fix    | 기존 기능의 버그 수정 (동작 오류, 예외 상황, 로직 오류) |
|   🎨   |      :art:       |  Style   |      CSS, 레이아웃 등 UI/UX 변경 (기능 변화 없음)       |
|   📝   | :page_facing_up: |   Docs   |                        문서 수정                        |
|   ♻️   |    :recycle:     | Refactor |  기능 변화 없이 구조 개선, 중복 제거, 가독성 향상 code  |
|   🔧   |     :wrench:     |  Chore   |         빌드, 설정, 패키지 관리 등 기능 외 작업         |

> ## 📌 커밋 메세지 포맷

```
// [깃모지][이슈코드] 타입: 설명
// 타입은 대문자로 시작,
// 타입: 작성 후 한칸 띄우고 설명 작성하기

// 예시
✨ [ECS-123] Feat: 헤더 네비게이션 UI 구현
🐛 [ECS-456] Fix: 타이머 종료 시 alert가 두 번 뜨는 문제 수정
```

<br>

> ## 커밋 분리 기준

타입이 다른 경우 커밋 분리<br>
목적(기능)이 다른 경우 커밋 분리<br>
Single Responsibility Principle(단일 책임 원칙) 준수<br>
❌ 하나의 커밋에 기능 구현 + 스타일 수정 혼합 금지<br>

<br>

## Branch 전략 - GitHub Flow 기반 단순화

- `main`
  - `develop`
  - `feature/*`,
- `main`&ensp;브랜치 1개 유지
- `develop` 모든 기능이 병합되는 브랜치
- 기능 단위 `feature`&ensp;브랜치 생성 후 PR `develop`으로 병합
- `반드시 conflict가 나면 팀원들과 공유 후 해결`(간단한 건 혼자 해결)
- `PR merge`: merge and squash 방식, `2인 이상` approve되어야 `merge` 가능

```txt
> 새로운 작업 시작할 때
git checkout main
git pull origin main
git checkout -b feature/기능_이름

> 파일 커밋할 때
git add .
git commit -m "기능 추가: 설명"

> 작업 도중 main 브런치에 다른 팀원의 변경사항이 병합되었다면
git checkout main
git pull origin main
git checkout feature/기능_이름
git merge main

> 작업 끝나고 레포지토리에 올릴 때
git checkout main
git pull origin main
git checkout feature/기능_이름
git merge main
git push origin feature/기능_이름

```

---

> ## 컨벤션 및 도구 설정

### ✨ 코드 컨벤션

#### 앞은 특정대상, 뒤는 기능으로 네이밍

1. **네이밍 규칙**

- 기본 네이밍: camelCase
- 컴포넌트명: PascalCase, 단순한 명사 사용 (Search, Header, Login 등)
- 함수/변수명: 앞은 대상, 뒤는 기능 (예: `selectSort`, `fetchQuestionList`)
- 이벤트 핸들러명: handleSubmit 형태
- 네이밍 길이: 최대 25자 내에서 의미를 풀어서 작성
- 파일명: 대상 + 기능 형태로 작성 (예: `questionList.jsx` )

2. **식별자 규칙**

- 단수형 데이터: (예: `item` )
- 배열: 복수형 (예: `items` )
- 객체: 명사형 사용 (예: `selectedItem`)
- Boolean 값: is~, has~ 사용 (예: `isLoading`, `hasError`)

3. **코드 작성 규칙**

- 불필요한 Fragment 사용 지양
- 주석은 필요한 경우에만 작성

### 포매팅 / 린트

- Prettier + ESLint 사용
- 들여쓰기: 공백 2칸

<br>**Prettier 설정**

```
{
  "singleQuote": true,
  "semi": true,
  "useTabs": false,
  "tabWidth": 2
}
```

<br>**ESLint 설정**

```
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: { prettier: prettierPlugin },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'prettier/prettier': 'error',
    },
  },
  prettierConfig,
]);
```

<br>
<br>

> ## GitHub PR 템플릿

```
## 📌 개요 (Summary)
- 핵심 변경 사항 요약
---

## ❓ 변경 배경 및 목적 (Context)

- 이슈 티켓: #이슈번호 (Jira 코드)
- 변경 배경:
---

## 🛠️ 주요 작업 내용 (What's Changed)

- 기능 추가
- UI/UX 수정
- 버그 수정
- 기타 (문서, 설정 등)
---

## 📐 설계 및 리팩토링 포인트 (Architecture)

- 구조적 선택 이유
- 리팩토링 포인트
---

## 👀 리뷰 가이드 (Review Points)

- 중점적으로 봐주었으면 하는 부분
---

## 🧪 테스트 방법

- 테스트 시나리오 또는 방법
---

## 📸 스크린샷 / 결과물 (Optional)

| Before | After |

| --- | --- |

| 이미지 | 이미지 |

- --

## ✅ 체크리스트 (Self Checklist)

- 요구사항대로 정상 동작
- 기존 기능에 영향 없음
- 테스트 완료
- 불필요한 로그/주석 제거
- 핵심 로직 주석 추가
---

## 🗨️ 논의 사항
```

<br>

> ## 코드리뷰 체크리스트

```
### ✅ **컨벤션 준수**

- 네이밍 규칙 준수 여부 (PascalCase, camelCase 등)
- 파일명 규칙 준수 여부 (컴포넌트, 서비스, 훅 등)
- Import 순서 규칙 준수 여부

### ✅ **아키텍처 준수**

- Context API 사용이 적절한지 (Props Drilling vs Context)
- 컴포넌트 책임이 과하지 않은지
- API 호출 위치가 자연스런지
- 상태 위치가 적절한지(전역/ 로컬 구분)
- Props 구조가 과하지 않은지
- 재사용 가능성 보이는 코드가 있는지
- 폴더 위치가 역할에 맞는지

### ✅ **코드 품질**

- 중복 코드 없음
- 의미 있는 변수/함수명 사용
- 불필요한 주석 제거

### ✅ **기능 검증**

- 요구사항대로 동작하는지
- 예외 상황 처리 여부
```

<br>
<br>

> ## 💡 Jira 가이드

**1. feature 만들기**

- 보드나 목록에서 만들기를 선택하고, 유형을 feature 로 하고, 상위항목을 에픽(오픈마인드 앱 출시)를 선택한다.

- 담당자에 본인이름을 적고, 내용에 할일을 적는다(이때 최소한의 기능단위로 만들어야한다)

- 생성된 **feature**에서 **feature**번호를 부여받는다 . <br>
  상세보기를 클릭하면 좌측 상단에 [ECS-13](https://mukiiru.atlassian.net/browse/ECS-12) 같은 키값이 **feature**번호이다.

**2. 생성된 feature 번호로 git 브랜치 이름 작성 규칙 적용하기 (예시)**

일반적으로 Git 브랜치 이름은 공백 대신 하이픈(`-`)이나 언더스코어(`_`)를 사용하고, 모두 소문자로 작성하는 것이 관례

**예시 A: 하이픈(-)을 구분자로 사용 (권장)**

가장 흔히 사용되는 방식입니다.

`feature/ECS-13-사용자-회원가입-기능-구현`

- **`feature/`**: 브랜치 유형 (관례적으로 사용)
- **`ECS-13`**: Jira 이슈 키 (고유 번호)
- **`사용자-회원가입-기능-구현`**: 이슈 요약 내용을 소문자와 하이픈으로 연결

<br>
