## 프론트엔드 개발 생태계 돌아보기 (feat. React)
### 1. 스마트폰 보급 -> 모바일 시장의 확대되면서 **SPA**에 대한 수요 증가 (2015)
  - 다양한 사용자 인터랙션 증가

  - 모바일 환경에서는 네트워크 속도가 변수이기에 빠른 응답 속도가 필요
  - 모바일 사용자에게 네이티브 앱과 유사한 경험 제공
  - PWA(Progressive Web Abb)으로 확장하기도 쉬움
  - 크로스 플랫폼 대응이 용이 - 모바일/데스크톱 환경 모두 사용하기에 유지보수 비용 절감

### 2. 이 때 프론트엔드 개발자라는 직군이 떠오르게 됨 (2015 ~)
  - IE로 인해 jQuery 강세 

  - npm 등장하지만 cdn 사용이 다수

### 3. AngularJS -> Angular 넘어가기, 그리고 React 사용 사례 증가 (2017)
  - Angular 사용하기 위해 TypeScript, RxJS 를 배워야하는 높은 러닝 커브 발생

  - 국내에 얼마 없었던 React 학습 자료 증가
  - React, Redux를 네이버 등 대기업이 도입
  - Presentational & Container Components 구조가 대세로
  - jQuery 걷어내기

### 4. Angular vs React vs Vue 3대장 논쟁 (2018)
  - Angular에서 많은 이탈 발생, React나 Vue로 넘어가게 됨

  - React + Redux가 거의 공식 스펙에 가까워짐
  - HOC, componentDidUpdate(), SFC 등 React 사용 방법이 발전

### 5. React가 대세로 떠오르다 (2019)
  - React와 Vue가 살아 남았다?
  - 수 많은 기업에서 TypeScript 도입
  - styles-components 주도로 CSS in JS 사용 증가
  - ContextAPI vs Redux 
    - 상태 관리에 대한 피로도 논쟁
  - **React Hooks 등장**
    - 함수형 프로그래밍 유행 시작

  - Vanilla JavaScript 학습 요구 대두
    - ES 버전이 높아지면서 더 사용하기 좋아짐
    - 라이브러리, 프레임워크에 의존하지 않는 기본기 훈련
    - 가볍고 의존성 없는 라이브러리 사용 선호

  - 수 많은 라이브러리와 고급 프론트엔드 기법의 홍수

### 6. React + Hooks API + TypeScript + @Axios 생태계 (2020)
  - Class Component 마이그레이션 돌풍

  - Recoil 등장
  - RTL & Jest 주축으로 TDD에 대한 성숙도 증가
  - Storybook 사용 사례 증가 + @Emotion
    - Atomic Design Pattern 도입 유행
  - Vue 3 정식 출시
    - Composition API 등장
    - 오히려 React로 전환하는 케이스가 많아짐
  - **SEO 대응의 심각함 노출**
    - Next.js, Nuxt.js 에 대한 고민

### 7. 프론트 개발자의 영역 확장(2021)
  - Next.js, Nuxt.js 사용 기업 증가

  - 서버 상태를 관리할 수 있는 React Query 점유율 높아짐
  - CI/CD, Github Actions 등 백엔드와의 협업 집합이 커짐 -> BFF(BackEnd for FrontEnd)
  - Storybook 활용도 증가 -> 디자인 시스템 / 디자인 토큰
  - Figma 생태계 발전 -> UX/UI 자동화 시도
  - Copilot 사용자 증가

### 8. 리액트 생태계에서는 Next.js / Tanstack Query 독주 (2022)
  - IE 지원 종료

  - Rust 라이브러리 유행 & WASM
    - 유사 라이브러리를 향상된 속도로 대체
    - 러닝커브가 높아 대중적이지는 못함
  
  - Vercel 
    - React 개발팀과 협업

  - Zustand / Jotai
  - 점점 더 복잡해지는 서비스와 구조로 MFA (Micro Frontend Architecture) 도입 사례 증가
  - Vite 도입
    - webpack config에 비해 쉽고 간단
    - 빠른 속도를 자랑

### 9. 대규모 언어모델(LLM) + 생성 AI의 시대 (2023)
  - 계속해서 성장하는 Vercel
  - React Server Components 의 등장
    - 더욱 진보된 렌더링 기법 ISR, Streaming SSR
  - meta에서 만든 스타일링 라이브러리 style X
