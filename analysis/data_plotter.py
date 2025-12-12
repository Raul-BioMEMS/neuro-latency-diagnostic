import pandas as pd
import matplotlib.pyplot as plt

"""
SCRIPT: Biomarker Data Analyzer
-------------------------------
PURPOSE: Reads raw reaction time logs (CSV), calculates diagnostic statistics,
and visualizes variability (Sigma) to detect cognitive fatigue.

AUTHOR: [Your Name]
DATE: 2025-12-12
"""

# --- STEP 1: LOAD DATA ---
# ENGINEERING NOTE: We use Pandas for robust data handling.
# Ensure the CSV filename matches exactly what you downloaded.
filename = "Biomarker_Data_2025-12-12.csv" 
df = pd.read_csv(filename)

# --- STEP 2: STATISTICAL ANALYSIS ---
# Calculate Mean (Average Speed)
mean_rt = df["Reaction Time (ms)"].mean()

# Calculate Standard Deviation (Variability)
# WHY THIS MATTERS: High variability (>50ms) is a stronger indicator 
# of neurological dysfunction than simple slow reaction time.
std_rt = df["Reaction Time (ms)"].std()

print(f"--- DIAGNOSTIC REPORT ---")
print(f"Mean Reaction Time: {mean_rt:.2f} ms")
print(f"Variability (Sigma): {std_rt:.2f} ms")

# --- STEP 3: VISUALIZATION ---
# Create a plot to visually inspect the "stability" of attention.
plt.figure(figsize=(10, 6))

# Plot the individual trials
plt.plot(df["Trial Number"], df["Reaction Time (ms)"], 
         marker='o', linestyle='-', color='#007bff', label='Raw Response')

# Add a reference line for the average
plt.axhline(y=mean_rt, color='r', linestyle='--', label=f'Mean ({mean_rt:.0f} ms)')

# FORMATTING
plt.title(f"Cognitive Stability Analysis (Sigma: {std_rt:.2f} ms)")
plt.xlabel("Trial Number")
plt.ylabel("Reaction Time (ms)")
plt.grid(True, alpha=0.3)
plt.legend()

# SAVE OUTPUT
plt.savefig("analysis_chart.png")
print("Chart saved as 'analysis_chart.png'")
