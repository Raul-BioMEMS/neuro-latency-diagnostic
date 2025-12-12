# Biomarker Reaction Timer: A Diagnostic Instrumentation Prototype

### Project Overview
This project is a web-based diagnostic instrument designed to measure **Simple Reaction Time (SRT)** with high temporal precision. Unlike standard reaction games, this tool functions as a psychophysical testing protocol intended for preliminary research into cognitive fatigue and neurological biomarkers.

The system was engineered to mitigate "rhythm prediction" by introducing stochastic (randomized) inter-stimulus intervals, ensuring that the recorded latency reflects true neurological processing speed rather than anticipation.

### Engineering & Scientific Goals
* **Instrumentation:** Develop a digital sensor to capture biological signals (response latency) via standard input devices.
* **Data Integrity:** Implement a local data pipeline that exports raw logs to `.csv` format for external analysis (MATLAB/Python).
* **Cognitive Biomarkers:** Calculate real-time **Standard Deviation ($\sigma$)** to assess attention stability, a key metric in Brain-Computer Interface (BCI) calibration and concussion recovery tracking.

### Technical Architecture
* **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)
* **Timing Mechanism:** `performance.now()` API for microsecond-precision timestamping (replacing the inaccurate `Date` object).
* **Data Handling:** Client-side array manipulation for statistical computation (Mean, Variance, SD).
* **Export Protocol:** MIME-type generated CSV blob for secure local download.

### Usage Protocol
1.  **Initialization:** Launch the `index.html` file in a modern browser (Chrome/Safari recommended for timing accuracy).
2.  **Stimulus:** The subject waits for the visual indicator to shift from **Gray (Wait)** to **Green (Go)**.
3.  **Response:** Subject depresses the input mechanism (mouse/touchscreen) immediately upon stimulus onset.
4.  **Analysis:** Upon completion of 5 trials, the system generates a diagnostic report and enables the "Download Data" feature.

### Data Analysis (Python)
A supplementary Python script is provided in the `analysis/` directory. This script utilizes **Pandas** and **Matplotlib** to:
1.  Ingest the raw `.csv` output.
2.  Visualize trial-by-trial variability.
3.  Flag trials that deviate significantly from the subject's baseline (outliers).

### Future Roadmap (Micro & Nano Devices)
This software prototype serves as the control logic for a future hardware implementation. The next phase involves replacing the mouse input with a **custom EEG trigger** using a microcontroller (Arduino/ESP32) to measure the latency between visual stimulus and motor cortex activation.

---
*Developed by Raul Cardenas Montoya*
*Pre-Engineering (Electrical Engineering: Micro & Nano Devices) | Texas State University*
