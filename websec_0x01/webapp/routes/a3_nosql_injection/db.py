#!/usr/bin/env python3
""" Proudly Written by Yosri """
from mongomock import MongoClient
from mongoengine import connect, disconnect
from .utils import generate_market_summary, generate_market_value
from random import randint
from json import dumps
from secrets import token_urlsafe

coins = [
    {"coin": "HBTNc", "name": "Holbie Coin", "min": 105000},
    {"coin": "BTC", "name": "Bitcoin", "min": 60000},
    {"coin": "ETH", "name": "Ethereum", "min": 3000},
    {"coin": "SOL", "name": "Solana", "min": 100},
]
coins_list = ["HBTNc", "BTC", "ETH", "USD"]
usernames = [
    "Foued",
    "Abdou",
    "Maroua",
    "Yosri",
    "Ismail",
    "Dexter",
    "John",
    "Hugo",
    "Jeremy",
    "Jim",
    "Jimmy",
]
users = [
    {
        "username": username,
        "amounts": [
            randint(1, 3) / 200,
            randint(1, 3) / 100,
            randint(1, 3) / 10,
            randint(1000, 2000),
        ],
        "diff": 6.19,
        "trend": "up",
    }
    for username in usernames
]
elon_number = -randint(2, 5)
users[elon_number]["amounts"] = [0.135, 0.563, 13.2, 63203]
users[elon_number]["username"] = "Elon-Musk"


