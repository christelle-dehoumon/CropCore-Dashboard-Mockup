// ---------------- DATA ----------------
const stats = [
  {icon:'factory', color:'var(--secondary)', bg:'rgba(239,108,0,.12)', label:'Storage Used', value:'132 / 240 m²', sub:'55% of capacity', subClass:''},
  {icon:'archive', color:'var(--success)', bg:'rgba(76,175,80,.12)', label:'Stored Batches', value:'27', sub:'Total batches', subClass:''},
  {icon:'thermometer', color:'var(--primary)', bg:'rgba(10,130,118,.12)', label:'Avg Temperature', value:'17.8 °C', sub:'Target: 15 – 20 °C', subClass:'good'},
  {icon:'droplet', color:'var(--primary)', bg:'rgba(10,130,118,.12)', label:'Avg Humidity', value:'52%', sub:'Target: 50 – 55%', subClass:'good'},
  {icon:'trending-up', color:'var(--success)', bg:'rgba(76,175,80,.12)', label:'Recovery Rate', value:'80%', sub:'Target: ≥ 80%', subClass:'good'},
  {icon:'alert-circle', color:'var(--danger)', bg:'rgba(198,40,40,.12)', label:'Active Alerts', value:'1', sub:'Requires attention', subClass:'warn'},
];

const batches = [
  {id:'BT001', product:'Ripe Mango', icon:'box', qty:'420 kg', temp:'18.0 °C', hum:'52%', fifo:'Compliant', ok:true, updated:'31/07/2026 10:40 AM', capacity:'42 m²', reason:'—'},
  {id:'BT002', product:'Grafted Mango Seedlings', icon:'box', qty:'380 kg', temp:'17.2 °C', hum:'51%', fifo:'Compliant', ok:true, updated:'31/07/2026 10:40 AM', capacity:'38 m²', reason:'—'},
  {id:'BT003', product:'Unripe Mango', icon:'box', qty:'200 kg', temp:'21.0 °C', hum:'58%', fifo:'At Risk', ok:false, updated:'31/07/2026 10:35 AM', capacity:'20 m²', reason:'Temperature above target range'},
  {id:'BT004', product:'Dried Mango', icon:'box', qty:'150 kg', temp:'16.5 °C', hum:'50%', fifo:'Compliant', ok:true, updated:'31/07/2026 10:20 AM', capacity:'15 m²', reason:'—'},
  {id:'BT005', product:'Overripe Mango (for processing)', icon:'box', qty:'120 kg', temp:'17.7 °C', hum:'53%', fifo:'Compliant', ok:true, updated:'31/07/2026 10:15 AM', capacity:'12 m²', reason:'—'},
];

const sensors = [
  {icon:'thermometer', bg:'rgba(239,108,0,.12)', name:'Temperature Sensor', value:'17.8 °C', status:'Online', ok:true},
  {icon:'droplet', bg:'rgba(10,130,118,.12)', name:'Humidity Sensor', value:'52%', status:'Online', ok:true},
  {icon:'wifi', bg:'rgba(198,40,40,.12)', name:'IoT Gateway', value:'', status:'Not Installed', ok:false},
];

const navItems = [
  {id:'overview', icon:'layout-dashboard', label:'Overview'},
  {id:'storage', icon:'archive', label:'Storage'},
  {id:'batches', icon:'package', label:'Batches'},
  {id:'monitoring', icon:'monitor', label:'Monitoring'},
  {id:'analytics', icon:'bar-chart-3', label:'Analytics'},
  {id:'alerts', icon:'bell', label:'Alerts'},
  {id:'reports', icon:'file-text', label:'Reports'},
  {id:'settings', icon:'settings', label:'Settings'},
];

