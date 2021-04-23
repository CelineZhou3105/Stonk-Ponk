from administration.models import StockApiPriority
from .yahoo_fin_api import YfApi
from .alphavantage_api import AaApi
from .cache_api import cache
from administration.models import StockApiPriority

import datetime

#class creates an interface for all api classes.
class StockApiInterface:
    #Creates an instance of all stock modules and stores them in order lists
    stock_api_map = {}
    stock_api_map["yahoo_fin"] = YfApi()
    stock_api_map["alphavantage"] = AaApi()

    stock_api_list = [{"name":"yahoo_fin", "priority": 1},{"name":"alpha_vantage", "priority": 2}]

    def get_stock_api_priorities():
        #refer to admin database
        ret = []
        
        #need to handle case where stockApiPriority Objects are empty
        if(not StockApiPriority.objects.exists()):
                StockApiPriority.objects.create(name = "yahoo_fin", priority = 1)
                StockApiPriority.objects.create(name = "alpha_vantage", priority = 2)
                return StockApiInterface.stock_api_list 
        else:
            for i in StockApiPriority.objects.all():
                ret.append({"name" : i.name, "priority" : i.priority})
        return ret

    def get_ordered_stock_api_list():
        #call get_stock_api_priorities(), then sort
        return sorted(StockApiInterface.get_stock_api_priorities(), key = lambda item: item['priority'])

    @staticmethod
    def get_stock_api_order():
        return StockApiInterface.get_ordered_stock_api_list()
    
    #gets priority list from admin and sorts based on priority
    #TODO
    def set_stock_api_order(order_list):
        try:
#            StockApiInterface.get_ordered_stock_api_list() = sorted(StockApiInterface.get_ordered_stock_api_list(), key = lambda item: item['priority'])
            for sp in order_list:
                #update entry
                p = StockApiPriority.objects.get(name = sp["name"])
                p.priority = sp["priority"]
            return True
        except Exception as e:
            return e 
    
    @cache(datetime.timedelta(minutes=5))
    def get_most_active(start_index, end_index):
        for api_dict in StockApiInterface.get_ordered_stock_api_list():
            try:
                api = StockApiInterface.stock_api_map[api_dict['name']]
                return api.get_most_active(start_index, end_index)
            except:
                continue

        return False
    
    @cache(datetime.timedelta(minutes=5))
    def get_market_data(data_type, page_num):
        for api_dict in StockApiInterface.get_ordered_stock_api_list():
            try:
                api = StockApiInterface.stock_api_map[api_dict['name']]
                return api.get_market_data(data_type, page_num)
            except:
                continue

        return False
    
    @cache(datetime.timedelta(minutes=5))
    def get_stock_data(ticker):
        for api_dict in StockApiInterface.get_ordered_stock_api_list():
            try:
                api = StockApiInterface.stock_api_map[api_dict['name']]
                return api.get_stock_data(ticker)
            except:
                continue

        return False
    
    @cache(datetime.timedelta(minutes=5))
    def get_price(ticker):
        for api_dict in StockApiInterface.get_ordered_stock_api_list():
            try:
                api = StockApiInterface.stock_api_map[api_dict['name']]
                return api.get_price(ticker)
            except:
                continue

        return False
    
    @cache(datetime.timedelta(hours=1))
    def get_beta(ticker):
        for api_dict in StockApiInterface.get_ordered_stock_api_list():
            try:
                api = StockApiInterface.stock_api_map[api_dict['name']]
                return api.get_beta(ticker)
            except:
                continue

        return False
    
    @cache(datetime.timedelta(minutes=5))
    def get_stock_prices(ticker, interval_type):
        for api_dict in StockApiInterface.get_ordered_stock_api_list():
            try:
                api = StockApiInterface.stock_api_map[api_dict['name']]
                return api.get_stock_prices(ticker, interval_type)
            except:
                continue

        return False
    
    @cache(datetime.timedelta(hours=1))
    def get_historical_price(ticker, date):
        for api_dict in StockApiInterface.get_ordered_stock_api_list():
            try:
                api = StockApiInterface.stock_api_map[api_dict['name']]
                return api.get_historical_price(ticker, date)
            except:
                continue
        return False
    
    @cache(datetime.timedelta(minutes=1))
    def check_stock(ticker):
        for api_dict in StockApiInterface.get_ordered_stock_api_list():
            try:
                api = StockApiInterface.stock_api_map[api_dict['name']]
                return api.check_stock(ticker)
            except:
                continue
        return False
    
    @cache(datetime.timedelta(minutes=1))
    def check_stocks(ticker):
        for api_dict in StockApiInterface.get_ordered_stock_api_list():
            try:
                api = StockApiInterface.stock_api_map[api_dict['name']]
                return api.check_stocks(ticker)
            except:
                continue
        return False
    
    def get_num_calls():
        for api_dict in StockApiInterface.get_ordered_stock_api_list():
            total_calls = 0
            try:
                api = StockApiInterface.stock_api_map[api_dict['name']]
                total_calls += api.get_num_calls(ticker)
            except:
                continue
        
        return total_calls
