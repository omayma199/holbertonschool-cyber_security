#!/usr/bin/env python3
''' Proudly Written by Yosri '''
from flask import (
    Blueprint,
    render_template
)
from os import getenv


front = Blueprint('a3_sql_injection_front', __name__, url_prefix='/a3/sql_injection')

@front.route('/')
def index():
    return render_template('a3_sql_injection.html')