// ---------------- RENDER NAV ----------------
const navEl = document.getElementById('nav');
function refreshLucideIcons(){
  if(window.lucide){ lucide.createIcons({ width: 18, height: 18, strokeWidth: 1.8, color:'currentColor' }); }
}
function initTheme(){
  const storedTheme = localStorage.getItem('cropcore-theme');
  const theme = storedTheme === 'dark' ? 'dark' : 'light';
  applyTheme(theme);
}
function applyTheme(theme){
  if(theme === 'dark'){
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
  localStorage.setItem('cropcore-theme', theme);
  const toggle = document.getElementById('themeToggle');
  if(toggle) toggle.checked = theme === 'dark';
}
function toggleTheme(){
  const isDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('cropcore-theme', isDark ? 'dark' : 'light');
  const toggle = document.getElementById('themeToggle');
  if(toggle) toggle.checked = isDark;
}
navItems.forEach(item=>{
  const d = document.createElement('div');
  d.className = 'nav-item' + (item.id==='overview' ? ' active' : '');
  d.id = 'nav-'+item.id;
  d.innerHTML = `<span class="nav-icon"><i data-lucide="${item.icon}"></i></span><span>${item.label}</span>`;
  d.onclick = ()=>setPage(item.id);
  navEl.appendChild(d);
});
refreshLucideIcons();

function setPage(id){
  navItems.forEach(i=>document.getElementById('nav-'+i.id).classList.remove('active'));
  document.getElementById('nav-'+id).classList.add('active');
  const overview = document.getElementById('overviewPage');
  const other = document.getElementById('otherPage');
  const titleEl = document.getElementById('pageTitle');
  const subEl = document.getElementById('pageSub');
  const labels = {
    overview:['Crop Storage Dashboard','Farm Sustainable Management System'],
    storage:['Storage','Zones, capacity and environmental targets'],
    batches:['Batches','All stored batches and their status'],
    monitoring:['Monitoring','Live sensor feed and thresholds'],
    analytics:['Analytics','Loss trends and performance over time'],
    alerts:['Alerts','Active and past alerts'],
    reports:['Reports','Exportable weekly and monthly reports'],
    settings:['Settings','Dashboard configuration'],
  };
  titleEl.textContent = labels[id][0];
  subEl.textContent = labels[id][1];
  if(id==='overview'){
    overview.style.display='block'; other.style.display='none';
  } else if(id==='batches'){
    overview.style.display='none'; other.style.display='block';
    renderBatchesPage();
  } else if(id==='settings'){
    overview.style.display='none'; other.style.display='block';
    renderSettingsPage();
  } else {
    overview.style.display='none'; other.style.display='block';
    const sectionDescriptions = {
      storage:'Overview of storage zones, available capacity and target tracking.',
      monitoring:'Live sensor streams, threshold alerts and equipment status.',
      analytics:'Historical trends, performance comparisons and key metrics.',
      alerts:'Active incidents list, alert history and recommended actions.',
      reports:'PDF/CSV exports, periodic summaries and performance overview.',
      settings:'Notification settings, thresholds, users and configuration options.',
    };
    const desc = sectionDescriptions[id] || 'This section will be implemented in the next version of the dashboard during the system design phase.';
    other.innerHTML = `
      <div class="placeholder">
        <b>${labels[id][0]}</b>
        <p>${desc}</p>
        <p>It will display relevant data and actions for this part of the dashboard.</p>
        <p>These features will be completed in the next product iteration as the real system is designed.</p>
      </div>`;
  }
  currentPage = id;
  toggleSearchVisibility(id);
  closeSidebar();
}

let activeQuery = '';
let currentPage = 'overview';

function renderSettingsPage(){
  const other = document.getElementById('otherPage');
  other.innerHTML = `
    <div class="settings-grid">
      <div class="card settings-card">
        <div class="section-title">Profile</div>
        <div class="profile-summary">
          <div class="profile-avatar">u</div>
          <div class="profile-info">
            <div class="profile-name">User name</div>
            <div class="profile-role">Storage Manager</div>
            <div class="profile-email">user.email@cropcore.io</div>
          </div>
        </div>
        <button class="btn-secondary" onclick="alert('Edit profile action')">Edit Profile</button>
      </div>
      <div class="card settings-card">
        <div class="section-title">Appearance</div>
        <div class="setting-row">
          <div class="setting-label">
            <span>Theme</span>
            <span class="setting-hint">Switch between light and dark mode.</span>
          </div>
          <label class="toggle-switch">
            <input id="themeToggle" type="checkbox">
            <span class="switch-slider"></span>
          </label>
        </div>
        <div class="setting-row">
          <div class="setting-label">
            <span>Language</span>
            <span class="setting-hint">Select your preferred language.</span>
          </div>
          <select class="select-field" id="languageSelect" aria-label="Language">
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </div>
    <div class="settings-grid">
      <div class="card settings-card">
        <div class="section-title">Notifications</div>
        <div class="setting-row">
          <div class="setting-label">
            <span>Temperature alerts</span>
            <span class="setting-hint">Receive critical temperature warnings.</span>
          </div>
          <label class="toggle-switch">
            <input type="checkbox" checked>
            <span class="switch-slider"></span>
          </label>
        </div>
        <div class="setting-row">
          <div class="setting-label">
            <span>Humidity alerts</span>
            <span class="setting-hint">Receive critical humidity warnings.</span>
          </div>
          <label class="toggle-switch">
            <input type="checkbox" checked>
            <span class="switch-slider"></span>
          </label>
        </div>
        <div class="setting-row">
          <div class="setting-label">
            <span>Email notifications</span>
            <span class="setting-hint">Receive alerts by email.</span>
          </div>
          <label class="toggle-switch">
            <input type="checkbox" checked>
            <span class="switch-slider"></span>
          </label>
        </div>
      </div>
      <div class="card settings-card">
        <div class="section-title">Account</div>
        <div class="setting-row">
          <div class="setting-label">
            <span>Security</span>
            <span class="setting-hint">Update login and password settings.</span>
          </div>
          <button class="settings-action" onclick="alert('Change password action')">Change password</button>
        </div>
        <div class="setting-row">
          <div class="setting-label">
            <span>Logout</span>
            <span class="setting-hint">Sign out of CropCore.</span>
          </div>
          <button class="settings-action" onclick="alert('Logout action')">Logout</button>
        </div>
      </div>
    </div>
  `;
  const themeToggle = document.getElementById('themeToggle');
  if(themeToggle){
    themeToggle.checked = document.body.classList.contains('dark-mode');
    themeToggle.addEventListener('change', toggleTheme);
  }
  refreshLucideIcons();
}

function matchesBatch(b, query){
  return b.id.toLowerCase().includes(query) ||
    b.product.toLowerCase().includes(query) ||
    b.temp.toLowerCase().includes(query) ||
    b.hum.toLowerCase().includes(query) ||
    b.fifo.toLowerCase().includes(query) ||
    b.updated.toLowerCase().includes(query);
}

function filterBatches(query){
  if(!query) return batches;
  return batches.filter(b=>matchesBatch(b, query));
}

function renderBatchesPage(){
  const other = document.getElementById('otherPage');
  const filtered = filterBatches(activeQuery);
  let rows = filtered.map(b=>`
    <tr class="batch-row ${b.ok?'':'risk'}" onclick="openBatchModal('${b.id}')">
      <td><b>${b.id}</b></td>
      <td><span class="row-icon"><i data-lucide="${b.icon}"></i></span>${b.product}</td>
      <td>${b.qty}</td>
      <td>${b.temp}</td>
      <td>${b.hum}</td>
      <td><span class="pill ${b.ok?'ok':'warn'}"><i data-lucide="${b.ok ? 'check-circle' : 'alert-circle'}" class="pill-icon"></i>${b.ok ? 'Compliant' : 'At Risk'}</span></td>
      <td>${b.updated}</td>
    </tr>`).join('');
  if(!rows){
    rows = `
      <tr><td colspan="7" class="no-results">No matching batches found.</td></tr>`;
  }
  other.innerHTML = `
    <div class="card">
      <div class="card-header" style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap; margin-bottom:14px;">
        <h3 style="margin:0;"><i data-lucide="package" class="section-icon"></i> All Stored Batches (${filtered.length})</h3>
      </div>
      <table>
        <thead><tr><th>Batch ID</th><th>Product</th><th>Quantity</th><th>Temperature</th><th>Humidity</th><th>FIFO Status</th><th>Last Updated</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;

  refreshLucideIcons();
}

// ---------------- RENDER STAT CARDS ----------------
const statRow = document.getElementById('statRow');
stats.forEach(s=>{
  const d = document.createElement('div');
  d.className='stat-card';
  d.innerHTML = `
    <div class="stat-icon" style="background:${s.bg};color:${s.color}"><i data-lucide="${s.icon}"></i></div>
    <div>
      <div class="stat-label">${s.label}</div>
      <div class="stat-value">${s.value}</div>
      <div class="stat-sub ${s.subClass}">${s.sub}</div>
    </div>`;
  d.onclick = ()=>{ if(s.label==='Active Alerts') openAlertModal(); };
  statRow.appendChild(d);
});
// ---------------- RENDER BATCH TABLE (overview) ----------------
const tbody = document.getElementById('batchTableBody');
const overviewSearch = document.getElementById('overviewSearch');

function renderOverviewBatchRows(data){
  tbody.innerHTML = data.length ? data.map(b=>`
    <tr class="batch-row ${b.ok?'':'risk'}" onclick="openBatchModal('${b.id}')">
      <td><b>${b.id}</b></td>
      <td><span class="row-icon"><i data-lucide="${b.icon}"></i></span>${b.product}</td>
      <td>${b.qty}</td>
      <td>${b.temp}</td>
      <td>${b.hum}</td>
      <td><span class="pill ${b.ok?'ok':'warn'}"><i data-lucide="${b.ok ? 'check-circle' : 'alert-circle'}" class="pill-icon"></i>${b.ok ? 'Compliant' : 'At Risk'}</span></td>
      <td>${b.updated}</td>
    </tr>`).join('') : `
    <tr><td colspan="7" class="no-results">No matching batches found.</td></tr>`;
  refreshLucideIcons();
}

function renderSearchDropdown(query){
  const items = query ? filterBatches(query) : [];
  const html = query ? (items.length ? items.map(b => `
      <button class="search-result-item" type="button" onclick="handleSearchResultClick('${b.id}')">
        <span class="search-result-title"><strong>${b.id}</strong> · ${b.product}</span>
        <span class="search-result-meta">${b.temp} · ${b.hum}</span>
      </button>`).join('') : '<div class="search-empty">No results found</div>') : '';
  searchDropdown.innerHTML = html;
  searchDropdown.classList.toggle('active', !!query);
}

function handleSearchResultClick(id){
  setPage('batches');
  closeSearchDropdown();
  openBatchModal(id);
}

function updateSearchResults(query){
  activeQuery = query;
  overviewSearch.value = query;
  renderOverviewBatchRows(filterBatches(query));
  if(document.getElementById('otherPage').style.display !== 'none'){
    renderBatchesPage();
  }
  renderSearchDropdown(query);
}

renderOverviewBatchRows(batches);

overviewSearch?.addEventListener('input', e=>{
  const query = e.target.value.trim().toLowerCase();
  updateSearchResults(query);
});

function toggleSearchVisibility(pageId){
  const shouldHide = pageId !== 'overview' && pageId !== 'batches';
  document.querySelector('.topbar-search').style.display = shouldHide ? 'none' : 'block';
  closeSearchDropdown();
}

function closeSearchDropdown(){
  searchDropdown.classList.remove('active');
  searchDropdown.innerHTML = '';
}

const searchDropdown = document.getElementById('searchDropdown');

document.addEventListener('click', e => {
  const searchBar = document.querySelector('.topbar-search');
  if (searchBar && !searchBar.contains(e.target)) {
    closeSearchDropdown();
  }
});

// ---------------- RENDER SENSORS ----------------
const sensorList = document.getElementById('sensorList');
sensors.forEach(s=>{
  const d = document.createElement('div');
  d.className='sensor-row';
  d.innerHTML = `
    <div class="sensor-left">
      <div class="sensor-ic" style="background:${s.bg}"><i data-lucide="${s.icon}"></i></div>
      <div>
        <div>${s.name}</div>
        <div style="font-size:10.5px;color:${s.ok?'var(--success)':'var(--danger)'}"><span class="dot" style="background:${s.ok?'var(--success)':'var(--danger)'}"></span>${s.status}</div>
      </div>
    </div>
    <div style="color:var(--muted);font-size:12px;">${s.value} ›</div>`;
  sensorList.appendChild(d);
});
refreshLucideIcons();


// ---------------- MODALS ----------------
function openAlertModal(){ document.getElementById('alertOverlay').classList.add('show'); }
function closeModal(id){ document.getElementById(id).classList.remove('show'); }
function openBatchModal(id){
  const b = batches.find(x=>x.id===id);
  const el = document.getElementById('batchModalContent');
  el.innerHTML = `
    <h2><span class="row-icon"><i data-lucide="${b.icon}"></i></span>${b.id} — ${b.product}</h2>
    <p>Détail du batch en stockage</p>
    <div class="modal-row"><span>Quantity</span><b>${b.qty}</b></div>
    <div class="modal-row"><span>Temperature</span><b style="color:${b.ok?'var(--text)':'var(--red)'}">${b.temp}</b></div>
    <div class="modal-row"><span>Humidity</span><b>${b.hum}</b></div>
    <div class="modal-row"><span>FIFO Status</span><b style="color:${b.ok?'var(--green)':'var(--red)'}">${b.fifo}</b></div>
    <div class="modal-row"><span>Capacity occupied</span><b>${b.capacity}</b></div>
    <div class="modal-row"><span>Last Updated</span><b>${b.updated}</b></div>
    <div class="modal-row"><span>Note</span><b>${b.reason}</b></div>
    <button class="modal-close" onclick="closeModal('batchOverlay')">Close</button>`;
  document.getElementById('batchOverlay').classList.add('show');
}
document.querySelectorAll('.overlay').forEach(o=>{
  o.addEventListener('click', e=>{ if(e.target===o) o.classList.remove('show'); });
});

const sidebar = document.querySelector('.sidebar');
const sidebarBackdrop = document.querySelector('.sidebar-backdrop');
const menuToggle = document.querySelector('.menu-toggle');
const sidebarClose = document.querySelector('.sidebar-close');

function openSidebar(){
  sidebar.classList.add('active');
  sidebarBackdrop.classList.add('active');
  document.body.classList.add('no-scroll');
}
function closeSidebar(){
  sidebar.classList.remove('active');
  sidebarBackdrop.classList.remove('active');
  document.body.classList.remove('no-scroll');
}

menuToggle?.addEventListener('click', openSidebar);
sidebarClose?.addEventListener('click', closeSidebar);
sidebarBackdrop?.addEventListener('click', closeSidebar);

// ---------------- CHARTS ----------------
Chart.defaults.color = '#1a1a1a';
Chart.defaults.font.family = 'Inter, "Segoe UI", Arial, sans-serif';

const ANIM_DURATION = 1400;
const ANIM_EASING = 'easeOutQuart';

// small helper to animate a number counting up in sync with the chart fill
function animateCounter(el, endValue, duration, decimals, suffix){
  const start = performance.now();
  function tick(now){
    const p = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - p, 4); // easeOutQuart, matches ANIM_EASING
    const current = endValue * eased;
    el.textContent = current.toFixed(decimals) + suffix;
    if(p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// ---- Gauge: starts empty, fills up to 55% ----
const gaugeChart = new Chart(document.getElementById('gaugeChart'), {
  type:'doughnut',
  data:{ datasets:[{ data:[0,100], backgroundColor:['#F5A623','#d9e5e3'], borderWidth:0, cutout:'78%' }] },
  options:{
    responsive:true, maintainAspectRatio:false, rotation:-90, circumference:180,
    animation:{ duration:ANIM_DURATION, easing:ANIM_EASING },
    plugins:{legend:{display:false}, tooltip:{enabled:false}}
  }
});
const gaugePctEl = document.querySelector('.gauge-pct');
requestAnimationFrame(()=>{
  gaugeChart.data.datasets[0].data = [55,45];
  gaugeChart.update();
  animateCounter(gaugePctEl, 55, ANIM_DURATION, 0, '%');
});

const hours = ['10:00','14:00','18:00','22:00','02:00','06:00','10:00'];

// ---- Temperature trend: lines start flat at 0, rise to real values ----
const tempTarget = [19.5,19,18.2,17.5,17,17.3,17.8];
const tempTargetLine = [20,20,20,20,20,20,20];
const tempChart = new Chart(document.getElementById('tempChart'), {
  type:'line',
  data:{ labels:hours, datasets:[
    { label:'Temperature (°C)', data:hours.map(()=>0), borderColor:'var(--secondary)', backgroundColor:'rgba(239,108,0,.18)', fill:true, tension:.35, pointRadius:0, borderWidth:2 },
    { label:'Target (15-20°C)', data:hours.map(()=>0), borderColor:'var(--success)', borderDash:[4,4], pointRadius:0, borderWidth:1.5 },
  ]},
  options:{ responsive:true, maintainAspectRatio:false,
    animation:{ duration:ANIM_DURATION, easing:ANIM_EASING },
    scales:{ y:{min:0,max:25, grid:{color:'#d9e5e3'}}, x:{grid:{display:false}} },
    plugins:{ legend:{ position:'bottom', labels:{boxWidth:10, font:{size:9.5}, color:'#1a1a1a'} } } }
});
requestAnimationFrame(()=>{
  tempChart.data.datasets[0].data = tempTarget;
  tempChart.data.datasets[1].data = tempTargetLine;
  tempChart.update();
});

// ---- Humidity trend: lines start flat at 0, rise to real values ----
const humTarget = [54,53,55,58,56,53,52];
const humTargetLine = [52,52,52,52,52,52,52];
const humChart = new Chart(document.getElementById('humChart'), {
  type:'line',
  data:{ labels:hours, datasets:[
    { label:'Humidity (%)', data:hours.map(()=>0), borderColor:'var(--primary)', backgroundColor:'rgba(10,130,118,.18)', fill:true, tension:.35, pointRadius:0, borderWidth:2 },
    { label:'Target (50-55%)', data:hours.map(()=>0), borderColor:'var(--success)', borderDash:[4,4], pointRadius:0, borderWidth:1.5 },
  ]},
  options:{ responsive:true, maintainAspectRatio:false,
    animation:{ duration:ANIM_DURATION, easing:ANIM_EASING },
    scales:{ y:{min:0,max:100, grid:{color:'#d9e5e3'}}, x:{grid:{display:false}} },
    plugins:{ legend:{ position:'bottom', labels:{boxWidth:10, font:{size:9.5}, color:'#1a1a1a'} } } }
});
requestAnimationFrame(()=>{
  humChart.data.datasets[0].data = humTarget;
  humChart.data.datasets[1].data = humTargetLine;
  humChart.update();
});