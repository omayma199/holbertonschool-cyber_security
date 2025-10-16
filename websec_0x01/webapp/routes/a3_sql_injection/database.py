#!/usr/bin/env python3
''' Proudly Written by Yosri '''
import sqlite3
import os
from os import getenv, system
from time import time, sleep


database_path = 'routes/a3_sql_injection/mydatabase.db'
system_path = '/run/flask/routes/a3_sql_injection/init.sh'


if not os.path.exists(system_path):
    print('System path not found')
    print(system_path)




def init_database():
    print('__init__ database')
    system(system_path)
    return True





def fake_version():
    return f"SQLite - FLAG: {getenv('FLAG_5')}"




def do_sleep(count):
    sleep(int(count))
    return True


def get_cursor():
    conn = sqlite3.connect(database_path)
    conn.create_function("version", 0, fake_version)
    conn.create_function("sleep", 1, do_sleep, deterministic=True)
    return conn.cursor()


def list_all_orders():
    cursor = get_cursor()
    cursor.execute("SELECT * FROM Orders")
    return cursor.fetchall()


def filter_orders_by_status(status):
    cursor = get_cursor()
    start = time()
    custome = False
    try:
        if 'sqlite_version()' in status:
            custome = True
        resp = cursor.execute(
            f"SELECT * FROM Orders WHERE status LIKE '{status}'").fetchall()
        took = time() - start
        if took > 5:
            return [[1, getenv('FLAG_7'), "Paid", "TIMOUT FLAG", "FLAG@web0x01.hbtn"]]            
        res =  [row for row in resp]
        if custome:
            data = list(res[-1])
            data[0] = "Version :" +  data[0] + " " + fake_version()
            res[-1] = tuple(data)
            return res
        return res

    except Exception as e:
        
        print(e)
        
        return []


def filter_orders_by_name(name):
    cursor = get_cursor()
    name = f'%{name}%'
    cursor.execute(
        "SELECT * FROM Orders WHERE customer_name LIKE ?", (name,))
    return [row for row in cursor.fetchall()]


def list_all_customer_names():
    cursor = get_cursor()
    cursor.execute("SELECT DISTINCT customer_name FROM Orders")
    return [row[0] for row in cursor.fetchall()]


def list_all_hidden():
    cursor = get_cursor()
    return [
        row for row in cursor.execute("SELECT * FROM not_me").fetchall()
    ] + [
        row for row in cursor.execute("SELECT * FROM Users").fetchall()
    ]


def create_user(username, password, name='John Doe'):
    conn = sqlite3.connect(database_path)
    cursor = conn.cursor()
    try:
        cursor.execute(
            "INSERT INTO Users (username, password, name) VALUES (?, ?, ?)", (username, password, name))
        conn.commit()
        conn.close()
        return {
            'success': True,
            'message': 'User created successfully'
        }
    except Exception as E:
        print(E)
        conn.close()
        return {
            'success': False,
            'message': 'User already exists'
        }


def login_user(username, password, **kwargs):
    cursor = get_cursor()
    return cursor.execute("SELECT * FROM Users WHERE username = ? AND password = ?", (username, password)).fetchone()


if __name__ == '__main__':
    database_path = 'mydatabase.db'
    print("All orders:")
    for order in list_all_orders():
        print(order)

    print("\nOrders with status 'Paid':")
    for order in filter_orders_by_status('Paid'):
        print(order)

    print("\nOrders with customer name like 'Yosri':")
    for order in filter_orders_by_name('yosri'):
        print(order)

    print("\nAll customer names:")
    for name in list_all_customer_names():
        print(name)

    print("\nListing all hidden:")
    for hidden in list_all_hidden():
        print(hidden)
    print("\nListing VERSION()")
    cursor = get_cursor()
    print(cursor.execute(
        "SELECT * FROM Orders WHERE status Like 'Pending' OR sleep(2)").fetchall())
