import csv
import statistics

# Configuration
FILENAME = 'sample_data.csv'

def analyze_latency():
    latencies = []
    
    try:
        with open(FILENAME, 'r') as f:
            reader = csv.DictReader(f)
            print(f"--- Analyzing {FILENAME} ---")
            
            for row in reader:
                val = float(row['Latency(ms)'])
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

if __name__ == "__main__":
    analyze_latency()
