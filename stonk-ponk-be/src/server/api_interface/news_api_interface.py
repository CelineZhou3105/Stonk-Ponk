from api_interface.yahoo_fin_news_api import YfNewsApi
from api_interface.google_news_api import GoogleNewsApi
from .cache_api import cache

import datetime

class NewsApiInterface:
    #Creates an instance of all stock modules and stores them in order lists
    news_api_map = {}
    news_api_map["yahoo_fin_news"] = YfNewsApi()
    news_api_map["google_news"] = GoogleNewsApi()

    news_api_list = [{"name":"yahoo_fin_news", "priority": 1},{"name":"google_news", "priority": 2}]
    def get_news_api_priorities():
        #refer to admin database
        ret = []
        for i in NewsApiPriority.objects.all():
            ret.append({"name" : i.name, "priority" : i.priority})
        return ret

    def get_ordered_news_api_list():
        #call get_stock_api_priorities(), then sort
        return sorted(NewsApiInterface.get_news_api_priorities(), key = lambda item: item['priority'])

    @staticmethod
    def get_news_api_order():
        return NewsApiInterface.get_ordered_news_api_list()
    
    #gets priority list from admin and sorts based on priority
    #simply delete all existing NewsApiPriority objects and reinsert
    def set_news_api_order(order_list):
        try:
            NewsApiPriority.objects.all().delete();
            for np in order_list:
                #update entry
                NewsApiPriority.objects.create(name = np["name"], priority = np["priority"])
            return True
        except:
            return False 
    
    @cache(datetime.timedelta(minutes=5))
    def get_news(ticker):
        for api_dict in NewsApiInterface.news_api_list:
            try:
                api = NewsApiInterface.news_api_map[api_dict['name']]
                return api.get_news(ticker)
            except:
                continue

        return False 
    
    @cache(datetime.timedelta(minutes=5))
    def get_market_news():
        for api_dict in NewsApiInterface.news_api_list:
            try:
                print(api_dict['name'])
                api = NewsApiInterface.news_api_map[api_dict['name']]
                return api.get_market_news()
            except:
                continue

        return False 
    
    def get_num_calls():
        for api_dict in NewsApiInterface.news_api_list:
            total_calls = 0
            try:
                api = NewsApiInterface.news_api_map[api_dict['name']]
                total_calls += api.get_num_calls(ticker)
            except:
                continue
        
        return total_calls
