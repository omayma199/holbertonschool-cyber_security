#!/usr/bin/python3
import os
import sys
import re

def usage():
    print("Usage: read_write_heap.py pid search_string replace_string")
    sys.exit(1)

def main():
    if len(sys.argv) != 4:
        usage()

    try:
        pid = int(sys.argv[1])
    except ValueError:
        print("Error: PID must be an integer.")
        usage()

    search_string = sys.argv[2].encode('ascii')
    replace_string = sys.argv[3].encode('ascii')

    if len(search_string) != len(replace_string):
        print("Error: search_string and replace_string must have the same length.")
        sys.exit(1)

    maps_path = f"/proc/{pid}/maps"
    mem_path = f"/proc/{pid}/mem"

    if not os.path.exists(maps_path) or not os.path.exists(mem_path):
        print(f"Error: Process with PID {pid} does not exist or /proc access is restricted.")
        sys.exit(1)

    try:
        with open(maps_path, 'r') as maps_file:
            for line in maps_file:
                if "[heap]" in line:
                    fields = line.split()
                    addr_range = fields[0]
                    permissions = fields[1]

                    if 'rw' not in permissions:
                        print("Error: Heap region is not writable.")
                        sys.exit(1)

                    start, end = (int(x, 16) for x in addr_range.split('-'))
                    break
            else:
                print("Error: Heap region not found.")
                sys.exit(1)

        with open(mem_path, 'rb+') as mem_file:
            mem_file.seek(start)
            heap = mem_file.read(end - start)

            offset = heap.find(search_string)
            if offset == -1:
                print(f"String '{search_string.decode('ascii')}' not found in heap.")
                sys.exit(1)

            mem_file.seek(start + offset)
            mem_file.write(replace_string)
            print(f"String '{search_string.decode('ascii')}' replaced with '{replace_string.decode('ascii')}' in heap.")

    except PermissionError:
        print("Error: Permission denied. Run the script as root.")
        sys.exit(1)
    except FileNotFoundError:
        print("Error: Memory or maps file not found. Ensure the process is running.")
        sys.exit(1)

if __name__ == "__main__":
    main()
