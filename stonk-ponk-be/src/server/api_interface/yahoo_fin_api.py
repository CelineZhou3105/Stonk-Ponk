import pandas as pd
import requests
import yahoo_fin.stock_info as si
import json
from datetime import date, datetime, timedelta
from dateutil.relativedelta import relativedelta
import arrow

class YfApi():
    def __init__(self):
        self.num_calls = 0
        self.markets = ["", ".AX"]
        self.api = si

    def get_most_active(self, start_index, end_index):
        market_stocks = self.api.get_day_most_active()
        self.num_calls += 1
        market_stocks = market_stocks.iloc[start_index:end_index]
        
        return market_stocks

    # types: losers, gainers, most_active
    def get_market_data(self, type, page_num):
        if type == "losers":
            market_stocks = self.api.get_day_losers()
            self.num_calls += 1

        elif type == "gainers":
            market_stocks = self.api.get_day_gainers()
            self.num_calls += 1
        
        elif type == "most_active":
            market_stocks = self.api.get_day_most_active()
            self.num_calls += 1
        
        else:
            return "unknown type" + str(type)
        

        start_index = int(page_num) * 10
        end_index = start_index + 10
        market_stocks = market_stocks.iloc[start_index:end_index]
        market_stocks_list = []

        for index, row in market_stocks.iterrows():
            market_stock_dict = {}
            market_stock_dict['ticker'] = row['Symbol']
            market_stock_dict['name'] = row['Name']
            market_stock_dict['price'] = row['Price (Intraday)']
            market_stock_dict['change_perc'] = row['% Change']

            prices = self.get_stock_prices(market_stock_dict['ticker'], 'market')
            market_stock_dict['prev_week_prices'] = prices

            market_stocks_list.append(market_stock_dict)

        return market_stocks_list

    #gets data for individual stocks
    #returns: stock name, price, bid, ask, high, low, open, close, change in price, market
    def get_stock_data(self,ticker):
        try:
            quotes = self.api.get_quote_data(ticker)
            self.num_calls += 1
            stock_dict = {}
            stock_dict['ticker'] = ticker
            stock_dict['price'] = self.get_price(ticker)
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
            stock_dict['market_cap'] = quotes['marketCap']

            return stock_dict
    
        except:
            raise Error("Stock Not Found")

    def get_price(self, ticker):
        try:
            return self.api.get_live_price(ticker)
            self.num_calls += 1
        except: 
            return "Stock Not Found"

    #Refactored function deprecated get_stats
    def get_beta(self, ticker):
        try:
            stats = self.api.get_stats(ticker)
            for index, df in stats.iterrows():
                if df["Attribute"] == "Beta (5Y Monthly)":
                    beta = float(df["Value"])
                    return beta
        
            return "Beta Not Found"
        except:
            return "Stock Not Found"

    #interval will be market, last_week, last_month, last_six_months, last_year
    def get_stock_prices(self, ticker, interval_type):
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

        price_data = self.api.get_data(ticker, start_date = start_date_string, end_date = end_date_string, interval = interval_string)
        self.num_calls += 1

        for index, row in price_data.iterrows():
            #check for NaN
            if row['close'] == row['close']:
                index.to_pydatetime()
                index = index.strftime("%Y-%m-%d")
                price_list.append({'date': index, 'price': row['close']})
        
        return price_list

    def get_historical_price(self, ticker, date):
        start_date = date.strftime("%m/%d/%Y")
        end_date = (date+timedelta(days=1)).strftime("%m/%d/%Y")
        try:
            price_data = si.get_data(ticker, start_date = start_date, end_date = end_date, interval = "1d")
        except: 
            #stock price does not exist
            return "Stock Price Not Found"
        
        price_dict = {}
        for index, row in price_data.iterrows():
            price_dict['low'] = row['low']
            price_dict['high'] = row['high']
        
        print(price_dict)
        return price_dict

    def check_stock(self, ticker):
        print(ticker)
        try:
            quotes = self.api.get_quote_data(ticker)
            self.num_calls += 1
            stock_dict = {}
            
            stock_dict['ticker'] = ticker
            stock_dict['name'] = quotes['shortName']
            
            return stock_dict    
    
        except:
            return False

    def check_stocks(self, ticker):
        stock_list = []

        for market in self.markets:
            market_ticker = str(ticker + market)
            
            market_stock = self.check_stock(market_ticker)
            self.num_calls += 1
            
            if market_stock:
                stock_list.append(market_stock)

    
        return stock_list

    def get_num_calls(self):
        return self.num_calls

    def get_self_markets(self):
        return self.markets

