export default async function(req) {
  const url = new URL(req.url);
  const path = url.pathname;
  
  const css = `:root {
    /* Color Palette - Premium Dark Mode with Neon Accents */
    --bg-base: #0a0a0c;
    --bg-surface: rgba(20, 20, 25, 0.6);
    --bg-surface-hover: rgba(30, 30, 40, 0.8);
    
    --accent-primary: #ccff00; /* Electric Lime */
    --accent-primary-glow: rgba(204, 255, 0, 0.3);
    --accent-secondary: #00ffcc; /* Cyan */
    
    --text-primary: #ffffff;
    --text-secondary: #a0a0ab;
    --text-muted: #6e6e77;
    
    --border-subtle: rgba(255, 255, 255, 0.08);
    --border-focus: rgba(204, 255, 0, 0.5);

    --danger: #ff3366;
    
    /* Typography */
    --font-family: 'Outfit', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    
    /* Effects */
    --glass-blur: blur(16px);
    --shadow-sm: 0 4px 6px rgba(0, 0, 0, 0.3);
    --shadow-glow: 0 0 20px var(--accent-primary-glow);
    --radius-lg: 24px;
    --radius-md: 16px;
    --radius-sm: 8px;
    
    /* Transitions */
    --transition-fast: 0.2s ease;
    --transition-bounce: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: var(--font-family);
    background-color: var(--bg-base);
    color: var(--text-primary);
    line-height: 1.5;
    min-height: 100vh;
    /* Subtle radial gradient background */
    background-image: radial-gradient(circle at top right, rgba(0, 255, 204, 0.05), transparent 40%),
                      radial-gradient(circle at bottom left, rgba(204, 255, 0, 0.05), transparent 40%);
    background-attachment: fixed;
    /* Extra padding at bottom for nav */
    padding-bottom: 80px; 
}

/* Container */
.app-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

/* Views Navigation */
.view {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    animation: fadeIn var(--transition-bounce);
}

.view.hidden {
    display: none !important;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Glass Panels */
.glass-panel {
    background: var(--bg-surface);
    backdrop-filter: var(--glass-blur);
    -webkit-backdrop-filter: var(--glass-blur);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    box-shadow: var(--shadow-sm);
    transition: transform var(--transition-fast), border-color var(--transition-fast);
}

.glass-panel:hover {
    border-color: rgba(255,255,255,0.15);
}

/* Header & Stats */
.dashboard-header {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
    text-align: center;
    position: relative;
    overflow: hidden;
}

.dashboard-header::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, var(--accent-primary), transparent);
    opacity: 0.5;
}

.logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: var(--accent-primary);
}

.logo h1 {
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: -0.5px;
    background: linear-gradient(to right, var(--text-primary), var(--accent-primary));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

.logo i {
    font-size: 1.8rem;
    filter: drop-shadow(0 0 8px var(--accent-primary-glow));
}

.stats-overview {
    display: flex;
    width: 100%;
    justify-content: space-between;
    gap: 1rem;
}

.stat-card {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    background: rgba(0,0,0,0.2);
    border-radius: var(--radius-md);
    border: 1px solid var(--border-subtle);
}

.stat-card.highlight {
    border-color: var(--accent-primary-glow);
    box-shadow: inset 0 0 20px var(--accent-primary-glow);
}

.stat-value {
    font-size: 1.75rem;
    font-weight: 600;
    color: var(--text-primary);
}

.stat-card.highlight .stat-value {
    color: var(--accent-primary);
}

.stat-label {
    font-size: 0.75rem;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-top: 0.25rem;
}

/* Main Content */
.main-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

h2 {
    font-size: 1.25rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    color: var(--text-primary);
}

h2 i {
    color: var(--accent-secondary);
}

/* Select Inputs */
.custom-select {
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
    padding: 0.85rem 1rem;
    color: var(--text-primary);
    font-family: inherit;
    font-size: 1rem;
    appearance: none;
    cursor: pointer;
    transition: all var(--transition-fast);
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1em;
}

.custom-select:focus {
    outline: none;
    border-color: var(--accent-primary);
    box-shadow: 0 0 0 2px var(--accent-primary-glow);
}

.custom-select option {
    background-color: #222;
    color: var(--text-primary);
}

/* Forms */
.form-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1rem;
}

.form-group.row {
    flex-direction: row;
}

.form-group.multi-col .input-wrapper {
    flex: 1;
}

.input-wrapper.full-width {
    width: 100%;
}

label {
    font-size: 0.85rem;
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
    display: block;
}

.input-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
}

.input-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-muted);
    font-size: 0.9rem;
    transition: color var(--transition-fast);
}

input {
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
    padding: 0.85rem 1rem;
    color: var(--text-primary);
    font-family: inherit;
    font-size: 1rem;
    transition: all var(--transition-fast);
}

.input-wrapper i.input-icon + input,
input:has(+ i.input-icon),
input.has-icon {
    padding-left: 2.5rem;
}

input:focus {
    outline: none;
    border-color: var(--accent-primary);
    box-shadow: 0 0 0 2px var(--accent-primary-glow);
    background: rgba(0, 0, 0, 0.6);
}

input:focus ~ .input-icon {
    color: var(--accent-primary);
}

input::placeholder {
    color: var(--text-muted);
}

/* Buttons */
.btn-primary {
    width: 100%;
    background: var(--accent-primary);
    color: #000;
    border: none;
    border-radius: var(--radius-md);
    padding: 1rem;
    font-size: 1rem;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: all var(--transition-bounce);
    margin-top: 1.5rem;
}

.btn-primary[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
    background: var(--text-muted);
}
.btn-primary[disabled]:hover {
    transform: none;
    box-shadow: none;
}

.btn-primary:not([disabled]):hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-glow);
}

.btn-primary:active {
    transform: translateY(0);
}

.btn-icon {
    background: transparent;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    font-size: 1rem;
    transition: color var(--transition-fast);
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.btn-icon:hover {
    color: var(--danger);
}

/* Section Header */
.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.section-header h2 {
    margin-bottom: 0;
}

/* Lists */
.history-list-container, .stretching-list-container {
    background: rgba(0, 0, 0, 0.2);
    border-radius: var(--radius-md);
    border: 1px solid var(--border-subtle);
    padding: 0.5rem;
    overflow-y: auto;
    max-height: 400px;
}
.history-list-container::-webkit-scrollbar, .stretching-list-container::-webkit-scrollbar {
    width: 6px;
}
.history-list-container::-webkit-scrollbar-thumb, .stretching-list-container::-webkit-scrollbar-thumb {
    background: var(--border-subtle);
    border-radius: 10px;
}

.workout-list, .stretch-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 1rem;
    color: var(--text-muted);
    text-align: center;
    gap: 1rem;
}

.empty-state i {
    font-size: 2.5rem;
    opacity: 0.5;
}

/* Individual Workout Item styling */
.workout-item {
    background: var(--bg-surface);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-sm);
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    animation: slideIn var(--transition-bounce);
    transition: transform var(--transition-fast), background var(--transition-fast);
}

.workout-item:hover {
    background: var(--bg-surface-hover);
    transform: translateX(4px);
}

.workout-item-details {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.workout-item-title {
    font-weight: 500;
    color: var(--text-primary);
}

.workout-item-meta {
    font-size: 0.8rem;
    color: var(--text-secondary);
    display: flex;
    gap: 0.75rem;
}

.workout-item-meta span {
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.workout-item-meta i {
    font-size: 0.7rem;
    color: var(--accent-secondary);
}

.workout-volume {
    font-weight: 600;
    color: var(--accent-primary);
    background: rgba(204, 255, 0, 0.1);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.85rem;
}

/* Delete button on items */
.btn-delete-item {
    background: transparent;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.5;
    transition: opacity var(--transition-fast), color var(--transition-fast);
}

.workout-item:hover .btn-delete-item,
.stretch-item:hover .btn-delete-item {
    opacity: 1;
}

.btn-delete-item:hover {
    color: var(--danger);
}

/* Animations */
@keyframes slideIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Stretching & Builder Lists */
.stretch-item {
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-sm);
    padding: 0.75rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all var(--transition-fast);
}

.stretch-item.completed {
    opacity: 0.6;
    background: rgba(204, 255, 0, 0.05);
    border-color: rgba(204, 255, 0, 0.2);
}

.stretch-item.completed .stretch-name-label {
    text-decoration: line-through;
    color: var(--text-muted);
}

.stretch-label-wrapper {
    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
    flex: 1;
}

.stretch-name {
    display: flex;
    flex-direction: column;
}

.stretch-name-label {
    color: var(--text-primary);
}

.stretch-desc {
    font-size: 0.8rem;
    color: var(--text-muted);
    margin-top: 0.15rem;
}

/* Custom Checkbox */
.custom-checkbox {
    appearance: none;
    background-color: transparent;
    margin: 0;
    font: inherit;
    color: currentColor;
    width: 1.25em;
    height: 1.25em;
    border: 2px solid var(--text-muted);
    border-radius: 4px;
    display: grid;
    place-content: center;
    cursor: pointer;
    transition: all var(--transition-fast);
}

.custom-checkbox::before {
    content: "";
    width: 0.65em;
    height: 0.65em;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em var(--bg-base);
    background-color: var(--bg-base);
    transform-origin: center;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
}

.custom-checkbox:checked {
    background-color: var(--accent-primary);
    border-color: var(--accent-primary);
    box-shadow: 0 0 10px var(--accent-primary-glow);
}

.custom-checkbox:checked::before {
    transform: scale(1);
}

.btn-success {
    background: var(--accent-secondary);
    color: #000;
    box-shadow: 0 0 15px rgba(0, 255, 204, 0.2);
}

.btn-success:hover {
    box-shadow: 0 0 20px rgba(0, 255, 204, 0.4);
}

.hidden {
    display: none !important;
}

.stretch-status {
    color: var(--accent-secondary);
    text-align: center;
    margin-top: 1rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

/* Bottom Navigation Nav */
.bottom-nav {
    position: fixed;
    bottom: 1rem;
    left: 1rem;
    right: 1rem;
    display: flex;
    justify-content: space-around;
    padding: 0.75rem 0.5rem;
    background: rgba(20, 20, 25, 0.9);
    z-index: 100;
    border-radius: 100px;
    max-width: 600px;
    margin: 0 auto;
    border: 1px solid var(--border-subtle);
    backdrop-filter: blur(20px);
}

.nav-btn {
    background: transparent;
    border: none;
    color: var(--text-muted);
    font-family: inherit;
    font-size: 0.85rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 100px;
    transition: all var(--transition-fast);
    flex: 1;
    text-decoration: none; /* Add this for <a> tags */
}

.nav-btn i {
    font-size: 1.25rem;
    margin-bottom: 0.25rem;
}

.nav-btn:hover {
    color: var(--text-primary);
    background: rgba(255, 255, 255, 0.05);
}

.nav-btn.active {
    color: var(--accent-primary);
    background: rgba(204, 255, 0, 0.1);
}

/* Active Session & Timer */
.sticky-header {
    position: sticky;
    top: 1rem;
    z-index: 50;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 1.5rem;
    gap: 1rem;
}

.timer-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    animation: fadeIn var(--transition-fast);
}

.timer-ring {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 3px solid var(--accent-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 15px var(--accent-primary-glow);
    background: rgba(0,0,0,0.5);
    margin: 0 auto;
}

.timer-text {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--accent-primary);
    font-variant-numeric: tabular-nums;
}

.timer-label {
    font-size: 0.75rem;
    color: var(--text-muted);
    letter-spacing: 2px;
}

.exercise-log-card {
    background: rgba(0,0,0,0.3);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.exercise-log-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--border-subtle);
    padding-bottom: 0.75rem;
}

.exercise-log-header h3 {
    font-size: 1.1rem;
    color: var(--accent-secondary);
}

.rest-time-badge {
    background: rgba(0, 255, 204, 0.1);
    color: var(--accent-secondary);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.active-set-row {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.active-set-row .input-wrapper {
    flex: 1;
}

.active-set-row input {
    padding: 0.5rem 0.75rem;
}

/* Responsive tweaks & Mobile Polish */
@media (max-width: 650px) {
    .app-container {
        padding: 1rem 1rem 6rem 1rem;
    }
}

@media (max-width: 480px) {
    .form-group.row {
        flex-direction: column;
    }
    
    .form-group.row.multi-col {
        flex-direction: column;
    }
    
    .stats-overview {
        flex-direction: column;
    }

    .stretch-form {
        flex-direction: row; 
    }

    .stat-card {
        flex-direction: row;
        justify-content: space-between;
        padding: 1rem 1.5rem;
    }
    
    .stat-value {
        font-size: 1.5rem;
    }
    
    .stat-label {
        margin-top: 0;
    }
}
`;
  const js = `// ==========================================
// STATE MANAGEMENT (Shared)
// ==========================================
let workouts = JSON.parse(localStorage.getItem('gains_workouts')) || [];
let workoutRoutines = JSON.parse(localStorage.getItem('gains_workout_routines')) || [];
let stretchRoutines = JSON.parse(localStorage.getItem('gains_stretch_routines')) || [];
let stretchLog = JSON.parse(localStorage.getItem('gains_stretch_log')) || {}; // { 'YYYY-MM-DD': stretchRoutineId }

const formatNumber = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
function getTodayStr() {
    const today = new Date();
    return \`\${today.getFullYear()}-\${String(today.getMonth() + 1).padStart(2, '0')}-\${String(today.getDate()).padStart(2, '0')}\`;
}

// ==========================================
// INITIALIZATION ROUTER
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Determine which page we are on by checking for unique selectors
    if (document.getElementById('view-dashboard')) {
        initDashboard();
    } 
    if (document.getElementById('view-library')) {
        initLibrary();
    }
});


// ==========================================
// DASHBOARD LOGIC (index.html)
// ==========================================
let activeSessionWorkoutId = null;
let activeSessionTimer = null;
let timerSecondsRemaining = 0;

function initDashboard() {
    // Dashboard Elements
    const totalWorkoutsEl = document.getElementById('total-workouts');
    const totalSetsEl = document.getElementById('total-sets');
    const totalVolumeEl = document.getElementById('total-volume');
    const workoutList = document.getElementById('workout-list');
    const clearHistoryBtn = document.getElementById('clear-history');
    
    // Selectors & Status
    const workoutSelect = document.getElementById('workout-routine-select');
    const btnStartWorkout = document.getElementById('btn-start-workout');
    const noWorkoutsMsg = document.getElementById('no-workouts-msg');
    
    const stretchSelect = document.getElementById('stretch-routine-select');
    const noStretchesMsg = document.getElementById('no-stretches-msg');
    const dashStretchContainer = document.getElementById('dashboard-stretch-container');
    const dashStretchList = document.getElementById('stretch-list');
    const btnSaveStretch = document.getElementById('btn-save-stretch');
    const stretchStatus = document.getElementById('stretch-status');

    // Stats
    function updateDashboardStats() {
        const dates = new Set();
        let totalSetsCounter = 0;
        let totalVolCounter = 0;
    
        workouts.forEach(w => {
            dates.add(new Date(w.date).toDateString());
            w.setsLog.forEach(s => {
                totalSetsCounter++;
                totalVolCounter += (s.weight * s.reps);
            });
        });
    
        totalWorkoutsEl.innerText = dates.size;
        totalSetsEl.innerText = formatNumber(totalSetsCounter);
        totalVolumeEl.innerText = formatNumber(totalVolCounter);
    }
    
    // History
    function renderHistory() {
        workoutList.innerHTML = '';
        if (workouts.length === 0) {
            workoutList.innerHTML = \`<div class="empty-state"><i class="fa-solid fa-box-open"></i><p>No workouts completed yet.</p></div>\`;
            return;
        }
    
        const sorted = [...workouts].sort((a, b) => b.date - a.date);
        sorted.forEach(w => {
            const item = document.createElement('li');
            item.classList.add('workout-item');
            const dateObj = new Date(w.date);
            
            let routineVol = 0;
            w.setsLog.forEach(s => routineVol += (s.weight * s.reps));
    
            item.innerHTML = \`
                <div class="workout-item-details">
                    <span class="workout-item-title">\${w.routineName}</span>
                    <div class="workout-item-meta">
                        <span title="Date"><i class="fa-regular fa-calendar"></i> \${dateObj.toLocaleDateString()}</span>
                        <span title="Sets"><i class="fa-solid fa-repeat"></i> \${w.setsLog.length} sets</span>
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <span class="workout-volume">\${formatNumber(routineVol)} vol</span>
                    <button class="btn-delete-item" onclick="deleteHistoryItem(\${w.id})"><i class="fa-solid fa-xmark"></i></button>
                </div>
            \`;
            workoutList.appendChild(item);
        });
    }

    window.deleteHistoryItem = function(id) {
        workouts = workouts.filter(w => w.id !== id);
        localStorage.setItem('gains_workouts', JSON.stringify(workouts));
        updateDashboardStats();
        renderHistory();
    };

    clearHistoryBtn.addEventListener('click', () => {
        if (workouts.length === 0) return;
        if (confirm("Clear all workout history?")) {
            workouts = [];
            localStorage.setItem('gains_workouts', JSON.stringify(workouts));
            updateDashboardStats();
            renderHistory();
        }
    });

    // Populate Selects
    workoutSelect.innerHTML = '<option value="">-- Choose a routine --</option>';
    if (workoutRoutines.length === 0) {
        workoutSelect.classList.add('hidden');
        noWorkoutsMsg.classList.remove('hidden');
        btnStartWorkout.disabled = true;
    } else {
        workoutSelect.classList.remove('hidden');
        noWorkoutsMsg.classList.add('hidden');
        workoutRoutines.forEach(r => {
            const opt = document.createElement('option');
            opt.value = r.id;
            opt.innerText = r.name;
            workoutSelect.appendChild(opt);
        });
    }

    stretchSelect.innerHTML = '<option value="">-- Choose a routine --</option>';
    if (stretchRoutines.length === 0) {
        stretchSelect.classList.add('hidden');
        noStretchesMsg.classList.remove('hidden');
    } else {
        stretchSelect.classList.remove('hidden');
        noStretchesMsg.classList.add('hidden');
        stretchRoutines.forEach(r => {
            const opt = document.createElement('option');
            opt.value = r.id;
            opt.innerText = r.name;
            stretchSelect.appendChild(opt);
        });
    }

    // Dashboard Interactivity
    workoutSelect.addEventListener('change', (e) => {
        btnStartWorkout.disabled = !e.target.value;
    });

    stretchSelect.addEventListener('change', (e) => {
        renderDashStretchUI(e.target.value);
    });

    function renderDashStretchUI(routineIdStr) {
        const todayStr = getTodayStr();
        const completedRoutineId = stretchLog[todayStr];
        
        // Force select if completed
        let renderId = routineIdStr;
        if (completedRoutineId) {
            renderId = completedRoutineId;
            stretchSelect.value = completedRoutineId;
            stretchSelect.disabled = true;
        } else {
            stretchSelect.disabled = false;
        }
    
        if (!renderId) {
            dashStretchContainer.style.display = 'none';
            return;
        }
    
        const routine = stretchRoutines.find(r => r.id == renderId);
        if (!routine) return;
    
        dashStretchContainer.style.display = 'block';
        dashStretchList.innerHTML = '';
    
        routine.exercises.forEach((st, idx) => {
            const item = document.createElement('li');
            item.classList.add('stretch-item');
            if (completedRoutineId) item.classList.add('completed');
    
            item.innerHTML = \`
                <label class="stretch-label-wrapper">
                    <input type="checkbox" class="custom-checkbox" 
                           \${completedRoutineId ? 'checked disabled' : ''}>
                    <div class="stretch-name">
                        <span class="stretch-name-label">\${st.name}</span>
                        \${st.desc ? \`<span class="stretch-desc">\${st.desc}</span>\` : ''}
                    </div>
                </label>
            \`;
            dashStretchList.appendChild(item);
        });
    
        if (completedRoutineId) {
            btnSaveStretch.classList.add('hidden');
            stretchStatus.classList.remove('hidden');
        } else {
            btnSaveStretch.classList.remove('hidden');
            stretchStatus.classList.add('hidden');
        }
    }

    btnSaveStretch.addEventListener('click', () => {
        const routineId = stretchSelect.value;
        if (!routineId) return;
        
        stretchLog[getTodayStr()] = routineId;
        localStorage.setItem('gains_stretch_log', JSON.stringify(stretchLog));
        renderDashStretchUI(routineId);
    });

    // ACTIVE SESSION LOGIC
    const viewDashboard = document.getElementById('view-dashboard');
    const viewActiveSession = document.getElementById('view-active-session');
    const mainNav = document.getElementById('main-nav');
    const mainHeader = document.getElementById('main-header');
    
    const activeRoutineNameEl = document.getElementById('active-routine-name');
    const activeExercisesContainer = document.getElementById('active-exercises-container');
    const btnCancelWorkout = document.getElementById('btn-cancel-workout');
    const btnFinishWorkout = document.getElementById('btn-finish-workout');
    
    const timerContainer = document.getElementById('rest-timer-container');
    const timerDisplay = document.getElementById('rest-timer-display');
    const btnSkipRest = document.getElementById('btn-skip-rest');

    btnStartWorkout.addEventListener('click', () => {
        const routineId = workoutSelect.value;
        const routine = workoutRoutines.find(r => r.id == routineId);
        if (!routine) return;
    
        activeSessionWorkoutId = routineId;
        activeRoutineNameEl.innerText = routine.name;
        
        renderActiveExercises(routine.exercises);
        
        // Switch to Active Session View (Hide dashboard/nav)
        viewDashboard.classList.add('hidden');
        mainNav.classList.add('hidden');
        mainHeader.classList.add('hidden');
        viewActiveSession.classList.remove('hidden');
    });

    function renderActiveExercises(exercises) {
        activeExercisesContainer.innerHTML = '';
        
        exercises.forEach((ex, exIdx) => {
            const card = document.createElement('div');
            card.classList.add('exercise-log-card');
            card.innerHTML = \`
                <div class="exercise-log-header">
                    <h3>\${ex.name}</h3>
                    <span class="rest-time-badge"><i class="fa-regular fa-clock"></i> \${ex.rest}s</span>
                </div>
                
                <div class="sets-container" id="sets-container-\${exIdx}">
                    <!-- Start with 1 set -->
                </div>
                
                <button class="btn-icon" style="flex-direction: row; gap: 0.5rem; justify-content: flex-start; opacity: 0.8;" onclick="addSetActiveSet(\${exIdx}, \${ex.rest})">
                    <i class="fa-solid fa-plus"></i> Add Set
                </button>
            \`;
            activeExercisesContainer.appendChild(card);
            addSetActiveSet(exIdx, ex.rest);
        });
    }

    window.addSetActiveSet = function(exIdx, restTime) {
        const container = document.getElementById(\`sets-container-\${exIdx}\`);
        const setIdx = container.children.length;
        
        const row = document.createElement('div');
        row.classList.add('active-set-row');
        row.style.marginBottom = '0.5rem';
        
        row.innerHTML = \`
            <span style="color: var(--text-muted); width: 20px; text-align: right; font-size: 0.85rem;">\${setIdx + 1}</span>
            <div class="input-wrapper">
                <input type="number" class="set-weight" placeholder="lbs" min="0" step="0.5">
            </div>
            <div class="input-wrapper">
                <input type="number" class="set-reps" placeholder="reps" min="0">
            </div>
            <button class="btn-success" style="padding: 0.4rem 0.6rem; border-radius: 4px; border: none; cursor: pointer;" onclick="completeSet(this, \${restTime})">
                <i class="fa-solid fa-check"></i>
            </button>
        \`;
        container.appendChild(row);
    };

    window.completeSet = function(btnObj, restTime) {
        const row = btnObj.parentElement;
        row.style.opacity = '0.5';
        btnObj.disabled = true;
        
        const inputs = row.querySelectorAll('input');
        inputs.forEach(i => i.disabled = true);
        startRestTimer(restTime);
    };

    function startRestTimer(seconds) {
        if (activeSessionTimer) clearInterval(activeSessionTimer);
        
        timerSecondsRemaining = seconds;
        timerContainer.classList.remove('hidden');
        updateTimerDisplay();
        
        activeSessionTimer = setInterval(() => {
            timerSecondsRemaining--;
            updateTimerDisplay();
            
            if (timerSecondsRemaining <= 0) {
                endRestTimer();
                // Visual Flash
                document.body.style.background = 'var(--text-primary)';
                setTimeout(() => document.body.style.background = 'var(--bg-base)', 100);
            }
        }, 1000);
    }
    
    function updateTimerDisplay() {
        const m = Math.floor(timerSecondsRemaining / 60).toString().padStart(2, '0');
        const s = (timerSecondsRemaining % 60).toString().padStart(2, '0');
        timerDisplay.innerText = \`\${m}:\${s}\`;
    }
    
    function endRestTimer() {
        clearInterval(activeSessionTimer);
        activeSessionTimer = null;
        timerContainer.classList.add('hidden');
    }

    btnSkipRest.addEventListener('click', endRestTimer);

    function cancelActiveSession() {
        endRestTimer();
        activeSessionWorkoutId = null;
        viewActiveSession.classList.add('hidden');
        viewDashboard.classList.remove('hidden');
        mainNav.classList.remove('hidden');
        mainHeader.classList.remove('hidden');
    }

    btnCancelWorkout.addEventListener('click', () => {
        if (confirm("Cancel this workout? No data will be saved.")) cancelActiveSession();
    });

    btnFinishWorkout.addEventListener('click', () => {
        const routine = workoutRoutines.find(r => r.id == activeSessionWorkoutId);
        let setsLog = [];
        
        const exCards = activeExercisesContainer.querySelectorAll('.exercise-log-card');
        exCards.forEach((card, idx) => {
            const exName = routine.exercises[idx].name;
            const setRows = card.querySelectorAll('.active-set-row');
            
            setRows.forEach(row => {
                const inputs = row.querySelectorAll('input');
                if (inputs[0].disabled) { 
                    const w = parseFloat(inputs[0].value) || 0;
                    const r = parseInt(inputs[1].value) || 0;
                    if (r > 0) setsLog.push({ exercise: exName, weight: w, reps: r });
                }
            });
        });
    
        if (setsLog.length === 0) {
            if (!confirm("You haven't completed any valid sets! Finish anyway without saving?")) return;
        } else {
            const finalWorkout = {
                id: Date.now(),
                routineId: activeSessionWorkoutId,
                routineName: routine.name,
                date: Date.now(),
                setsLog: setsLog
            };
            workouts.push(finalWorkout);
            localStorage.setItem('gains_workouts', JSON.stringify(workouts));
            
            // Refresh dashboard history
            updateDashboardStats();
            renderHistory();
            alert(\`Workout saved! Logged \${setsLog.length} sets.\`);
        }
        
        cancelActiveSession(); 
    });


    // Initial Calls for Dashboard
    updateDashboardStats();
    renderHistory();
    renderDashStretchUI(stretchSelect.value); // Will pick up completed if any
}


// ==========================================
// LIBRARY LOGIC (library.html)
// ==========================================
function initLibrary() {
    let tempWorkoutExercises = [];
    let tempStretchExercises = [];

    // Form elements
    const createWorkoutForm = document.getElementById('create-workout-form');
    const newRoutineName = document.getElementById('new-routine-name');
    const builderExName = document.getElementById('builder-ex-name');
    const builderExRest = document.getElementById('builder-ex-rest');
    const btnAddBuilderEx = document.getElementById('btn-add-builder-ex');
    const builderExerciseList = document.getElementById('builder-exercise-list');
    const savedWorkoutsList = document.getElementById('saved-workouts-list');

    const createStretchForm = document.getElementById('create-stretch-form');
    const newStretchRoutineName = document.getElementById('new-stretch-routine-name');
    const builderStName = document.getElementById('builder-st-name');
    const builderStDesc = document.getElementById('builder-st-desc');
    const btnAddBuilderSt = document.getElementById('btn-add-builder-st');
    const builderStretchList = document.getElementById('builder-stretch-list');
    const savedStretchesList = document.getElementById('saved-stretches-list');

    function renderTempBuilderEx() {
        builderExerciseList.innerHTML = '';
        tempWorkoutExercises.forEach((ex, idx) => {
            const li = document.createElement('li');
            li.classList.add('stretch-item'); 
            li.innerHTML = \`
                <div class="stretch-name">
                    <span class="stretch-name-label">\${ex.name}</span>
                    <span class="stretch-desc">Rest: \${ex.rest}s</span>
                </div>
                <button type="button" class="btn-delete-item" onclick="removeTempEx(\${idx})"><i class="fa-solid fa-trash"></i></button>
            \`;
            builderExerciseList.appendChild(li);
        });
    }

    function renderTempBuilderSt() {
        builderStretchList.innerHTML = '';
        tempStretchExercises.forEach((st, idx) => {
            const li = document.createElement('li');
            li.classList.add('stretch-item');
            li.innerHTML = \`
                <div class="stretch-name">
                    <span class="stretch-name-label">\${st.name}</span>
                    \${st.desc ? \`<span class="stretch-desc">\${st.desc}</span>\` : ''}
                </div>
                <button type="button" class="btn-delete-item" onclick="removeTempSt(\${idx})"><i class="fa-solid fa-trash"></i></button>
            \`;
            builderStretchList.appendChild(li);
        });
    }

    window.removeTempEx = (idx) => { tempWorkoutExercises.splice(idx, 1); renderTempBuilderEx(); };
    window.removeTempSt = (idx) => { tempStretchExercises.splice(idx, 1); renderTempBuilderSt(); };

    btnAddBuilderEx.addEventListener('click', () => {
        const name = builderExName.value.trim();
        const rest = parseInt(builderExRest.value) || 60;
        if (!name) return;
        tempWorkoutExercises.push({ name, rest });
        builderExName.value = '';
        builderExRest.value = '';
        renderTempBuilderEx();
        builderExName.focus();
    });

    btnAddBuilderSt.addEventListener('click', () => {
        const name = builderStName.value.trim();
        const desc = builderStDesc.value.trim();
        if (!name) return;
        tempStretchExercises.push({ name, desc });
        builderStName.value = '';
        builderStDesc.value = '';
        renderTempBuilderSt();
        builderStName.focus();
    });

    createWorkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (tempWorkoutExercises.length === 0) {
            alert("Add at least one exercise.");
            return;
        }
        const r = { id: Date.now(), name: newRoutineName.value.trim(), exercises: tempWorkoutExercises };
        workoutRoutines.push(r);
        localStorage.setItem('gains_workout_routines', JSON.stringify(workoutRoutines));
        
        newRoutineName.value = '';
        tempWorkoutExercises = [];
        renderTempBuilderEx();
        renderSavedLibrary();
    });

    createStretchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (tempStretchExercises.length === 0) {
            alert("Add at least one stretch.");
            return;
        }
        const r = { id: Date.now(), name: newStretchRoutineName.value.trim(), exercises: tempStretchExercises };
        stretchRoutines.push(r);
        localStorage.setItem('gains_stretch_routines', JSON.stringify(stretchRoutines));
        
        newStretchRoutineName.value = '';
        tempStretchExercises = [];
        renderTempBuilderSt();
        renderSavedLibrary();
    });

    function renderSavedLibrary() {
        savedWorkoutsList.innerHTML = '';
        workoutRoutines.forEach(r => {
            const li = document.createElement('li');
            li.classList.add('stretch-item');
            li.innerHTML = \`
                <div class="stretch-name">
                    <span class="stretch-name-label">\${r.name}</span>
                    <span class="stretch-desc">\${r.exercises.length} exercises</span>
                </div>
                <button class="btn-delete-item" onclick="deleteLibRout('workout', \${r.id})"><i class="fa-solid fa-xmark"></i></button>
            \`;
            savedWorkoutsList.appendChild(li);
        });

        savedStretchesList.innerHTML = '';
        stretchRoutines.forEach(r => {
            const li = document.createElement('li');
            li.classList.add('stretch-item');
            li.innerHTML = \`
                <div class="stretch-name">
                    <span class="stretch-name-label">\${r.name}</span>
                    <span class="stretch-desc">\${r.exercises.length} stretches</span>
                </div>
                <button class="btn-delete-item" onclick="deleteLibRout('stretch', \${r.id})"><i class="fa-solid fa-xmark"></i></button>
            \`;
            savedStretchesList.appendChild(li);
        });
    }

    window.deleteLibRout = (type, id) => {
        if (type === 'workout') {
            workoutRoutines = workoutRoutines.filter(r => r.id !== id);
            localStorage.setItem('gains_workout_routines', JSON.stringify(workoutRoutines));
        } else {
            stretchRoutines = stretchRoutines.filter(r => r.id !== id);
            localStorage.setItem('gains_stretch_routines', JSON.stringify(stretchRoutines));
        }
        renderSavedLibrary();
    };

    renderSavedLibrary();
}
`;
  const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gains | Personal Gym Tracker</title>
    <!-- Modern typography -->
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
    <!-- FontAwesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="app-container">
        <!-- Dashboard Header / Sidebar equivalent -->
        <header class="dashboard-header glass-panel" id="main-header">
            <div class="logo">
                <i class="fa-solid fa-dumbbell"></i>
                <h1>Gains</h1>
            </div>
            
            <div class="stats-overview">
                <div class="stat-card">
                    <span class="stat-value" id="total-workouts">0</span>
                    <span class="stat-label">Total Workouts</span>
                </div>
                <div class="stat-card">
                    <span class="stat-value" id="total-sets">0</span>
                    <span class="stat-label">Total Sets</span>
                </div>
                <div class="stat-card highlight">
                    <span class="stat-value" id="total-volume">0</span>
                    <span class="stat-label">Volume (lbs)</span>
                </div>
            </div>
        </header>

        <!-- Main Content Area -->
        <main class="main-content">
            
            <!-- VIEW: DASHBOARD -->
            <div id="view-dashboard" class="view">
                
                <!-- Start a Workout Section -->
                <section class="start-workout-section glass-panel">
                    <h2><i class="fa-solid fa-play"></i> Start Workout</h2>
                    <div class="form-group" style="margin-bottom: 0;">
                        <label for="workout-routine-select">Select Routine</label>
                        <select id="workout-routine-select" class="custom-select">
                            <option value="">-- Choose a routine --</option>
                        </select>
                    </div>
                    <button id="btn-start-workout" class="btn-primary" disabled>
                        <span>Start Session</span>
                        <i class="fa-solid fa-bolt"></i>
                    </button>
                    <p id="no-workouts-msg" class="text-muted hidden" style="margin-top: 1rem; font-size: 0.85rem;">No routines found. Go to Library to create one.</p>
                </section>

                <!-- Stretching Routine Section -->
                <section class="stretching-section glass-panel">
                    <div class="section-header">
                        <h2><i class="fa-solid fa-person-walking"></i> Today's Stretch</h2>
                    </div>
                    
                    <div class="form-group">
                        <label for="stretch-routine-select">Select Routine</label>
                        <select id="stretch-routine-select" class="custom-select">
                            <option value="">-- Choose a routine --</option>
                        </select>
                    </div>
                    <p id="no-stretches-msg" class="text-muted hidden" style="margin-top: 1rem; font-size: 0.85rem;">No routines found. Go to Library to create one.</p>

                    <div class="stretching-list-container" id="dashboard-stretch-container" style="display: none;">
                        <ul id="stretch-list" class="stretch-list">
                            <!-- Stretches injected via JS -->
                        </ul>
                        <button id="btn-save-stretch" class="btn-primary btn-success hidden" style="margin-top: 1rem;">
                            <i class="fa-solid fa-check"></i> Save Routine for Today
                        </button>
                        <div id="stretch-status" class="stretch-status hidden">
                            <i class="fa-solid fa-circle-check"></i> Routine completed for today!
                        </div>
                    </div>
                </section>

                <!-- Workout History Section -->
                <section class="history-section glass-panel">
                    <div class="section-header">
                        <h2><i class="fa-solid fa-clock-rotate-left"></i> Recent Activity</h2>
                        <button id="clear-history" class="btn-icon" title="Clear History">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                    
                    <div class="history-list-container">
                        <ul id="workout-list" class="workout-list">
                            <!-- Workout items will be injected here via JS -->
                            <div class="empty-state">
                                <i class="fa-solid fa-box-open"></i>
                                <p>No sets logged yet. Let's make some gains!</p>
                            </div>
                        </ul>
                    </div>
                </section>

            </div> <!-- END VIEW: DASHBOARD -->


            <!-- VIEW: ACTIVE SESSION (Hidden by default, shown during workout) -->
            <div id="view-active-session" class="view hidden">
                <div class="active-workout-header glass-panel sticky-header">
                    <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                        <h2 id="active-routine-name" style="margin-bottom: 0; font-size: 1.5rem;">Workout</h2>
                        <button id="btn-cancel-workout" class="btn-icon" style="color: var(--danger); font-size: 1.25rem;">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    
                    <!-- Timer Overlay -->
                    <div id="rest-timer-container" class="timer-container hidden">
                        <div class="timer-ring">
                            <span id="rest-timer-display" class="timer-text">00:00</span>
                        </div>
                        <p class="timer-label">REST</p>
                        <button id="btn-skip-rest" class="btn-icon" style="color: var(--text-primary); background: rgba(255,255,255,0.1); border-radius: 4px; padding: 0.25rem 0.6rem; font-size: 0.8rem;">Skip</button>
                    </div>
                </div>

                <div id="active-exercises-container" style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
                    <!-- Exercise logs injected via JS -->
                </div>

                <button id="btn-finish-workout" class="btn-primary btn-success" style="margin-top: 2rem; margin-bottom: 2rem;">
                    <i class="fa-solid fa-flag-checkered"></i> Finish & Save Workout
                </button>
            </div> <!-- END VIEW: ACTIVE SESSION -->

        </main>
        
        <!-- Bottom Navigation Navbar (MPA Links) -->
        <nav class="bottom-nav glass-panel" id="main-nav">
            <a href="index.html" class="nav-btn active">
                <i class="fa-solid fa-chart-line"></i>
                <span>Dashboard</span>
            </a>
            <a href="library.html" class="nav-btn">
                <i class="fa-solid fa-book-bookmark"></i>
                <span>Library</span>
            </a>
        </nav>
        
    </div>

    <script src="app.js"></script>
</body>
</html>
`;
  const libraryHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Library | Gains Tracker</title>
    <!-- Modern typography -->
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
    <!-- FontAwesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="app-container">
        <!-- Header -->
        <header class="dashboard-header glass-panel">
            <div class="logo">
                <i class="fa-solid fa-book-bookmark"></i>
                <h1>Library</h1>
            </div>
            <p style="color: var(--text-secondary); font-size: 0.9rem;">Create and manage your templates</p>
        </header>

        <!-- Main Content Area -->
        <main class="main-content">
            
            <div id="view-library" class="view">
                <!-- Workout Builder -->
                <section class="builder-section glass-panel">
                    <h2><i class="fa-solid fa-folder-plus"></i> Create Workout Routine</h2>
                    <form id="create-workout-form" class="workout-form">
                        <div class="form-group row" style="align-items: flex-end;">
                            <div class="input-wrapper full-width">
                                <label for="new-routine-name">Routine Name</label>
                                <input type="text" id="new-routine-name" placeholder="e.g. Push Day" required autocomplete="off">
                                <i class="fa-solid fa-tag input-icon"></i>
                            </div>
                        </div>
                        
                        <div class="exercises-builder">
                            <h3 style="font-size: 1rem; margin-bottom: 0.5rem; color: var(--text-secondary);">Exercises</h3>
                            <ul id="builder-exercise-list" class="stretch-list" style="margin-bottom: 1rem;">
                                <!-- Temporary list before saving -->
                            </ul>
                            
                            <!-- Add Exercise Form -->
                            <div class="form-group row multi-col" style="align-items: flex-end; gap: 0.5rem;">
                                <div class="input-wrapper" style="flex: 2;">
                                    <input type="text" id="builder-ex-name" placeholder="Exercise name" autocomplete="off" style="padding-left: 1rem;">
                                </div>
                                <div class="input-wrapper" style="flex: 1;">
                                    <input type="number" id="builder-ex-rest" placeholder="Rest (s)" min="0" step="5" style="padding-left: 1rem;">
                                </div>
                                <button type="button" id="btn-add-builder-ex" class="btn-primary" style="margin-top: 0; padding: 0.85rem; width: auto;">Add</button>
                            </div>
                        </div>

                        <button type="submit" class="btn-primary btn-success" style="margin-top: 1rem;">
                            Save Workout Routine
                        </button>
                    </form>
                    
                    <div class="saved-routines" style="margin-top: 2rem;">
                        <h3 style="font-size: 1rem; margin-bottom: 0.5rem; color: var(--text-secondary);">Saved Workouts</h3>
                        <ul id="saved-workouts-list" class="stretch-list"></ul>
                    </div>
                </section>

                <!-- Stretching Builder -->
                <section class="builder-section glass-panel">
                    <h2><i class="fa-solid fa-person-walking"></i> Create Stretch Routine</h2>
                    <form id="create-stretch-form" class="workout-form">
                        <div class="form-group row" style="align-items: flex-end;">
                            <div class="input-wrapper full-width">
                                <label for="new-stretch-routine-name">Routine Name</label>
                                <input type="text" id="new-stretch-routine-name" placeholder="e.g. Morning Flow" required autocomplete="off">
                                <i class="fa-solid fa-tag input-icon"></i>
                            </div>
                        </div>
                        
                        <div class="exercises-builder">
                            <h3 style="font-size: 1rem; margin-bottom: 0.5rem; color: var(--text-secondary);">Stretches</h3>
                            <ul id="builder-stretch-list" class="stretch-list" style="margin-bottom: 1rem;">
                                <!-- Temporary list before saving -->
                            </ul>
                            
                            <!-- Add Stretch Form -->
                            <div class="form-group row multi-col" style="align-items: flex-end; flex-wrap: wrap; gap: 0.5rem;">
                                <div class="input-wrapper full-width" style="margin-bottom: 0.5rem;">
                                    <input type="text" id="builder-st-name" placeholder="Stretch name" autocomplete="off" style="padding-left: 1rem;">
                                </div>
                                <div class="input-wrapper" style="flex: 3;">
                                    <input type="text" id="builder-st-desc" placeholder="Brief description (e.g. Hold 30s)" autocomplete="off" style="padding-left: 1rem;">
                                </div>
                                <button type="button" id="btn-add-builder-st" class="btn-primary" style="margin-top: 0; padding: 0.85rem; width: auto; flex: 1;">Add</button>
                            </div>
                        </div>

                        <button type="submit" class="btn-primary btn-success" style="margin-top: 1rem;">
                            Save Stretch Routine
                        </button>
                    </form>
                    
                    <div class="saved-routines" style="margin-top: 2rem;">
                        <h3 style="font-size: 1rem; margin-bottom: 0.5rem; color: var(--text-secondary);">Saved Stretches</h3>
                        <ul id="saved-stretches-list" class="stretch-list"></ul>
                    </div>
                </section>
            </div>

        </main>
        
        <!-- Bottom Navigation Navbar (MPA Links) -->
        <nav class="bottom-nav glass-panel" id="main-nav">
            <a href="index.html" class="nav-btn">
                <i class="fa-solid fa-chart-line"></i>
                <span>Dashboard</span>
            </a>
            <a href="library.html" class="nav-btn active">
                <i class="fa-solid fa-book-bookmark"></i>
                <span>Library</span>
            </a>
        </nav>
        
    </div>

    <script src="app.js"></script>
</body>
</html>
`;

  if (path === '/styles.css') return new Response(css, { headers: { 'Content-Type': 'text/css' } });
  if (path === '/app.js') return new Response(js, { headers: { 'Content-Type': 'application/javascript' } });
  if (path === '/library.html') return new Response(libraryHtml, { headers: { 'Content-Type': 'text/html' } });
  
  return new Response(indexHtml, { headers: { 'Content-Type': 'text/html' } });
}
