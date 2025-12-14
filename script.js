/**
 * Project: Neurological Response Latency Tester
 * Author: Raul Montoya Cardenas
 * Purpose: A web-based tool to measure visual-motor reaction time 
 * for potential use in BCI calibration baselines.
 * Note: Uses window.performance.now() for sub-millisecond precision
 * rather than Date.now() to reduce temporal jitter.
 */

let startTime = 0;
let endTime = 0;
let isTestRunning = false;

// Function to start the test
function startReactionTest() {
    if (isTestRunning) return; // Prevent double clicks
    
    // Reset display
    const box = document.getElementById("status-box");
    box.style.backgroundColor = "red";
    box.innerText = "Wait for Green...";
    
    // Random delay between 2 to 5 seconds
    let randomDelay = Math.floor(Math.random() * 3000) + 2000;
    
    setTimeout(() => {
        // ENGINEERING NOTE:
        // Standard JavaScript 'Date.now()' can have a jitter of 2-15ms.
        // I am using 'performance.now()' here to capture high-resolution timestamps
        // which is critical for accurate P300 signal calibration.
        startTime = window.performance.now();
        
        // Change visual stimulus
        box.style.backgroundColor = "#00ff00"; // Green
        box.innerText = "CLICK NOW!";
        isTestRunning = true;
    }, randomDelay);
}

// Function to end the test (User Click)
function recordReaction() {
    if (!isTestRunning) return; // Ignore early clicks
    
    endTime = window.performance.now();
    let reactionTime = (endTime - startTime).toFixed(2); // Keep 2 decimals
    
    document.getElementById("result-display").innerText = "Latency: " + reactionTime + " ms";
    isTestRunning = false;
}
