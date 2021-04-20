import pandas as pd
import requests
import yahoo_fin.stock_info as si
import json
from datetime import date, datetime, timedelta
from dateutil.relativedelta import relativedelta
import arrow
import requests
from urllib.request import urlopen

class AaApi():
    def __init__(self):
        self.num_calls = 0
        self.api = si
    
    def get_fmp_api_string(func):
        request_string = str("https://financialmodelingprep.com/api/v3/stock/" + func + "?apikey=ddb40cd7ee687688ad595435c3a99217")
        return api_string
    
    def get_aa_api_string(func):
        request_string = str("https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=" + from_currency + "&to_currency=" + to_currency + "&apikey=RYJOHTXNG0NQFQVQ")
        return request_string

    def get_market_status(self):
        return 

    def get_market_data(self,type,page_num):
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

                    #prices = self.get_stock_prices(market_stock_dict['ticker'], 'market')
                    #market_stock_dict['prev_week_prices'] = prices

                    market_stocks_list.append(market_stock_dict)

                return market_stocks_list

        else:
            return response.status_code