#!/bin/bash
# Proudly written by Yosri
rm routes/a3_sql_injection/mydatabase.db
sqlite3 routes/a3_sql_injection/mydatabase.db <<EOF

-- Create the 'Order' table
CREATE TABLE Orders (
    id INTEGER PRIMARY KEY,
    date TEXT,
    status TEXT,
    customer_name TEXT,
    customer_email TEXT
);

-- Insert 24 records into the 'Order' table
BEGIN TRANSACTION;
$(for i in {1..24}; do
    NUM=$((RANDOM % 4))
    echo "INSERT INTO Orders (id, date, status, customer_name, customer_email)
          VALUES (
            $i,
            CASE $(((RANDOM + RANDOM * RANDOM) % 4)) WHEN 0 THEN 'Jan $i, 2023' WHEN 1 THEN 'Feb $i, 2023' WHEN 2 THEN 'Mars $i, 2023' ELSE 'April $i, 2023' END, 
            CASE $(((RANDOM + RANDOM * RANDOM) % 4)) WHEN 0 THEN 'Paid' WHEN 1 THEN 'Pending' WHEN 2 THEN 'Refunded' ELSE 'Cancelled' END,
            CASE $NUM WHEN 0 THEN 'Yosri' WHEN 1 THEN 'Abdou' WHEN 2 THEN 'Maroua' ELSE 'Ismail' END,
            CASE $NUM WHEN 0 THEN 'Yosri@web0x01.hbtn' WHEN 1 THEN 'Abdou@web0x01.hbtn' WHEN 2 THEN 'Maroua@web0x01.hbtn' ELSE 'Ismail@web0x01.hbtn' END);"
done)
END TRANSACTION;

-- Create 10 random tables
$(for i in {1..10}; do
    echo "CREATE TABLE RandomTable$i (id INTEGER PRIMARY KEY, value TEXT);"
    echo "INSERT INTO RandomTable$i (id, value) VALUES (1, 'Sample Data$i');"
done)

-- Create and populate the 'not_me' table
CREATE TABLE not_me (
    id INTEGER,
    value TEXT,
    name TEXT
);

INSERT INTO not_me (id, value, name) VALUES (0, '$FLAG_6', 'FLAG');

-- Create and populate the 'Users' table
CREATE TABLE Users (
    id INTEGER PRIMARY KEY,
    name VARCHAR(120),
    username VARCHAR(120) UNIQUE,
    password TEXT
);

EOF

echo "Database created and data populated successfully."