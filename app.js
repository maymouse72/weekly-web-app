const weekStart = new Date();
weekStart.setHours(0, 0, 0, 0);
weekStart.setDate(weekStart.getDate() - ((weekStart.getDay() + 6) % 7));
const weekEnd = new Date(weekStart); weekEnd.setDate(weekEnd.getDate() + 4);
const weekThursday = new Date(weekStart); weekThursday.setDate(weekThursday.getDate() + 3);
const toLocalISO = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
const currentDate = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'short', day: 'numeric' }).format(new Date()).toUpperCase();
const CURRENT_WEEK = { start: toLocalISO(weekStart), end: toLocalISO(weekEnd), label: `${weekStart.getMonth() + 1}월 ${weekStart.getDate()}일 — ${weekEnd.getMonth() + 1}월 ${weekEnd.getDate()}일` };
const deadlineDate = `${weekThursday.getMonth() + 1}월 ${weekThursday.getDate()}일 (목) 오전 11:00`;
const names = [
  { name: '김강수', role: '수석', job: 'PM', type: 'office' }, { name: '전희성', role: '수석', job: 'PM', type: 'office' },
  { name: '전용훈', role: '책임', job: '개발', type: 'office' }, { name: '박창준', role: '선임', job: '개발', type: 'office' },
  { name: '이희재', role: '전임', job: '개발', type: 'office' }, { name: '이창호', role: '선임', job: '개발', type: 'office' },
  { name: '이세인', role: '주임', job: '개발', type: 'office' }, { name: '이정림', role: '주임', job: '개발', type: 'office' },
  { name: '김용규', role: '전문위원', job: 'PM', position: '팀장', isAdmin: true, type: 'project', client: '신협중앙회', project: '전산센터 통합운영', end: '2027.03.31' },
  { name: '박용훈', role: '수석', job: 'PM', type: 'project', client: '건강보험공단', project: '정보시스템 기능개발 통합사업', end: '2027.03.31' },
  { name: '마선옥', role: '수석', job: 'PM', type: 'project', client: '대법원', project: '인사관리시스템 고도화', end: '2027.07.31' },
  { name: '김정환', role: '수석', job: 'PL', type: 'project', client: '건강보험공단', project: '응용SW 유지관리', end: '2026.10.31' },
  { name: '권순태', role: '수석', job: 'PL', type: 'project', client: '도로교통공단', project: '정보시스템 재구축', end: '2027.03.31' },
  { name: '박수정', role: '수석', job: 'PL', type: 'project', client: '금융정보분석원', project: 'FIU정보시스템 운영 및 유지관리', end: '2027.12.31' },
  { name: '장현우', role: '선임', job: '개발', type: 'project', client: '금융정보분석원', project: 'FIU정보시스템 운영 및 유지관리', end: '2027.12.31' },
  { name: '조현우', role: '선임', job: '개발', type: 'project', client: '교육학술정보원', project: '교육학술정보시스템 위탁운영', end: '2026.12.31' },
  { name: '김경아', role: '전임', job: '개발', type: 'project', client: '우리은행', project: '재산관리시스템 재구축', end: '2027.03.31' },
  { name: '김현호', role: '전임', job: '개발', type: 'project', client: '대법원', project: '인사관리시스템 고도화', end: '2027.07.31' },
  { name: '곽은채', role: '주임', job: '개발', type: 'project', client: '경기신용보증재단', project: '정보시스템 통합 유지관리', end: '2026.12.31' },
  { name: '나현웅', role: '주임', job: '개발', type: 'project', client: '도로교통공단', project: '정보시스템 재구축', end: '2027.03.31' },
  { name: '손정환', role: '주임', job: '개발', type: 'project', client: '한국도로공사', project: '정보인프라 개선 사업', end: '2027.01.31' },
  { name: '우영두', role: '사원', job: '개발', type: 'project', client: '대법원', project: '인사관리시스템 고도화', end: '2027.07.01' },
  // The attached roster lists an Oct 7 project withdrawal; for the current Oct 12–16 week, place this member back in the headquarters reporting group.
  { name: '김이슬', role: '사원', job: '개발', type: 'office', note: '10월 7일 프로젝트 철수' },
];
const sampleReports = {
  김강수: { task: '주간업무 보고 체계 정리 및 팀 내 일정 확인\n팀원별 제출 현황 점검', next: '주간보고 양식 개선안 검토\n팀 일정 취합 및 공유', time: '10:12' },
  전희성: { task: '팀 운영 현황 확인 및 주간 일정 조율\n업무 현황 보고 자료 검토', next: '주간 일정 업데이트 및 공유\n팀원 업무 진행 상황 확인', time: '10:24' },
  전용훈: { task: '개발 환경 점검 및 기존 업무 자료 정리\n내부 교육 과정 수강', next: '개발 업무 준비 및 교육 과정 수료\n관련 기술 자료 학습', time: '10:37' },
  이세인: { task: '주간업무 보고 웹 화면 구성 검토\n팀 업무 프로세스 인터뷰 내용 정리', next: '보고서 작성 화면 개선\n담당자 피드백 반영', time: '10:43' },
  이정림: { task: '내부 업무 지원 및 기존 문서 현행화\n직무 관련 온라인 교육 수강', next: '업무 자료 정리 및 공유\n관련 교육 과정 이어서 수강', time: '10:51' },
};
const saved = JSON.parse(localStorage.getItem('workweek-state') || '{}');
let members = saved.members
  ? saved.members.map((m) => {
      const latest = names.find((item) => item.name === m.name);
      return latest ? { ...m, role: latest.role, job: latest.job, position: latest.position || m.position || '팀원', isAdmin: latest.isAdmin ?? m.isAdmin ?? false, active: m.active ?? true } : m;
    })
  : names.map((m) => ({ ...m, position: m.position || '팀원', active: true }));
