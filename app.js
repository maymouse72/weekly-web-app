const weekStart = new Date();
weekStart.setHours(0, 0, 0, 0);
weekStart.setDate(weekStart.getDate() - ((weekStart.getDay() + 6) % 7));
const weekEnd = new Date(weekStart); weekEnd.setDate(weekEnd.getDate() + 4);
const weekThursday = new Date(weekStart); weekThursday.setDate(weekThursday.getDate() + 3);
const toLocalISO = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
const currentDate = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'short', day: 'numeric' }).format(new Date()).toUpperCase();
const CURRENT_WEEK = { start: toLocalISO(weekStart), end: toLocalISO(weekEnd), label: `${weekStart.getMonth() + 1}월 ${weekStart.getDate()}일 — ${weekEnd.getMonth() + 1}월 ${weekEnd.getDate()}일` };
const deadlineDate = `${weekThursday.getMonth() + 1}월 ${weekThursday.getDate()}일 (목) 오전 11:00`;
const WORK_CATEGORIES = ['본사 근무 및 교육', '제안', '사업지원', '수행'];
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
      return latest ? { ...m, role: latest.role, job: latest.job, position: latest.position || '팀원', isAdmin: Boolean(latest.isAdmin), active: m.active ?? true } : m;
    })
  : names.map((m) => ({ ...m, position: m.position || '팀원', active: true }));
