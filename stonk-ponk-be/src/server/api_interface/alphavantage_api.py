import pandas as pd
import requests
import yahoo_fin.stock_info as si
import json
from datetime import date, datetime, timedelta
from dateutil.relativedelta import relativedelta
import arrow
import requests
from urllib.request import urlopen
import itertools

class AaApi():
    def __init__(self):
        self.num_calls = 0
        self.api = si
    
    def get_fmp_api_string(self, func):
        request_string = str("https://financialmodelingprep.com/api/v3/stock/" + func + "?apikey=ddb40cd7ee687688ad595435c3a99217")
        return request_string
    
    def get_aa_api_string(self, func, symbol):
        request_string = str("https://www.alphavantage.co/query?function=" + func + "&symbol=" + symbol +"&apikey=RYJOHTXNG0NQFQVQ")
        return request_string

    def get_market_data(self,type,page_num):
        try:
            if type == "losers":
                list_name = "mostLoserStock"
                request_string = self.get_fmp_api_string("losers")
                response = requests.get(request_string)
                self.num_calls += 1

            elif type == "gainers":
                list_name = "mostGainerStock"
                request_string = self.get_fmp_api_string("gainers")
                response = requests.get(request_string)
                self.num_calls += 1
        
            elif type == "most_active":
                list_name = "mostActiveStock"
                market_stocks = self.api.get_day_most_active()
                request_string = self.get_fmp_api_string("actives")
            
                response = requests.get(request_string)
                self.num_calls += 1
        
            else:
                return "unknown type" + str(type)

            
            if response.status_code == 200:
                values = json.loads(response.text)
                print(values)

                market_stocks_list = []

                for stock_dict in values[list_name]:
                    market_stock_dict = {}
                    market_stock_dict['ticker'] = stock_dict['ticker']
                    market_stock_dict['name'] = stock_dict['companyName']
                    market_stock_dict['price'] = stock_dict['price']
                    market_stock_dict['change_perc'] = stock_dict['changesPercentage']

                    market_stocks_list.append(market_stock_dict)

                return market_stocks_list

            else:
                return response.status_code
        except Exception as e:
            return "Financial Modelling Prep Failed"
    
    #gets data for individual stocks
    #returns: stock name, price, bid, ask, high, low, open, close, change in price, market
    def get_stock_data(self,ticker):
        try:
            request_string = self.get_aa_api_string("OVERVIEW", ticker)
            overview_response = requests.get(request_string)

            request_string = self.get_aa_api_string("GLOBAL_QUOTE", ticker)
            quote_response = requests.get(request_string)
            
            self.num_calls += 2

            if overview_response.status_code == 200 and quote_response.status_code == 200:
                overviews = json.loads(overview_response.text)
                quotes = json.loads(quote_response.text)
                quotes = quotes["Global Quote"]
                stock_dict = {}
                
                stock_dict = {}
                stock_dict['ticker'] = ticker
                stock_dict['price'] = quotes['05. price']
                stock_dict['name'] = overviews['Name']
                stock_dict['bid'] = quotes['05. price']
                stock_dict['ask'] = quotes['05. price']
                stock_dict['open'] = quotes['02. open']
                stock_dict['high'] = quotes['03. high']
                stock_dict['low'] = quotes['04. low']

                stock_dict['close'] = quotes['08. previous close']
                stock_dict['change'] = quotes['09. change']
                stock_dict['change_perc'] = quotes['10. change percent']

                stock_dict['market'] = overviews['Country']
                stock_dict['exchange'] = quotes['Exchange']

                fifty_two_day_range = str(overviews['52WeekLow'] + ":" + overviews['52WeekHigh'])

                stock_dict['fifty_two_week_range'] = fifty_two_day_range
                stock_dict['market_cap'] = quotes['MarketCapitalization']
                
                return stock_dict
            
            else:
                return response.status_code
    
        except:
            raise Error("Stock Not Found")

    def get_price(self, ticker):
        try:
            request_string = self.get_aa_api_string("GLOBAL_QUOTE", ticker)
            quote_response = requests.get(request_string)
            
            self.num_calls += 1

            if quote_response.status_code == 200:
                quotes = json.loads(quote_response.text)
                quotes = quotes["Global Quote"]

                return quotes['05. price']

            else:
                return "Stock Not Found"
        except: 
            return "Stock Not Found"

    def get_beta(self,ticker):
        try:
            request_string = self.get_aa_api_string("OVERVIEW", ticker)
            overview_response = requests.get(request_string)

            if overview_response.status_code == 200:
                overviews = json.loads(overview_response.text)
                return overviews['Beta']
            else:
                return "Stock Not Found"
        except:
            return "Stock Not Found"
    
    #interval will be market, last_week, last_month, last_six_months, last_year
    def get_stock_prices(self, ticker, interval_type):
        try:
            price_list = []
            print('ticker', ticker, 'interval_type', interval_type)
    
            end_date = arrow.utcnow()

            request_string = self.get_aa_api_string("TIME_SERIES_DAILY", str(ticker + "&outputsize=full"))
            prices_response = requests.get(request_string)

            if prices_response.status_code == 200:
                prices = json.loads(prices_response.text)
                prices_dict = prices["Time Series (Daily)"]
                
            else:
                return "Stock Not Found"

            if interval_type == 'market': 
                prices_dict = dict(itertools.islice(prices_dict.items(), 100))
    
            elif interval_type == 'last_week':
                prices_dict = dict(itertools.islice(prices_dict.items(), 14))
    
            elif interval_type == 'last_month':
                prices_dict = dict(itertools.islice(prices_dict.items(), 30))

            elif interval_type == 'last_six_months':
                prices_dict = dict(itertools.islice(prices_dict.items(), 180))
                interval_string = str(1) + "d"

            elif interval_type == "last_year":
                prices_dict = dict(itertools.islice(prices_dict.items(), 365))
                interval_string = str(1) + "d"

            for date in prices_dict:
                price_list.append({'date': date, 'price': prices_dict[date]['4. close']})
                
            return price_list

        except:
            return "Stock Not Found"
    
    def get_historical_price(self, ticker, date):
        try:
            start_date = date.strftime("%Y-%m-%d")
            
            request_string = self.get_aa_api_string("TIME_SERIES_DAILY", str(ticker + "&outputsize=full"))
            prices_response = requests.get(request_string)

            if prices_response.status_code == 200:
                prices = json.loads(prices_response.text)
                prices_dict = prices["Time Series (Daily)"]

                count = 0
                price_dict = {}

                for date in prices_dict:
                    if str(date).strip() == str(start_date).strip():
                        print(prices_dict[date])
                        price_dict['low'] = prices_dict[date]['3. low']
                        price_dict['high'] = prices_dict[date]['4. close']
            
                return price_dict
            
            else:
                return "Stock Not Found"
        
        except:
            return "Stock Not Found"
    
    def check_stock(self, ticker):
        try:
            request_string = self.get_aa_api_string("OVERVIEW", ticker)
            overview_response = requests.get(request_string)
            self.num_calls += 1

            if overview_response.status_code == 200:
                overview = json.loads(overview_response.text)

                stock_dict = {}
            
                stock_dict['ticker'] = ticker
                stock_dict['name'] = overview['Name']
                return stock_dict
            
            else:
                return overview.status_code
    
        except:
            return False
        
        return stock_list

    def check_stocks(self, ticker):
        return self.check_stock(ticker)

    def get_num_calls(self):
        return self.num_calls

    def get_self_markets(self):
        return [""]