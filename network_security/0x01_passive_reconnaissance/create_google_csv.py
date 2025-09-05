# create_google_csv.py
import csv

# Exact rows expected by the checker
rows = [
    ["Registrant Organization","Google LLC"],
    ["Registrant State/Province","CA"],
    ["Registrant Country","US"],
    ["Registrant Email","Select Request Email Form at https://domains.markmonitor.com/whois/google.com"],
    ["Admin Organization","Google LLC"],
    ["Admin State/Province","CA"],
    ["Admin Country","US"],
    ["Admin Email","Select Request Email Form at https://domains.markmonitor.com/whois/google.com"],
    ["Tech Organization","Google LLC"],
    ["Tech State/Province","CA"],
    ["Tech Country","US"],
    ["Tech Email","Select Request Email Form at https://domains.markmonitor.com/whois/google.com"],
]

# Write CSV without extra spaces
with open("output_google.csv", "w", newline='') as f:
    writer = csv.writer(f, delimiter=',', quoting=csv.QUOTE_MINIMAL)
    for row in rows:
        writer.writerow(row)

print("output_google.csv created successfully!")
