from .yahoo_fin_api import YfApi
from .cache_api import cache

import datetime

#class creates an interface for all api classes.
class StockApiInterface:
    #Creates an instance of all stock modules and stores them in order lists
    stock_api_map = {}
    stock_api_map["yahoo_fin"] = YfApi()

    stock_api_list = [{"name":"yahoo_fin", "priority": 2},{"name":"alpha_vantage", "priority": 1}]
    
    @staticmethod
    def get_stock_api_order():
        return StockApiInterface.stock_api_list
    
    #gets priority list from admin and sorts based on priority
    def set_stock_api_order(order_list):
        try:
            StockApiInterface.stock_api_list = sorted(StockApiInterface.stock_api_list, key = lambda item: item['priority'])
            return True
        except:
            return False 
   
    @cache(datetime.timedelta(minutes=1))
    def get_market_status():
        for api_dict in StockApiInterface.stock_api_list:
            try:
                api = StockApiInterface.stock_api_map[api_dict['name']]
                return api.get_market_status()
            except:
                continue

        return False
    
    @cache(datetime.timedelta(minutes=5))
    def get_most_active(start_index, end_index):
        for api_dict in StockApiInterface.stock_api_list:
            try:
                api = StockApiInterface.stock_api_map[api_dict['name']]
                return api.get_most_active(start_index, end_index)
            except:
                continue

        return False
    
    @cache(datetime.timedelta(minutes=5))
    def get_market_data(data_type, page_num):
        for api_dict in StockApiInterface.stock_api_list:
            try:
                api = StockApiInterface.stock_api_map[api_dict['name']]
                return api.get_market_data(data_type, page_num)
            except:
                continue

        return False
    
    @cache(datetime.timedelta(minutes=5))
    def get_stock_data(ticker):
        for api_dict in StockApiInterface.stock_api_list:
            try:
                api = StockApiInterface.stock_api_map[api_dict['name']]
                print(api.get_stock_data(ticker))
                return api.get_stock_data(ticker)
            except:
                continue

        return False
    
    @cache(datetime.timedelta(minutes=5))
    def get_price(ticker):
        for api_dict in StockApiInterface.stock_api_list:
            try:
                api = StockApiInterface.stock_api_map[api_dict['name']]
                return api.get_price(ticker)
            except:
                continue

        return False
    
    @cache(datetime.timedelta(hours=1))
    def get_stats(ticker):
        for api_dict in StockApiInterface.stock_api_list:
            try:
                api = StockApiInterface.stock_api_map[api_dict['name']]
                return api.get_stats(ticker)
            except:
                continue

        return False
    
    @cache(datetime.timedelta(minutes=5))
    def get_quotes(ticker):
        for api_dict in StockApiInterface.stock_api_list:
            try:
                api = StockApiInterface.stock_api_map[api_dict['name']]
                return api.get_quotes(ticker)
            except:
                continue

        return False
    
    @cache(datetime.timedelta(minutes=5))
    def get_stock_prices(ticker, interval_type):
        for api_dict in StockApiInterface.stock_api_list:
            try:
                api = StockApiInterface.stock_api_map[api_dict['name']]
                return api.get_stock_prices(ticker, interval_type)
            except:
                continue

        return False
    
    @cache(datetime.timedelta(hours=1))
    def get_historical_price(ticker, date):
        for api_dict in StockApiInterface.stock_api_list:
            try:
                api = StockApiInterface.stock_api_map[api_dict['name']]
                return api.get_historical_price(ticker, date)
            except:
                continue
        return False
    
    @cache(datetime.timedelta(minutes=1))
    def check_stock(ticker):
        for api_dict in StockApiInterface.stock_api_list:
            try:
                api = StockApiInterface.stock_api_map[api_dict['name']]
                return api.check_stock(ticker)
            except:
                continue
        return False
    
    @cache(datetime.timedelta(minutes=1))
    def check_stocks(ticker):
        for api_dict in StockApiInterface.stock_api_list:
            try:
                api = StockApiInterface.stock_api_map[api_dict['name']]
                return api.check_stocks(ticker)
            except:
                continue
        return False
    
    def get_num_calls():
        for api_dict in StockApiInterface.stock_api_list:
            total_calls = 0
            try:
                api = StockApiInterface.stock_api_map[api_dict['name']]
                total_calls += api.get_num_calls(ticker)
            except:
                continue
        
        return total_calls
