/**
 * Project: Neurological Response Latency Tester
 * Author: Raul Montoya Cardenas
 * Purpose: A web-based tool to measure visual-motor reaction time 
 * for potential use in BCI calibration baselines.
 * * ENGINEERING NOTES:
 * 1. Uses window.performance.now() for sub-millisecond precision to reduce temporal jitter.
 * 2. Calculates Standard Deviation (σ) to detect cognitive fatigue/variability.
 * 3. Exports raw data to CSV for external analysis (MATLAB/Python).
 */

// --- CONFIGURATION & STATE ---
const NUM_TRIALS = 5;
let currentTrial = 0;
let reactionTimes = [];
let startTime = 0;
let isTestRunning = false;
let timeoutId = null;

// DOM Elements
const box = document.getElementById("status-box");
const resultDisplay = document.getElementById("result-display");

/**
 * Function: startReactionTest
 * Initializes the test sequence and resets all data arrays.
 */
function startReactionTest() {
    if (isTestRunning) return; // Prevent double clicks
    
    // Reset State
    currentTrial = 0;
    reactionTimes = [];
    resultDisplay.innerText = "Latency: -- ms";
    
    // Visual Reset
    box.style.backgroundColor = "grey";
    box.innerText = "Wait for Green...";
    
    isTestRunning = true;
    runTrial();
}

/**
 * Function: runTrial
 * Handles the variable delay (ISI) to prevent user anticipation rhythms.
 */
function runTrial() {
    if (currentTrial < NUM_TRIALS) {
        currentTrial++;
        box.style.backgroundColor = "grey"; // Reset to Neutral
        box.innerText = `Trial ${currentTrial} of ${NUM_TRIALS}...`;

        // ENGINEERING NOTE: Variable Inter-Stimulus Interval (ISI)
        // Random delay (2-5s) prevents the "rhythm effect" in the brain.
        const delay = Math.floor(Math.random() * 3000) + 2000;
        
        timeoutId = setTimeout(() => {
            // Stimulus Presentation
            box.style.backgroundColor = "#00ff00"; // Green
            box.innerText = "CLICK!";
            
            // Capture High-Res Timestamp (Jitter-Free)
            startTime = window.performance.now();
        }, delay);
        
    } else {
        analyzeData();
    }
}

/**
 * Function: recordReaction
 * Captures the user input timestamp.
 */
function recordReaction() {
    // Ignore clicks if the box isn't green yet
    if (box.style.backgroundColor !== "rgb(0, 255, 0)") return;
    
    const endTime = window.performance.now();
    const reactionTime = endTime - startTime;
    
    reactionTimes.push(reactionTime);
    resultDisplay.innerText = `Latest: ${reactionTime.toFixed(2)} ms`;
    
    // Immediate next trial
    setTimeout(runTrial, 500); 
}

/**
 * Function: analyzeData
 * Performs statistical analysis (Mean & Standard Deviation).
 * High StDev indicates cognitive instability.
 */
function analyzeData() {
    isTestRunning = false;
    box.innerText = "TEST COMPLETE";
    box.style.backgroundColor = "#333";
    
    // Calculate Mean
    const mean = reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length;
    
    // Calculate Variance & Deviation
    const variance = reactionTimes.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / reactionTimes.length;
    const stdev = Math.sqrt(variance);
    
    resultDisplay.innerText = `Mean: ${mean.toFixed(1)}ms | σ: ${stdev.toFixed(1)}ms`;
    
    // Auto-trigger CSV Download logic could go here
    exportToCSV(); 
}

/**
 * Function: exportToCSV
 * Formats data for research use.
 */
function exportToCSV() {
    let csvContent = "data:text/csv;charset=utf-8,Trial,Latency(ms)\n";
    reactionTimes.forEach((time, index) => {
        csvContent += `${index + 1},${time.toFixed(4)}\n`;
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "bio_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
