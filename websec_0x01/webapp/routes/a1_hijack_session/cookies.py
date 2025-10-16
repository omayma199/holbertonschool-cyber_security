#!/usr/bin/env python3
''' Proudly Written by Yosri '''
from uuid import uuid4
from random import randint
from time import time, sleep
from flask import make_response, current_app


class CookiesVar:
    def __init__(self):
        print('Init Cookies')
        self.current = randint(1111111, 9999999)
        self.uuid4_str = str(uuid4())[:22]
        self.valid = {}
        self.counter = 0
        self.reset_max()
    
    def reset_max(self):
        self.max = randint(6, 18)
    
    def forward(self):
        self.counter += 1
        self.current += 1

    def reset(self):
        self.counter = 0
        self.reset_max()
    
    def cookie(self):
        return f'{self.uuid4_str}-{self.current}-{int(time() * 10)}'
    
    def setValid(self, cookie):
        self.valid[cookie] = True
        print(cookie)
    
    def checkValid(self, cookie):
        return self.valid.get(cookie, False)


class Cookies:
    def generateCookie():
        sleep(0.125)
        cookie = current_app.a1_hijack_session.cookie()
        current_app.a1_hijack_session.forward()
        if current_app.a1_hijack_session.counter == current_app.a1_hijack_session.max:
            current_app.a1_hijack_session.reset()
            current_app.a1_hijack_session.setValid(cookie)
            print(cookie)
            return Cookies.generateCookie()
        else:
            return cookie

    def validateCookie(cookie):
        return current_app.a1_hijack_session.checkValid(cookie)

    def setCookies(data):
        response = make_response(data)
        response.set_cookie('hijack_session', Cookies.generateCookie(), httponly=True)
        return response
