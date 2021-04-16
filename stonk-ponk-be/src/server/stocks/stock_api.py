import pandas as pd
import requests
import yahoo_fin.stock_info as si
import json
from datetime import date, datetime, timedelta
from dateutil.relativedelta import relativedelta
import arrow

def get_market_status():
    market_status = si.get_market_status()
    print(market_status)
    return market_status

def get_most_active(start_index, end_index):
    market_stocks = si.get_day_most_active()
    market_stocks = market_stocks.iloc[start_index:end_index]
    market_stocks_list = []

    for index, row in market_stocks.iterrows():
        market_stocks_list.append(row['Symbol'])
    
    return market_stocks_list

# types: losers, gainers, most_active
def get_market_data(type, page_num):
    if type == "losers":
        market_stocks = si.get_day_losers()
    elif type == "gainers":
        market_stocks = si.get_day_gainers()
    elif type == "most_active":
        market_stocks = si.get_day_most_active()
    else:
        return "unknown type" + str(type)

    start_index = int(page_num) * 10
    end_index = start_index + 10
    market_stocks = market_stocks.iloc[start_index:end_index]
    market_stocks_list = []

    market_stock_dict = {}
    for index, row in market_stocks.iterrows():
        market_stock_dict = {}
        market_stock_dict['ticker'] = row['Symbol']
        market_stock_dict['name'] = row['Name']
        market_stock_dict['price'] = row['Price (Intraday)']
        market_stock_dict['change_perc'] = row['% Change']

        prices = get_stock_prices(market_stock_dict['ticker'], 'market')
        market_stock_dict['prev_week_prices'] = prices

        market_stocks_list.append(market_stock_dict)
    
    return json.dumps(market_stocks_list)

#gets data for individual stocks
#returns: stock name, price, bid, ask, high, low, open, close, change in price, market
def get_stock_data(ticker):
    try:
        quotes = si.get_quote_data(ticker)

        stock_dict = {}
        stock_dict['ticker'] = ticker
        stock_dict['price'] = get_price(ticker)
        stock_dict['name'] = quotes['shortName']
        stock_dict['bid'] = quotes['bid']
        stock_dict['ask'] = quotes['ask']
        stock_dict['open'] = quotes['regularMarketOpen']
        stock_dict['high'] = quotes['regularMarketDayHigh']
        stock_dict['low'] = quotes['regularMarketDayLow']

        stock_dict['close'] = quotes['regularMarketPreviousClose']
        stock_dict['change'] = quotes['regularMarketChange']
        stock_dict['change_perc'] = quotes['regularMarketChangePercent']

        stock_dict['market'] = quotes['market']
        stock_dict['exchange'] = quotes['fullExchangeName']

        stock_dict['fifty_two_week_range'] = quotes['fiftyTwoWeekRange']
        stock_dict['market_cap'] = quotes['fiftyTwoWeekRange']

        return json.dumps(stock_dict)
    
    except:
        raise Error("Stock Not Found")

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
        raise Error("Stock Not Found")

#interval will be market, last_week, last_month, last_six_months, last_year
def get_stock_prices(ticker, interval_type):
    price_list = []
    print('ticker', ticker, 'interval_type', interval_type)
    
    end_date = arrow.utcnow()

    if interval_type == 'market':  
        start_date = end_date.shift(days=-100)
        interval_string = str(1) + "d"
    
    elif interval_type == 'last_week':
        start_date = end_date.shift(days=-14)
        interval_string = str(1) + "wk"
    
    elif interval_type == 'last_month':
        start_date = end_date.shift(days=-30)
        interval_string = str(1) + "d"

    elif interval_type == 'last_six_months':
        start_date = end_date.shift(days=-180)
        interval_string = str(1) + "d"

    elif interval_type == "last_year":
        start_date = end_date.shift(days=-365)
        interval_string = str(1) + "d"

    end_date_string = str(end_date.format('MM-DD-YYYY'))

    start_date_string = str(start_date.format('MM-DD-YYYY'))

    price_data = si.get_data(ticker, start_date = start_date_string, end_date = end_date_string, interval = interval_string)

    for index, row in price_data.iterrows():
        price_list.append({'date': str(index).strip(" 0:"), 'price': row['close']})
        

    return json.dumps(price_list)


def get_historical_price(ticker, date):
    start_date = date.strftime("%d/%m/%Y")
    end_date = date.strftime("%d/%m/%Y")
    price_data = si.get_data(ticker, start_date = start_date, end_date = end_date, interval = "1d")

    price_dict = {}
    for index, row in price_data.iterrows():
        price_dict['low'] = row['low']
        price_dict['high'] = row['high']

    return price_dict

def check_stock(ticker):
    try:
        quotes = si.get_quote_data(ticker)
        stock_dict = {}
        stock_dict['ticker'] = ticker
        stock_dict['name'] = quotes['shortName']
        return stock_dict    
    
    except:
        return False
        
    
    return stock_list

def check_stocks(ticker):
    stock_list = []
    if check_stock(ticker):
        stock_list.append(check_stock(ticker))
    
    asx_ticker = str(ticker + ".AX")
    if check_stock(asx_ticker):
        stock_list.append(check_stock(ticker))
    
    return stock_list

