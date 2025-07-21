#!/usr/bin/python3
"""
read_write_heap.py

This script searches for a string in the heap of a running process and
replaces it with another string of the same length or less.

Usage:
    ./read_write_heap.py <pid> <search_string> <replace_string>

Note:
    - You must have permission to read/write the process memory (run as root).
    - Replacement string must not be longer than the original.
"""

import sys
import os


def find_heap(pid):
    """
    Parse /proc/<pid>/maps to locate the heap segment.

    Args:
        pid (str): Process ID

    Returns:
        tuple: (start_address, end_address) of the heap as integers
    """
    with open(f'/proc/{pid}/maps', 'r') as maps_file:
        for map in maps_file:
            if '[heap]' not in map:
                continue

            parts = map.split()
            start_str, end_str = parts[0].split('-')
            start = int(start_str, 16)
            end = int(end_str, 16)

            # Removed success/info print here
            # print(f'[*] Found heap at {hex(start)} - {hex(end)}')
            return start, end

    print('[!] Heap not found')
    sys.exit(1)


def get_heap(pid, start, end):
    """
    Read the heap segment from /proc/<pid>/mem.

    Args:
        pid (str): Process ID
        start (int): Start address of the heap
        end (int): End address of the heap

    Returns:
        bytes: Heap content
    """
    with open(f'/proc/{pid}/mem', 'rb') as heap:
        heap.seek(start)
        return heap.read(end - start)


def write_heap(pid, address, data):
    """
    Write data to a specific address in the process heap.

    Args:
        pid (str): Process ID
        address (int): Memory address to write to
        data (bytes): Data to write
    """
    with open(f'/proc/{pid}/mem', 'rb+') as heap:
        heap.seek(address)
        heap.write(data)


def main():
    """
    Main function: Parse args, find heap, locate and replace string in memory.
    """
    if len(sys.argv) != 4:
        print("Usage: read_write_heap.py <pid> <search_str> <replace_str>")
        sys.exit(1)

    pid = sys.argv[1]
    search = sys.argv[2].encode()
    replace = sys.argv[3].encode().ljust(len(search), b'\x00')

    start, end = find_heap(pid)
    mem = get_heap(pid, start, end)

    index = mem.find(search)
    if index == -1:
        print(f"[!] String '{sys.argv[2]}' not found in heap.")
        sys.exit(1)

    search_addr = start + index

    # Removed success/info print here
    # print(f"[+] Found '{sys.argv[2]}' at {hex(search_addr)}")

    write_heap(pid, search_addr, replace)


if __name__ == "__main__":
    main()
