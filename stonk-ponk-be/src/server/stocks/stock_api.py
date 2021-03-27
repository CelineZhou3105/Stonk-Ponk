import pandas as pd
import requests
import yahoo_fin.stock_info as si
import json

def get_market_status():
    market_status = si.get_market_status()
    print(market_status)
    return market_status

def get_top_ten():
    gainers = si.get_day_gainers()

    #top 10
    gainers = gainers.head(10)
    
    return gainers.to_json()

def get_bot_ten():
    losers = si.get_day_losers()

    #bottom 10
    losers = losers.head(10)
    
    return losers.to_json()

def get_most_active():
    actives = si.get_day_most_active()

    actives = actives.head(10)
    
    return actives.to_json()

def get_price(ticker):
    try:
        return si.get_live_price(ticker)
    except: 
        return "Stock Not Found"

def get_stats(ticker):
    try:
        return si.get_stats(ticker)
    except:
        return "Stock Not Found"

def get_quotes(ticker):
    try:
        return si.get_quote_table(ticker)
    except:
        return "Stock Not Found"