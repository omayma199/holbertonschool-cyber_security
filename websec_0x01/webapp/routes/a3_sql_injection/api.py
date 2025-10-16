#!/usr/bin/env python3
''' Proudly Written by Yosri '''
from flask import (
    Blueprint,
    request, render_template_string,
    jsonify
)
from os import getenv
from .database import (
    list_all_orders,
    list_all_customer_names,
    filter_orders_by_name,
    filter_orders_by_status,
    create_user,
    login_user,
    init_database
)

api = Blueprint('a3_sql_injection_api', __name__,
                url_prefix='/api/a3/sql_injection')
init_database()


@api.route('/all_orders')
def all_orders():
    search = request.args.get('search', False)
    if search:
        return jsonify(filter_orders_by_name(search))
    status = request.args.get('status', False)
    if status:
        return jsonify(filter_orders_by_status(status))
    customer = request.args.get('customer', False)
    if customer:
        return jsonify(filter_orders_by_name(customer))
    return jsonify(list_all_orders())


@api.route('/all_customers')
def all_customers():
    return jsonify(list_all_customer_names())


@api.route('/second_order/register', methods=['POST'])
def register():
    return jsonify(create_user(**request.json))


@api.route('/second_order/login', methods=['POST'])
def login():
    user = login_user(**request.json)
    if user:
        print(user)
        return jsonify({
            'success': True,
            'message': {
                'username': user[2],
                'name': user[1],
                'html': render_template_string(f'<h1>Welcome Mr {user[1]}</h1>', FLAG=getenv('FLAG_8'))
            }
        })
    else:
        return jsonify({
            'success': False,
            'message': 'Wrong Sign In Credentials.'
        })
