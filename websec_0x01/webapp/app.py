#!/usr/bin/env python3
'''Written by Campusna'''
from os import getenv
from dotenv import load_dotenv
from datetime import timedelta
'''Flask Requirement'''
from flask import Flask, session
from flask_session import Session
from uuid import uuid4
'''import routes'''
from routes import (
    index,
    a1_hijack_session,
    a2_crypto_encoding_failure,
    a3_xss_stored,
    a3_sql_injection,
    a3_nosql_injection)
from json import dumps, loads


def create():
    '''create flask app'''
    ''' app init '''
    load_dotenv()
    app = Flask(__name__)
    '''app config'''
    app.config.update({
        'SESSION_PERMANENT': False,
        'PERMANENT_SESSION_LIFETIME': timedelta(days=3),
        'SESSION_USE_SIGNER': True,
        'SESSION_TYPE': 'filesystem',
        'SECRET_KEY': str(uuid4())})
    '''register components'''
    app.a1_hijack_session = a1_hijack_session.CookiesVar()
    app.a2_crypto_encoding_failure = a2_crypto_encoding_failure.Headers()
    app.a3_xss_stored = a3_xss_stored.xssStore()
    '''register blueprints front'''
    app.register_blueprint(index.front)
    app.register_blueprint(a1_hijack_session.front)
    app.register_blueprint(a2_crypto_encoding_failure.front)
    app.register_blueprint(a3_xss_stored.front)
    app.register_blueprint(a3_sql_injection.front)
    app.register_blueprint(a3_nosql_injection.front)
    @app.context_processor
    def custom_processor():
        with open('titles.json', 'r+') as f:
            titles = dumps(loads(f.read()))
        return {'titles': titles}
    '''register blueprints api'''
    app.register_blueprint(a1_hijack_session.api)
    app.register_blueprint(a2_crypto_encoding_failure.api)
    app.register_blueprint(a3_xss_stored.api)
    app.register_blueprint(a3_sql_injection.api)
    app.register_blueprint(a3_nosql_injection.api)
    '''register session and db'''
    @app.errorhandler(404)
    def page_not_found(e):
        return ('', 204)
    @app.errorhandler(405)
    def page_not_found(e):
        return ('', 204)
    @app.errorhandler(500)
    def internal_error(e):
        return ('', 204)
    @app.before_request
    def before_request():
        if not session.get('github', False):
            session.update({
                'github': getenv('github_username')
            })
    Session(app)
    if getenv('LOCK') == '0':
        app.debug = True
    return app


app = create()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)

