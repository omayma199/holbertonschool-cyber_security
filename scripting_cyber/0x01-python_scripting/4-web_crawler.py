#!/usr/bin/env python3

import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

def crawl_website(start_url, max_depth=2):
    visited = set()
    to_visit = [(start_url, 0)]

    try:
        base_domain = urlparse(start_url).netloc
    except Exception:
        return set()

    while to_visit:
        current_url, depth = to_visit.pop(0)

        if depth > max_depth:
            continue

        if current_url in visited:
            continue

        print(f"Crawling: {current_url}")
        visited.add(current_url)

        try:
            response = requests.get(current_url, timeout=5)
            response.raise_for_status()
        except Exception:
            continue

        soup = BeautifulSoup(response.text, "html.parser")

        for link in soup.find_all("a", href=True):
            absolute_url = urljoin(current_url, link["href"])
            parsed = urlparse(absolute_url)

            if parsed.netloc == base_domain:
                if absolute_url not in visited:
                    to_visit.append((absolute_url, depth + 1))

    return visited
