# 뉴스 카드 프로젝트

이 프로젝트는 최신 뉴스를 카드 형태로 보여주는 웹 애플리케이션입니다. 프론트엔드는 React, 백엔드는 Node.js(Express)를 사용합니다.

## 주요 기능

- 뉴스 기사 목록 및 상세 정보 표시
- 기사 북마크 및 좋아요 기능 (프론트/백엔드 연동)
- 기사 요약 및 더보기/접기 버튼
- 최신 기사 NEW 뱃지 표시
- 작성자, 발행일, 이미지 등 기사 정보 제공

## 폴더 구조

```
src/
  Components/
    NewsCard/
      News.jsx        // 뉴스 카드 컴포넌트 (기사 UI, 좋아요/북마크 버튼 등)
      News.css        // 뉴스 카드 스타일
    ...기타 컴포넌트 (게시판, 검색, 테마 등)
  BE/                // 백엔드 코드 (Node.js, Express)
    app.js           // 서버 진입점
    controller/      // 각종 API 컨트롤러 (news, bookmark, likes 등)
    routers/         // 라우터 분리 (RESTful API)
    models/          // DB 모델 (Sequelize 기반)
    middlewares/     // 인증, 로깅 등 미들웨어
    config/          // DB 설정
    utlis/           // 토큰, 유효성 검사 등 유틸
public/               // 정적 파일 및 이미지 (북마크, 하트, 기본 이미지 등)
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

## 백엔드 상세

- **주요 라이브러리**: Express, Sequelize, sqlite3
- **API**:
  - `/news` : 뉴스 목록/상세/검색/필터
  - `/bookmark` : 북마크 추가/삭제/조회
  - `/likes` : 좋아요 추가/삭제/조회
  - `/users`, `/auth` : 회원가입, 로그인, 인증
- **DB**: SQLite (Sequelize ORM 사용)
- **기능**:
  - RESTful API 제공 (프론트와 연동)
  - JWT 기반 인증/인가
  - 게시글, 댓글, 신고 등 확장 가능

## 실행 방법

1. 의존성 설치

```
npm install bcryptjs  express joi jsonwebtoken  multer  nodemon sequelize sequelize-cli  sqlite3 winston
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

## 기타

- 기사 이미지가 없을 경우 기본 이미지(`no-photo.png`)가 표시됩니다.
- 북마크/좋아요 이미지는 public 폴더에 있습니다.
- 환경변수, API 키 등은 별도 관리 필요

---

문의: sun@예시.com

---