let reports = saved.reports || Object.fromEntries(Object.entries(sampleReports).map(([name, data]) => [name, { ...data, submitted: true, week: CURRENT_WEEK.start }]));
let previousReports = {};
let supabaseConfig = null;
let authSession = JSON.parse(localStorage.getItem('workweek-auth-session') || 'null');
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
  const url = `${supabaseConfig.supabaseUrl}/rest/v1/${table}${query ? `?${query}` : ''}`;
  const send = () => {
    const headers = { apikey: supabaseConfig.publishableKey, Authorization: `Bearer ${authSession?.access_token || supabaseConfig.publishableKey}`, 'Content-Type': 'application/json' };
    if (options.prefer) headers.Prefer = options.prefer;
    return fetch(url, { method: options.method || 'GET', headers, body: options.body ? JSON.stringify(options.body) : undefined });
  };
  let response = await send();
  if (response.status === 401 && authSession?.refresh_token) { await refreshAuthSession(); response = await send(); }
  const text = await response.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; }
  catch { data = { message: text }; }
  if (!response.ok) {
    const detail = [data?.message, data?.details, data?.hint, data?.code].filter(Boolean).join(' · ');
    throw new Error(detail || data?.error || `Supabase 요청 오류 (${response.status})`);
  }
  return data;
}
async function refreshAuthSession() {
  if (!authSession?.refresh_token) throw new Error('로그인 정보가 만료됐습니다. 다시 로그인해 주세요.');
  const response = await fetch(`${supabaseConfig.supabaseUrl}/auth/v1/token?grant_type=refresh_token`, { method: 'POST', headers: { apikey: supabaseConfig.publishableKey, 'Content-Type': 'application/json' }, body: JSON.stringify({ refresh_token: authSession.refresh_token }) });
  const session = await response.json().catch(() => ({}));
  if (!response.ok) { authSession = null; localStorage.removeItem('workweek-auth-session'); throw new Error('로그인 정보가 만료됐습니다. 다시 로그인해 주세요.'); }
  authSession = session; localStorage.setItem('workweek-auth-session', JSON.stringify(session)); return session;
}
function mapMember(row) {
  return { id: row.id, name: row.name, role: row.role, job: row.job, position: row.position || '팀원', type: row.work_type,
    active: row.status === 'ACTIVE', isAdmin: row.is_admin };
}
function mapReport(row) {
  return { id: row.id, task: row.task_content || '', next: row.next_week_plan || '', leave: row.leave_note || '',
    category: row.work_category || '', project: row.project_name || '', client: row.project_client || '', start: row.assignment_start || '', end: row.assignment_end || '', salesOwner: row.sales_owner || '', note: row.note || '',
    nextCategory: row.next_work_category || '', nextProject: row.next_project_name || '', nextClient: row.next_project_client || '', nextStart: row.next_assignment_start || '', nextEnd: row.next_assignment_end || '', nextSalesOwner: row.next_sales_owner || '', nextNote: row.next_note || '',
    submitted: row.submitted, week: row.week_start,
    time: row.submitted_at ? new Intl.DateTimeFormat('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(row.submitted_at)) : '' };
}
async function initializeRemoteData() {
  const hadAuthSession = Boolean(authSession?.access_token);
  try {
    const configResponse = await fetch('/api/config', { cache: 'no-store' });
    if (!configResponse.ok) throw new Error('Vercel 환경 변수 또는 API 설정을 확인해 주세요.');
    supabaseConfig = await configResponse.json();
    const memberQuery = new URLSearchParams({ select: '*', status: 'eq.ACTIVE', order: 'name.asc' });
    const memberRows = await dbRequest('members', memberQuery.toString());
    members = memberRows.map(mapMember);
    if (authSession?.access_token) {
      const user = await fetchAuthUser(authSession.access_token);
      const member = members.find((item) => user.email === loginEmail(item.name));
      if (!member) throw new Error('로그인 계정과 팀원 명단이 일치하지 않습니다.');
      state.currentMemberName = member.name;
      localStorage.setItem('workweek-current-member', member.name);
      await loadReports();
    } else {
      authSession = null;
      state.currentMemberName = '';
      localStorage.removeItem('workweek-current-member');
      reports = {}; previousReports = {};
    }
    connectionError = ''; dataLoading = false;
    save(); render();
  } catch (error) {
    console.error('공유 데이터 연결 실패:', error);
    if (localPreview) { dataLoading = false; return; }
    dataLoading = false;
    if (hadAuthSession && (!authSession || error.message?.includes('로그인 정보'))) {
      authSession = null; localStorage.removeItem('workweek-auth-session');
      state.currentMemberName = ''; localStorage.removeItem('workweek-current-member');
      reports = {}; previousReports = {};
      connectionError = ''; render();
      return;
    }
    connectionError = error.message || '공유 데이터베이스에 연결하지 못했습니다.';
    render();
  }
}
const loginEmail = (name) => `member-${Array.from(name).map((char) => char.codePointAt(0).toString(16)).join('')}@weekly.local`;
async function fetchAuthUser(accessToken) {
  const response = await fetch(`${supabaseConfig.supabaseUrl}/auth/v1/user`, { headers: { apikey: supabaseConfig.publishableKey, Authorization: `Bearer ${accessToken}` } });
  const user = await response.json().catch(() => ({}));
  if (response.status === 401 && authSession?.refresh_token) { const session = await refreshAuthSession(); return fetchAuthUser(session.access_token); }
  if (!response.ok) throw new Error('로그인 정보가 만료됐습니다. 다시 로그인해 주세요.');
  return user;
}
async function loadReports() {
  const previousStartDate = new Date(weekStart); previousStartDate.setDate(previousStartDate.getDate() - 7);
  const previousStart = toLocalISO(previousStartDate);
  const reportQuery = new URLSearchParams({ select: '*', week_start: `in.(${CURRENT_WEEK.start},${previousStart})` });
  const reportRows = await dbRequest('weekly_reports', reportQuery.toString());
  reports = {}; previousReports = {};
  const memberNameById = new Map(members.map((member) => [member.id, member.name]));
  reportRows.forEach((row) => {
    const name = memberNameById.get(row.member_id); if (!name) return;
    const report = mapReport(row);
    if (row.week_start === CURRENT_WEEK.start) reports[name] = report;
    else previousReports[name] = report;
  });
}
const initials = (name) => name.slice(-1);
const office = () => members.filter((m) => m.active && m.type === 'office');
const projectStaff = () => members.filter((m) => m.active && m.type === 'project');
const currentMember = () => members.find((m) => m.active && m.name === state.currentMemberName);
const isManager = () => Boolean(currentMember()?.isAdmin || currentMember()?.position === '팀장');
const assignmentOf = (member) => {
  const report = reports[member?.name];
  return { client: report?.client || member?.client || '', project: report?.project || member?.project || '', start: report?.start || member?.start || '',
    end: report?.end || member?.end || '', salesOwner: report?.salesOwner || '', note: report?.note || member?.note || '' };
};
function structuredFields(scope, data = {}, categoryRequired = false) {
  const attr = `data-${scope}-field`;
  const category = data.category || '';
  const categoryOptions = `<option value="">업무구분 선택</option>${WORK_CATEGORIES.map((item) => `<option value="${escapeHtml(item)}" ${category === item ? 'selected' : ''}>${escapeHtml(item)}</option>`).join('')}`;
  return `<div class="structured-fields"><label class="structured-field"><span>업무구분${categoryRequired ? ' *' : ''}</span><select class="select-input" ${attr}="work_category" ${categoryRequired ? 'required' : ''}>${categoryOptions}</select></label><label class="structured-field"><span>프로젝트명</span><input class="text-input" ${attr}="project_name" value="${escapeHtml(data.project || '')}" /></label><label class="structured-field"><span>고객사</span><input class="text-input" ${attr}="project_client" value="${escapeHtml(data.client || '')}" /></label><label class="structured-field"><span>투입기간 (from)</span><input class="text-input" type="date" ${attr}="assignment_start" value="${escapeHtml(data.start || '')}" /></label><label class="structured-field"><span>투입기간 (to)</span><input class="text-input" type="date" ${attr}="assignment_end" value="${escapeHtml(data.end || '')}" /></label><label class="structured-field"><span>담당영업</span><input class="text-input" ${attr}="sales_owner" value="${escapeHtml(data.salesOwner || '')}" /></label><label class="structured-field structured-field-wide"><span>기타</span><textarea class="text-area compact" ${attr}="note" placeholder="기타 전달 사항">${escapeHtml(data.note || '')}</textarea></label></div>`;
}
function reportFieldsFromForm(form, scope) {
  const get = (field) => form.querySelector(`[data-${scope}-field="${field}"]`)?.value.trim() || '';
  return { work_category: get('work_category'), project_name: get('project_name'), project_client: get('project_client'), assignment_start: get('assignment_start') || null, assignment_end: get('assignment_end') || null, sales_owner: get('sales_owner'), note: get('note') };
}
const statusOf = (m) => m.type === 'project' ? 'auto' : reports[m.name]?.submitted && reports[m.name]?.week === CURRENT_WEEK.start ? 'done' : 'pending';
const save = () => { localStorage.setItem('workweek-state', JSON.stringify({ members, reports, ui: { page: state.page, memberFilter: state.memberFilter } })); };
const fmtDate = (iso) => { const [y, m, d] = iso.split('-'); return `${y}.${m}.${d}`; };
const avatarClass = (index) => ['avatar-blue', 'avatar-green', 'avatar-amber', 'avatar-purple', 'avatar-rose'][index % 5];
const badge = (type) => type === 'done' ? '<span class="badge badge-success">제출 완료</span>' : type === 'auto' ? '<span class="badge badge-auto">자동 반영</span>' : '<span class="badge badge-pending">작성 대기</span>';

function header(title) {
  $('#crumbTitle').textContent = title;
  $$('.nav-link[data-page]').forEach((el) => el.classList.toggle('active', el.dataset.page === state.page));
  const member = members.find((m) => m.name === state.currentMemberName && m.active);
  const topbarAvatar = $('#topbarAvatar');
  const topbarUserName = $('#topbarUserName');
  const topbarUser = $('#topbarUser');
  if (topbarAvatar) topbarAvatar.textContent = member ? initials(member.name) : '?';
  if (topbarUserName) topbarUserName.textContent = member ? member.name : '로그인 전';
  if (topbarUser) { topbarUser.title = member?.name || '로그인 전'; topbarUser.setAttribute('aria-label', member ? `로그인 사용자 ${member.name}` : '로그인 전'); }
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
  const me = currentMember();
  if (!isManager()) {
    const report = reports[me?.name] || {};
    const assignment = assignmentOf(me);
    const workLines = [['업무구분', report.category], ['프로젝트명', report.project], ['고객사', report.client]];
    const nextPlan = [report.nextCategory, report.nextProject, report.nextClient, report.nextNote].filter(Boolean).join(' · ');
    const submitted = report.submitted && report.week === CURRENT_WEEK.start;
    return `${heading(currentDate, `좋은 아침이에요, ${escapeHtml(me?.name || '팀원')}님 👋`, '나의 주간업무와 제출 상태를 확인해 보세요.')}
      <section class="dashboard-banner"><div class="banner-copy"><div class="banner-kicker">MY WEEKLY REPORT · ${fmtDate(CURRENT_WEEK.start)} — ${CURRENT_WEEK.end.slice(5).replace('-', '.')}</div><h2>${me?.type === 'office' ? (submitted ? '이번 주 보고를 제출했어요' : '이번 주 보고를 작성해 주세요') : '프로젝트 근무 중입니다'}</h2><p>${me?.type === 'office' ? '주간보고 내용은 제출 후 팀장이 취합합니다.' : '프로젝트 근무자는 팀장이 전주 내용을 반영합니다'}</p></div><button class="banner-cta" data-page="report">${me?.type === 'office' ? '내 보고서 보기' : '근무 정보 보기'} <span>→</span></button></section>
      <section class="stats-grid"><article class="stat-card"><div class="stat-head">내 제출 상태<span class="stat-icon ${submitted ? 'icon-green' : 'icon-amber'}">${submitted ? '✓' : '◷'}</span></div><div class="stat-value" style="font-size:22px">${me?.type === 'project' ? '자동 반영' : submitted ? '제출 완료' : '작성 대기'}</div><div class="stat-note">${me?.type === 'office' ? (report.time ? `${report.time} 제출` : '목요일 오전 11시 마감') : '팀장이 주간보고에 반영합니다'}</div></article><article class="stat-card"><div class="stat-head">이번 주 보고 기간<span class="stat-icon icon-blue">▦</span></div><div class="stat-value" style="font-size:18px">${CURRENT_WEEK.label}</div><div class="stat-note">월요일부터 금요일까지</div></article></section>
      <article class="panel"><div class="panel-header"><div><h3>내 주간업무</h3><p class="panel-subtitle">이 화면에서는 본인 보고만 확인할 수 있습니다.</p>${me?.type === 'project' ? `<div class="assignment-summary"><span>고객사<strong>${escapeHtml(assignment.client || '—')}</strong></span><span>프로젝트명<strong>${escapeHtml(assignment.project || '—')}</strong></span><span>투입일자<strong>${assignment.start ? fmtDate(assignment.start) : '—'}</strong></span><span>철수일자<strong>${assignment.end ? fmtDate(assignment.end) : '—'}</strong></span></div>` : ''}</div>${me?.type === 'office' ? '<button class="text-link" data-page="report">보고서 작성 →</button>' : ''}</div>${me?.type === 'office' ? `<div class="office-work-summary">${report.category || report.project || report.client ? workLines.map(([label, value]) => `<div class="weekly-work-line"><span>${label}</span><strong>${escapeHtml(value || '—')}</strong></div>`).join('') : '<div class="empty-state">아직 제출한 보고가 없습니다.</div>'}${nextPlan ? `<small class="next-plan-line">차주 계획: ${escapeHtml(nextPlan)}</small>` : ''}</div>` : `<div class="activity-item"><div><strong>${escapeHtml(report.task || '프로젝트 근무는 팀장이 전주 내용을 반영합니다.')}</strong></div></div>`}</article>`;
  }
  const done = office().filter((m) => statusOf(m) === 'done').length;
  const pending = office().length - done;
  return `${heading(currentDate, `좋은 아침이에요, ${escapeHtml(me?.name || '팀원')}님 👋`, '이번 주 팀 보고를 확인하고 프로젝트 근무자 보고를 작성해 주세요.', '<button class="button" data-action="go-team">팀원 현황</button>')}
    <section class="dashboard-banner"><div class="banner-copy"><div class="banner-kicker">WEEKLY REPORT · ${fmtDate(CURRENT_WEEK.start)} — ${CURRENT_WEEK.end.slice(5).replace('-', '.')}</div><h2>이번 주 보고, 목요일 오전 11시까지</h2><p>프로젝트 근무자 보고를 입력하고 상사 보고용 취합본을 준비해 주세요.</p></div><button class="banner-cta" data-page="report">보고서 작성하기 <span>→</span></button></section>
    <section class="stats-grid"><article class="stat-card"><div class="stat-head">팀 전체 인원<span class="stat-icon icon-blue">♧</span></div><div class="stat-value">${members.filter((m) => m.active).length}<small> 명</small></div><div class="stat-note">본사 ${office().length}명 · 프로젝트 ${projectStaff().length}명</div></article><article class="stat-card"><div class="stat-head">본사 보고 제출<span class="stat-icon icon-green">✓</span></div><div class="stat-value">${done}<small> / ${office().length}</small></div><div class="stat-note">목요일 오전 11시 마감</div></article><article class="stat-card"><div class="stat-head">작성 대기<span class="stat-icon icon-amber">◷</span></div><div class="stat-value">${pending}<small> 명</small></div><div class="stat-note">본사 근무자 보고 필요</div></article><article class="stat-card"><div class="stat-head">프로젝트 인력<span class="stat-icon icon-gray">↗</span></div><div class="stat-value">${projectStaff().length}<small> 명</small></div><div class="stat-note">전주 내용 자동 반영</div></article></section>
    <section class="content-grid"><article class="panel"><div class="panel-header"><div><h3>보고 제출 현황</h3><p class="panel-subtitle">본사 근무자는 매주 직접 제출해요</p></div><button class="text-link" data-page="admin">전체 보기 →</button></div><div class="submission-list">${submissionRows()}</div><div class="progress-wrap"><div class="progress-label"><span>제출 진행률</span><strong>${office().length ? Math.round(done / office().length * 100) : 0}%</strong></div><div class="progress-track"><div class="progress-fill" style="width:${office().length ? done / office().length * 100 : 0}%"></div></div></div></article><div class="side-panel"><article class="reminder-card"><div class="reminder-top"><h3>다음 마감 일정</h3><span class="badge badge-pending">오늘 마감</span></div><p>본사 근무자 주간업무 보고 제출 마감입니다.</p><div class="reminder-date"><span>이번 주 보고</span><strong>오늘 오전 11:00</strong></div></article><article class="activity-card"><div class="panel-header"><div><h3>팀 보고 활동</h3><p class="panel-subtitle">이번 주 업데이트</p></div><span class="stat-icon icon-green">↗</span></div>${office().filter((m) => statusOf(m) === 'done').slice(-3).reverse().map((m, i) => `<div class="activity-item"><span class="activity-dot"></span><div><small><strong>${escapeHtml(m.name)}</strong>님이 주간보고를 제출했어요</small><time>${reports[m.name]?.time || '10:32'} · 오늘</time></div></div>`).join('')}</article></div></section>`;
}
function reportPage() {
  const me = members.find((m) => m.name === state.currentMemberName) || office()[0] || { name: '팀원', type: 'office', role: '', job: '' };
  if (isManager()) return managerReportPage();
  const report = reports[me.name] || {};
  if (me.type !== 'office') return `${heading('MY WEEKLY REPORT', '주간보고', '프로젝트 근무자는 팀장이 주간보고를 작성합니다.')}`;
  return `${heading('MY WEEKLY REPORT', '주간보고 작성', `${fmtDate(CURRENT_WEEK.start)} — ${fmtDate(CURRENT_WEEK.end)} 주간업무를 입력해 제출해 주세요.`, '<button class="button" data-action="copy-last">↺ 지난주 내용 가져오기</button>')}
    <div class="report-layout"><form class="report-card" id="reportForm"><div class="form-section"><label class="form-label">보고 대상</label><div class="report-meta"><span class="meta-chip">${escapeHtml(me.name)} · ${escapeHtml(me.role)} ${escapeHtml(me.job)}</span><span class="meta-chip">본사 근무</span><span class="meta-chip">보고 기간 ${fmtDate(CURRENT_WEEK.start)} — ${fmtDate(CURRENT_WEEK.end)}</span></div></div><div class="form-section"><div class="form-section-heading"><div><label class="form-label">금주 업무 내용</label><p class="form-help">업무구분을 선택하고 해당 주의 업무 정보를 입력해 주세요.</p></div><button type="button" class="button button-soft" data-action="copy-current-to-next">금주 내용을 차주 계획에 복사</button></div>${structuredFields('current', report, true)}</div><div class="form-section"><label class="form-label">차주 업무 계획</label><p class="form-help">금주 내용을 복사한 뒤 수정하거나 직접 입력할 수 있습니다.</p>${structuredFields('next', { category: report.nextCategory, project: report.nextProject, client: report.nextClient, start: report.nextStart, end: report.nextEnd, salesOwner: report.nextSalesOwner, note: report.nextNote })}</div><div class="form-actions"><span class="save-note">${report.submitted ? `마지막 제출 ${report.time || ''} · 수정 후 다시 제출할 수 있어요.` : '업무구분을 선택한 뒤 보고서를 제출해 주세요.'}</span><button class="button button-primary" type="submit">보고 제출하기 <span>→</span></button></div></form><aside class="report-aside"><article class="aside-card"><h3>제출 전 확인</h3><div class="check-list"><div class="check-item"><span class="check-icon">✓</span>보고 기간이 맞는지 확인</div><div class="check-item"><span class="check-icon">✓</span>업무구분을 선택</div><div class="check-item"><span class="check-icon">✓</span>제출 후에도 수정 가능</div></div></article><article class="aside-card"><h3>지난주 보고 불러오기</h3><div class="aside-tip">지난주 차주 업무 계획을 이번 주 업무 내용으로 가져옵니다. 차주 계획은 직접 입력하거나 금주 내용을 복사할 수 있어요.</div><button class="button button-soft" style="width:100%;margin-top:11px" data-action="copy-last">지난주 내용 가져오기</button></article></aside></div>`;
}
function managerReportPage() {
  const rows = projectStaff().map((member, index) => {
    const report = reports[member.name] || {};
    return `<article class="manager-report-row" data-manager-row="${escapeHtml(member.name)}"><div class="manager-report-person"><span class="avatar mini-avatar ${avatarClass(index)}">${initials(member.name)}</span><div><strong>${escapeHtml(member.name)}</strong><small>${escapeHtml(member.role)} · ${escapeHtml(member.job)}</small></div></div><div class="manager-report-fields"><label class="manager-report-field"><span>업무구분 *</span><select class="select-input" data-manager-field="work_category" required><option value="">선택</option>${WORK_CATEGORIES.map((category) => `<option value="${escapeHtml(category)}" ${report.category === category ? 'selected' : ''}>${escapeHtml(category)}</option>`).join('')}</select></label><label class="manager-report-field"><span>프로젝트명</span><input class="text-input" data-manager-field="project_name" value="${escapeHtml(report.project || '')}" placeholder="프로젝트명" /></label><label class="manager-report-field"><span>고객사</span><input class="text-input" data-manager-field="project_client" value="${escapeHtml(report.client || '')}" placeholder="고객사" /></label><label class="manager-report-field"><span>투입기간 (from)</span><input class="text-input" type="date" data-manager-field="assignment_start" value="${escapeHtml(report.start || '')}" /></label><label class="manager-report-field"><span>투입기간 (to)</span><input class="text-input" type="date" data-manager-field="assignment_end" value="${escapeHtml(report.end || '')}" /></label><label class="manager-report-field"><span>담당영업</span><input class="text-input" data-manager-field="sales_owner" value="${escapeHtml(report.salesOwner || '')}" placeholder="담당영업" /></label><label class="manager-report-field manager-report-field-wide"><span>기타</span><textarea class="text-area compact" data-manager-field="note" placeholder="기타">${escapeHtml(report.note || '')}</textarea></label></div><div class="manager-report-actions"><button class="button button-primary" data-action="save-project-report">저장</button><button class="button button-soft" data-action="copy-project-last">지난 주 내용 가져오기</button></div></article>`;
  }).join('');
  return `${heading('MANAGER WORKSPACE', '프로젝트 주간보고 작성', `${CURRENT_WEEK.label} 프로젝트 근무자 보고를 팀장이 입력합니다.`)}<article class="panel manager-report-panel"><p class="panel-subtitle">각 팀원의 업무 정보를 입력하고 저장하세요. 지난 주 내용을 가져온 뒤 이번 주 내용을 수정할 수 있습니다.</p><div class="manager-report-list">${rows || '<div class="empty-state">프로젝트 근무자가 없습니다.</div>'}</div></article>`;
}
function teamPage() {
  let list = members.filter((m) => m.active);
  if (state.memberFilter === 'office' || state.memberFilter === 'project') list = list.filter((m) => m.type === state.memberFilter);
  if (state.query) list = list.filter((m) => { const a = assignmentOf(m); return `${m.name} ${m.role} ${a.client} ${a.project}`.toLowerCase().includes(state.query.toLowerCase()); });
  const rows = list.map((m, i) => { const a = assignmentOf(m); return `<tr><td><div class="table-person"><span class="avatar mini-avatar ${avatarClass(i)}">${initials(m.name)}</span><div><strong>${escapeHtml(m.name)}</strong><small>${escapeHtml(m.role)} · ${escapeHtml(m.job)}${m.position === '팀장' ? ' · 팀장' : ''}</small></div></div></td><td>${m.type === 'office' ? '<span class="badge badge-neutral">본사 근무</span>' : '<span class="badge badge-auto">프로젝트</span>'}</td><td>${escapeHtml(a.client || '—')}</td><td>${escapeHtml(a.project || '본사 근무 및 교육')}</td><td>${m.type === 'office' ? badge(statusOf(m)) : `<span class="table-muted">${a.end ? fmtDate(a.end) : '—'} 철수 예정</span>`}</td><td><button class="text-link" data-action="change-member" data-name="${escapeHtml(m.name)}">상태 변경</button></td></tr>`; }).join('');
  return `${heading('TEAM DIRECTORY', '팀원 현황', `본사와 프로젝트 인력을 확인하고 근무 상태 변경을 관리해요. 현재 ${members.filter((m) => m.active).length}명`, '<button class="button button-primary" data-action="add-member">＋ 팀원 추가</button>')}
    <div class="toolbar"><div class="filter-tabs"><button class="filter-tab ${state.memberFilter === 'all' ? 'active' : ''}" data-filter="all">전체 ${members.filter((m) => m.active).length}</button><button class="filter-tab ${state.memberFilter === 'office' ? 'active' : ''}" data-filter="office">본사 ${office().length}</button><button class="filter-tab ${state.memberFilter === 'project' ? 'active' : ''}" data-filter="project">프로젝트 ${projectStaff().length}</button></div><label class="search-box"><span>⌕</span><input id="teamSearch" value="${escapeHtml(state.query)}" placeholder="이름, 프로젝트 검색" /></label></div>
    <div class="table-wrap"><table class="data-table"><thead><tr><th>팀원</th><th>근무 구분</th><th>고객</th><th>프로젝트 / 업무</th><th>보고 / 철수 예정</th><th></th></tr></thead><tbody>${rows || '<tr><td colspan="6"><div class="empty-state">검색 결과가 없습니다.</div></td></tr>'}</tbody></table></div>`;
}
function adminPage() {
  const done = office().filter((m) => statusOf(m) === 'done').length, pending = office().length - done;
  const renderSubmittedTable = (list, kind) => list.map((member, index) => {
    const report = reports[member.name] || {};
    return `<tr><td><div class="table-person"><span class="avatar mini-avatar ${avatarClass(index)}">${initials(member.name)}</span><div><strong>${escapeHtml(member.name)}</strong><small>${escapeHtml(member.role)} · ${escapeHtml(member.job)}</small></div></div></td><td>${escapeHtml(report.category || '—')}</td><td>${escapeHtml(report.client || '—')}</td><td>${escapeHtml(report.project || '—')}</td><td>${report.start ? fmtDate(report.start) : '—'}</td><td>${report.end ? fmtDate(report.end) : '—'}</td><td>${escapeHtml(report.salesOwner || '—')}</td><td>${escapeHtml(report.note || '—')}</td><td>${kind === 'office' ? badge(statusOf(member)) : badge(report.submitted ? 'done' : 'pending')}</td></tr>`;
  }).join('');
  const reportHeader = '<thead><tr><th>팀원</th><th>업무구분</th><th>고객사</th><th>프로젝트명</th><th>투입 from</th><th>투입 to</th><th>담당영업</th><th>기타</th><th>상태</th></tr></thead>';
  return `${heading('MANAGER WORKSPACE', '취합 및 내보내기', '본사 보고와 프로젝트 인력 현황을 확인하고 상사 보고용 엑셀을 내려받으세요.', '<button class="button button-primary" data-action="export-xlsx">↓ 엑셀 다운로드</button>')}
    <section class="stats-grid"><article class="stat-card"><div class="stat-head">제출 완료<span class="stat-icon icon-green">✓</span></div><div class="stat-value">${done}<small> / ${office().length}명</small></div><div class="stat-note">본사 근무자</div></article><article class="stat-card"><div class="stat-head">미제출<span class="stat-icon icon-amber">◷</span></div><div class="stat-value">${pending}<small> 명</small></div><div class="stat-note">본사 근무자</div></article><article class="stat-card"><div class="stat-head">프로젝트 인력<span class="stat-icon icon-blue">↗</span></div><div class="stat-value">${projectStaff().length}<small> 명</small></div><div class="stat-note">팀장 작성 대상</div></article><article class="stat-card"><div class="stat-head">보고 기간<span class="stat-icon icon-gray">▦</span></div><div class="stat-value" style="font-size:15px;margin-top:15px">${CURRENT_WEEK.label}</div><div class="stat-note">월요일부터 금요일까지</div></article></section>
    <article class="panel" style="margin-bottom:14px"><div class="panel-header"><div><h3>본사 근무자 보고</h3><p class="panel-subtitle">팀원이 직접 제출한 구조화 보고</p></div><span class="badge badge-pending">${pending}명 미제출</span></div><div class="table-wrap" style="border:0"><table class="data-table" style="min-width:1050px">${reportHeader}<tbody>${renderSubmittedTable(office(), 'office') || '<tr><td colspan="9">본사 근무자가 없습니다.</td></tr>'}</tbody></table></div></article>
    <article class="panel"><div class="panel-header"><div><h3>프로젝트 근무자 보고</h3><p class="panel-subtitle">팀장이 대신 작성한 구조화 보고</p></div><span class="badge badge-auto">${projectStaff().length}명</span></div><div class="table-wrap" style="border:0"><table class="data-table" style="min-width:1050px">${reportHeader}<tbody>${renderSubmittedTable(projectStaff(), 'project') || '<tr><td colspan="9">프로젝트 근무자가 없습니다.</td></tr>'}</tbody></table></div></article>`;
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
    $('#topbarAvatar').textContent = '?'; $('#topbarUserName').textContent = '로그인 전'; $('#topbarUser').title = '로그인 전';
    $('#pageContent').innerHTML = `<div class="login-screen"><div class="login-card"><div class="brand-mark">W</div><div class="eyebrow" style="margin-top:20px">SI사업2팀 · WEEKLY REPORT</div><h1>로그인해 주세요</h1><p>팀원 이름과 배부받은 초기 비밀번호를 입력해 업무공간에 입장합니다.</p><form id="nameLoginForm"><label class="form-label" for="nameLoginSelect">팀원 이름</label><select class="select-input" id="nameLoginSelect" required><option value="">이름 선택</option>${members.filter((m) => m.active).map((m) => `<option value="${escapeHtml(m.name)}">${escapeHtml(m.name)} · ${m.position === '팀장' ? '팀장' : m.type === 'office' ? '본사' : '프로젝트'}</option>`).join('')}</select><label class="form-label login-password-label" for="loginPassword">초기 비밀번호</label><input class="text-input" id="loginPassword" type="password" autocomplete="current-password" required placeholder="초기 비밀번호" /><button class="button button-primary" style="width:100%;margin-top:13px" type="submit">로그인 <span>→</span></button></form><small class="login-note">로그인 계정은 Supabase Auth로 확인됩니다. 비밀번호를 팀원과 공유하지 마세요.</small></div></div>`;
    return;
  }
  $('#sidebar').classList.remove('login-locked');
  const manager = isManager();
  $$('[data-page="team"], [data-page="admin"]').forEach((el) => { el.hidden = !manager; });
  if (!manager && ['team', 'admin'].includes(state.page)) state.page = 'dashboard';
  header(pageTitles[state.page] || '대시보드');
  $('#periodPill').innerHTML = `<span class="status-dot"></span>${fmtDate(CURRENT_WEEK.start)} — ${CURRENT_WEEK.end.slice(5).replace('-', '.')}`;
  $('#deadlineText').textContent = toLocalISO(new Date()) === toLocalISO(weekThursday) ? '오늘 오전 11:00' : deadlineDate;
  const views = { dashboard, report: reportPage, team: teamPage, admin: adminPage, settings: settingsPage };
  $('#pageContent').innerHTML = (views[state.page] || dashboard)();
  const overlay = $('.mobile-overlay'); if (overlay) overlay.remove();
  if ($('#sidebar').classList.contains('open')) { const node = document.createElement('div'); node.className = 'mobile-overlay visible'; node.id = 'mobileOverlay'; document.body.appendChild(node); }
}
function go(page) {
  if (!isManager() && ['team', 'admin'].includes(page)) page = 'dashboard';
  state.page = page;
  if (page !== 'team') state.query = '';
  if (window.innerWidth <= 760) $('#sidebar').classList.remove('open');
  save(); render(); window.scrollTo(0, 0);
}
function toast(message) { const node = document.createElement('div'); node.className = 'toast'; node.textContent = message; $('#toastRegion').appendChild(node); setTimeout(() => node.remove(), 3000); }
function copyLast() {
  const me = members.find((m) => m.name === state.currentMemberName); if (!me) return toast('지난주 보고 내용을 찾지 못했어요.');
  const previous = previousReports[me.name] || (localPreview ? sampleReports[me.name] : null);
  if (!previous) return toast('지난주 보고 내용을 찾지 못했어요.');
  const values = previous.nextCategory || previous.nextProject || previous.nextClient || previous.nextNote
    ? { category: previous.nextCategory, project: previous.nextProject, client: previous.nextClient, start: previous.nextStart, end: previous.nextEnd, salesOwner: previous.nextSalesOwner, note: previous.nextNote }
    : { category: previous.category, project: previous.project, client: previous.client, start: previous.start, end: previous.end, salesOwner: previous.salesOwner, note: previous.note };
  for (const [field, value] of Object.entries({ work_category: values.category, project_name: values.project, project_client: values.client, assignment_start: values.start, assignment_end: values.end, sales_owner: values.salesOwner, note: values.note })) {
    const input = $(`[data-current-field="${field}"]`); if (input) input.value = value || '';
  }
  toast('지난주 내용을 가져왔어요. 기간을 확인하고 제출해 주세요.');
}
function copyCurrentToNext() {
  const form = $('#reportForm'); if (!form) return;
  const current = reportFieldsFromForm(form, 'current');
  const mapping = { work_category: 'next_work_category', project_name: 'next_project_name', project_client: 'next_project_client', assignment_start: 'next_assignment_start', assignment_end: 'next_assignment_end', sales_owner: 'next_sales_owner', note: 'next_note' };
  for (const [source, target] of Object.entries(mapping)) {
    const input = form.querySelector(`[data-next-field="${target.replace('next_', '')}"]`);
    if (input) input.value = current[source] || '';
  }
  toast('금주 내용을 차주 계획에 복사했습니다.');
}
function serializeFields(fields) {
  return [`업무구분: ${fields.work_category}`, `프로젝트명: ${fields.project_name}`, `고객사: ${fields.project_client}`, `투입기간: ${fields.assignment_start || ''} ~ ${fields.assignment_end || ''}`, `담당영업: ${fields.sales_owner}`, `기타: ${fields.note}`].filter((line) => !line.endsWith(': ')).join('\n');
}
async function saveReport(event) {
  event.preventDefault();
  const member = members.find((item) => item.name === state.currentMemberName);
  if (!member) return toast('팀원 정보를 다시 확인해 주세요.');
  const current = reportFieldsFromForm(event.target, 'current');
  const next = reportFieldsFromForm(event.target, 'next');
  if (!current.work_category) return toast('업무구분을 선택해 주세요.');
  const now = new Date();
  const report = { category: current.work_category, project: current.project_name, client: current.project_client, start: current.assignment_start || '', end: current.assignment_end || '', salesOwner: current.sales_owner, note: current.note,
    nextCategory: next.work_category, nextProject: next.project_name, nextClient: next.project_client, nextStart: next.assignment_start || '', nextEnd: next.assignment_end || '', nextSalesOwner: next.sales_owner, nextNote: next.note,
    task: serializeFields(current), next: serializeFields(next), submitted: true, week: CURRENT_WEEK.start, time: new Intl.DateTimeFormat('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false }).format(now) };
  try {
    if (supabaseConfig) {
      const query = new URLSearchParams({ on_conflict: 'member_id,week_start' }).toString();
      const rows = await dbRequest('weekly_reports', query, { method: 'POST', prefer: 'resolution=merge-duplicates,return=representation', body: {
        member_id: member.id, week_start: CURRENT_WEEK.start, week_end: CURRENT_WEEK.end, work_type_at_submission: member.type,
        ...current, next_work_category: next.work_category || null, next_project_name: next.project_name || null, next_project_client: next.project_client || null,
        next_assignment_start: next.assignment_start, next_assignment_end: next.assignment_end, next_sales_owner: next.sales_owner || null, next_note: next.note || null,
        task_content: report.task, next_week_plan: report.next, leave_note: '',
        submitted: true, submitted_at: now.toISOString(), written_by: member.id,
        copied_from_report_id: previousReports[member.name]?.id || null,
      } });
      if (!Array.isArray(rows) || !rows[0]?.id) throw new Error('저장 응답에 보고서가 없습니다. Supabase 테이블 권한과 저장 결과를 확인해 주세요.');
      Object.assign(report, mapReport(rows[0]));
    }
    reports[member.name] = report;
    save(); toast('주간보고를 제출했어요.'); render();
  } catch (error) { console.error('주간보고 저장 실패:', error); toast(`제출하지 못했어요: ${error.message}`); }
}
async function saveProjectReport(button) {
  const row = button.closest('[data-manager-row]');
  const name = row?.dataset.managerRow;
  const member = projectStaff().find((item) => item.name === name);
  if (!member) return toast('프로젝트 근무자 정보를 찾지 못했습니다.');
  const get = (field) => row.querySelector(`[data-manager-field="${field}"]`)?.value.trim() || '';
  const current = { work_category: get('work_category'), project_name: get('project_name'), project_client: get('project_client'), assignment_start: get('assignment_start') || null, assignment_end: get('assignment_end') || null, sales_owner: get('sales_owner'), note: get('note') };
  if (!current.work_category) return toast(`${name}님의 업무구분을 선택해 주세요.`);
  const manager = currentMember();
  try {
    const now = new Date();
    const report = { ...current, category: current.work_category, project: current.project_name, client: current.project_client, start: current.assignment_start || '', end: current.assignment_end || '', salesOwner: current.sales_owner, note: current.note, task: serializeFields(current), submitted: true, submitted_at: now.toISOString(), week: CURRENT_WEEK.start };
    if (supabaseConfig) {
      const query = new URLSearchParams({ on_conflict: 'member_id,week_start' }).toString();
      const rows = await dbRequest('weekly_reports', query, { method: 'POST', prefer: 'resolution=merge-duplicates,return=representation', body: {
        member_id: member.id, week_start: CURRENT_WEEK.start, week_end: CURRENT_WEEK.end, work_type_at_submission: 'project', ...current,
        task_content: report.task, submitted: true, submitted_at: now.toISOString(), written_by: manager.id,
        copied_from_report_id: previousReports[name]?.id || null,
      } });
      if (!rows?.[0]?.id) throw new Error('저장된 보고서를 확인할 수 없습니다.');
      reports[name] = mapReport(rows[0]);
    } else reports[name] = report;
    save(); render(); toast(`${name}님의 프로젝트 보고를 저장했습니다.`);
  } catch (error) { console.error('프로젝트 보고 저장 실패:', error); toast(`저장하지 못했어요: ${error.message}`); }
}
function copyProjectLastWeek(button) {
  const row = button.closest('[data-manager-row]');
  const name = row?.dataset.managerRow;
  const previous = previousReports[name];
  if (!previous) return toast(`${name}님의 지난 주 보고를 찾지 못했습니다.`);
  const values = { work_category: previous.category, project_name: previous.project, project_client: previous.client, assignment_start: previous.start, assignment_end: previous.end, sales_owner: previous.salesOwner, note: previous.note };
  for (const [field, value] of Object.entries(values)) {
    const input = row.querySelector(`[data-manager-field="${field}"]`); if (input) input.value = value || '';
  }
  toast(`${name}님의 지난 주 보고를 입력란에 복사했습니다. 확인 후 저장해 주세요.`);
}
async function persistMember(member, isNew = false) {
  if (!supabaseConfig) return;
  const payload = {
    name: member.name, role: member.role, job: member.job, position: member.position || '팀원',
    work_type: member.type, status: member.active ? 'ACTIVE' : 'INACTIVE', is_admin: Boolean(member.isAdmin),
    updated_at: new Date().toISOString(),
  };
  const result = await dbRequest('members', isNew ? '' : `id=eq.${encodeURIComponent(member.id)}`, {
    method: isNew ? 'POST' : 'PATCH', prefer: 'return=representation', body: payload,
  });
  if (!result?.length) throw new Error('팀원 정보를 저장하지 못했습니다.');
  return mapMember(result[0]);
}
async function persistAssignment(member) {
  if (!supabaseConfig) return;
  const assignment = assignmentOf(member);
  const body = {
    work_type_at_submission: member.type,
    project_client: assignment.client || null,
    project_name: assignment.project || null,
    assignment_start: assignment.start || null,
    assignment_end: assignment.end && /^\d{4}-\d{2}-\d{2}$/.test(assignment.end) ? assignment.end : null,
    note: assignment.note || null,
    updated_at: new Date().toISOString(),
  };
  const current = reports[member.name];
  if (current?.id) {
    const rows = await dbRequest('weekly_reports', `id=eq.${encodeURIComponent(current.id)}`, { method: 'PATCH', prefer: 'return=representation', body });
    if (!rows?.length) throw new Error('이번 주 투입 정보를 저장하지 못했습니다.');
    Object.assign(current, { client: body.project_client || '', project: body.project_name || '', start: body.assignment_start || '', end: body.assignment_end || '', note: body.note || '' });
    return;
  }
  const manager = members.find((candidate) => candidate.active && (candidate.isAdmin || candidate.position === '팀장'));
  if (!manager?.id) throw new Error('팀장 계정 정보를 찾지 못해 투입 정보를 저장할 수 없습니다.');
  const rows = await dbRequest('weekly_reports', '', { method: 'POST', prefer: 'return=representation', body: {
    member_id: member.id, week_start: CURRENT_WEEK.start, week_end: CURRENT_WEEK.end, written_by: manager.id,
    work_category: member.type === 'project' ? '' : '본사 근무 및 교육', ...body,
  } });
  if (!rows?.[0]?.id) throw new Error('이번 주 투입 정보를 저장하지 못했습니다.');
  reports[member.name] = { ...(current || {}), id: rows[0].id, week: CURRENT_WEEK.start, submitted: false,
    client: body.project_client || '', project: body.project_name || '', start: body.assignment_start || '', end: body.assignment_end || '', note: body.note || '' };
}
async function changeMember(name) {
  const member = members.find((m) => m.name === name); if (!member) return;
  const before = { ...member };
  const beforeReport = reports[name] ? { ...reports[name] } : null;
  const assignment = assignmentOf(member);
  const action = prompt(`${name}님의 근무 상태를 변경합니다.\n\n1 = 본사 근무\n2 = 프로젝트 근무\n3 = 퇴사 처리\n\n현재: ${member.type === 'office' ? '본사 근무' : '프로젝트 근무'}`);
  if (action === '1') { member.type = 'office'; member.client = ''; member.project = ''; member.start = ''; member.end = ''; member.note = ''; }
  else if (action === '2') { const client = prompt('고객명을 입력해 주세요.', assignment.client || ''); if (client === null) return; const project = prompt('프로젝트명을 입력해 주세요.', assignment.project || ''); if (project === null) return; const start = prompt('투입일 (YYYY-MM-DD)', assignment.start || toLocalISO(new Date())); if (start === null) return; const end = prompt('철수 예정일 (YYYY-MM-DD)', assignment.end || ''); if (end === null) return; member.type = 'project'; member.client = client; member.project = project; member.start = start; member.end = end; }
  else if (action === '3') member.active = false;
  else return;
  if (action !== '3' && reports[name]) Object.assign(reports[name], { client: member.client || '', project: member.project || '', start: member.start || '', end: member.end || '', note: member.note || '' });
  try {
    await persistMember(member);
    if (action !== '3') await persistAssignment(member);
    save(); render();
    toast(action === '3' ? `${name}님을 비활성 처리했어요.` : `${name}님의 근무 상태를 변경했어요.`);
  } catch (error) { Object.assign(member, before); if (beforeReport) reports[name] = beforeReport; else delete reports[name]; toast(`저장하지 못했어요: ${error.message}`); }
}
async function addMember() {
  const name = prompt('추가할 팀원 이름을 입력해 주세요.'); if (!name?.trim()) return;
  if (members.some((member) => member.name === name.trim())) return toast('이미 등록된 이름입니다.');
  const role = prompt('직급을 입력해 주세요.', '사원'); if (role === null) return;
  const job = prompt('직무를 입력해 주세요.', '개발'); if (job === null) return;
  const mode = prompt('근무 구분을 선택해 주세요.\n1 = 본사 근무\n2 = 프로젝트 근무', '1'); if (mode === null) return;
  let member = { name: name.trim(), role, job, position: '팀원', type: mode === '2' ? 'project' : 'office', active: true, client: '', project: '' };
  if (member.type === 'project') { member.client = prompt('고객명', '') || '미정'; member.project = prompt('프로젝트명', '') || '미정'; member.start = prompt('투입일 (YYYY-MM-DD)', toLocalISO(new Date())) || ''; member.end = prompt('철수 예정일 (YYYY-MM-DD)', '') || ''; }
  try {
    const savedMember = await persistMember(member, true);
    if (savedMember) member = { ...member, ...savedMember };
    if (member.type === 'project') await persistAssignment(member);
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
  const reportRows = [['순번', '직급', '직무', '성명', '고객사', '프로젝트명', '투입기간(from)', '투입기간(to)', '기타 내용']];
  members.filter((member) => member.active).forEach((member, index) => {
    const report = reports[member.name] || {}, assignment = assignmentOf(member);
    reportRows.push([index + 1, member.role, member.job, member.name, report.client || assignment.client, report.project || assignment.project,
      report.start || assignment.start, report.end || assignment.end, report.note || assignment.note]);
  });
  const contentTypes = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>`;
  const files = {
    '[Content_Types].xml': contentTypes,
    '_rels/.rels': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`,
    'xl/workbook.xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="주간업무 보고" sheetId="1" r:id="rId1"/></sheets></workbook>`,
    'xl/_rels/workbook.xml.rels': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`,
    'xl/styles.xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="2"><font><sz val="10"/><name val="맑은 고딕"/></font><font><b/><color rgb="FFFFFFFF"/><sz val="10"/><name val="맑은 고딕"/></font></fonts><fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF2758DF"/></patternFill></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="2"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"/></cellXfs></styleSheet>`,
    'xl/worksheets/sheet1.xml': sheetXml(reportRows, [8, 14, 13, 14, 25, 40, 16, 16, 40]),
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
      if (authSession?.access_token && supabaseConfig) fetch(`${supabaseConfig.supabaseUrl}/auth/v1/logout`, { method: 'POST', headers: { apikey: supabaseConfig.publishableKey, Authorization: `Bearer ${authSession.access_token}` } }).catch(() => {});
      authSession = null; localStorage.removeItem('workweek-auth-session');
      state.currentMemberName = '';
      localStorage.removeItem('workweek-current-member');
      state.page = 'dashboard';
      render();
    }
    if (action === 'copy-last') copyLast();
    if (action === 'copy-current-to-next') copyCurrentToNext();
    if (action === 'save-project-report') saveProjectReport(actionButton);
    if (action === 'copy-project-last') copyProjectLastWeek(actionButton);
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
  const password = $('#loginPassword').value;
  if (!member) return toast('팀원 이름을 선택해 주세요.');
  if (!supabaseConfig && localPreview) {
    state.currentMemberName = member.name; localStorage.setItem('workweek-current-member', member.name);
    state.page = 'dashboard'; save(); render(); toast('로컬 미리보기: 비밀번호는 확인하지 않습니다.'); return;
  }
  if (!supabaseConfig) return toast('공유 로그인 설정이 연결되지 않았습니다. 배포된 앱에서 다시 시도해 주세요.');
  const submit = event.target.querySelector('[type="submit"]'); submit.disabled = true;
  fetch(`${supabaseConfig.supabaseUrl}/auth/v1/token?grant_type=password`, { method: 'POST', headers: { apikey: supabaseConfig.publishableKey, 'Content-Type': 'application/json' }, body: JSON.stringify({ email: loginEmail(member.name), password }) })
    .then(async (response) => { const payload = await response.json().catch(() => ({})); if (!response.ok) throw new Error(payload.msg || payload.message || '이름 또는 비밀번호를 확인해 주세요.'); return payload; })
    .then(async (session) => {
      if (session.user?.email !== loginEmail(member.name)) throw new Error('선택한 이름의 로그인 정보와 일치하지 않습니다.');
      authSession = session; localStorage.setItem('workweek-auth-session', JSON.stringify(session));
      state.currentMemberName = member.name; localStorage.setItem('workweek-current-member', member.name);
      await loadReports(); state.page = 'dashboard'; save(); render();
    })
    .catch((error) => { authSession = null; localStorage.removeItem('workweek-auth-session'); state.currentMemberName = ''; localStorage.removeItem('workweek-current-member'); toast(error.message || '로그인하지 못했습니다.'); submit.disabled = false; });
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
