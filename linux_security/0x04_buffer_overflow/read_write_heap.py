#!/usr/bin/python3
"""
read_write_heap.py

Finds and replaces a string in the heap of a running process.
Usage: ./read_write_heap.py <pid> <search_string> <replace_string>
"""

import sys


def usage():
    print("Usage: read_write_heap.py pid search_string replace_string")
    sys.exit(1)


def find_heap(pid):
    """Return (start, end) of heap segment."""
    try:
        with open(f"/proc/{pid}/maps", 'r') as maps_file:
            for line in maps_file:
                if '[heap]' in line and 'rw-p' in line:
                    parts = line.split()
                    start_str, end_str = parts[0].split('-')
                    return int(start_str, 16), int(end_str, 16)
    except Exception:
        pass
    sys.exit(1)


def main():
    if len(sys.argv) != 4:
        usage()

    pid = sys.argv[1]
    search_str = sys.argv[2].encode()
    replace_str = sys.argv[3].encode()

    if len(replace_str) > len(search_str):
        sys.exit(1)

    try:
        start, end = find_heap(pid)

        with open(f"/proc/{pid}/mem", 'r+b') as mem_file:
            mem_file.seek(start)
            heap_data = mem_file.read(end - start)
            index = heap_data.find(search_str)

            if index == -1:
                sys.exit(1)

            mem_file.seek(start + index)
            mem_file.write(replace_str.ljust(len(search_str), b'\x00'))
            print("SUCCESS!")
    except Exception:
        sys.exit(1)


if __name__ == "__main__":
    main()
