let startTime = 0;
let elapsedTime = 0;
let lastLapTime = 0;
let intervalID = null;
let isRunning = false;
let lapCount = 0;
let laps = [];

const hour = document.getElementById('hours');
const min = document.getElementById('minutes');
const sec = document.getElementById('seconds');
const ms = document.getElementById('milliseconds');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapList = document.getElementById('lapList');
const hint = document.querySelector('.hint');

function formatTime(ms) {
    const date = new Date(ms);
    const h = String(date.getUTCHours()).padStart(2, '0');
    const m = String(date.getUTCMinutes()).padStart(2, '0');
    const s = String(date.getUTCSeconds()).padStart(2, '0');
    const mS = String(date.getUTCMilliseconds()).padStart(3, '0');

    return `${h}h:${m}m:${s}s.${mS}`;
}

function updateDisplay() {
    const date = new Date(elapsedTime);

    hour.textContent = String(date.getUTCHours()).padStart(2, '0');
    min.textContent = String(date.getUTCMinutes()).padStart(2, '0');
    sec.textContent = String(date.getUTCSeconds()).padStart(2, '0');
    ms.textContent = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');
}

function startTimer() {
    startTime = Date.now() - elapsedTime;
    intervalID = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateDisplay();
    }, 10);
    isRunning = true;
    lapBtn.style.display = 'block';
}

function stopTimer() {
    clearInterval(intervalID);
    isRunning = false;
}

function resetTimer() {
    clearInterval(intervalID);
    isRunning = false;
    elapsedTime = 0;
    lastLapTime = 0;
    lapCount = 0;
    laps = [];
    updateDisplay();
    lapList.innerHTML = '';
    lapList.classList.remove('show');
    lapBtn.style.display = 'none';
}

function recordLap() {
    const currentLapTime = elapsedTime - lastLapTime;
    lapCount++;
    laps.push(currentLapTime);

    const li = document.createElement('li');
    li.textContent = `Lap ${lapCount}: ${formatTime(currentLapTime)}`;
    lapList.appendChild(li);
    lapList.classList.add('show');

    lastLapTime = elapsedTime;
}

startBtn.addEventListener('click', () => {
    if (!isRunning) {
        startTimer();
    }
});

stopBtn.addEventListener('click', () => {
    if (isRunning) {
        stopTimer();
    }
});

resetBtn.addEventListener('click', () => {
    resetTimer();
});

lapBtn.addEventListener('click', () => {
    if (isRunning) {
        recordLap();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        if (!isRunning) {
            startTimer();
        } else {
            stopTimer();
        }
    }
});