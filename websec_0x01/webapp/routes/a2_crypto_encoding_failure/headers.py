#!/usr/bin/env python3
''' Proudly Written by Yosri '''
from base64 import b64encode
from secrets import token_urlsafe


class Headers:
    def __init__(self):
        print('Init_Header')
        self.usern = 'yosri'
        self.passw = f'Pa#{token_urlsafe(16)}'
        self.plain = f'{self.passw}'
        self.init_xor()
        self.init_auth()

    def init_xor(self):
        t = b''
        for c in self.plain:
            t += chr(ord(c) ^ ord('_')).encode('utf-8')
        self.xor_token = b64encode(t).decode('utf-8')

    def init_auth(self):
        self.auth_dict = {
            'username': self.usern,
            'password_hash': self.xor_token
        }
        self.bearer = b64encode(str(
            self.auth_dict
        ).encode('utf-8')).decode('utf-8')

    def validateHeader(self, headers):
        _bearer = headers.get('Authorization', False)
        if not _bearer:
            return False
        return _bearer.split(' ')[-1] == self.bearer

    def validateAuth(self, data):
        if not set(data.keys()).issubset(['username', 'password']):
            return False
        if data['username'] != self.usern:
            return False
        if data['password'] != self.passw:
            return False
        return True
