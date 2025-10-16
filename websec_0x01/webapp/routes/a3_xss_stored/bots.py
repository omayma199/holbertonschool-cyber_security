#!/usr/bin/env python3
''' Proudly Written by Yosri '''
from requests_html import HTMLSession
from time import sleep
from sys import argv
from subprocess import Popen


def visit_user(url, username, password, profile_id):
    return Popen(f'python3 {__file__} {url} {username} {password} {profile_id}'.split(' '))


def run_visit_user(url, username, password, profile_id):
    s = HTMLSession()
    
    # Check if the initial page and login page are available
    try:
        if (s.get(f'{url}a3/xss_stored').status_code != 200 or s.get(f'{url}a3/xss_stored/login').status_code != 200):
            return False
    except Exception as e:
        print(f"Error while accessing the pages: {e}")
        return False
    
    # Perform login
    try:
        response = s.post(f'{url}api/a3/xss_stored/login', json={
            'username': username,
            'password': password
        })
        
        # Ensure login was successful and check cookies
        if response.status_code == 200 and response.headers.get('Set-Cookie'):
            sleep(2)  # Optional: might be better replaced with more dynamic checks
            needed_page = s.get(f'{url}a3/xss_stored/profile/{profile_id}')
            
            # Render the page after login and using the cookies from the session
            needed_page.html.render()
            
            return True
        else:
            return False
    except Exception as e:
        print(f"Error during login or page retrieval: {e}")
        return False


if __name__ == '__main__':
    if len(argv) > 4:
        run_visit_user(argv[1], argv[2], argv[3], argv[4])
        print('Thread Started')
    else:
        print('No ARG Provided')
