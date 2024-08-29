## 시작하기

```bash
pnpm i
pnpm dev
```


- 위와 같이 시작 시 내부의 레포지토리가 모두 실행됩니다. 특정 레포지토리만 실행(적용)시키고 싶다면 아래와 같이 실행시킬 수 있습니다.
  ```bash
  pnpm dev --filter=main
  pnpm i typescript --filter=admin
  ```
  <br/>

## 폴더구조

보일러플레이트는 아래와 같이 모노레포의 형식으로 구성되어 있습니다.

```
🚀 boilerplate-monorepo
│
├─ .env.sample
├─ apps
│  └─ main
│     ├─ public
│     └─ src
│         ├─ app
│         └─ lib
│
├─ configs
│  ├─ eslint
│  ├─ tailwindcss
│  └─ typescript
│
├─ docs
│  ├─ .storybook
│  ├─ __mocks__
│  └─ stories
│     ├─ template
│     └─ ui
│
└─ packages
   ├─ database
   │  └─ prisma
   │
   ├─ design-system
   │  ├─ editor
   │  ├─ icon
   │  ├─ template
   │  └─ ui
   │
   ├─ lib
   │  ├─ hooks
   │  └─ utils
   │
   └─ providers
      ├─ auth
      ├─ slack
      └─ supabase
```

<br/>

| 디렉토리  | 폴더/파일명    | 용도                                                                                                                                                                                                                   | 참고                                                                                         |
| --------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| /apps     |                | 각 레포지토리가 존재하는 폴더                                                                                                                                                                                          | main, admin 등..                                                                             |
|           | /main/src/app  | 페이지 구성                                                                                                                                                                                                            |                                                                                              |
|           | /main/src/lib  | 1. constants <br/> 2. utils <br/> 3. hooks - 커스텀훅, 스토어(zustand)                                                                                                                                                 | 스토어(전역상태관리)의 파일 이름은 `use-xxx-store` 형식으로 표현합니다. (예. use-bear-store) |
| /configs  |                | ESLint, TailwindCSS, TypeScript 등 전반적으로 사용되는 설정 파일들을 관리                                                                                                                                              |                                                                                              |
| /docs     |                | Storybook을 통해 생성된 내부 컴포넌트 가이드 문서                                                                                                                                                                      |                                                                                              |
| /packages |                | 프로젝트 전반에 걸쳐 사용되는 다양한 의존성 패키지들을 관리                                                                                                                                                            |                                                                                              |
|           | /database      | Prisma 스키마 및 마이그레이션 파일                                                                                                                                                                                     |                                                                                              |
|           | /design-system | UI 컴포넌트들로 구성 <br/> **📌 template** <br/> 1. 자체 제작 컴포넌트들 <br/> 2. 전역적으로 사용되는 커스텀 컴포넌트 <br/> **📌 ui** <br/> [shadcn/ui ↗️ ](https://ui.shadcn.com/docs)를 기반으로한 기초 컴포넌트들   |                                                                                              |
|           | /lib           | 공통적으로 사용되는 hook들과 유틸함수들을 관리                                                                                                                                                                         |                                                                                              |
|           | /providers     | **📌 auth** <br/> next-auth 인증에서 사용되는 서비스 로직 관리 (예. 사용자 세션 등) <br/> **📌 slack** <br/> 슬랙 알림 발송 API <br/> **📌 supabase** <br/> Supabase에 이미지/파일 업로드 시 사용되는 서비스 로직 관리 |
| /         | .env.sample    | 환경변수 파일 예시                                                                                                                                                                                                     |                                                                                              |

<br/>

## 스타일링

기본적으로 TailwindCSS를 바탕으로 스타일링 합니다.

다만, 색상과 radius는 `/app/globals.css`에 선언된 변수를 통해 관리되기 때문에 해당 값을 수정해야 합니다.

그래서 자체 솔루션을 통해 내부 디자인 시스템과 연동한 [d-nexus ↗️ ](https://d-theme-main.vercel.app/)에서 스타일 시트 코드를 생성하고 사용할 수 있습니다.
