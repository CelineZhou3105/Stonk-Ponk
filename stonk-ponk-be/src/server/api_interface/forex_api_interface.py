from api_interface.alphavantage_forex_api import AaForexApi
from administration.models import StockApiPriority
from api_interface.yf_forex_api import YfForexApi

class ForexApiInterface:
    forex_api_map = {}
    forex_api_map['alphavantage'] = AaForexApi()
    forex_api_map['yahoo_finance'] = YfForexApi()

    forex_api_list = [{"name":"alphavantage", "priority": 1}]
    def get_forex_api_priorities():
        #refer to admin database
        ret = []
        for i in ForexApiPriority.objects.all():
            ret.append({"name" : i.name, "priority" : i.priority})
        return ret

    def get_ordered_forex_api_list():
        #call get_stock_api_priorities(), then sort
        return sorted(ForexApiInterface.get_forex_api_priorities(), key = lambda item: item['priority'])


    @staticmethod
    def get_forex_api_order():
        return ForexApiInterface.get_ordered_forex_api_list()
    
    #gets priority list from admin and sorts based on priority
    def set_forex_api_order(order_list):
   	try:
            ForexApiPriority.objects.all().delete();
            for fp in order_list:
                #update entry
                ForexApiPriority.objects.create(name = fp["name"], priority = fp["priority"])
            return True
        except Exception as e:
            return e 

    def get_currency_exchange(from_currency, to_currency):
        for api_dict in ForexApiInterface.get_ordered_forex_api_list():
            try:
                api = ForexApiInterface.forex_api_map[api_dict['name']]
                return api.get_currency_exchange(from_currency, to_currency)
            except:
                continue

        return False
    
    def calc_forex_rate(from_value, from_currency, to_currency):
        forex_rate = ForexApiInterface.get_currency_exchange(from_currency, to_currency)
        exchange_value = float(from_value) * float(forex_rate)
        return exchange_value
