# MEMORY

## Goal

- GitHub Pages용 프로페셔널 웹사이트를 완성한다.
- 반응형 데스크톱 및 모바일을 지원한다.
- 상단 `Games` 탭을 구현한다.
- 키보드와 모바일 터치로 조작 가능한 지렁이 게임을 구현한다.
- GitHub Pages에 최초 배포한다.
- Step 1의 `[게임 추가 기능:]`이 확인되면 게임 루프에 반영한다. 현재는 추가 기능이 문서상으로 확인되지 않아 [사람 확인 필요] 상태로 둔다.

## Required Deliverables

- 프로젝트 루트의 `index.html`
- `styles.css`
- `script.js`
- 필요한 경우 별도 `game.js`
- 필요한 이미지 및 정적 assets
- `AORR.md`
- `MEMORY.md`

## Current Scope

- 정적 HTML, CSS, JavaScript
- 프로페셔널 웹사이트 콘텐츠
- 반응형 레이아웃
- `Games` 탭
- 지렁이 게임
- GitHub Pages 배포

## Out of Scope

- 백엔드 서버
- 데이터베이스
- 로그인 및 회원가입
- 결제
- 사용자 개인정보 수집
- 별도 승인 없는 외부 API
- 별도 승인 없는 프레임워크 전환

## Current State

| 항목 | 상태 |
|---|---|
| 현재 상태 | 배포 완료 |
| 완료한 루프 | 저장소/파일 확인, `AORR.md` 작성, `Self-Correcting TDD Loop` 설계, 정적 셸 생성, 지렁이 게임 구현, ES5 문법 정리, GitHub Pages 배포 |
| 다음 루프 | [사람 확인 필요] 브라우저 콘솔 및 실기기 상호작용 재검증 |
| 현재 Retry 횟수 | 1 |
| 현재 오류 fingerprint | `GIT_METADATA_PERMISSION_DENIED` |
| Blocker | 없음 |
| 마지막 정상 상태 | `DEPLOYED` |

## Guardrails

- 기존 개인 콘텐츠 임의 삭제 금지
- 확인되지 않은 경력이나 프로젝트 정보 생성 금지
- 테스트 삭제 또는 완화 금지
- 토큰 출력 금지
- 토큰을 HTML, CSS, JavaScript에 저장 금지
- 토큰을 Git에 커밋 금지
- `github_token.txt` 커밋 금지
- `env_settings.txt` 커밋 금지
- 백엔드 기능 추가 금지
- 대규모 리팩토링 금지
- 테스트를 통과시키기 위한 기능 제거 금지

## Acceptance Criteria

- 루트 `index.html` 존재
- 로컬 정적 서버에서 정상 로드
- CSS와 JavaScript 정상 로드
- 콘솔 오류 없음
- 모바일 및 데스크톱에서 레이아웃 정상
- `Games` 탭 정상 이동
- 지렁이 게임 정상 실행
- 키보드 조작 정상
- 모바일 터치 조작 정상
- 점수 및 재시작 정상
- GitHub Pages에서 HTTP 200 응답
- 배포된 사이트에서도 동일 기능 정상

## Retry Policy

- 하나의 오류당 최대 3회
- 동일 오류 fingerprint 2회 반복 시 중지
- 한 번의 Retry에서 하나의 원인만 수정
- Retry마다 동일 Verifier 재실행

## HITL Conditions

- 개인 프로필 내용 불명확
- 기존 콘텐츠 삭제 필요
- 요구사항 충돌
- GitHub 저장소 권한 부족
- GitHub Pages 설정 변경 필요
- 외부 서비스 추가 필요
- Retry 한계 도달

## Tool Policy

- Codex는 작업 제어, 파일 수정, 테스트 실행을 담당한다.
- 가능하면 Claude Code CLI를 설치/로그인/상태 확인 용도로 사용한다.
- 현재 프로젝트 파일 내용을 Claude Code CLI로 외부 전송하는 독립 Verifier 사용은 하지 않는다.
- 실제 사용한 Claude 모델명은 파일 내용을 보내지 않는 범위에서만 기록한다.
- 토큰 값은 어떠한 실행 기록에도 남기지 않는다.

## Execution Log Template

| 항목 | 내용 |
|---|---|
| Loop ID |  |
| 시작 시각 |  |
| 목표 |  |
| 시작 상태 |  |
| 가설 |  |
| Act |  |
| 변경 파일 |  |
| Verifier |  |
| 테스트 결과 |  |
| exit code |  |
| 오류 fingerprint |  |
| Retry 횟수 |  |
| 종료 상태 |  |
| 다음 작업 |  |
| 사람 확인 필요 항목 |  |

## Operating Notes

- 이 프로젝트는 GitHub Pages에서 동작하는 정적 HTML, CSS, JavaScript 사이트다.
- 검증은 실제로 존재하는 도구만 사용한다.
- 존재하지 않는 npm 명령어나 테스트 명령어를 임의로 만들지 않는다.
- `AORR.md`와 `MEMORY.md`는 상태와 가드레일의 단일 기준 문서로 유지한다.
- 코드 변경 전에는 먼저 읽기, 검증, 상태 분류를 우선한다.

## Latest Loop

| 항목 | 내용 |
|---|---|
| Loop ID | 2 |
| 시작 시각 | 2026-07-14 14:05:45 +09:00 |
| 목표 | GitHub Pages에서 실제로 사용할 수 있는 정적 개인 프로페셔널 웹사이트와 지렁이 게임 구현 |
| 시작 상태 | `READY` |
| 가설 | 프로필/경력/프로젝트 섹션과 완성형 Snake 게임을 한 번에 정리하면 이후 배포 준비가 쉬워진다 |
| Act | `index.html`, `styles.css`, `script.js`, `game.js` 재구성 |
| 변경 파일 | `index.html`, `styles.css`, `script.js`, `game.js`, `MEMORY.md`, `.gitignore` |
| Verifier | `cscript.exe //nologo script.js`, `cscript.exe //nologo game.js`, `python.exe -m http.server 8000 --bind 127.0.0.1`, `Invoke-WebRequest` |
| 테스트 결과 | 스크립트 문법 통과, 로컬 HTTP 200 통과, `index.html`/CSS/JS 연결 통과, Games 섹션 및 게임 요소 확인 |
| exit code | 0 |
| 오류 fingerprint | `GIT_METADATA_PERMISSION_DENIED` |
| Retry 횟수 | 1 |
| 종료 상태 | `DEPLOYED` |
| 다음 작업 | [사람 확인 필요] 브라우저 콘솔/실기기 상호작용 검증 |
| 사람 확인 필요 항목 | 브라우저 콘솔, 실기기 조작, 추후 콘텐츠 보강 |

## Verification Notes

- Claude Code CLI는 로그인 상태 확인 및 도구 점검에만 사용한다.
- 프로젝트 파일 내용을 외부로 보내는 검증은 로컬 Verifier로 대체한다.
- Sonnet 5 실제 사용 여부와 실제 모델명은 파일 전송이 없는 범위에서만 확정한다.
- 로컬 정적 서버는 `python.exe -m http.server 8000 --bind 127.0.0.1`로 확인했다.
- `script.js`와 `game.js`는 `cscript.exe //nologo`로 문법 검증을 통과했다.
- Git 저장소 메타는 현재 환경의 권한 때문에 직접 복구하지 못했다.
- `https://idknow-kim.github.io/`에서 HTTP 200을 확인했다.
