import csv
import statistics

"""
SCRIPT: Data Verification
AUTHOR: Raul Montoya Cardenas
"""

# Configuration
FILENAME = 'sample_data.csv'

def analyze_latency():
    latencies = []
    
    try:
        with open(FILENAME, 'r') as f:
            reader = csv.DictReader(f)
            print(f"--- Analyzing {FILENAME} ---")
            
            for row in reader:
                # FIXED: Changed 'Latency(ms)' to matches your CSV header
                val = float(row['Reaction Time (ms)'])
                latencies.append(val)
                print(f"Trial {row['Trial']}: {val} ms")
                
        # Calculate Stats
        avg = statistics.mean(latencies)
        sigma = statistics.stdev(latencies)
        
        print("\n--- RESULTS ---")
        print(f"Trials: {len(latencies)}")
        print(f"Mean:   {avg:.2f} ms")
        print(f"Sigma:  {sigma:.2f} ms (Standard Deviation)")
        
    except FileNotFoundError:
        print(f"Error: {FILENAME} not found.")
    expect KeyError as e:
        print(f"Error: Column not found in CSV. Cheack headers; {e}"

if __name__ == "__main__":
    analyze_latency()
