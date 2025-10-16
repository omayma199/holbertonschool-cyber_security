#!/usr/bin/env python3
''' Proudly Written by Yosri '''
from flask import (
    Blueprint, session, url_for,
    request, jsonify
)
from .cookies import Cookies
from os import getenv


api = Blueprint('a1_hijack_session_api', __name__, url_prefix='/api/a1/hijack_session')


@api.route('/hints', methods=['GET'])
def hints():
    response = jsonify({
        'status': 'success',
        'message': "Check the cookies:\n`hijack_session`"
    })
    if request.cookies.get('hijack_session', False):
        return response
    else:
        return Cookies.setCookies(response)


@api.route('/profile', methods=['GET'])
def index():
    return Cookies.setCookies(jsonify({
        'status': 'success',
        'message': "Greeting from Yosri.me. Nothing hidden here, The Flag is within: /api/a1/hijack_session/login, just guess the right 'hijack_session'"
    }))


@api.route('/login', methods=['POST'])
def login():
    cookie = request.cookies.get('hijack_session', False)
    if not cookie:
        return ('', 204)
    old_flags = session.get('FLAGS', [])
    session.update({
        'FLAGS': old_flags + [{
            'name': 'FLAG_1/1',
            'value': getenv("FLAG_1"),
            'route': url_for('a1_hijack_session_front.index')
        }]
    })
    if Cookies.validateCookie(cookie):
        print(f'Cookies hijacked!\nFLAG:\n{getenv("FLAG_1")}')  # Debugging
        # Get the Generated Flag
        print(f'Generated Flag: {session.get("FLAGS")[-1]}')  # Debugging
        return jsonify({
            'status': 'success',
            'valid': True,
            'message': f'Cookies hijacked!\nFLAG:\n{getenv("FLAG_1")}'
        })
    else:
        return jsonify({
            'status': 'failed',
            'message': 'Authentication failed!\nTry Harder'
        })
