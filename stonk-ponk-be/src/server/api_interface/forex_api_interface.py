from api_interface.alphavantage_forex_api import AaForexApi

class ForexApiInterface:
    forex_api_map = {}
    forex_api_map['alphavantage'] = AaForexApi()

    forex_api_list = [{"name":"alphavantage", "priority": 1}]

    @staticmethod
    def get_forex_api_order():
        return ForexApiInterface.forex_api_list
    
    #gets priority list from admin and sorts based on priority
    def set_forex_api_order(order_list):
        try:
            ForexApiInterface.forex_api_list = sorted(ForexApiInterface.forex_api_list, key = lambda item: item['priority'])
            return True
        except:
            return False 
    
    def get_currency_exchange(from_currency, to_currency):
        for api_dict in ForexApiInterface.forex_api_list:
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