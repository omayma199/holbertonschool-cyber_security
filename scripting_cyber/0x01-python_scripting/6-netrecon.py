#!/usr/bin/env python3
"""
Basic network reconnaissance tool:
- DNS reconnaissance
- Web reconnaissance
- Port scanning
"""

import socket
import requests
from bs4 import BeautifulSoup

try:
    import dns.resolver
except ImportError:
    dns = None


def dns_recon(domain):
    """Perform DNS reconnaissance on a domain."""
    try:
        ip_address = socket.gethostbyname(domain)
        print(f"IP Address: {ip_address}")
    except socket.gaierror:
        print("Failed to resolve domain to IP address")
        return

    print("\nMX Records:")
    if dns is None:
        print("  dnspython module not available")
        return

    try:
        answers = dns.resolver.resolve(domain, "MX")
        for rdata in answers:
            print(f"  {rdata.preference} {rdata.exchange}")
    except Exception:
        print("  No MX records found")


def web_recon(domain):
    """Perform web reconnaissance on a domain."""
    url = f"http://{domain}"

    try:
        response = requests.get(url, timeout=5)
    except requests.RequestException:
        print("Failed to connect to web server")
        return

    print(f"\nStatus Code: {response.status_code}\n")

    print("Important Headers:")
    for header in ["Server", "Content-Type"]:
        if header in response.headers:
            print(f"  {header}: {response.headers[header]}")

    try:
        soup = BeautifulSoup(response.text, "html.parser")
        links = soup.find_all("a")
        print(f"\nTotal Links Found: {len(links)}")
    except Exception:
        print("\nFailed to parse HTML content")


def port_scan(domain):
    """Check common TCP ports on a domain."""
    ports = [80, 443]

    print(f"\nScanning common ports on {domain}...")
    print("Open ports:")

    for port in ports:
        try:
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.settimeout(3)
            result = sock.connect_ex((domain, port))
            sock.close()

            if result == 0:
                print(f"  Port {port}: OPEN")
        except Exception:
            continue
