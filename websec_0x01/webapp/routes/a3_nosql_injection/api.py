#!/usr/bin/env python3
""" Proudly Written by Yosri """
from flask import Blueprint, request, Response, session, jsonify
from json import dumps, loads
from .db import MockDB
from os import getenv


api = Blueprint(
    "a3_nosql_injection_api", __name__, url_prefix="/api/a3/nosql_injection"
)
db = MockDB()


def Unauthorized(reason):
    return Response(
        response=dumps(
            {"status": "error", "message": f"Unauthorized {reason}!"},
            default=str,
            indent=4,
        ),
        status=200,
        mimetype="application/json",
    )


def Invalid(reason):
    return Response(
        response=dumps(
            {"status": "error", "message": f"{reason}."},
            default=str,
            indent=4,
        ),
        status=200,
        mimetype="application/json",
    )


@api.route("/market_summary")
def get_market_summary():
    return Response(
        response=dumps(db.get_market_summary(), default=str, indent=4),
        status=200,
        mimetype="application/json",
    )


@api.route("/market_values", methods=["POST"])
def get_market_values():
    return Response(
        response=dumps(db.get_market_values(request.json), default=str, indent=4),
        status=200,
        mimetype="application/json",
    )


@api.route("/sign_in", methods=["POST"])
def do_sign_in():
    if set(request.json.keys()).issubset(["username", "password"]):
        user_info = db.validate_auth(request.json)
        if user_info:
            session["nosql-username"] = user_info["username"]
            return Response(
                response=dumps(
                    {
                        "status": "success",
                        "message": f"Congratulations For your Sign in!\nFLAG: {getenv('FLAG_9')}",
                    },
                    default=str,
                    indent=4,
                ),
                status=200,
                mimetype="application/json",
            )
    return Invalid("Invalid Credentials Provided")


@api.route("/exchange", methods=["POST"])
def do_exchange():
    user_info = session.get("nosql-user_info", False)
    if user_info:
        if set(request.json.keys()).issubset(["coin", "amount", "action"]):
            exchange = db.do_exchange(request.json, user_info["username"])
            if exchange[0]:
                return Response(
                    response=dumps(
                        {"status": "success", "message": exchange[-1]},
                        default=str,
                        indent=4,
                    ),
                    status=200,
                    mimetype="application/json",
                )
            else:
                return Invalid(exchange[-1])
        return Invalid("Invalid Exchange data Provided")
    return Unauthorized("Exchange")


@api.route("/user_info")
def get_user_info():
    user_info = db.get_user_info(session.get("nosql-username", ""))
    if user_info:
        session["nosql-user_info"] = user_info
        for wallet in user_info["wallet"]:
            if wallet["coin"] == "HBTNc" and wallet["amount"] >= 1:
                data_r = {
                    "status": "success",
                    "message": user_info,
                    "flag": f"Congratulations For your Exchange!\nFLAG: {getenv('FLAG_10')}",
                }
            else:
                data_r = {"status": "success", "message": user_info}
            return Response(
                response=dumps(
                    data_r,
                    default=str,
                    indent=4,
                ),
                status=200,
                mimetype="application/json",
            )
    return Unauthorized("Action")


@api.route("/sign_out")
def sign_out():
    session.pop("nosql-username")
    session.pop("nosql-user_info")
    return jsonify({"success": True})
