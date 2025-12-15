# Neurological Response Latency Diagnostic Tool (v1.0)

## Overview
A high-precision, browser-based instrument designed to measure visual-motor reaction latency. Unlike standard web timers, this tool mitigates the temporal jitter associated with the `Date.now()` object by utilizing the High Resolution Time API (`window.performance.now()`).

## Key Engineering Features
* **Sub-Millisecond Precision:** capturing timestamps with microsecond resolution to ensure diagnostic-grade accuracy.
* **Jitter Mitigation:** Bypasses standard clock skew common in JavaScript execution loops.
* **Statistical Analysis:** Automatically calculates Mean and Standard Deviation ($\sigma$) to quantify cognitive variability (a key biomarker for neurological fatigue).
* **Data Portability:** Client-side CSV export for seamless integration with MATLAB and Python for offline analysis.

## Usage
1.  Initialize the test sequence.
2.  Respond to the visual stimulus (Green Indicator).
3.  Upon completion of 5 trials, statistical data is displayed and available for export.

## Technical Stack
* **Core:** Vanilla JavaScript (ES6+)
* **Timing:** `Performance.now()` API
* **Data Formatting:** CSV serialization via Blob objects

## Data Validation
Included in this repository:
* `sample_data.csv`: A sample dataset captured from a live session.
* `verify_data.py`: A Python script to parse the CSV and verify the statistical calculations (Mean/Sigma) externally.
  
---
*Engineered by Raul Montoya Cardenas | Electrical Engineering Undergrad | Texas State University*
