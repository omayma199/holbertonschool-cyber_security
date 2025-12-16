import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse


def crawl_website(start_url, max_depth=2):
    """
    Recursively crawl a website and discover internal links up to a specified depth.
    
    Args:
        start_url (str): The URL to start crawling from
        max_depth (int): Maximum depth to crawl (default: 2)
    
    Returns:
        set: A set of URLs that were successfully visited from the same domain
    """
    # Initialize the set to track visited URLs
    visited = set()
    
    # Extract the domain from the starting URL
    try:
        start_domain = urlparse(start_url).netloc
    except Exception:
        return set()
    
    # Helper function for recursive crawling
    def crawl_recursive(url, depth, visited_urls):
        # Stop if max depth reached or URL already visited
        if depth > max_depth or url in visited_urls:
            return
        
        # Try to fetch the page
        try:
            # Set a timeout to prevent hanging
            response = requests.get(url, timeout=5)
            response.raise_for_status()
            
            # Add the URL to visited set
            visited_urls.add(url)
            print(f"Crawled (depth {depth}): {url}")
            
            # Parse the HTML content
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Extract all links from the page
            for link in soup.find_all('a', href=True):
                # Convert relative URLs to absolute URLs
                absolute_url = urljoin(url, link['href'])
                
                # Parse the URL to extract domain
                try:
                    parsed_url = urlparse(absolute_url)
                    link_domain = parsed_url.netloc
                    
                    # Remove fragments (e.g., #section)
                    clean_url = f"{parsed_url.scheme}://{parsed_url.netloc}{parsed_url.path}"
                    if parsed_url.query:
                        clean_url += f"?{parsed_url.query}"
                    
                    # Only crawl links from the same domain
                    if link_domain == start_domain and clean_url not in visited_urls:
                        # Recursively crawl the link
                        crawl_recursive(clean_url, depth + 1, visited_urls)
                        
                except Exception as e:
                    # Skip invalid URLs
                    continue
                    
        except requests.exceptions.ConnectionError:
            print(f"Connection error for: {url}")
        except requests.exceptions.Timeout:
            print(f"Timeout error for: {url}")
        except requests.exceptions.RequestException as e:
            print(f"Request error for {url}: {e}")
        except Exception as e:
            print(f"Unexpected error for {url}: {e}")
    
    # Start the recursive crawl
    crawl_recursive(start_url, 0, visited)
    
    return visited


# Example usage
if __name__ == "__main__":
    # Test with a simple website
    start_url = "https://example.com"
    max_depth = 2
    
    print(f"Starting crawl from: {start_url}")
    print(f"Maximum depth: {max_depth}\n")
    
    discovered_urls = crawl_website(start_url, max_depth)
    
    print(f"\n{'='*60}")
    print(f"Crawl complete! Discovered {len(discovered_urls)} URLs:")
    print(f"{'='*60}")
    for url in sorted(discovered_urls):
        print(url)