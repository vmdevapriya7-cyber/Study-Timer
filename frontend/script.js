let studySeconds = 0;
let breakSeconds = 0;
let totalSessions = 0;
let currentSession = 0;
let timerInterval = null;
let isPaused = false;
let currentMode = "study"; // study or break
let remainingSeconds = 0;

// Start Timer
function startTimer() {
    studySeconds = parseInt(document.getElementById("studyTime").value) * 60;
    breakSeconds = parseInt(document.getElementById("breakTime").value) * 60;
    totalSessions = parseInt(document.getElementById("sessions").value);

    if (isNaN(studySeconds) || isNaN(breakSeconds) || isNaN(totalSessions)) {
        alert("Please enter valid numbers");
        return;
    }

    currentSession = 1;
    currentMode = "study";
    remainingSeconds = studySeconds;

    document.getElementById("session").innerText = "Session " + currentSession;
    runCountdown();
}

// Countdown Logic
function runCountdown() {
    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        if (!isPaused) {
            let mins = Math.floor(remainingSeconds / 60);
            let secs = remainingSeconds % 60;

            document.getElementById("timer").innerText =
                (mins < 10 ? "0" : "") + mins + ":" +
                (secs < 10 ? "0" : "") + secs;

            document.getElementById("status").innerText =
                currentMode === "study" ? "Study Time" : "Break Time";

            remainingSeconds--;

            if (remainingSeconds < 0) {
                clearInterval(timerInterval);
                switchMode();
            }
        }
    }, 1000);
}

// Switch between Study & Break
function switchMode() {
    if (currentMode === "study") {
        currentMode = "break";
        remainingSeconds = breakSeconds;
        runCountdown();
    } else {
        if (currentSession < totalSessions) {
            currentSession++;
            document.getElementById("session").innerText =
                "Session " + currentSession;
            currentMode = "study";
            remainingSeconds = studySeconds;
            runCountdown();
        } else {
            document.getElementById("status").innerText =
                "All Sessions Completed 🎉";
            document.getElementById("timer").innerText = "00:00";
            saveSession();
        }
    }
}

// Pause / Resume
function togglePause() {
    isPaused = !isPaused;
    document.getElementById("pauseBtn").innerText =
        isPaused ? "Resume" : "Pause";
}

// Reset
function resetTimer() {
    clearInterval(timerInterval);
    document.getElementById("timer").innerText = "00:00";
    document.getElementById("status").innerText = "";
    document.getElementById("session").innerText = "";
    isPaused = false;
}

// Save Session to Backend
function saveSession() {
    const sessionData = {
        studyTime: studySeconds / 60,
        breakTime: breakSeconds / 60,
        sessions: totalSessions,
        date: new Date().toLocaleString()
    };

    fetch("/save-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sessionData)
    })
    .then(res => res.json())
    .then(data => {
        console.log("Session saved:", data);
    })
    .catch(err => {
        console.error("Error saving session:", err);
    });
}