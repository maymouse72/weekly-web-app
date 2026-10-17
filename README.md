# SI사업2팀 주간업무 보고

주간보고 작성, 제출 현황, 본사·프로젝트 인력 관리, 상사 보고용 엑셀 취합을 위한 반응형 웹앱/PWA 미리보기입니다.

## 실행

정적 파일을 제공하는 로컬 HTTP 서버에서 실행합니다. PWA 서비스 워커는 `file://` 대신 `localhost` 또는 HTTPS에서 동작합니다.

```powershell
cd D:\weekly-web-app
py -m http.server 4173
```

브라우저에서 `http://localhost:4173`을 엽니다. 설치 가능한 브라우저에서는 메뉴에서 앱 설치 또는 홈 화면에 추가를 선택할 수 있습니다.

## 현재 제공 기능

- 주간 대시보드와 본사 근무자 제출 현황
- 업무구분, 프로젝트, 고객사, 투입 기간, 담당영업, 기타를 저장하는 구조화 주간보고
- 지난주 차주 계획을 이번 주 업무로 불러오기, 금주 내용을 차주 계획에 복사하기
- 팀장이 프로젝트 근무자 목록에서 직접 입력하고 지난 주 내용을 불러오는 화면
- 본사/프로젝트 인력 구분, 추가, 근무 상태 변경, 비활성 처리
- 취합 화면에서 팀원별 보고를 확인하고 상사 보고용 9개 항목 `.xlsx` 파일 다운로드
- 브라우저 로컬 저장, 서비스 워커 캐시 및 브라우저 알림 설정

팀원 직급·직무·직책은 `팀원명단.xlsx`를 반영합니다. 근무 구분과 프로젝트 내용은 2026년 10월 5일 주간 보고서를 기준으로 하며, 해당 문서에 10월 7일 프로젝트 철수로 기재된 김이슬님은 본사 근무로 분류했습니다. 업무 상세와 제출 시각은 화면 흐름을 보여주기 위한 예시입니다.

## Supabase 연결 및 초기 비밀번호 계정

Vercel 배포에서는 `/api/config`가 서버 환경 변수 `SUPABASE_URL`과 `SUPABASE_PUBLISHABLE_KEY`(또는 기존 `SUPABASE_ANON_KEY`) 중 publishable 키를 브라우저에 전달하고, 앱은 Supabase REST API를 사용합니다. 브라우저에 노출되는 것은 publishable/anon 키뿐이며 secret/service-role 키를 사용하지 않습니다.

`members`에는 팀원 명단과 근무 구분을 저장하고, `weekly_reports`에는 주차별 보고 내용을 저장합니다. 로그인은 Supabase Auth의 이름별 계정과 초기 비밀번호로 확인하며, 비밀번호 원문은 앱 코드와 DB에 저장하지 않습니다. 계정 등록 스크립트는 엑셀 파일을 로컬에서 읽어 Supabase Auth에 직접 계정을 생성/갱신합니다.

### 계정 등록 및 RLS 적용

1. Supabase 대시보드의 `Project Settings → API Keys`에서 서버 전용 legacy `service_role` 키를 준비합니다. 이 키는 브라우저나 GitHub에 절대 넣지 마세요.
2. PowerShell에서 임시 환경 변수로 설정하고 계정 등록 스크립트를 실행합니다. 키 입력은 숨겨지고, 등록 후 환경 변수를 지웁니다.

```powershell
$secureKey = Read-Host "Supabase service_role key" -AsSecureString
$env:SUPABASE_SERVICE_ROLE_KEY = [System.Net.NetworkCredential]::new("", $secureKey).Password
py -m pip install openpyxl
py scripts\provision_auth_users.py "D:\weekly-work\02. 스크립트\초기비밀번호.xlsx"
Remove-Item Env:SUPABASE_SERVICE_ROLE_KEY
Remove-Variable secureKey
```

3. 앱 변경사항을 배포합니다. 로컬 미리보기는 화면 확인을 위해 임의의 비밀번호로 입장되며, 실제 인증은 배포 환경의 Supabase Auth에서 처리합니다.
4. 배포 화면에서 팀원 한 명과 팀장 계정 로그인을 확인한 뒤, `supabase-auth-rls.sql` 내용을 Supabase SQL Editor에서 실행합니다. 이 정책은 비로그인 사용자의 보고서 조회/등록/수정을 막고, 팀원은 로그인 후 전체 보고서를 열람하되 본인 보고서만 등록·수정하게 합니다. 팀장 계정은 명단 관리와 전체 보고서 입력 권한을 받습니다.
5. 팀원에게 초기 비밀번호를 개별 전달합니다. 초기 비밀번호는 이력서·메신저 단체방·저장소에 올리지 마세요. 계정 등록 스크립트를 다시 실행해도 기존 비밀번호는 바뀌지 않습니다. 비밀번호를 재설정해야 할 때만 엑셀의 값을 바꾼 뒤 `--reset-passwords` 옵션을 추가해 실행하세요. 이 옵션은 엑셀에 있는 모든 기존 계정의 비밀번호를 갱신하므로 필요한 경우에만 사용합니다.

SQL 정책은 계정 등록과 새 앱 배포 뒤에 적용하세요. 계정 등록 스크립트는 비밀번호를 터미널에 출력하지 않습니다.

현재 알림 설정은 앱이 실행 중일 때만 확인하는 브라우저 알림입니다. PWA 백그라운드 푸시와 Vercel 예약 발송은 별도 연결이 필요합니다.
