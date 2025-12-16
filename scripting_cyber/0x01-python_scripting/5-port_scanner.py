#!/usr/bin/env python3
"""
Simple TCP port checker
"""

import socket


def check_port(host, port):
    """
    Check if a specific TCP port is open on a host.

    Args:
        host (str): Target hostname or IP address
        port (int): Target port number

    Returns:
        bool: True if port is open, False otherwise
    """
    try:
        # Create TCP socket
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

        # Set timeout (important to avoid hanging)
        sock.settimeout(3)

        # connect_ex returns 0 if connection succeeds
        result = sock.connect_ex((host, port))

        sock.close()

        return result == 0

    except (socket.gaierror, socket.timeout, socket.error):
        return False
