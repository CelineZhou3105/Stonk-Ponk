import pandas as pd
import requests
import yahoo_fin.stock_info as si
import json
from datetime import date, datetime, timedelta
from dateutil.relativedelta import relativedelta

def get_market_status():
    market_status = si.get_market_status()
    print(market_status)
    return market_status

def get_top(page_num):
    gainers = si.get_day_gainers()

    #top 10
    gainers = gainers.head(10)
    
    return gainers.to_json()

def get_bottom(page_num):
    losers = si.get_day_losers()

    #bottom 10
    losers = losers.head(10)
    
    return losers.to_json()

def get_most_active(page_num):
    actives = si.get_day_most_active()

    start_index = int(page_num) * 10
    end_index = start_index + 10
    actives = actives.iloc[start_index:end_index]
    actives_list = []

    active_dict = {}
    for index, row in actives.head().iterrows():
        active_dict = {}
        active_dict['ticker'] = row['Symbol']
        active_dict['name'] = row['Name']
        active_dict['price'] = row['Price (Intraday)']
        active_dict['change_perc'] = row['% Change']

        prices = get_prices(active_dict['ticker'], 'd')
        prices = get_prices(active_dict['ticker'], 'y')
        active_dict['prev_week_prices'] = prices

        actives_list.append(active_dict)
    
    return json.dumps(actives_list)

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
def get_prices(ticker, interval_type):
    price_list = []
    
    interval_string = str(1) + interval_type
    end_date = date.today()

    if interval_type == 'd':  
        start_date = end_date - timedelta(days = 14)
    
    elif interval_type == 'wk':
        start_date = end_date - timedelta(weeks = 10)

    elif interval_type == 'mo':
        start_date = end_date - timedelta(months = 10)

    elif interval_type == "y":
        start_date = end_date - relativedelta(months = 10*12)
        interval_string = str(1) + "mo"

    end_date = date.today().strftime("%d/%m/%Y")
    start_date = start_date.strftime("%d/%m/%Y")

    price_data = si.get_data(ticker, start_date = start_date, end_date = end_date, interval = interval_string)

    for index, row in price_data.iterrows():
        price_list.append({'date': str(index).strip(" 0:"), 'price': row['close']})
        

    return price_list
