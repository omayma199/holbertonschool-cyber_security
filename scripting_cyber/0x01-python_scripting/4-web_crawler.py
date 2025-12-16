#!/usr/bin/env python3
"""
Recursive web crawler that discovers internal links up to a given depth.
"""

import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse


def crawl_website(start_url, max_depth=2, visited=None):
    """
    Recursively crawl a website starting from start_url.

    Args:
        start_url (str): The starting URL
        max_depth (int): Maximum crawl depth
        visited (set): Set of already visited URLs

    Returns:
        set: URLs successfully visited (same domain only)
    """

    # Initialize visited set on first call
    if visited is None:
        visited = set()

    # Depth limit reached
    if max_depth < 0:
        return visited

    # Parse starting URL
    try:
        parsed_start = urlparse(start_url)
        base_domain = parsed_start.netloc
    except Exception:
        return set()

    # Avoid revisiting URLs
    if start_url in visited:
        return visited

    try:
        print(f"Crawling: {start_url}")
        response = requests.get(start_url, timeout=5)
        response.raise_for_status()
    except (requests.exceptions.RequestException, ValueError):
        # Unreachable or invalid URL
        return visited

    visited.add(start_url)

    # Parse HTML
    soup = BeautifulSoup(response.text, "html.parser")

    # Extract links
    for link in soup.find_all("a", href=True):
        href = link.get("href")
        absolute_url = urljoin(start_url, href)
        parsed_url = urlparse(absolute_url)

        # Crawl only same-domain links
        if parsed_url.netloc == base_domain:
            if absolute_url not in visited:
                crawl_website(
                    absolute_url,
                    max_depth - 1,
                    visited
                )

    return visited
