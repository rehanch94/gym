// ==========================================
// STATE MANAGEMENT (Shared)
// ==========================================
let workouts = JSON.parse(localStorage.getItem('gains_workouts')) || [];
let workoutRoutines = JSON.parse(localStorage.getItem('gains_workout_routines')) || [];
let stretchRoutines = JSON.parse(localStorage.getItem('gains_stretch_routines')) || [];
let stretchLog = JSON.parse(localStorage.getItem('gains_stretch_log')) || {};

// Cloud Sync config
let cloudConfig = JSON.parse(localStorage.getItem('gains_cloud_config')) || { repo: '', token: '', sha: null };

const formatNumber = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
function getTodayStr() {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
}

// ==========================================
// CLOUD SYNC ENGINE (GitHub API)
// ==========================================
async function syncFromCloud() {
    if (!cloudConfig.repo || !cloudConfig.token) return false;
    
    try {
        const response = await fetch(`https://api.github.com/repos/${cloudConfig.repo}/contents/db.json`, {
            headers: {
                'Authorization': `Bearer ${cloudConfig.token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        if (!response.ok) throw new Error("Could not fetch db.json from GitHub");
        
        const data = await response.json();
        cloudConfig.sha = data.sha; // Save file SHA for future updates
        localStorage.setItem('gains_cloud_config', JSON.stringify(cloudConfig));
        
        // Decode base64
        const contentStr = decodeURIComponent(escape(atob(data.content)));
        const db = JSON.parse(contentStr);
        
        // Apply cloud state locally
        workouts = db.workouts || [];
        workoutRoutines = db.workoutRoutines || [];
        stretchRoutines = db.stretchRoutines || [];
        stretchLog = db.stretchLog || {};
        
        // Save back to local storage
        localStorage.setItem('gains_workouts', JSON.stringify(workouts));
        localStorage.setItem('gains_workout_routines', JSON.stringify(workoutRoutines));
        localStorage.setItem('gains_stretch_routines', JSON.stringify(stretchRoutines));
        localStorage.setItem('gains_stretch_log', JSON.stringify(stretchLog));
        
        return true;
    } catch (err) {
        console.error("Cloud Sync Pull failed:", err);
        return false;
    }
}

async function pushToCloud() {
    if (!cloudConfig.repo || !cloudConfig.token) return;
    
    const dbState = {
        workouts,
        workoutRoutines,
        stretchRoutines,
        stretchLog
    };
    
    try {
        // Base64 encode JSON state
        const contentBase64 = btoa(unescape(encodeURIComponent(JSON.stringify(dbState, null, 2))));
        
        const body = {
            message: "Gym Tracker: Auto-sync update",
            content: contentBase64,
            sha: cloudConfig.sha
        };
        
        const response = await fetch(`https://api.github.com/repos/${cloudConfig.repo}/contents/db.json`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${cloudConfig.token}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        
        if (!response.ok) {
            console.error("Failed to push to GitHub", await response.text());
            return;
        }
        
        const result = await response.json();
        cloudConfig.sha = result.content.sha; // Update SHA
        localStorage.setItem('gains_cloud_config', JSON.stringify(cloudConfig));
        
        console.log("Cloud sync push successful!");
    } catch (err) {
        console.error("Cloud sync push error:", err);
    }
}

// ==========================================
// INITIALIZATION ROUTER
// ==========================================
document.addEventListener('DOMContentLoaded', async () => {
    // Attempt cloud pull before initializing pages
    const synced = await syncFromCloud();
    
    if (document.getElementById('view-dashboard')) {
        const syncIcon = document.getElementById('dashboard-sync-status');
        if (syncIcon) {
            if (synced) {
                syncIcon.style.color = 'var(--accent-secondary)';
                syncIcon.title = 'Cloud Sync Active';
            } else if (cloudConfig.repo) {
                syncIcon.style.color = 'var(--danger)';
                syncIcon.title = 'Cloud Sync Error';
            }
        }
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
            workoutList.innerHTML = `<div class="empty-state"><i class="fa-solid fa-box-open"></i><p>No workouts completed yet.</p></div>`;
            return;
        }
    
        const sorted = [...workouts].sort((a, b) => b.date - a.date);
        sorted.forEach(w => {
            const item = document.createElement('li');
            item.classList.add('workout-item');
            const dateObj = new Date(w.date);
            
            let routineVol = 0;
            w.setsLog.forEach(s => routineVol += (s.weight * s.reps));
    
            item.innerHTML = `
                <div class="workout-item-details">
                    <span class="workout-item-title">${w.routineName}</span>
                    <div class="workout-item-meta">
                        <span title="Date"><i class="fa-regular fa-calendar"></i> ${dateObj.toLocaleDateString()}</span>
                        <span title="Sets"><i class="fa-solid fa-repeat"></i> ${w.setsLog.length} sets</span>
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <span class="workout-volume">${formatNumber(routineVol)} vol</span>
                    <button class="btn-delete-item" onclick="deleteHistoryItem(${w.id})"><i class="fa-solid fa-xmark"></i></button>
                </div>
            `;
            workoutList.appendChild(item);
        });
    }

    window.deleteHistoryItem = function(id) {
        workouts = workouts.filter(w => w.id !== id);
        localStorage.setItem('gains_workouts', JSON.stringify(workouts));
        updateDashboardStats();
        renderHistory();
        pushToCloud();
    };

    clearHistoryBtn.addEventListener('click', () => {
        if (workouts.length === 0) return;
        if (confirm("Clear all workout history?")) {
            workouts = [];
            localStorage.setItem('gains_workouts', JSON.stringify(workouts));
            updateDashboardStats();
            renderHistory();
            pushToCloud();
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
    
            item.innerHTML = `
                <label class="stretch-label-wrapper">
                    <input type="checkbox" class="custom-checkbox" 
                           ${completedRoutineId ? 'checked disabled' : ''}>
                    <div class="stretch-name">
                        <span class="stretch-name-label">${st.name}</span>
                        ${st.desc ? `<span class="stretch-desc">${st.desc}</span>` : ''}
                    </div>
                </label>
            `;
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
        pushToCloud();
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
            card.innerHTML = `
                <div class="exercise-log-header">
                    <h3>${ex.name}</h3>
                    <span class="rest-time-badge"><i class="fa-regular fa-clock"></i> ${ex.rest}s</span>
                </div>
                
                <div class="sets-container" id="sets-container-${exIdx}">
                    <!-- Start with 1 set -->
                </div>
                
                <button class="btn-icon" style="flex-direction: row; gap: 0.5rem; justify-content: flex-start; opacity: 0.8;" onclick="addSetActiveSet(${exIdx}, ${ex.rest})">
                    <i class="fa-solid fa-plus"></i> Add Set
                </button>
            `;
            activeExercisesContainer.appendChild(card);
            addSetActiveSet(exIdx, ex.rest);
        });
    }

    window.addSetActiveSet = function(exIdx, restTime) {
        const container = document.getElementById(`sets-container-${exIdx}`);
        const setIdx = container.children.length;
        
        const row = document.createElement('div');
        row.classList.add('active-set-row');
        row.style.marginBottom = '0.5rem';
        
        row.innerHTML = `
            <span style="color: var(--text-muted); width: 20px; text-align: right; font-size: 0.85rem;">${setIdx + 1}</span>
            <div class="input-wrapper">
                <input type="number" class="set-weight" placeholder="lbs" min="0" step="0.5">
            </div>
            <div class="input-wrapper">
                <input type="number" class="set-reps" placeholder="reps" min="0">
            </div>
            <button class="btn-success" style="padding: 0.4rem 0.6rem; border-radius: 4px; border: none; cursor: pointer;" onclick="completeSet(this, ${restTime})">
                <i class="fa-solid fa-check"></i>
            </button>
        `;
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
        timerDisplay.innerText = `${m}:${s}`;
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
            
            // Refresh dashboard history & push
            updateDashboardStats();
            renderHistory();
            pushToCloud();
            alert(`Workout saved! Logged ${setsLog.length} sets.`);
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
    // Cloud Sync UI Logic
    const syncForm = document.getElementById('cloud-sync-form');
    const repoInput = document.getElementById('github-repo');
    const tokenInput = document.getElementById('github-token');
    const msgEl = document.getElementById('sync-status-msg');
    const disconnectBtn = document.getElementById('btn-disconnect-sync');
    
    if (cloudConfig.repo) {
        repoInput.value = cloudConfig.repo;
        tokenInput.value = cloudConfig.token;
        disconnectBtn.style.display = 'block';
    }

    syncForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const repo = repoInput.value.trim();
        const token = tokenInput.value.trim();
        if (!repo || !token) return;
        
        msgEl.className = '';
        msgEl.innerText = 'Testing connection...';
        msgEl.style.color = 'var(--text-secondary)';
        
        // Temporarily set and test pull
        const oldConfig = { ...cloudConfig };
        cloudConfig = { repo, token, sha: null };
        
        const success = await syncFromCloud();
        if (success) {
            msgEl.innerText = `Successfully synced with ${repo}! Local data updated.`;
            msgEl.style.color = 'var(--accent-secondary)';
            disconnectBtn.style.display = 'block';
            renderSavedLibrary(); // Re-render if new routines pulled
        } else {
            // Revert
            cloudConfig = oldConfig;
            msgEl.innerText = `Connection failed. Check Repository format (user/repo), Token validity, and ensure db.json exists.`;
            msgEl.style.color = 'var(--danger)';
        }
    });
    
    disconnectBtn.addEventListener('click', () => {
        if(confirm("Disconnect cloud sync? Your remote data will remain on GitHub, but local changes won't be pushed automatically.")) {
            cloudConfig = { repo: '', token: '', sha: null };
            localStorage.setItem('gains_cloud_config', JSON.stringify(cloudConfig));
            repoInput.value = '';
            tokenInput.value = '';
            disconnectBtn.style.display = 'none';
            msgEl.innerText = 'Disconnected.';
            msgEl.style.color = 'var(--text-secondary)';
        }
    });

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
            li.innerHTML = `
                <div class="stretch-name">
                    <span class="stretch-name-label">${ex.name}</span>
                    <span class="stretch-desc">Rest: ${ex.rest}s</span>
                </div>
                <button type="button" class="btn-delete-item" onclick="removeTempEx(${idx})"><i class="fa-solid fa-trash"></i></button>
            `;
            builderExerciseList.appendChild(li);
        });
    }

    function renderTempBuilderSt() {
        builderStretchList.innerHTML = '';
        tempStretchExercises.forEach((st, idx) => {
            const li = document.createElement('li');
            li.classList.add('stretch-item');
            li.innerHTML = `
                <div class="stretch-name">
                    <span class="stretch-name-label">${st.name}</span>
                    ${st.desc ? `<span class="stretch-desc">${st.desc}</span>` : ''}
                </div>
                <button type="button" class="btn-delete-item" onclick="removeTempSt(${idx})"><i class="fa-solid fa-trash"></i></button>
            `;
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
        pushToCloud();
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
        pushToCloud();
    });

    function renderSavedLibrary() {
        savedWorkoutsList.innerHTML = '';
        workoutRoutines.forEach(r => {
            const li = document.createElement('li');
            li.classList.add('stretch-item');
            li.innerHTML = `
                <div class="stretch-name">
                    <span class="stretch-name-label">${r.name}</span>
                    <span class="stretch-desc">${r.exercises.length} exercises</span>
                </div>
                <button class="btn-delete-item" onclick="deleteLibRout('workout', ${r.id})"><i class="fa-solid fa-xmark"></i></button>
            `;
            savedWorkoutsList.appendChild(li);
        });

        savedStretchesList.innerHTML = '';
        stretchRoutines.forEach(r => {
            const li = document.createElement('li');
            li.classList.add('stretch-item');
            li.innerHTML = `
                <div class="stretch-name">
                    <span class="stretch-name-label">${r.name}</span>
                    <span class="stretch-desc">${r.exercises.length} stretches</span>
                </div>
                <button class="btn-delete-item" onclick="deleteLibRout('stretch', ${r.id})"><i class="fa-solid fa-xmark"></i></button>
            `;
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
        pushToCloud();
    };

    renderSavedLibrary();
}
