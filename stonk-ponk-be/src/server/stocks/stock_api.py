import pandas as pd
import requests
import yahoo_fin.stock_info as si
import json
from datetime import date, datetime, timedelta

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

def get_most_active(page_num):
    actives = si.get_day_most_active()

    start_index = int(page_num) * 10
    end_index = start_index + 10
    actives = actives.iloc[start_index:end_index]

    return_dict = {}
    for index, row in actives.head().iterrows():
        return_dict['ticker'] = row['Symbol']
        return_dict['name'] = row['Name']
        return_dict['price'] = row['Price (Intraday)']
        return_dict['change_perc'] = row['% Change']
        
        #here we get the stock's individual data 
        stats = get_stats(return_dict['ticker'])
        prices = get_prices(return_dict['ticker'], 1, 'wk')
        #print(stats)
    
    print(return_dict)
    
    return json.dumps(return_dict)

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

#interval will be d, wk, mo, or y
def get_prices(ticker, interval_len, interval_type):
    price_list = []
    
    interval_string = str(interval_len) + interval_type
    end_date = date.today().strftime("%d/%m/%Y")

    if interval_type == 'd':  

        start_date = end_date - timedelta()

    price_data = si.get_data(ticker, interval = interval_string)
    print(price_data)

    #for index, row in price_data.head().iterrows():
        #price_list.append()
    
    return price_data
