# 스키마 작성 규칙

1. 테이블명(모델명)은 길이에 상관없이 명확한 의미를 담을 수 있도록 합니다.
2. 테이블명은 단수 명사를 사용합니다.
3. 배열 타입은 복수 명사를 사용합니다.
4. Boolean 타입은 isBoolean 형태로 단답형 질문을 사용합니다.
5. Date 형태는 dateAt 형태로 작성합니다. (createdAt)
6. JS에서 사용되는 영역은 camelCase로 작성하지만, SQL에 직접 생성되는 영역은 snake_case로 작성합니다. (@map(snake_case))
7. 테이블에 칼럼 작성 순서는 다음과 같습니다.
   1. 기본 메타데이터
      - id (필수)
        - 사용자가 직접 생성하는 경우엔 @default(cuid())
        - 관리자가 직접 생성하는 경우엔 @default(autoincrement())
      - createdAt
      - updatedAt
   2. 외래키
   3. 일반 데이터
   4. Prisma Target 객체 (실제 DB에 입력되진 않음)
   5. @@map(...)
