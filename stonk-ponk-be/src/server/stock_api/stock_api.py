import pandas as pd
import requests
import yahoo_fin.stock_info as si
import json

def get_market_status():
    market_status = si.get_market_status()
    print(market_status)
    return market_status