let reports = saved.reports || Object.fromEntries(Object.entries(sampleReports).map(([name, data]) => [name, { ...data, submitted: true, week: CURRENT_WEEK.start }]));
let previousReports = {};
let supabaseConfig = null;
let connectionError = '';
const localPreview = ['localhost', '127.0.0.1'].includes(location.hostname);
let dataLoading = !localPreview;
let state = { page: 'dashboard', memberFilter: 'all', query: '', currentMemberName: localStorage.getItem('workweek-current-member') || '', ...(saved.ui || {}) };
const pageTitles = { dashboard: '대시보드', report: '주간보고 작성', team: '팀 현황', admin: '취합 및 내보내기', settings: '알림 설정' };
const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
const escapeHtml = (v = '') => String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
async function dbRequest(table, query = '', options = {}) {
  if (!supabaseConfig) throw new Error('공유 데이터베이스가 연결되지 않았습니다.');
  const headers = { apikey: supabaseConfig.publishableKey, 'Content-Type': 'application/json' };
  if (options.prefer) headers.Prefer = options.prefer;
  const response = await fetch(`${supabaseConfig.supabaseUrl}/rest/v1/${table}${query ? `?${query}` : ''}`, {
    method: options.method || 'GET', headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  if (!response.ok) throw new Error(data?.message || data?.error || `Supabase 요청 오류 (${response.status})`);
  return data;
}
function mapMember(row) {
  return { id: row.id, name: row.name, role: row.role, job: row.job, position: row.position || '팀원', type: row.work_type,
    active: row.status === 'ACTIVE', isAdmin: row.is_admin, client: row.project_client || '', project: row.project_name || '',
    start: row.assignment_start || '', end: row.assignment_end || '', note: row.note || '' };
}
function mapReport(row) {
  return { id: row.id, task: row.task_content || '', next: row.next_week_plan || '', leave: row.leave_note || '',
    category: row.work_category || '', submitted: row.submitted, week: row.week_start,
    time: row.submitted_at ? new Intl.DateTimeFormat('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(row.submitted_at)) : '' };
}
async function initializeRemoteData() {
  try {
    const configResponse = await fetch('/api/config', { cache: 'no-store' });
    if (!configResponse.ok) throw new Error('Vercel 환경 변수 또는 API 설정을 확인해 주세요.');
    supabaseConfig = await configResponse.json();
    const previousStartDate = new Date(weekStart); previousStartDate.setDate(previousStartDate.getDate() - 7);
    const previousStart = toLocalISO(previousStartDate);
    const memberQuery = new URLSearchParams({ select: '*', status: 'eq.ACTIVE', order: 'name.asc' });
    const reportQuery = new URLSearchParams({ select: '*', week_start: `in.(${CURRENT_WEEK.start},${previousStart})` });
    const [memberRows, reportRows] = await Promise.all([
      dbRequest('members', memberQuery.toString()), dbRequest('weekly_reports', reportQuery.toString()),
    ]);
    members = memberRows.map(mapMember);
    reports = {}; previousReports = {};
    const memberNameById = new Map(members.map((member) => [member.id, member.name]));
    reportRows.forEach((row) => {
      const name = memberNameById.get(row.member_id); if (!name) return;
      const report = mapReport(row);
      if (row.week_start === CURRENT_WEEK.start) reports[name] = report;
      else previousReports[name] = report;
    });
    connectionError = ''; dataLoading = false;
    save(); render();
  } catch (error) {
    console.error('공유 데이터 연결 실패:', error);
    if (localPreview) { dataLoading = false; return; }
    dataLoading = false;
    connectionError = error.message || '공유 데이터베이스에 연결하지 못했습니다.';
    render();
  }
}
const initials = (name) => name.slice(-1);
const office = () => members.filter((m) => m.active && m.type === 'office');
const projectStaff = () => members.filter((m) => m.active && m.type === 'project');
const statusOf = (m) => m.type === 'project' ? 'auto' : reports[m.name]?.submitted && reports[m.name]?.week === CURRENT_WEEK.start ? 'done' : 'pending';
const save = () => { localStorage.setItem('workweek-state', JSON.stringify({ members, reports, ui: { page: state.page, memberFilter: state.memberFilter } })); };
const fmtDate = (iso) => { const [y, m, d] = iso.split('-'); return `${y}.${m}.${d}`; };
const avatarClass = (index) => ['avatar-blue', 'avatar-green', 'avatar-amber', 'avatar-purple', 'avatar-rose'][index % 5];
const badge = (type) => type === 'done' ? '<span class="badge badge-success">제출 완료</span>' : type === 'auto' ? '<span class="badge badge-auto">자동 반영</span>' : '<span class="badge badge-pending">작성 대기</span>';

function header(title) {
  $('#crumbTitle').textContent = title;
  $$('.nav-link[data-page]').forEach((el) => el.classList.toggle('active', el.dataset.page === state.page));
  const member = members.find((m) => m.name === state.currentMemberName && m.active);
  $('#currentProfile').innerHTML = member
    ? `<span class="avatar avatar-blue">${initials(member.name)}</span><div><strong>${escapeHtml(member.name)}</strong><small>${member.position === '팀장' ? '팀장' : '팀원'} · ${member.type === 'office' ? '본사 근무' : '프로젝트'}</small></div><button class="more-button" data-action="logout" aria-label="로그아웃">↪</button>`
    : '<span class="avatar avatar-blue">?</span><div><strong>로그인 전</strong><small>이름을 선택해 주세요</small></div><button class="more-button" data-action="logout" aria-label="로그인">↪</button>';
}
function heading(kicker, title, desc, actions = '') {
  return `<div class="page-heading"><div><div class="eyebrow">${kicker}</div><h1>${title}</h1><p>${desc}</p></div>${actions ? `<div class="heading-actions">${actions}</div>` : ''}</div>`;
}
function submissionRows(limit = 6) {
  return office().slice(0, limit).map((m, i) => {
    const status = statusOf(m), report = reports[m.name];
    return `<div class="submission-row"><div class="person-cell"><span class="avatar mini-avatar ${avatarClass(i)}">${initials(m.name)}</span><div><strong>${escapeHtml(m.name)}</strong><small>${escapeHtml(m.role)} · ${escapeHtml(m.job)}</small></div></div>${badge(status)}<span class="row-meta">${status === 'done' ? `${report?.time || '10:32'} 제출` : '미제출'}</span></div>`;
  }).join('');
}
function dashboard() {
  const me = members.find((m) => m.name === state.currentMemberName);
  const done = office().filter((m) => statusOf(m) === 'done').length;
  const pending = office().length - done;
  return `${heading(currentDate, `좋은 아침이에요, ${escapeHtml(me?.name || '팀원')}님 👋`, '이번 주 업무를 정리하고 팀 보고를 준비해 보세요.', '<button class="button" data-action="go-team">팀원 현황</button>')}
    <section class="dashboard-banner"><div class="banner-copy"><div class="banner-kicker">WEEKLY REPORT · ${fmtDate(CURRENT_WEEK.start)} — ${CURRENT_WEEK.end.slice(5).replace('-', '.')}</div><h2>이번 주 보고, 목요일 오전 11시까지</h2><p>이번 주 업무 내용을 작성해 팀장에게 제출해 주세요. 지난주 내용을 가져와 쉽게 시작할 수 있어요.</p></div><button class="banner-cta" data-page="report">보고서 작성하기 <span>→</span></button></section>
    <section class="stats-grid"><article class="stat-card"><div class="stat-head">팀 전체 인원<span class="stat-icon icon-blue">♧</span></div><div class="stat-value">${members.filter((m) => m.active).length}<small> 명</small></div><div class="stat-note">본사 ${office().length}명 · 프로젝트 ${projectStaff().length}명</div></article><article class="stat-card"><div class="stat-head">본사 보고 제출<span class="stat-icon icon-green">✓</span></div><div class="stat-value">${done}<small> / ${office().length}</small></div><div class="stat-note">목요일 오전 11시 마감</div></article><article class="stat-card"><div class="stat-head">작성 대기<span class="stat-icon icon-amber">◷</span></div><div class="stat-value">${pending}<small> 명</small></div><div class="stat-note">본사 근무자 보고 필요</div></article><article class="stat-card"><div class="stat-head">프로젝트 인력<span class="stat-icon icon-gray">↗</span></div><div class="stat-value">${projectStaff().length}<small> 명</small></div><div class="stat-note">전주 내용 자동 반영</div></article></section>
    <section class="content-grid"><article class="panel"><div class="panel-header"><div><h3>보고 제출 현황</h3><p class="panel-subtitle">본사 근무자는 매주 직접 제출해요</p></div><button class="text-link" data-page="admin">전체 보기 →</button></div><div class="submission-list">${submissionRows()}</div><div class="progress-wrap"><div class="progress-label"><span>제출 진행률</span><strong>${office().length ? Math.round(done / office().length * 100) : 0}%</strong></div><div class="progress-track"><div class="progress-fill" style="width:${office().length ? done / office().length * 100 : 0}%"></div></div></div></article><div class="side-panel"><article class="reminder-card"><div class="reminder-top"><h3>다음 마감 일정</h3><span class="badge badge-pending">오늘 마감</span></div><p>본사 근무자 주간업무 보고 제출 마감입니다.</p><div class="reminder-date"><span>이번 주 보고</span><strong>오늘 오전 11:00</strong></div></article><article class="activity-card"><div class="panel-header"><div><h3>팀 보고 활동</h3><p class="panel-subtitle">이번 주 업데이트</p></div><span class="stat-icon icon-green">↗</span></div>${office().filter((m) => statusOf(m) === 'done').slice(-3).reverse().map((m, i) => `<div class="activity-item"><span class="activity-dot"></span><div><small><strong>${escapeHtml(m.name)}</strong>님이 주간보고를 제출했어요</small><time>${reports[m.name]?.time || '10:32'} · 오늘</time></div></div>`).join('')}</article></div></section>`;
}
function reportPage() {
  const me = members.find((m) => m.name === state.currentMemberName) || office()[0] || { name: '팀원', type: 'office', role: '', job: '' };
  const report = reports[me.name] || {};
  const editable = me.type === 'office';
  return `${heading('MY WEEKLY REPORT', '주간보고 작성', `업무 내용을 정리해 ${fmtDate(CURRENT_WEEK.start)} — ${fmtDate(CURRENT_WEEK.end)} 주간보고를 제출해 주세요.`, '<button class="button" data-action="copy-last">↺ 지난주 내용 가져오기</button>')}
    ${editable ? `<div class="report-layout"><form class="report-card" id="reportForm"><div class="form-section"><label class="form-label">보고 대상</label><div class="report-meta"><span class="meta-chip">${escapeHtml(me.name)} · ${escapeHtml(me.role)} ${escapeHtml(me.job)}</span><span class="meta-chip">본사 근무</span><span class="meta-chip">보고 기간 ${fmtDate(CURRENT_WEEK.start)} — ${fmtDate(CURRENT_WEEK.end)}</span></div></div><div class="form-section"><label class="form-label" for="taskInput">금주 업무 내용 <span style="color:#d45b56">*</span></label><p class="form-help">이번 주에 진행한 업무와 주요 결과를 작성해 주세요.</p><textarea class="text-area" id="taskInput" required placeholder="예: 담당 업무 진행 상황, 완료한 작업, 주요 이슈 등을 입력해 주세요.">${escapeHtml(report.task || '')}</textarea></div><div class="form-section"><label class="form-label" for="nextInput">차주 업무 계획</label><p class="form-help">다음 주 예정된 업무나 일정이 있다면 작성해 주세요.</p><textarea class="text-area compact" id="nextInput" placeholder="예: 다음 주 진행할 업무와 주요 일정">${escapeHtml(report.next || '')}</textarea></div><div class="form-row"><div><label class="form-label" for="leaveInput">휴가·특이사항</label><input class="text-input" id="leaveInput" value="${escapeHtml(report.leave || '')}" placeholder="해당 사항이 없으면 비워두세요" /></div><div><label class="form-label" for="projectInput">업무 구분</label><select class="select-input" id="projectInput"><option>본사 근무 및 교육</option><option>내부 지원 업무</option><option>기타</option></select></div></div><div class="form-actions"><span class="save-note">${report.submitted ? `마지막 제출 ${report.time || '10:43'} · 수정 후 다시 제출할 수 있어요.` : '작성 중인 내용은 이 기기에 자동 저장됩니다.'}</span><button class="button button-primary" type="submit">보고 제출하기 <span>→</span></button></div></form><aside class="report-aside"><article class="aside-card"><h3>제출 전 확인</h3><div class="check-list"><div class="check-item"><span class="check-icon">✓</span>보고 기간이 맞는지 확인</div><div class="check-item"><span class="check-icon">✓</span>금주 업무 내용을 작성</div><div class="check-item"><span class="check-icon">✓</span>제출 후에도 수정 가능</div></div></article><article class="aside-card"><h3>지난주 보고 불러오기</h3><div class="aside-tip">변동이 없다면 지난주 업무 내용을 가져와 기간만 확인하고 제출할 수 있어요.</div><button class="button button-soft" style="width:100%;margin-top:11px" data-action="copy-last">지난주 내용 가져오기</button></article><article class="aside-card auto-copy-card"><h3>프로젝트 근무자는 자동 반영</h3><p>프로젝트 근무 중인 팀원은 전주 보고 내용을 이번 주 취합본에 자동으로 반영해요. 변경이 필요하면 팀장에게 알려주세요.</p></article></aside></div>` : `<article class="panel"><h3>프로젝트 근무 상태</h3><p class="panel-subtitle">현재 프로젝트 근무 중입니다. 주간보고는 팀장이 지난주 내용을 자동 반영해요.</p></article>`}`;
}
function teamPage() {
  let list = members.filter((m) => m.active);
  if (state.memberFilter === 'office' || state.memberFilter === 'project') list = list.filter((m) => m.type === state.memberFilter);
  if (state.query) list = list.filter((m) => `${m.name} ${m.role} ${m.client || ''} ${m.project || ''}`.toLowerCase().includes(state.query.toLowerCase()));
  const rows = list.map((m, i) => `<tr><td><div class="table-person"><span class="avatar mini-avatar ${avatarClass(i)}">${initials(m.name)}</span><div><strong>${escapeHtml(m.name)}</strong><small>${escapeHtml(m.role)} · ${escapeHtml(m.job)}${m.position === '팀장' ? ' · 팀장' : ''}</small></div></div></td><td>${m.type === 'office' ? '<span class="badge badge-neutral">본사 근무</span>' : '<span class="badge badge-auto">프로젝트</span>'}</td><td>${escapeHtml(m.client || '—')}</td><td>${escapeHtml(m.project || '본사 근무 및 교육')}</td><td>${m.type === 'office' ? badge(statusOf(m)) : `<span class="table-muted">${escapeHtml(m.end || '—')} 철수 예정</span>`}</td><td><button class="text-link" data-action="change-member" data-name="${escapeHtml(m.name)}">상태 변경</button></td></tr>`).join('');
  return `${heading('TEAM DIRECTORY', '팀원 현황', `본사와 프로젝트 인력을 확인하고 근무 상태 변경을 관리해요. 현재 ${members.filter((m) => m.active).length}명`, '<button class="button button-primary" data-action="add-member">＋ 팀원 추가</button>')}
    <div class="toolbar"><div class="filter-tabs"><button class="filter-tab ${state.memberFilter === 'all' ? 'active' : ''}" data-filter="all">전체 ${members.filter((m) => m.active).length}</button><button class="filter-tab ${state.memberFilter === 'office' ? 'active' : ''}" data-filter="office">본사 ${office().length}</button><button class="filter-tab ${state.memberFilter === 'project' ? 'active' : ''}" data-filter="project">프로젝트 ${projectStaff().length}</button></div><label class="search-box"><span>⌕</span><input id="teamSearch" value="${escapeHtml(state.query)}" placeholder="이름, 프로젝트 검색" /></label></div>
    <div class="table-wrap"><table class="data-table"><thead><tr><th>팀원</th><th>근무 구분</th><th>고객</th><th>프로젝트 / 업무</th><th>보고 / 철수 예정</th><th></th></tr></thead><tbody>${rows || '<tr><td colspan="6"><div class="empty-state">검색 결과가 없습니다.</div></td></tr>'}</tbody></table></div>`;
}
function adminPage() {
  const done = office().filter((m) => statusOf(m) === 'done').length, pending = office().length - done;
  return `${heading('MANAGER WORKSPACE', '취합 및 내보내기', '본사 보고와 프로젝트 인력 현황을 확인하고 상사 보고용 엑셀을 내려받으세요.', '<button class="button button-primary" data-action="export-xlsx">↓ 엑셀 다운로드</button>')}
    <section class="stats-grid"><article class="stat-card"><div class="stat-head">제출 완료<span class="stat-icon icon-green">✓</span></div><div class="stat-value">${done}<small> / ${office().length}명</small></div><div class="stat-note">본사 근무자</div></article><article class="stat-card"><div class="stat-head">미제출<span class="stat-icon icon-amber">◷</span></div><div class="stat-value">${pending}<small> 명</small></div><div class="stat-note">제출 독려가 필요한 인원</div></article><article class="stat-card"><div class="stat-head">프로젝트 인력<span class="stat-icon icon-blue">↗</span></div><div class="stat-value">${projectStaff().length}<small> 명</small></div><div class="stat-note">전주 보고 내용 자동 반영</div></article><article class="stat-card"><div class="stat-head">보고 기간<span class="stat-icon icon-gray">▦</span></div><div class="stat-value" style="font-size:15px;margin-top:15px">${CURRENT_WEEK.label}</div><div class="stat-note">2026년 10월 둘째 주</div></article></section>
    <article class="panel" style="margin-bottom:14px"><div class="panel-header"><div><h3>본사 근무자 보고</h3><p class="panel-subtitle">직접 제출한 금주 업무와 차주 계획</p></div><span class="badge badge-pending">${pending}명 대기</span></div><div class="table-wrap" style="border:0"><table class="data-table" style="min-width:580px"><thead><tr><th>팀원</th><th>상태</th><th>금주 업무</th><th>차주 계획</th><th>제출</th></tr></thead><tbody>${office().map((m, i) => { const r = reports[m.name] || {}; return `<tr><td><div class="table-person"><span class="avatar mini-avatar ${avatarClass(i)}">${initials(m.name)}</span><div><strong>${escapeHtml(m.name)}</strong><small>${escapeHtml(m.role)} · ${escapeHtml(m.job)}</small></div></div></td><td>${badge(statusOf(m))}</td><td>${r.task ? escapeHtml(r.task.split('\n')[0]) : '<span class="table-muted">제출 대기</span>'}</td><td>${r.next ? escapeHtml(r.next.split('\n')[0]) : '<span class="table-muted">—</span>'}</td><td class="table-muted">${r.time || '—'}</td></tr>`; }).join('')}</tbody></table></div></article>
    <article class="panel"><div class="panel-header"><div><h3>프로젝트 인력 자동 반영</h3><p class="panel-subtitle">전주 보고를 복사하고 이번 주 기간을 적용해요. 인력 상태에서 프로젝트 배치가 관리됩니다.</p></div><span class="badge badge-auto">${projectStaff().length}명 자동 반영</span></div><div class="table-wrap" style="border:0"><table class="data-table" style="min-width:580px"><thead><tr><th>팀원</th><th>고객</th><th>프로젝트</th><th>철수 예정</th><th>주간보고</th></tr></thead><tbody>${projectStaff().map((m, i) => `<tr><td><div class="table-person"><span class="avatar mini-avatar ${avatarClass(i + 1)}">${initials(m.name)}</span><div><strong>${escapeHtml(m.name)}</strong><small>${escapeHtml(m.role)} · ${escapeHtml(m.job)}</small></div></div></td><td>${escapeHtml(m.client)}</td><td>${escapeHtml(m.project)}</td><td>${escapeHtml(m.end || '—')}</td><td>${badge('auto')}</td></tr>`).join('')}</tbody></table></div></article>`;
}
function settingsPage() {
  return `${heading('PREFERENCES', '알림 설정', '마감 알림을 받을 시간과 방법을 설정해요.')}
    <div class="settings-grid"><article class="settings-card"><h3>주간보고 마감 알림</h3><p>목요일 오전에 주간보고 작성 알림을 받아요.</p><div class="setting-row"><div><strong>브라우저 알림</strong><small>이 기기에서 알림 표시 (앱이 실행 중일 때)</small></div><input class="toggle" type="checkbox" id="pushToggle" ${localStorage.getItem('workweek-notify') === 'on' ? 'checked' : ''} /></div><div class="setting-row"><div><strong>알림 시각</strong><small>목요일 오전 기준</small></div><input class="text-input" type="time" id="notifyTime" value="${localStorage.getItem('workweek-time') || '09:00'}" style="width:112px;padding:7px" /></div><div class="setting-row"><div><strong>주간보고 마감</strong><small>팀 공통 마감 시간</small></div><span class="meta-chip">목요일 오전 11:00</span></div><button class="button button-primary" data-action="save-settings" style="margin-top:12px">설정 저장</button></article><article class="settings-card"><h3>앱 설치 및 데이터</h3><p>홈 화면에 추가하면 앱처럼 빠르게 열 수 있어요.</p><div class="setting-row"><div><strong>홈 화면에 추가</strong><small>브라우저 메뉴에서 “앱 설치” 또는 “홈 화면에 추가” 선택</small></div><span class="stat-icon icon-blue">＋</span></div><div class="setting-row"><div><strong>저장 위치</strong><small>${supabaseConfig ? '팀원이 함께 사용하는 Supabase 공유 데이터베이스' : '현재 브라우저와 기기의 로컬 저장소'}</small></div><span class="badge badge-neutral">${supabaseConfig ? '공유 저장' : '이 기기'}</span></div><div class="aside-tip" style="margin-top:13px">${supabaseConfig ? '보고서와 팀원 정보는 Supabase에 공유 저장됩니다. 앱을 닫아도 받는 PWA 푸시 알림은 다음 단계에서 연결해야 합니다.' : '로컬 미리보기에서는 브라우저 저장소와 이 기기 알림을 사용합니다.'}</div></article></div>`;
}
function render() {
  if (dataLoading) {
    $('#sidebar').classList.add('login-locked');
    $('#crumbTitle').textContent = '공유 데이터 연결';
    $('#pageContent').innerHTML = '<div class="login-screen"><div class="login-card"><div class="brand-mark">W</div><h1>팀 정보를 불러오는 중입니다</h1><p>잠시만 기다려 주세요.</p></div></div>';
    return;
  }
  if (connectionError) {
    $('#sidebar').classList.add('login-locked');
    $('#crumbTitle').textContent = '공유 데이터 연결';
    $('#pageContent').innerHTML = `<div class="login-screen"><div class="login-card"><div class="brand-mark">W</div><div class="eyebrow" style="margin-top:20px">SI사업2팀 · WEEKLY REPORT</div><h1>데이터 연결을 확인해 주세요</h1><p>${escapeHtml(connectionError)}</p><button class="button button-primary" style="width:100%;margin-top:13px" onclick="location.reload()">다시 시도</button></div></div>`;
    return;
  }
  if (!state.currentMemberName || !members.some((m) => m.active && m.name === state.currentMemberName)) {
    state.currentMemberName = '';
    $('#sidebar').classList.add('login-locked');
    $('#crumbTitle').textContent = '이름 로그인';
    $('#currentProfile').innerHTML = '<span class="avatar avatar-blue">?</span><div><strong>로그인 전</strong><small>이름을 선택해 주세요</small></div>';
    $('#pageContent').innerHTML = `<div class="login-screen"><div class="login-card"><div class="brand-mark">W</div><div class="eyebrow" style="margin-top:20px">SI사업2팀 · WEEKLY REPORT</div><h1>이름을 선택해 주세요</h1><p>별도 계정 없이 팀원 이름을 선택해 업무공간에 입장합니다.</p><form id="nameLoginForm"><label class="form-label" for="nameLoginSelect">팀원 이름</label><select class="select-input" id="nameLoginSelect" required><option value="">이름 선택</option>${members.filter((m) => m.active).map((m) => `<option value="${escapeHtml(m.name)}">${escapeHtml(m.name)} · ${m.position === '팀장' ? '팀장' : m.type === 'office' ? '본사' : '프로젝트'}</option>`).join('')}</select><button class="button button-primary" style="width:100%;margin-top:13px" type="submit">업무공간 입장 <span>→</span></button></form><small class="login-note">이름 선택은 본인 확인이 아닙니다. URL을 아는 사람은 다른 이름을 선택할 수 있습니다.</small></div></div>`;
    return;
  }
  $('#sidebar').classList.remove('login-locked');
  header(pageTitles[state.page] || '대시보드');
  $('#periodPill').innerHTML = `<span class="status-dot"></span>${fmtDate(CURRENT_WEEK.start)} — ${CURRENT_WEEK.end.slice(5).replace('-', '.')}`;
  $('#deadlineText').textContent = toLocalISO(new Date()) === toLocalISO(weekThursday) ? '오늘 오전 11:00' : deadlineDate;
  const views = { dashboard, report: reportPage, team: teamPage, admin: adminPage, settings: settingsPage };
  $('#pageContent').innerHTML = (views[state.page] || dashboard)();
  const overlay = $('.mobile-overlay'); if (overlay) overlay.remove();
  if ($('#sidebar').classList.contains('open')) { const node = document.createElement('div'); node.className = 'mobile-overlay visible'; node.id = 'mobileOverlay'; document.body.appendChild(node); }
}
function go(page) { state.page = page; if (page !== 'team') state.query = ''; if (window.innerWidth <= 760) $('#sidebar').classList.remove('open'); save(); render(); window.scrollTo(0, 0); }
function toast(message) { const node = document.createElement('div'); node.className = 'toast'; node.textContent = message; $('#toastRegion').appendChild(node); setTimeout(() => node.remove(), 3000); }
function copyLast() {
  const me = members.find((m) => m.name === state.currentMemberName); if (!me) return toast('지난주 보고 내용을 찾지 못했어요.');
  const previous = previousReports[me.name] || (localPreview ? sampleReports[me.name] : null);
  if (!previous) return toast('지난주 보고 내용을 찾지 못했어요.');
  $('#taskInput').value = previous?.task || ''; $('#nextInput').value = previous?.next || '';
  toast('지난주 내용을 가져왔어요. 기간을 확인하고 제출해 주세요.');
}
async function saveReport(event) {
  event.preventDefault(); const task = $('#taskInput').value.trim();
  if (!task) return toast('금주 업무 내용을 입력해 주세요.');
  const member = members.find((item) => item.name === state.currentMemberName);
  if (!member) return toast('팀원 정보를 다시 확인해 주세요.');
  const now = new Date();
  const report = { task, next: $('#nextInput').value.trim(), leave: $('#leaveInput').value.trim(), category: $('#projectInput').value, submitted: true, week: CURRENT_WEEK.start, time: new Intl.DateTimeFormat('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false }).format(now) };
  try {
    if (supabaseConfig) {
      const query = new URLSearchParams({ on_conflict: 'member_id,week_start' }).toString();
      const rows = await dbRequest('weekly_reports', query, { method: 'POST', prefer: 'resolution=merge-duplicates,return=representation', body: {
        member_id: member.id, week_start: CURRENT_WEEK.start, week_end: CURRENT_WEEK.end, work_type_at_submission: member.type,
        task_content: report.task, next_week_plan: report.next, leave_note: report.leave, work_category: report.category,
        submitted: true, submitted_at: now.toISOString(), written_by: member.id,
        copied_from_report_id: previousReports[member.name]?.id || null,
      } });
      report.id = rows?.[0]?.id || reports[member.name]?.id;
    }
    reports[member.name] = report;
    save(); toast('주간보고를 제출했어요.'); render();
  } catch (error) { console.error('주간보고 저장 실패:', error); toast(`제출하지 못했어요: ${error.message}`); }
}
async function persistMember(member, isNew = false) {
  if (!supabaseConfig) return;
  const payload = {
    name: member.name, role: member.role, job: member.job, position: member.position || '팀원',
    work_type: member.type, status: member.active ? 'ACTIVE' : 'INACTIVE', is_admin: Boolean(member.isAdmin),
    project_client: member.client || null, project_name: member.project || null,
    assignment_start: member.start || null, assignment_end: member.end && /^\d{4}-\d{2}-\d{2}$/.test(member.end) ? member.end : null,
    note: member.note || null, updated_at: new Date().toISOString(),
  };
  const result = await dbRequest('members', isNew ? '' : `id=eq.${encodeURIComponent(member.id)}`, {
    method: isNew ? 'POST' : 'PATCH', prefer: 'return=representation', body: payload,
  });
  if (!result?.length) throw new Error('팀원 정보를 저장하지 못했습니다.');
  return mapMember(result[0]);
}
async function changeMember(name) {
  const member = members.find((m) => m.name === name); if (!member) return;
  const before = { ...member };
  const action = prompt(`${name}님의 근무 상태를 변경합니다.\n\n1 = 본사 근무\n2 = 프로젝트 근무\n3 = 퇴사 처리\n\n현재: ${member.type === 'office' ? '본사 근무' : '프로젝트 근무'}`);
  if (action === '1') { member.type = 'office'; member.client = '본사'; member.project = '본사 근무 및 교육'; member.start = ''; member.end = ''; }
  else if (action === '2') { const client = prompt('고객명을 입력해 주세요.', member.client || ''); if (client === null) return; const project = prompt('프로젝트명을 입력해 주세요.', member.project || ''); if (project === null) return; member.type = 'project'; member.client = client; member.project = project; member.end = member.end || ''; }
  else if (action === '3') member.active = false;
  else return;
  try {
    await persistMember(member); save(); render();
    toast(action === '3' ? `${name}님을 비활성 처리했어요.` : `${name}님의 근무 상태를 변경했어요.`);
  } catch (error) { Object.assign(member, before); toast(`저장하지 못했어요: ${error.message}`); }
}
async function addMember() {
  const name = prompt('추가할 팀원 이름을 입력해 주세요.'); if (!name?.trim()) return;
  if (members.some((member) => member.name === name.trim())) return toast('이미 등록된 이름입니다.');
  const role = prompt('직급을 입력해 주세요.', '사원'); if (role === null) return;
  const job = prompt('직무를 입력해 주세요.', '개발'); if (job === null) return;
  const mode = prompt('근무 구분을 선택해 주세요.\n1 = 본사 근무\n2 = 프로젝트 근무', '1'); if (mode === null) return;
  let member = { name: name.trim(), role, job, position: '팀원', type: mode === '2' ? 'project' : 'office', active: true, client: '본사', project: '본사 근무 및 교육' };
  if (member.type === 'project') { member.client = prompt('고객명', '') || '미정'; member.project = prompt('프로젝트명', '') || '미정'; member.end = prompt('철수 예정일 (YYYY-MM-DD)', '') || ''; }
  try {
    const savedMember = await persistMember(member, true);
    if (savedMember) member = savedMember;
    members.push(member); save(); render(); toast(`${member.name}님을 팀원으로 추가했어요.`);
  } catch (error) { toast(`팀원을 추가하지 못했어요: ${error.message}`); }
}

// Small, dependency-free XLSX writer: creates a real OOXML workbook with two sheets.
const utf8 = new TextEncoder();
const xmlEscape = (s) => escapeHtml(String(s ?? '')).replace(/&#39;/g, '&apos;');
function colName(n) { let out = ''; while (n) { const r = (n - 1) % 26; out = String.fromCharCode(65 + r) + out; n = Math.floor((n - 1) / 26); } return out; }
function sheetXml(rows, widths) {
  const cols = widths.map((w, i) => `<col min="${i + 1}" max="${i + 1}" width="${w}" customWidth="1"/>`).join('');
  const body = rows.map((row, ri) => `<row r="${ri + 1}">${row.map((value, ci) => { const ref = `${colName(ci + 1)}${ri + 1}`, s = typeof value === 'object' && value !== null ? value.value : value, style = ri === 0 ? ' s="1"' : ''; return `<c r="${ref}" t="inlineStr"${style}><is><t xml:space="preserve">${xmlEscape(s)}</t></is></c>`; }).join('')}</row>`).join('');
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><cols>${cols}</cols><sheetData>${body}</sheetData><autoFilter ref="A1:${colName(rows[0].length)}${rows.length}"/></worksheet>`;
}
const crcTable = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
function crc32(bytes) { let c = 0xffffffff; for (const b of bytes) c = crcTable[(c ^ b) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; }
function zip(files) {
  const local = [], central = []; let offset = 0;
  const u16 = (n) => [n & 255, n >>> 8 & 255], u32 = (n) => [n & 255, n >>> 8 & 255, n >>> 16 & 255, n >>> 24 & 255];
  for (const [name, content] of Object.entries(files)) {
    const n = utf8.encode(name), d = utf8.encode(content), crc = crc32(d);
    const header = new Uint8Array([...u32(0x04034b50), ...u16(20), ...u16(0x0800), ...u16(0), ...u16(0), ...u16(0), ...u32(crc), ...u32(d.length), ...u32(d.length), ...u16(n.length), ...u16(0), ...n, ...d]);
    local.push(header);
    const dir = new Uint8Array([...u32(0x02014b50), ...u16(20), ...u16(20), ...u16(0x0800), ...u16(0), ...u16(0), ...u16(0), ...u32(crc), ...u32(d.length), ...u32(d.length), ...u16(n.length), ...u16(0), ...u16(0), ...u16(0), ...u16(0), ...u32(0), ...u32(offset), ...n]);
    central.push(dir); offset += header.length;
  }
  const centralSize = central.reduce((n, p) => n + p.length, 0);
  const end = new Uint8Array([...u32(0x06054b50), ...u16(0), ...u16(0), ...u16(files.length), ...u16(files.length), ...u32(centralSize), ...u32(offset), ...u16(0)]);
  return new Blob([...local, ...central, end], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
}
function exportXlsx() {
  const reportRows = [['이름', '직급', '직무', '금주 업무 내용', '차주 업무 계획', '휴가·특이사항', '제출 상태', '제출 시각']];
  office().forEach((m) => { const r = reports[m.name] || {}; reportRows.push([m.name, m.role, m.job, r.task || '미제출', r.next || '', r.leave || '', statusOf(m) === 'done' ? '제출 완료' : '미제출', r.time || '']); });
  const rosterRows = [['근무 구분', '이름', '직급', '직무', '직책', '고객', '프로젝트 / 업무', '투입일', '철수 예정일', '비고']];
  members.filter((m) => m.active).forEach((m) => rosterRows.push([m.type === 'office' ? '본사 근무' : '프로젝트', m.name, m.role, m.job, m.position || '팀원', m.client || '', m.project || '본사 근무 및 교육', m.start || '', m.end || '', m.type === 'project' ? '전주 내용 자동 반영' : statusOf(m) === 'done' ? '보고 제출' : '보고 대기']));
  const contentTypes = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/worksheets/sheet2.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>`;
  const files = {
    '[Content_Types].xml': contentTypes,
    '_rels/.rels': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`,
    'xl/workbook.xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="주간업무 보고" sheetId="1" r:id="rId1"/><sheet name="인력 현황" sheetId="2" r:id="rId2"/></sheets></workbook>`,
    'xl/_rels/workbook.xml.rels': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet2.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`,
    'xl/styles.xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="2"><font><sz val="10"/><name val="맑은 고딕"/></font><font><b/><color rgb="FFFFFFFF"/><sz val="10"/><name val="맑은 고딕"/></font></fonts><fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF2758DF"/></patternFill></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="2"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"/></cellXfs></styleSheet>`,
    'xl/worksheets/sheet1.xml': sheetXml(reportRows, [16, 12, 12, 52, 40, 20, 14, 12]),
    'xl/worksheets/sheet2.xml': sheetXml(rosterRows, [14, 14, 13, 12, 12, 22, 42, 14, 18, 22]),
  };
  const blob = zip(files), link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = `SI사업2팀_주간업무보고_${CURRENT_WEEK.start.slice(2).replaceAll('-', '.')}_${CURRENT_WEEK.end.slice(5).replaceAll('-', '.')}.xlsx`; link.click(); URL.revokeObjectURL(link.href); toast('상사 보고용 엑셀 파일을 다운로드했어요.');
}

document.addEventListener('click', (event) => {
  const pageButton = event.target.closest('[data-page]'); if (pageButton) { event.preventDefault(); go(pageButton.dataset.page); return; }
  const actionButton = event.target.closest('[data-action]');
  if (actionButton) {
    const action = actionButton.dataset.action;
    if (action === 'go-team') go('team');
    if (action === 'logout') {
      state.currentMemberName = '';
      localStorage.removeItem('workweek-current-member');
      state.page = 'dashboard';
      render();
    }
    if (action === 'copy-last') copyLast();
    if (action === 'export-xlsx') exportXlsx();
    if (action === 'add-member') addMember();
    if (action === 'change-member') changeMember(actionButton.dataset.name);
    if (action === 'save-settings') {
      const time = $('#notifyTime').value; localStorage.setItem('workweek-time', time);
      const enabled = $('#pushToggle').checked; localStorage.setItem('workweek-notify', enabled ? 'on' : 'off');
      if (enabled && 'Notification' in window && Notification.permission === 'default') Notification.requestPermission().then((p) => { if (p !== 'granted') { $('#pushToggle').checked = false; localStorage.setItem('workweek-notify', 'off'); toast('브라우저 알림 권한을 허용해 주세요.'); } else toast('알림 설정을 저장했어요. 앱이 열려 있는 동안 알림을 확인합니다.'); });
      else toast('알림 설정을 저장했어요.');
    }
  }
  const filter = event.target.closest('[data-filter]'); if (filter) { state.memberFilter = filter.dataset.filter; save(); render(); }
  if (event.target.id === 'menuButton') { $('#sidebar').classList.toggle('open'); render(); }
  if (event.target.id === 'mobileOverlay') { $('#sidebar').classList.remove('open'); render(); }
});
document.addEventListener('submit', (event) => { if (event.target.id === 'reportForm') saveReport(event); });
document.addEventListener('submit', (event) => {
  if (event.target.id !== 'nameLoginForm') return;
  event.preventDefault();
  const member = members.find((m) => m.active && m.name === $('#nameLoginSelect').value);
  if (!member) return toast('팀원 이름을 선택해 주세요.');
  state.currentMemberName = member.name;
  localStorage.setItem('workweek-current-member', member.name);
  state.page = 'dashboard'; save(); render();
});
document.addEventListener('input', (event) => {
  if (event.target.id === 'teamSearch') { const pos = event.target.selectionStart; state.query = event.target.value; const y = window.scrollY; render(); $('#teamSearch')?.focus(); $('#teamSearch')?.setSelectionRange(pos, pos); window.scrollTo(0, y); }
});
document.addEventListener('change', (event) => {
  if (event.target.id === 'pushToggle' && event.target.checked && 'Notification' in window && Notification.permission === 'default') Notification.requestPermission().then((p) => { if (p !== 'granted') { event.target.checked = false; toast('브라우저 알림 권한을 허용해 주세요.'); } });
  if (event.target.id === 'notifyTime') localStorage.setItem('workweek-time', event.target.value);
});
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('/sw.js').catch(() => {});
function checkReminder() {
  if (localStorage.getItem('workweek-notify') !== 'on' || !('Notification' in window) || Notification.permission !== 'granted') return;
  const now = new Date(); if (now.getDay() !== 4) return;
  const [h, m] = (localStorage.getItem('workweek-time') || '09:00').split(':').map(Number);
  if (now.getHours() !== h || now.getMinutes() !== m) return;
  const key = `workweek-reminded-${now.toISOString().slice(0, 10)}`; if (localStorage.getItem(key)) return;
  new Notification('주간업무 보고 마감 안내', { body: '이번 주 보고를 오전 11시까지 제출해 주세요.', icon: '/icon.svg' }); localStorage.setItem(key, '1');
}
setInterval(checkReminder, 30000); render(); initializeRemoteData();
