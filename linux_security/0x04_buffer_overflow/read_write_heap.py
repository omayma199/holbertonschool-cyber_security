#!/usr/bin/python3
"""heap exploitation"""
import os
import sys
import subprocess
def exploit_heap(pid, search_str, replace_str):
    search_str = search_str.encode('utf-8')
    replace_str = replace_str.encode('utf-8')
    info = subprocess.check_output(
        f"cat /proc/{pid}/maps | grep 'heap'", shell=True)
    info = info.decode('utf-8')
    info = info.split(' ')
    addresses = info[0]
    addresses_split = addresses.split('-')
    start_addr = addresses_split[0]
    start_addr = int(start_addr, 16)
    end_addr = addresses_split[1]
    end_addr = int(end_addr, 16)
    heap_start = start_addr
    heap_end = end_addr
    heap_size = heap_end - heap_start
    mem_path = f"/proc/{pid}/mem"
    mem_file = os.open(mem_path, os.O_RDWR)
    try:
        os.lseek(mem_file, heap_start, os.SEEK_SET)
        heap_data = os.read(mem_file, heap_size)
        offset = heap_data.find(search_str)
        if offset == -1:
            print(f"String {search_str} not found in the heap.")
        else:
            abs_address = heap_start + offset
            os.lseek(mem_file, abs_address, os.SEEK_SET)
            os.write(mem_file, b'\x00' * len(search_str))
            os.lseek(mem_file, abs_address, os.SEEK_SET)
            os.write(mem_file, replace_str)
            print(
                f"Wrote '{replace_str.decode()}' at {hex(abs_address)}")
    finally:
        os.close(mem_file)
if __name__ == "__main__":
    if len(sys.argv) != 4:
        print(f'Error: usage pid, string_to_find, replacing_string')
        sys.exit(1)
    pid = int(sys.argv[1])
    search_str = sys.argv[2]
    replace_str = sys.argv[3]
    exploit_heap(pid, search_str, replace_str)