# 프론트엔드 기술 스택 가이드

## 📚 목차

1. [렌더링 방식](#렌더링-방식)
2. [프레임워크](#프레임워크)
3. [UI 프레임워크](#ui-프레임워크)
4. [SSR 프레임워크](#ssr-프레임워크)

---

## 🎨 렌더링 방식 (Where to Render)

### **CSR (Client-Side Rendering)**

- **정의**: 클라이언트(브라우저)에서 렌더링
- **동작 방식**:
  1. 서버가 빈 HTML + JavaScript 파일 전송
  2. 브라우저가 JavaScript 실행
  3. 화면 렌더링
     **장점**:
- ✅ 페이지 전환이 빠름 (새로고침 없음)
- ✅ 서버 부담 적음
- ✅ 인터랙티브한 UI 구현 쉬움
  **단점**:
- ❌ 초기 로딩 느림
- ❌ SEO 불리 (검색엔진 최적화)
- ❌ JavaScript 비활성화 시 작동 안 함
  **사용 예**: 관리자 페이지, 대시보드, 웹 앱

---

### **SSR (Server-Side Rendering)**

- **정의**: 서버에서 렌더링
- **동작 방식**:
  1. 서버가 완성된 HTML 생성
  2. 브라우저에 전송
  3. 즉시 화면 표시
     **장점**:
- ✅ 초기 로딩 빠름
- ✅ SEO 유리 (검색엔진이 내용 확인 가능)
- ✅ JavaScript 없어도 작동
  **단점**:
- ❌ 서버 부담 증가
- ❌ 페이지 전환 시 깜빡임
- ❌ 서버 구축 필요
  **사용 예**: 쇼핑몰, 블로그, 뉴스 사이트

---

## ⚛️ 프레임워크 (Framework)

### **React**

- **개발사**: Meta (Facebook)
- **특징**: 컴포넌트 기반, Virtual DOM
- **생태계**: 매우 방대함
- **학습 곡선**: 중간
- **현재 프로젝트**: ✅ 사용 중!
  **강점**:
- 가장 큰 커뮤니티
- 풍부한 라이브러리 (React Query, Zustand 등)
- Next.js와 완벽한 조합
  **코드 예시**:

```jsx
function Hello() {
  return <div>Hello, React!</div>;
}
```

---

### **Vue.js**

- **개발사**: Evan You (개인)
- **특징**: 템플릿 기반, 쉬운 학습
- **생태계**: 중간
- **학습 곡선**: 낮음
  **강점**:
- 배우기 쉬움
- 공식 문서 한글화 잘 됨
- Nuxt.js로 SSR 구현
  **코드 예시**:

```vue
<template>
  <div>Hello, Vue!</div>
</template>
```

---

## 🎨 UI 프레임워크 (UI Framework)

### **Tailwind CSS**

- **타입**: Utility-First CSS
- **현재 프로젝트**: ✅ 사용 중!
  **특징**:
- 클래스 조합으로 스타일링
- 커스터마이징 자유로움
- 빠른 개발 속도
  **예시**:

```jsx
<button className="rounded bg-blue-500 px-4 py-2 text-white">버튼</button>
```

---

### **shadcn/ui**

- **타입**: 복사 가능한 컴포넌트
- **현재 프로젝트**: ✅ 사용 중!
  **특징**:
- Tailwind 기반
- 코드를 직접 프로젝트에 복사
- 완전한 커스터마이징 가능
  **예시**:

```bash
npx shadcn@latest add button
```

---

### **Bootstrap**

- **타입**: CSS 프레임워크
- **특징**: 전통적, 많이 사용됨
  **장점**:
- ✅ 빠른 프로토타이핑
- ✅ 반응형 그리드 시스템
  **단점**:
- ❌ 디자인이 비슷해짐
- ❌ 커스터마이징 어려움

---

### **MUI (Material-UI)**

- **타입**: React 컴포넌트 라이브러리
- **특징**: Google Material Design
  **장점**:
- ✅ 완성도 높은 컴포넌트
- ✅ TypeScript 지원
  **단점**:
- ❌ 번들 크기 큼
- ❌ 커스터마이징 복잡

---

## 🚀 SSR 프레임워크 (SSR Framework)

### **Next.js**

- **기반**: React
- **현재 프로젝트**: ✅ 사용 중!
  **특징**:
- ✅ React 공식 권장 프레임워크
- ✅ App Router (최신)
- ✅ 파일 기반 라우팅
- ✅ 이미지 최적화
- ✅ Vercel 배포 쉬움
  **사용**:

```bash
npx create-next-app@latest
```

---

### **Nuxt.js**

- **기반**: Vue.js
- **특징**: Vue의 SSR 프레임워크
  **장점**:
- ✅ Vue 생태계와 완벽한 통합
- ✅ 자동 라우팅
- ✅ 모듈 시스템

---

### **SvelteKit**

- **기반**: Svelte
- **특징**: 컴파일 타임 프레임워크
  **장점**:
- ✅ 매우 빠름
- ✅ 번들 크기 작음
- ✅ 간결한 문법

---

## 🎯 현재 프로젝트 스택

```
Frontend
├── Framework: React ⚛️
├── SSR: Next.js 🚀
└── UI Framework
    ├── Tailwind CSS 🎨
    └── shadcn/ui 🎁
```

---

## 💡 선택 가이드

### **프레임워크 선택**

| 상황        | 추천           |
| ----------- | -------------- |
| 첫 프로젝트 | React 또는 Vue |
| 구인 시장   | React          |
| 빠른 학습   | Vue            |
| 성능 중시   | Svelte         |

### **렌더링 방식**

| 프로젝트 타입  | 추천 |
| -------------- | ---- |
| 블로그, 쇼핑몰 | SSR  |
| 관리자 페이지  | CSR  |
| 뉴스 사이트    | SSR  |
| 웹 앱          | CSR  |

### **UI 프레임워크**

| 상황              | 추천              |
| ----------------- | ----------------- |
| 자유로운 디자인   | Tailwind + shadcn |
| 빠른 프로토타입   | Bootstrap         |
| Material Design   | MUI               |
| 커스터마이징 중요 | Tailwind          |

---

## 📚 학습 순서 추천

1. **HTML/CSS/JavaScript** 기초
2. **React** 기본 개념
3. **Next.js** 프레임워크
4. **Tailwind CSS** 스타일링
5. **shadcn/ui** 컴포넌트

---

## 🔗 참고 자료

- [React 공식 문서](https://react.dev)
- [Next.js 공식 문서](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
