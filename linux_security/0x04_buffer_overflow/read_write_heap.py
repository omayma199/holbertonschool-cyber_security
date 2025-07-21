#!/usr/bin/python3
import sys

def find_heap(pid):
    with open(f'/proc/{pid}/maps', 'r') as maps_file:
        for line in maps_file:
            if '[heap]' in line:
                start_str, end_str = line.split()[0].split('-')
                return int(start_str, 16), int(end_str, 16)
    print("Heap not found")
    sys.exit(1)

def get_heap(pid, start, end):
    with open(f'/proc/{pid}/mem', 'rb') as mem_file:
        mem_file.seek(start)
        return mem_file.read(end - start)

def write_heap(pid, address, data):
    with open(f'/proc/{pid}/mem', 'rb+') as mem_file:
        mem_file.seek(address)
        mem_file.write(data)

def main():
    if len(sys.argv) != 4:
        print("Usage: read_write_heap.py <pid> <search_str> <replace_str>")
        sys.exit(1)

    pid = sys.argv[1]
    search = sys.argv[2].encode()
    replace = sys.argv[3].encode().ljust(len(search), b'\x00')

    start, end = find_heap(pid)
    heap = get_heap(pid, start, end)

    offset = heap.find(search)
    if offset == -1:
        print("String not found")
        sys.exit(1)

    write_heap(pid, start + offset, replace)
    print("SUCCESS!")

if __name__ == "__main__":
    main()
