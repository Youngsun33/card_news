# 뉴스 카드 프로젝트

이 프로젝트는 최신 뉴스를 카드 형태로 보여주는 웹 애플리케이션입니다. 프론트엔드는 React, 백엔드는 Node.js(Express)를 사용합니다.

## 주요 기능

- 뉴스 기사 목록 및 상세 정보 표시
- 기사 북마크 및 좋아요 기능 (프론트/백엔드 연동)
- 기사 요약 및 더보기/접기 버튼
- 최신 기사 NEW 뱃지 표시
- 게시판(글쓰기/상세/댓글/목록) 기능
- JWT 인증 기반 회원가입/로그인/자동 로그인
- 댓글, 북마크, 게시글 등 실시간 반영 및 UX 개선
- 반응형 UI, 다크모드 지원

## 폴더 구조

```
src/
  Components/
    NewsCard/
      News.jsx        // 뉴스 카드 컴포넌트 (기사 UI, 좋아요/북마크 버튼 등)
      News.css        // 뉴스 카드 스타일
    BoardDetail.jsx   // 게시글 상세
    BoardList.jsx     // 게시글 목록
    BoardWrite.jsx    // 글쓰기
    common/
      UserContext.jsx // 로그인/토큰/유저 상태 관리
      fetchWithAuth.js// JWT 자동 헤더 유틸
      SearchBar.jsx   // 검색바
      ThemeButton.jsx // 테마 전환
  BE/                // 백엔드 코드 (Node.js, Express)
    app.js           // 서버 진입점
    controller/      // 각종 API 컨트롤러 (news, bookmark, likes 등)
    routers/         // 라우터 분리 (RESTful API)
    models/          // DB 모델 (Sequelize 기반)
    middlewares/     // 인증, 로깅 등 미들웨어
    config/          // DB 설정
    utlis/           // 토큰, 유효성 검사 등 유틸
public/               // 정적 파일 및 이미지 (북마크, 하트, 기본 이미지 등)
.env                  // 환경변수 (API 키 등)
```

## 프론트엔드 상세

- **주요 라이브러리**: React, React Router, Context API
- **컴포넌트**: 뉴스 카드, 뉴스 리스트, 북마크, 게시판, 검색바, 테마 버튼 등
- **상태 관리**: useState, useContext, 커스텀 훅(UseFetchNews 등)
- **기능**:
  - 뉴스 목록/상세/검색/필터링
  - 좋아요/북마크(아이콘 클릭 시 백엔드와 연동)
  - 반응형 UI, 다크모드 지원
  - 이미지 미제공 시 기본 이미지 출력
  - 게시판(글쓰기/상세/댓글/목록) 및 UX 개선
  - JWT 토큰 기반 인증/자동 로그인

## 백엔드 상세

- **주요 라이브러리**: Express, Sequelize, sqlite3
- **API**:
  - `/news` : 뉴스 목록/상세/검색/필터
  - `/bookmark` : 북마크 추가/삭제/조회
  - `/likes` : 좋아요 추가/삭제/조회
  - `/users`, `/auth` : 회원가입, 로그인, 인증
  - `/posts`, `/comments` : 게시판/댓글
- **DB**: SQLite (Sequelize ORM 사용)
- **기능**:
  - RESTful API 제공 (프론트와 연동)
  - JWT 기반 인증/인가
  - 게시글, 댓글, 신고 등 확장 가능
  - DB 마이그레이션/시드: `npx sequelize-cli db:migrate`, `npx sequelize-cli db:seed:all`

## 환경 변수 및 API 키 관리

- `.env` 파일 예시 및 주요 환경 변수 설명
  ```
  # .env 예시
  DEEPL_KEY=여기에_딥엘_API_키_입력
  ```
- `.env` 파일은 git에 커밋하지 않도록 `.gitignore`에 추가 필요

## 실행 방법

1. 의존성 설치 (프론트/백엔드 공통)

```
npm install bcryptjs express joi jsonwebtoken multer nodemon sequelize sequelize-cli sqlite3 winston cors node-fetch react react-dom react-router-dom react-scripts web-vitals @testing-library/dom @testing-library/jest-dom @testing-library/react @testing-library/user-event
```

2. 프론트엔드 개발 서버 실행

```
npm start
```

3. 백엔드 서버 실행 (별도 터미널)

```
cd src/BE
npm install
npx nodemon app.js
```

## 커스텀 훅/유틸

- `UseFetchNews.jsx`: 뉴스 데이터 fetch 및 상태 관리
- `fetchWithAuth.js`: 인증 필요 API 요청 시 사용

## 인증/보안

- JWT 기반 인증 구조, 토큰 저장 위치(localStorage), 자동 로그인 동작 방식
- 회원가입/로그인/로그아웃 플로우, 토큰 만료 시 UX

## UI/UX 및 디자인 가이드

- 파란색 포인트 컬러, 흰색 배경, 반응형 레이아웃, 다크모드 지원
- 댓글 입력창/등록 버튼 한 줄 배치, 게시글 상세 왼쪽 정렬 등 주요 UI/UX 개선점

## 테스트/디버깅

- API 연동 시 네트워크/콘솔/응답 JSON 확인법
- 프론트/백엔드 동시 재시작 안내

## 자주 발생하는 문제 & 해결법

- 401 인증 오류, 토큰 만료, DB 연동 문제, 이미지 미출력 등
- CORS, 포트 충돌, 의존성 설치 오류 등

