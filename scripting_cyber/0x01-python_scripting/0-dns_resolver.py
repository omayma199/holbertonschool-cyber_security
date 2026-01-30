#!/usr/bin/env python3
"""
Resolves a domain name to its IPv4 address using the socket library
"""

import socket


def resolve_domain_to_ipv4(domain_name):
    """
    Resolve a domain name to an IPv4 address.

    Args:
        domain_name (str): Domain name to resolve

    Returns:
        str: IPv4 address if resolved successfully
        None: If the domain cannot be resolved
        str: Error message for any other exception
    """
    try:
        return socket.gethostbyname(domain_name)

    except socket.gaierror:
        # DNS resolution failed (domain does not exist or no A record)
        return None

    except Exception as e:
        # Any other unexpected error
        return str(e)