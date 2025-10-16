#!/usr/bin/env python3
''' Proudly Written by Yosri '''
from flask import (
    current_app,
    Blueprint, request,
    render_template, make_response
)


front = Blueprint('a2_crypto_encoding_failure_front', __name__, url_prefix='/a2/crypto_encoding_failure')


@front.route('/', methods=['GET'])
def index():
    response = make_response(render_template(
        'a2_crypto_encoding_failure.html',
        jsFile='a2_crypto_encoding_failure.js',
        data=current_app.a2_crypto_encoding_failure.bearer))
    return response


@front.route('/login', methods=['GET'])
def login():
    response = make_response(render_template(
        'a2_crypto_encoding_failure.html',
        jsFile='a2_crypto_encoding_failure.js'))
    return response
