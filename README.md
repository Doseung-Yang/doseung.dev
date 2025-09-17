## 개발자 도승 블로그 (WIP)

개발자로 일하면서 새롭게 배운 지식을 빠르게 기록하고, 전달하는 것을 목표로 합니다.
공부하려고 만든 기술 블로그입니다.
시간 날 때마다 개선 중입니다.

## 특징

- **깔끔한 UI와 반응형**: Tailwind 기반의 심플한 레이아웃과 모바일 최적화
- **다크 모드 지원**: 시스템/토글 기반 테마 전환
- **글 편집/발행 흐름**: 제목/본문 편집, 저장/발행 분리, 상태 피드백(저장됨/실패)
- **최근 글 슬라이더**: Framer Motion과 자동 재생
- **SEO**: `sitemap.ts`, `robots.ts`, MetaData/OG/Twitter 카드, 구조화 데이터 포함
- **접근성과 가독성**: 타이포/여백/대비를 고려한 프리셋

## 기술 스택

- **Framework**: Next.js(App Router) + TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **State/UI**: React(Server/Client Components 혼합)
- **Lint/Format**: ESLint

## 로컬 실행

```bash
pnpm dev
# http://localhost:3000
```

## 환경 변수

- 비밀

## 진행 중인 작업 (WIP)

- **이미지/동영상 삽입**: 업로드 및 본문 삽입 흐름 간소화
- **댓글 시스템**: 낙관적 업데이트 및 API 연동
- **검색/태그**: 포스트 검색, 태그 필터링
- **초안/버전 관리**: 초안 보관 및 수정 이력
- **퍼포먼스 개선**: 이미지 최적화/캐시 전략 정교화

## 디렉터리 개요

- `app/` 페이지 라우팅(App Router)
- `app/_components/` 재사용 UI 컴포넌트
- `app/blog/` 블로그
- `app/post/` 방명록
- `app/api/` API 라우트
- `app/util/` 테마 등 유틸

## 기여/피드백

- 이슈/아이디어 환영합니다. 버그 제보 또는 개선 제안은 이슈로 남겨주세요.
- 개인 문의: `doseung.dev@gmail.com` (예시)

## License

MIT © 2025 양도승
