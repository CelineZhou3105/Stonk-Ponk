#Data will be stored in "flux" tables called pandas dataframes
import pandas as pd
import requests
import yahoo_fin.stock_info as si
import json

#We connect to the yahoo finance API and get data about a stock
def get_market_status():
    market_status = si.get_market_status()
    print(market_status)
    return market_status

def get_price(ticker):
    price = si.get_live_price(ticker)
    print(price)
    return price

