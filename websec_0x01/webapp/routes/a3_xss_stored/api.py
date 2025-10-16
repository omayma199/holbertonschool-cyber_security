#!/usr/bin/env python3
''' Proudly Written by Yosri '''
from flask import (
    current_app,
    Blueprint,
    request, jsonify,
    session, url_for
)
from time import sleep
from os import getenv
from .xss_stored import xssStoreMethods


api = Blueprint('a3_xss_stored_api', __name__, url_prefix='/api/a3/xss_stored')


@api.route('/', methods=['GET'])
def index():
    return jsonify({})


@api.route('/login', methods=['POST'])
def login():
    auth_res = current_app.a3_xss_stored.auth(request.json)
    if auth_res[0]:
        return jsonify({
            'status': 'success'
        })
    else:
        return jsonify({
            'status': 'failed',
            'message': auth_res[1]
        })


@api.route('/hints', methods=['GET'])
@xssStoreMethods.check_session
def hints():
    return jsonify({
        'status': 'success',
        'message': 'Salem. Hints. Hints'
    })

@api.route('/reset', methods=['GET'])
@xssStoreMethods.check_session
def reset():
    current_app.a3_xss_stored.reset()
    return jsonify({
        'status': 'success'
    })


@api.route('/profile', methods=['GET'])
@xssStoreMethods.check_session
def profile():
    sleep(0.25)
    following_list = list(current_app.a3_xss_stored.users['yosri']['following'])
    follower_list = list(current_app.a3_xss_stored.users['yosri']['followers'])
    if len(following_list) > 2:
        FLAG_1 = getenv('FLAG_3')
        old_flags = session.get('FLAGS', [])
        session.update({
            'FLAGS': old_flags + [{
                'name': 'FLAG_1/2',
                'value': getenv("FLAG_3"),
                'route': url_for('a3_xss_stored_front.index')
            }]
        })
    else:
        FLAG_1 = False
    if len(follower_list) > 2:
        FLAG_2 = getenv('FLAG_4')
        old_flags = session.get('FLAGS', [])
        session.update({
            'FLAGS': old_flags + [{
                'name': 'FLAG_2/2',
                'value': getenv("FLAG_4"),
                'route': url_for('a3_xss_stored_front.index')
            }]
        })
    else:
        FLAG_2 = False
    return jsonify({
        'status': 'success',
        'user_data': {
            'followers': follower_list,
            'following': following_list,
            'last_actions': current_app.a3_xss_stored.users['yosri']['last_actions'],
            'FLAG_1': FLAG_1,
            'FLAG_2': FLAG_2
        }
    })


@api.route('/profile/<int:profile_id>', methods=['GET'])
@xssStoreMethods.check_session
def profile_id(profile_id):
    username = xssStoreMethods.int_to_base36(profile_id)
    profile = current_app.a3_xss_stored.users.get(username, False)
    if not profile:
        return ('', 204)
    return jsonify({
        'status': 'success',
        'user_data': {
            'followers': list(profile['followers']),
            'following': list(profile['following']),
            'last_actions': profile['last_actions']
        }
    })


@api.route('/like/<int:profile_id>', methods=['GET'])
@xssStoreMethods.check_session
def like(profile_id):
    username = xssStoreMethods.int_to_base36(profile_id)
    session_username = session['xssStore']['username']
    profile = current_app.a3_xss_stored.users.get(username, False)
    if not profile:
        return jsonify({
            'status': 'error',
            'message': 'Profile Doesn\' exists'
        })
    if session_username == username:
        return jsonify({
            'status': 'error',
            'message': 'You can\' like your own profile!'
        })
    return jsonify({
        'status': 'success',
        'message':  current_app.a3_xss_stored.follow(session_username, username)
    })


@api.route('/update', methods=['POST'])
@xssStoreMethods.check_session
def update():
    session_username = session['xssStore']['username']
    req = current_app.a3_xss_stored.update(session_username, request.json)
    if req[0]:
        return jsonify({
            'status': 'success',
            'message': 'Your profile has been updated.'
        })
    else:
        return jsonify({
            'status': 'failed',
            'message': req[1]
        })
