#!/usr/bin/env python3
''' Proudly Written by Yosri '''
from flask import (
    current_app,
    Blueprint, request, redirect, url_for, session,
    render_template, make_response
)
from .xss_stored import xssStoreMethods


front = Blueprint('a3_xss_stored_front', __name__, url_prefix='/a3/xss_stored')


@front.route('/login', methods=['GET'])
def login():
    return render_template(
        'a3_xss_stored.html',
        user_info={},
        jsFile='a3_xss_stored.js')


@front.route('/', methods=['GET'])
@xssStoreMethods.check_session
def index():
    return redirect(url_for('a3_xss_stored_front.profile'))


@front.route('/edit', methods=['GET'])
@xssStoreMethods.check_session
def edit():
    return render_template(
        'a3_xss_stored.html',
        user_info=current_app.a3_xss_stored.users['yosri']['user_info'],
        jsFile='a3_xss_stored.js')


@front.route('/profile', methods=['GET'])
@xssStoreMethods.check_session
def profile():
    return render_template(
        'a3_xss_stored.html',
        user_info=current_app.a3_xss_stored.users['yosri']['user_info'],
        jsFile='a3_xss_stored.js')


@front.route('/profile/<int:profile_id>', methods=['GET'])
@xssStoreMethods.check_session
def profile_id(profile_id):
    username = xssStoreMethods.int_to_base36(profile_id)
    session_username = session['xssStore']['username']
    if session_username == username:
        return redirect(url_for('a3_xss_stored_front.profile'))
    profile = current_app.a3_xss_stored.users.get(username, False)
    if not profile:
        return ('', 204)
    current_app.a3_xss_stored.visit(session_username, username)
    return render_template(
        'a3_xss_stored.html',
        user_info=profile['user_info'],
        jsFile='a3_xss_stored.js')