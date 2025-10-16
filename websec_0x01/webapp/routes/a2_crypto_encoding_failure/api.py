#!/usr/bin/env python3
''' Proudly Written by Yosri '''
from flask import (
    current_app, session, url_for,
    Blueprint,
    request, jsonify
)
from time import sleep
from os import getenv


api = Blueprint('a2_crypto_encoding_failure_api', __name__, url_prefix='/api/a2/crypto_encoding_failure')


@api.route('/reset', methods=['GET'])
def reset():
    current_app.a2_crypto_encoding_failure.__init__()
    return jsonify({
        'status': 'success'
    })


@api.route('/hints', methods=['GET'])
def hints():
    response = jsonify({
        'status': 'success',
        'message': "Check the Headers,\n`Bearer` exactly ;)"
    })
    return response


@api.route('/profile', methods=['GET'])
def profile():
    sleep(0.25)
    if current_app.a2_crypto_encoding_failure.validateHeader(request.headers):
        return jsonify({
            'f_name': 'Yosri',
            'l_name': 'Doe',
            'email': 'yosri@web0x01.hbtn',
            'role': 'Cyber Security Expert'
        })
    else:
        return ('', 204)


@api.route('/login', methods=['POST'])
def login():
    old_flags = session.get('FLAGS', [])
    session.update({
        'FLAGS': old_flags + [{
            'name': 'FLAG_1/1',
            'value': getenv("FLAG_2"),
            'route': url_for('a2_crypto_encoding_failure_front.index')
        }]
    })
    if current_app.a2_crypto_encoding_failure.validateAuth(request.json):
        return jsonify({
            'status': 'success',
            'message': f'Crypto Cracked!\nFLAG:\n{getenv("FLAG_2")}'
        })
    else:
        return jsonify({
            'status': 'failed',
            'message': 'Authentication failed!\nTry Harder'
        })
