#!/usr/bin/env python3
''' Proudly Written by Yosri '''
from flask import (
    Blueprint, request,
    render_template
)
from .cookies import Cookies


front = Blueprint('a1_hijack_session_front', __name__, url_prefix='/a1/hijack_session')


@front.route('/', methods=['GET'])
def index():
    response = render_template('a1_hijack_session.html', jsFile='a1_hijack_session.js')
    if request.cookies.get('hijack_session', False):
        return response
    else:
        return Cookies.setCookies(response)
