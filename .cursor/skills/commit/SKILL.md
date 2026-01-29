---
name: commit
description: Auto-generate Git commit messages and PR descriptions. Analyzes changed files and creates professional commit messages in Conventional Commits format. Triggered by '/commit', 'commit', or '커밋해줘'.
---

# Commit Skill

Analyze changes like a senior developer and write concise, professional commit messages and PR descriptions.

## Workflow

1. Run `git status` to check changed files
2. Run `git diff --cached` for staged changes (if none, use `git diff`)
3. Write commit message in Conventional Commits format
4. Execute `git commit -m "message"`
5. Ask: "푸시하시겠습니까? (yes/no)"
6. If yes, run `git push`
7. Ask: "PR을 생성하시겠습니까? (yes/no)"
8. If yes, generate PR description preview and ask for confirmation
9. Create PR using `gh pr create`

## Commit Message Format

```
<type>(<scope>): <Korean description>
```

- **Type**: English, required (`feat`, `fix`, `refactor`, `docs`, `style`, `chore`, `test`, `perf`, `ci`, `build`)
- **Scope**: English, optional (module/component name)
- **Description**: Korean, **max 30 characters**

## Commit Rules

1. **Short and clear** - Max 30 chars, core message only
2. **Include action verb** - End with 추가, 수정, 개선, 제거, 변경, 처리 etc.
3. **Skip trivial changes** - Never mention margin, padding, typo fixes
4. **Summarize by purpose** - Multiple files = one purpose

## Commit Examples

```bash
feat: 게시판 CRUD 기능 추가
fix: 이미지 무한 로딩 버그 수정
feat(auth): 소셜 로그인 기능 구현
```

---

## PR Description Format

Write PR description in **Korean**. File names, code, technical terms stay in English.

```markdown
## 📋 요약
이 PR이 무엇을 하는지 한 줄로 설명

## 🔄 변경 사항
- 주요 변경 내용 1
- 주요 변경 내용 2
- 주요 변경 내용 3

## 🎯 영향 범위
- 영향받는 모듈/컴포넌트
- Breaking change 여부

## 🧪 테스트 방법
1. 테스트 단계 1
2. 테스트 단계 2
3. 예상 결과

## 📝 참고 사항 (선택)
리뷰어에게 전달할 추가 정보
```

## PR Example

```markdown
## 📋 요약
게시판 CRUD 기능 구현

## 🔄 변경 사항
- 게시글 목록 조회 API 추가
- 게시글 작성/수정/삭제 기능 구현
- `BoardService`, `BoardController` 신규 생성

## 🎯 영향 범위
- `src/board/` 모듈 신규 추가
- 기존 코드 영향 없음

## 🧪 테스트 방법
1. `/api/boards` 엔드포인트 호출
2. 게시글 목록이 정상 반환되는지 확인
3. POST로 게시글 생성 후 목록에 표시되는지 확인

## 📝 참고 사항
- 페이지네이션은 다음 PR에서 추가 예정
```

## PR Rules

1. **요약**: 한 문장으로 핵심만
2. **변경 사항**: 파일명 나열 금지, 기능 단위로 설명
3. **영향 범위**: 어떤 부분이 영향받는지 명확히
4. **테스트 방법**: 리뷰어가 따라할 수 있게 구체적으로
5. **간결하게**: 30초 안에 이해할 수 있도록

## PR Flow

After push:

```
PR을 생성하시겠습니까? (yes/no)
```

If yes, show preview:

```
📝 PR 미리보기:
─────────────────
[Generated PR description]
─────────────────

위 내용으로 PR을 생성할까요? (yes/no)
```

If confirmed:
```bash
gh pr create --title "제목" --body "내용"
```