## 확장/유지보수 팁

- 게시판/댓글/북마크/좋아요 등 기능 확장 방법
- 코드 컨벤션, 커밋 메시지 규칙, 협업 가이드

---

문의: heo4021@outlook.com

---



1. React(프론트엔드) 기본 구조
컴포넌트 분리

NewsCard/News.jsx : 뉴스 하나를 카드로 보여줌(제목, 내용, 북마크 등)
BoardDetail.jsx : 게시글 상세(글 내용, 댓글, 댓글 입력)
BoardList.jsx : 게시글 목록(여러 글 미리보기)
BoardWrite.jsx : 글쓰기 폼
common/UserContext.jsx : 로그인/토큰/유저 상태 관리
common/fetchWithAuth.js : JWT 토큰 자동 헤더 유틸
상태 관리

각 컴포넌트에서 useState로 로컬 상태(입력값, 로딩 등) 관리
UserContext로 로그인 상태/토큰을 앱 전체에서 공유
라우팅

react-router-dom 사용: /, /board, /board/:id, /auth 등 URL에 따라 다른 컴포넌트 렌더링
props와 state 흐름

예: BoardList에서 게시글 목록을 받아서, 각 BoardPreview에 props로 전달
부모가 자식에게 데이터/함수 전달, 자식이 이벤트 발생 시 부모에 알림
2. API 통신 (프론트 <-> 백엔드 연결)
fetch/axios로 데이터 주고받기

예: BoardDetail.jsx에서
→ 백엔드에서 해당 게시글 데이터(JSON) 반환
JWT 토큰 인증

fetchWithAuth.js에서
→ 로그인한 유저만 댓글/글쓰기/북마크 가능
비동기 처리/에러 핸들링

try/catch 또는 .then().catch()로 네트워크 오류, 인증 실패 등 처리
실패 시 alert, 성공 시 UI 갱신
3. 인증/보안
JWT 토큰 발급/저장/자동 로그인

로그인 성공 시 백엔드가 토큰 발급 → 프론트에서 localStorage에 저장
새로고침해도 UserContext.jsx에서 localStorage의 토큰으로 자동 로그인 시도
로그인/회원가입/로그아웃 플로우

/auth에서 로그인/회원가입 폼 → 서버에 요청 → 성공 시 토큰 저장, 실패 시 에러 표시
로그아웃 시 토큰 삭제, 상태 초기화
인증 필요한 요청/불필요 요청 구분

글쓰기, 댓글, 북마크 등은 토큰 필요(헤더에 Authorization)
뉴스/게시글 목록 조회 등은 토큰 없이도 가능
4. Express(백엔드) 구조
라우터(RESTful API)

news.js, posts.js, auth.js 등에서 URL별로 API 분리
예: /api/news, /api/posts, /api/auth/login
컨트롤러

news.js, posts.js 등에서 실제 데이터 처리(조회, 생성, 수정, 삭제)
미들웨어

auth.js : JWT 토큰 검증, 인증 필요 API에서만 사용
모델(Sequelize)

news.js, user.js, comment.js 등에서 DB 테이블 구조 정의
5. DB/Sequelize
모델 정의
예: user.js(id, email, password, nickname), news.js(id, title, content, ...), comment.js(id, postId, userId, content, ...)
관계 설정
게시글 1:N 댓글, 유저 1:N 게시글/댓글 등
마이그레이션/시드
npx sequelize-cli db:migrate로 테이블 생성
npx sequelize-cli db:seed:all로 더미 데이터 삽입
6. UI/UX & CSS
컴포넌트별 스타일 분리
NewsCard/News.css, BoardDetail.css, MainPage.css 등
다크모드/반응형
body[data-theme="dark"]로 다크모드 스타일 적용
UX 개선
댓글 입력/등록 버튼 한 줄, 게시글 왼쪽 정렬, 버튼 위치 등
7. 실행/배포/디버깅
실행법
프론트: npm install → npm start
백엔드: cd src/BE → npm install → npx nodemon app.js
디버깅
네트워크 탭/콘솔에서 API 요청, 응답, 에러 확인
에러 메시지(401, 500 등) 해석해서 문제 해결
프론트와 백엔드 연결의 실제 흐름 예시
로그인

프론트에서 /auth/login으로 POST 요청(아이디/비번)
백엔드에서 비번 확인 후 JWT 토큰 발급 → 프론트에 전달
프론트는 토큰을 localStorage에 저장, UserContext로 앱 전체에 로그인 상태 공유
게시글/댓글/북마크 등 인증 필요한 요청

프론트에서 fetchWithAuth.js로 요청 시 헤더에 Authorization: Bearer 토큰 자동 추가
백엔드 미들웨어(auth.js)에서 토큰 검증 → 통과 시만 데이터 처리
데이터 조회

프론트에서 fetch로 API 호출 → 백엔드에서 DB 조회 후 JSON 반환 → 프론트에서 setState로 화면 갱신
실전 팁
각 기능(뉴스, 게시판, 댓글, 인증 등)이 어떻게 연결되는지,
"프론트 → API 요청 → 백엔드 → DB → 백엔드 → 프론트" 흐름을 꼭 따라가보세요.
코드를 직접 뜯어보고, 주석 달고, 콘솔로 데이터 흐름을 찍어보면
AI 없이도 충분히 이해하고 확장할 수 있습니다!