class MockDB:
    def __init__(self):
        self.db = connect("HBTN", mongo_client_class=MongoClient).db
        for coin in coins:
            self.gen_market_summary(coin)
        for user in users:
            self.gen_user_info(user)

    def gen_market_summary(self, coin_info):
        if self.db.market_summary.find_one(coin_info) is None:
            summary = generate_market_summary(coin_info.get("min", 0))
            return self.db.market_summary.insert_one(
                {
                    **coin_info,
                    "id": coin_info["coin"],
                    "market_summary": summary,
                    **(generate_market_value(summary)),
                }
            )
        return True

    def gen_wallet_info(self, amounts):
        wallet = []
        for key, amount in enumerate(amounts):
            coin_info = self.get_coin_info(coins_list[key])
            wallet.append(
                {
                    "coin": coin_info["coin"],
                    "diff": "{:.2f}".format(coin_info["diff1d"]),
                    "trend": coin_info["trend1d"],
                    "amount": amount,
                    "value": coin_info["price"],
                    "usd_amount": "{:.2f}".format(float(coin_info["price"]) * amount),
                }
                if coin_info
                else {
                    "coin": "USD",
                    "diff": "0",
                    "trend": "up",
                    "amount": amount,
                    "value": 1,
                    "usd_amount": amount,
                }
            )
        return wallet

    def gen_user_info(self, user):
        if self.get_user_info(user["username"]) is None:
            username = user["username"].lower()
            password = token_urlsafe(16)
            wallet = self.gen_wallet_info(user["amounts"])
            usd_balance = sum([float(amount["usd_amount"]) for amount in wallet])
            earning = sorted(
                [
                    {
                        "name": amount["coin"],
                        "fill": "var(--joy-palette-primary-500)",
                        "value": int(float(amount["usd_amount"]) * 100 / usd_balance),
                    }
                    for amount in wallet
                ],
                key=lambda x: x["value"],
                reverse=True,
            )
            user_info = {
                **user,
                "username": username,
                "password": password,
                "wallet": wallet,
                "amount": "{:.2f}".format(usd_balance),
                "earning": earning,
            }
            return self.db.users.insert_one(user_info)
        return True

    def get_market_summary(self):
        return self.db.market_summary.find_one(
            {"coin": "HBTNc"}, {"market_summary": 1, "volume1d": 1}
        )

    def get_market_values(self, filters={}):
        return (
            self.db.market_summary.find_one(filters, {"market_summary": 0})
            if filters
            else {}
        )

    def get_coin_info(self, coin="HBTNc"):
        return self.db.market_summary.find_one(
            {"coin": coin},
            {"name": 1, "trend1d": 1, "coin": 1, "price": 1, "diff1d": 1},
        )

    def validate_auth(self, data):
        user_info = self.db.users.find_one({"username": data["username"]})
        if user_info:
            if self.db.users.find_one(
                {"username": data["username"], "password": data["password"]}
            ):
                return user_info
        return None

    def get_user_info(self, username, filters={"password": 0, "amounts": 0}):
        return self.db.users.find_one({"username": username.lower()}, filters)

    def do_exchange_buy(self, exchange_data, username):
        e_coin = exchange_data["coin"]
        coin_info = self.get_coin_info(e_coin)
        if coin_info is None:
            return False, "Invalid Coin"

        e_amount = float(exchange_data["amount"])
        e_price = float(coin_info["price"])
        required_usd_balance = e_amount * e_price

        user_wallet = {
            wallet["coin"]: wallet
            for wallet in self.get_user_info(username, {"wallet": 1})["wallet"]
        }

        usd_balance = user_wallet["USD"]["amount"]
        if usd_balance < required_usd_balance:
            return False, "Insufficient Balance"

        new_usd_balance = usd_balance - required_usd_balance
        new_coin_balance = e_amount + float(user_wallet[e_coin]["amount"])

        user_wallet["USD"] = {
            **user_wallet["USD"],
            "amount": new_usd_balance,
            "usd_amount": new_usd_balance,
        }

        user_wallet[e_coin] = {
            **user_wallet[e_coin],
            "amount": new_coin_balance,
            "usd_amount": new_coin_balance * e_price,
        }

        sum_usd = sum([float(coin["usd_amount"]) for coin in user_wallet.values()])
        earning = sorted(
            [
                {
                    "name": key,
                    "fill": "var(--joy-palette-primary-500)",
                    "value": int(float(value["usd_amount"]) * 100 / sum_usd),
                }
                for key, value in user_wallet.items()
            ],
            key=lambda x: x["value"],
            reverse=True,
        )
        self.db.users.update_one(
            {"username": username},
            {
                "$set": {
                    "wallet": [wallet for wallet in user_wallet.values()],
                    "earning": earning,
                    "amount": "{:.2f}".format(sum_usd),
                }
            },
        )
        return (
            True,
            f"Successful Exchange: {required_usd_balance} USD => {e_amount} {e_coin}",
        )

    def do_exchange_sell(self, exchange_data, username):
        e_coin = exchange_data["coin"]
        coin_info = self.get_coin_info(e_coin)
        if coin_info is None:
            return False, "Invalid Coin"

        e_required_amount = float(exchange_data["amount"])
        e_price = float(coin_info["price"])
        user_wallet = {
            wallet["coin"]: wallet
            for wallet in self.get_user_info(username, {"wallet": 1})["wallet"]
        }
        e_available_amount = user_wallet[e_coin]["amount"]
        print(e_required_amount, e_available_amount)
        if e_available_amount < e_required_amount:
            return False, "Insufficient Balance"

        new_coin_balance = e_available_amount - e_required_amount
        new_usd_balance = e_required_amount * e_price + user_wallet["USD"]["amount"]
        
        user_wallet[e_coin] = {
            **user_wallet[e_coin],
            "amount": new_coin_balance,
            "usd_amount": new_coin_balance * e_price,
        }
        
        user_wallet["USD"] = {
            **user_wallet["USD"],
            "amount": new_usd_balance,
            "usd_amount": new_usd_balance,
        }

        
        sum_usd = sum([float(coin["usd_amount"]) for coin in user_wallet.values()])
        earning = sorted(
            [
                {
                    "name": key,
                    "fill": "var(--joy-palette-primary-500)",
                    "value": int(float(value["usd_amount"]) * 100 / sum_usd),
                }
                for key, value in user_wallet.items()
            ],
            key=lambda x: x["value"],
            reverse=True,
        )
        self.db.users.update_one(
            {"username": username},
            {
                "$set": {
                    "wallet": [wallet for wallet in user_wallet.values()],
                    "earning": earning,
                    "amount": "{:.2f}".format(sum_usd),
                }
            },
        )
        return (
            True,
            f"Successful Exchange: {e_required_amount} {e_coin} => {new_usd_balance} USD",
        )

    def do_exchange(self, exchange_data, username):
        if exchange_data["action"] == "Buy":
            return self.do_exchange_buy(exchange_data, username)
        elif exchange_data["action"] == "Sell":
            return self.do_exchange_sell(exchange_data, username)
        else:
            return False, "Invalid Action"
