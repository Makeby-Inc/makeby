# Providers

Providers 는 inngest 에서 사용하는 프로바이더 패키지입니다.

```
providers/
├── auth
├── inngest
├── posthog
├── resend
├── slack
├── solapi
└── supabase
```

## 사용 방법

`apps/main` 경로에 있는 메인 애플리케이션에서 특정 프로바이더를 설치하고 사용하는 방법을 알아보겠습니다.

### 설치 방법

각 프로바이더는 개별적인 패키지이기 때문에 필요에 따라 선택적으로 설치할 수 있습니다. 예를 들어 `auth` 프로바이더를 설치하려면 다음과 같이 실행합니다:

1. `apps/main`의 package.json에 dependency 추가

   ```json
   //...
     "dependencies": {
       "@providers/auth": "workspace:*",
       // 특정 버전을 설치하는 경우
       // "@providers/auth": "workspace:1.0.0",
     },
   //...
   ```

2. pnpm 실행
   ```bash
   pnpm install --filter=main
   ```

## 기여 방법

각 프로바이더를 업그레이드한 후 다음 semantic versioning 규칙을 따라 버전 번호를 업데이트 합니다.

- `주 - major`: 버전 불일치로 인한 프로바이더 API 변경
- `부 - minor`: 프로바이더 내 기능 추가
- `수 - patch`: 프로바이더 내 버그 해결

예를 들어 더 이상 지원되지 않는 auth 프로바이더를 업그레이드하는 경우 다음과 같이 버전 번호를 업데이트 합니다.

```diff
// package.json
"dependencies": {
-  "@providers/auth": "workspace:1.0.0",
+ "@providers/auth": "workspace:2.0.0",
}
```

> documents updated at 2024-06-17
