#!/usr/bin/env python3
""" Proudly Written by Yosri """
from flask import Blueprint, session, redirect, render_template, request, jsonify
import os

front = Blueprint("index_front", __name__, url_prefix="/")


@front.route("/", methods=["GET"])
def index():
    return redirect("/a3/nosql_injection/")


@front.route("/logs/", methods=["GET"])
def logs():
    data = os.popen("cat /var/log/nginx/access.log").read()
    logs = data.split("\n")
    logs = logs[::-1]
    return jsonify(logs)
@front.route("/logs/error/", methods=["GET"])
def erro_logs():
    data = os.popen("cat /var/log/nginx/error.log").read()
    logs = data.split("\n")
    logs = logs[::-1]
    return jsonify(logs)

@front.route("/logs/gunicorn/", methods=["GET"])
def gunicorn_logs():
    data = os.popen("cat /var/log/gunicorn/access.log").read()
    logs = data.split("\n")
    logs = logs[::-1]
    return jsonify(logs)

@front.route("/logs/gunicorn/error/", methods=["GET"])
def gunicorn_error_logs():
    data = os.popen("cat /var/log/gunicorn/error.log").read()
    logs = data.split("\n")
    logs = logs[::-1]
    return jsonify(logs)

@front.route("/logs/supervisor/", methods=["GET"])
def supervisor_logs():
    data = os.popen("cat /var/log/supervisor/supervisord.log").read()
    logs = data.split("\n")
    logs = logs[::-1]
    return jsonify(logs)

@front.route("/logs/supervisor/error/", methods=["GET"])
def supervisor_error_logs():
    data = os.popen("cat /var/log/supervisor/supervisord.log").read()
    logs = data.split("\n")
    logs = logs[::-1]
    return jsonify(logs)

@front.route("/logs/redis/", methods=["GET"])
def redis_logs():
    data = os.popen("cat /var/log/redis/redis-server.log").read()
    logs = data.split("\n")
    logs = logs[::-1]
    return jsonify(logs)
@front.route("/logs/mysql/", methods=["GET"])
def mysql_logs():
    data = os.popen("cat /var/log/mysql/error.log").read()
    logs = data.split("\n")
    logs = logs[::-1]
    return jsonify(logs)
@front.route("/logs/mongodb/", methods=["GET"])
def mongodb_logs():
    data = os.popen("cat /var/log/mongodb/mongod.log").read()
    logs = data.split("\n")
    logs = logs[::-1]
    return jsonify(logs)
@front.route("/logs/ssh/", methods=["GET"])
def ssh_logs():
    data = os.popen("cat /var/log/auth.log").read()
    logs = data.split("\n")
    logs = logs[::-1]
    return jsonify(logs)
@front.route("/logs/syslog/", methods=["GET"])
def syslog_logs():
    data = os.popen("cat /var/log/syslog").read()
    logs = data.split("\n")
    logs = logs[::-1]
    return jsonify(logs)
