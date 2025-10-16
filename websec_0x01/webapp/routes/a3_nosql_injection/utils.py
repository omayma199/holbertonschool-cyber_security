#!/usr/bin/env python3
""" Proudly Written by Yosri """
from datetime import timedelta, datetime
from random import randint


def randFloat():
    return randint(11, 99) / 100


def generate_market_summary(minPrice=15000):
    addUnit = int(minPrice / 100)
    today = datetime.now()
    start_date = today - timedelta(days=175)
    financial_data = []
    opens = randint(minPrice, minPrice + addUnit) + randFloat()
    for i in range(26):
        close = (
            randint(int(opens) - addUnit * 5, int(opens) + addUnit * 5) + randFloat()
        )
        date = start_date + timedelta(days=7 * i)
        data = {
            "low": "{:.2f}".format(
                opens - randint(int(addUnit / 2), addUnit) + randFloat()
            ),
            "high": "{:.2f}".format(
                opens + randint(int(addUnit / 2), addUnit) + randFloat()
            ),
            "open": "{:.2f}".format(opens),
            "close": "{:.2f}".format(close),
            "timestamp": date.strftime("%d %B %Y"),
            "timestamps": date.strftime("%d-%b"),
        }
        financial_data.append(data)
        opens = close
    return financial_data


def generate_market_value(summary):
    close1 = int(float(summary[-1].get("close", "0")))
    open1 = int(float(summary[-2].get("close", "0")))
    open2 = int(float(summary[-3].get("close", "0")))
    diff1d = (close1 - open1) * 100 / close1
    diff7d = (close1 - open2) * 100 / close1
    return {
        "price": summary[-1].get("close", 0),
        "diff1d": abs(diff1d),
        "trend1d": "up" if diff1d > 0 else "down",
        "diff7d": abs(diff7d),
        "trend1d": "up" if diff7d > 0 else "down",
        "marketCap": f"${randint(10, 400)}.{randint(10, 90)}B",
        "volume1d": f"${randint(100, 900)}.{randint(10, 90)}M",
        "summary": [summ.get("close", 0) for summ in summary],
    }
